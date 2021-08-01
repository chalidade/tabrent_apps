import TopNav from "../../components/globals/top_nav";
import { Container, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { INDEX, MAIN, STORE } from "../../config/api_url";
import { fetch_data } from "../../components/globals/api";

export default function Detail() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [orderData, setOrderData] = useState();
  const [bankAccountName, setBankAccountName] = useState();
  const [nominalTransfer, setNominalTransfer] = useState();
  const [dateTransfer, setDateTransfer] = useState();
  const [photo, setPhoto] = useState();

  const handlePay = () => {
    console.log(bankAccountName);
    console.log(nominalTransfer);
    console.log(dateTransfer);
    console.log(photo);
    if (bankAccountName && nominalTransfer && dateTransfer && photo) {
      let value = {
        transfer_transaction_number : orderData.order_transaction_number,
        transfer_account_name : bankAccountName, 
        transfer_total : nominalTransfer, 
        transfer_date : dateTransfer
      }

      let check_order = {
        action : "list",
        db : "tabrent",
        table : "tx_transfer",
        where: [
          [
              "transfer_transaction_number",
              "=",
              orderData.order_transaction_number
          ]
        ]
      };

      fetch_data(INDEX, check_order).then(function (data) {
        let json;
        if (data.success) { 
          json = {
                    action : "update",
                    db : "tabrent",
                    table : "tx_transfer",
                    where: [
                      [
                          "transfer_transaction_number",
                          "=",
                          orderData.order_transaction_number
                      ]
                    ],
                    value: value
                  };
        } else {
          json = {
            action : "save",
            db : "tabrent",
            table : "tx_transfer",
            primaryKey : "transfer_id",
            value: [value],
          };
        }

        fetch_data(STORE, json).then(function (transfer) {
          if (transfer.success) {
                // Image Upload
                let json_file = {
                  "action": "upload_base64",
                  "db": "tabrent",
                  "table": "tx_transfer",
                  "update" : "transfer_picture",
                  "main" : false,
                  "where": [
                      [
                          "transfer_transaction_number",
                          "=",
                          orderData.order_transaction_number
                      ]
                  ],
                  "value" : photo
                }
              console.log(transfer.result);
              fetch_data(STORE, json_file).then(function (result_file) {
                if (result_file.success) {
                  console.log("File Uploaded");
                } else {
                  console.log("Upload File Failed");
                }
              });

              console.log(transfer.id);

              let json_update = {
                action: "update",
                db: "tabrent",
                table: "tx_order",
                where: [
                    [
                        "order_transaction_number",
                        "=",
                        orderData.order_transaction_number
                    ]
                ],
                value: {
                    order_status : "1"
                }
            }

            fetch_data(STORE, json_update).then(function (result_update) {
              if (result_update.success) {
                alert("Payment Send, Please Wait for Confirmation");
                router.push({
                  pathname: "/progress/detail",
                  query: {id: orderData.order_id}
                });
              } else {
                alert("Update Failed");
              }
            });
          }
        });
      });
    } else {
      alert("There's empty form");
    }
  };

  const handleGetPhoto = (e) => {
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if(allFiles.length == files.length){
            setPhoto(allFiles);
        }
      }
    }
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let order_id = router.query.id;
      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_order",
        "where": [
          [
              "order_id",
              "=",
              order_id
          ]
        ]
      };
            
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) { 
          let order = data.result;
          let getUser = JSON.parse(localStorage.getItem('user_data'));
          setOrderData(order);
          setUser(getUser);
        }
      });
    }
  }, [])

  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav back="true" text="Back" arrow="true" page="Progress" />
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Transaction Number</td>
            <td className="text-right">{orderData ? orderData.order_transaction_number : "110551214"}</td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Total Payment</td>
            <td className="text-right">
              <font style={{ fontWeight: "700", color: "#2F2F8D" }}>
                Rp {orderData ? orderData.order_payment_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "1.200.000"}
              </font>
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p>{orderData ? orderData.order_payment_name : "Bank BCA"}</p>
        <hr />
        <p>
          <font style={{ fontSize: "12px" }}>Bank Account Number</font> <br />
          <font style={{ fontWeight: "700" }}>{orderData ? orderData.order_payment_number : "1400 501 2001"}</font>
        </p>
        <button
          onClick={() => {navigator.clipboard.writeText(orderData ? orderData.order_payment_number : "1400 501 2001"); alert("Copied to clipboard.");}}
          className="button-primary"
          style={{ position: "absolute", right: "25px", marginTop: "-45px" }}
        >
          Copy
        </button>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p>Confirmation Transfer</p>
        <hr />
        <table cellPadding="4" style={{ fontSize: "14px" }}>
          <tr>
            <td width>Bank Account Name</td>
            <td>:</td>
            <td>
              <input
                onChange={e => setBankAccountName(e.target.value)}
                className="text-right"
                type="text"
                placeholder="Edward Culent"
                style={{ border: "none", width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td>Nominal Transfer</td>
            <td>:</td>
            <td>
              <input
                onChange={e => setNominalTransfer(e.target.value)}
                className="text-right"
                type="text"
                placeholder="1000000"
                style={{ border: "none", width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td>Date Transfer</td>
            <td>:</td>
            <td>
              <input
                onChange={e => setDateTransfer(e.target.value)}
                className="text-right"
                type="date"
                placeholder=""
                style={{ border: "none", width: "100%" }}
              />
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td>
              <p className="pt-1 mb-0">Transfer Picture</p>
            </td>
            <td className="text-right">
              <label htmlFor="upload" className="button-primary" onChange={e => handleGetPhoto(e)}>
                <input id="upload" multiple="true" type="file" style={{display:'none'}} /> 
                Upload
              </label>
            </td>
          </tr>
        </table>
      </div>

      <div
        className="mt-3 text-center text-white"
        style={{
          height: "auto",
          position: "absolute",
          width: "100%",
          fontSize: "14px",
        }}
      >
         <table width="100%">
          <tr>
            <td width="50%"><button onClick={() => router.push("/")} className="bg-danger button-primary w-100 p-2" style={{ borderRadius: '0px' }}>Back To Home</button></td>
            <td><button onClick={handlePay} className="button-primary w-100 p-2" style={{ borderRadius: '0px' }}>Pay</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
