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

  const handleRent = () => {
    router.push({
      pathname: "/progress/detail",
    });
  };

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
      <TopNav back="true" text="Back" arrow="true" />
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
          className="button-primary"
          style={{ position: "absolute", right: "25px", marginTop: "-45px" }}
        >
          Copy
        </button>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p>Confirmation Transfer</p>
        <hr />
        <table cellpadding="4" style={{ fontSize: "14px" }}>
          <tr>
            <td width>Bank Account Name</td>
            <td>:</td>
            <td>
              <input
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
              <button className="button-primary"> Upload </button>
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
          bottom: "0px",
          fontSize: "14px",
        }}
      >
         <table width="100%">
          <tr>
            <td width="50%"><button onClick={() => router.push("/")} className="bg-danger button-primary w-100 p-2" style={{ borderRadius: '0px' }}>Back To Home</button></td>
            <td><button onClick={handleRent} className="button-primary w-100 p-2" style={{ borderRadius: '0px' }}>Pay</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
