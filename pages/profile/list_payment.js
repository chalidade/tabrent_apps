import TopNav from "../../components/globals/top_nav";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function ListUser() {
 const [product, setProduct] = useState([]);
 const [show, setShow] = useState(false);
 const [showSend, setShowSend] = useState(false);
 const [user, setUser] = useState();
 const [photo, setPhoto] = useState([]);
 const [modal, setModal] = useState([]);
 const [photoTransfer, setPhotoTransfer] = useState();
 
 const [tmpSent, setTmpSent] = useState([]);
 const [transferRent, setTransferRent] = useState(0);
 const [modalFilter, setModalFilter] = useState(false);
 const [filterTransactionAccount, setFilterTransactionAccount] = useState("");
 const [filterTransactionDate, setFilterTransactionDate] = useState("");
 const [filterTransactionNumber, setFilterTransactionNumber] = useState("");
 const [filterStatus, setFilterStatus] = useState("2");

 useEffect(() => {
   if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
     let data = JSON.parse(localStorage.getItem('user_data'));
     setUser(data);
     let json = {
       action: "list",
       db: "tabrent",
       table: "tx_order",
       leftJoin: [
        {
            table: "tx_transfer",
            field1: "tx_transfer.transfer_transaction_number",
            field2: "tx_order.order_transaction_number"
        },
        {
            table: "tx_product",
            field1: "tx_product.product_id",
            field2: "tx_order.order_product_id"
        }]
    };
 
     fetch_data(INDEX, json).then(function (data) {
       if (data.success) {
         if (data.count == 1) {
           setProduct([data.result]);
         } else {
           setProduct(data.result);
         }
       }
     });
   }
 }, [])

 const handleDetailUser = ({data}) => {
   setPhoto(JSON.parse(data.transfer_picture));
   setModal(data);
   setShow(true);
 }

const handleInActivate = (e) => {
  let id = e.target.id;
  let json = {
    action: "update",
    db: "tabrent",
    table: "tx_transfer",
    where: [
        [
            "transfer_id",
            "=",
            id
        ]
    ],
    value: {
        "transfer_status": "0"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let update_order = {
            action: "update",
            db: "tabrent",
            table: "tx_order",
            where: [
                [
                    "order_transaction_number",
                    "=",
                    data.result[0].transfer_transaction_number
                ]
            ],
            value: {
                "order_status": "6"
            }
          };
    
        fetch_data(STORE, update_order).then(function (data) {
        if (data.success) {
            console.log(data);
        }
        });
        
        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_order",
            leftJoin: [
                {
                    table: "tx_transfer",
                    field1: "tx_transfer.transfer_transaction_number",
                    field2: "tx_order.order_transaction_number"
                },
                {
                    table: "tx_product",
                    field1: "tx_product.product_id",
                    field2: "tx_order.order_product_id"
                }]
         };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("Reject Payment");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("Reject Payment");
          }
        }
      });
    }
  });
}

const handleActivate = (e) => {
  let id = e.target.id;
  let json = {
    action: "update",
    db: "tabrent",
    table: "tx_transfer",
    where: [
        [
            "transfer_id",
            "=",
            id
        ]
    ],
    value: {
        "transfer_status": "1"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let update_order = {
            action: "update",
            db: "tabrent",
            table: "tx_order",
            where: [
                [
                    "order_transaction_number",
                    "=",
                    data.result[0].transfer_transaction_number
                ]
            ],
            value: {
                "order_status": "2"
            }
          };

        fetch_data(STORE, update_order).then(function (data) {
        if (data.success) {
          console.log(data);
        }
        });

        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_order",
            leftJoin: [
                {
                    table: "tx_transfer",
                    field1: "tx_transfer.transfer_transaction_number",
                    field2: "tx_order.order_transaction_number"
                },
                {
                    table: "tx_product",
                    field1: "tx_product.product_id",
                    field2: "tx_order.order_product_id"
                }]
         };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("Transfer Verify");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("Transfer Verify");
          }
        }
      });
    }
  });
}

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
        setPhotoTransfer(allFiles);
      }
    }
  }
}

const handleSend = () => {
  if (transferRent !== 0) {
    let data = tmpSent.data;
    let transaction_number = data.order_transaction_number;
    let update_order = {
        action: "update",
        db: "tabrent",
        table: "tx_order",
        where: [
            [
                "order_transaction_number",
                "=",
                transaction_number
            ]
        ],
        value: {
            "order_status": "3",
            "order_total_rent": transferRent
        }
      };

    fetch_data(STORE, update_order).then(function (data) {
    if (data.success) {
        alert("Order Send to Rental Owner");
        let json_file = {
          "action": "upload_base64",
          "db": "tabrent",
          "table": "tx_order",
          "update" : "order_picture_rent",
          "main" : false,
          "where": [
              [
                  "order_transaction_number",
                  "=",
                  transaction_number
              ]
          ],
          "value" : photoTransfer
        }
        fetch_data(STORE, json_file).then(function (result_file) {
          if (result_file.success) {
            console.log("File Uploaded");
          } else {
            console.log("Upload File Failed");
          }
        });
        setShowSend(false);
      }
    });
  }
}

const handleFilter = () => {
  let number, account, date, status;
  let filter = [];

  if (filterStatus !== '2') {
    status = ['transfer_status', '=', filterStatus];
    filter.push(status);
  }

  if (filterTransactionNumber.length !== 0) {
    number = ['order_transaction_number', 'like', '%'+filterTransactionNumber+'%'];
    filter.push(number);
  }

  if (filterTransactionAccount.length !== 0) {
    account = ['transfer_account_name', 'like', '%'+filterTransactionAccount+'%'];
    filter.push(account);
  }
  
  if (filterTransactionDate.length !== 0) {
    date = ['transfer_date', 'like', '%'+filterTransactionDate+'%'];
    filter.push(date);
  }

  let json = {
    action: "list",
    db: "tabrent",
    table: "tx_order",
    leftJoin: [
     {
         table: "tx_transfer",
         field1: "tx_transfer.transfer_transaction_number",
         field2: "tx_order.order_transaction_number"
     },
     {
         table: "tx_product",
         field1: "tx_product.product_id",
         field2: "tx_order.order_product_id"
     }],
     where: filter
 };

  fetch_data(INDEX, json).then(function (data) {
    if (data.success) {
      if (data.count == 1) {
        setProduct([data.result]);
      } else {
        setProduct(data.result);
      }
    } else {
      setProduct(data.result);
    }
  });

  setModalFilter(false);

}

 return (
   <div>
     <TopNav back="true" text="Back" arrow="true" />
     <div className="main" style={{ height: "auto" }}>
       <table width="100%" className="mt-4">
         <tr>
           <td className="text-left">
             <p className="mb-0 weight-700">List Transfer</p>
           </td>
           <td className="text-right">
             <img src="/icons/icon_filter.png" style={{width: '20px'}} onClick={() => setModalFilter(true)} />
           </td>
         </tr>
       </table>
     </div>
     <div className="profile-div-product" style={{paddingTop: product ? "20px" : "100px", paddingBottom: product ? "20px" : "0px"}}>
       {product ? product.map((data, index) => {
         return (
           <div className="product-div" style={{height: '75px'}}>
             <table width="100%">
               <tr>
                 <td>
                   <p className="text-left pl-1 p-0 m-0">{data.order_transaction_number} 
                   {data.transfer_status == 0 ? (
                    <font style={{
                        background: 'red',
                        fontSize: '10px',
                        borderRadius: '20px',
                        width: '15px',
                        height: '15px',
                        textAlign: 'center',
                        marginLeft: '7px',
                        color: '#fff',
                        marginTop: '4px',
                        position: 'absolute',
                        fontWeight: '800'
                    }}>-</font>
                   ) : (
                    <font style={{
                        background: '#04ff04d1',
                        fontSize: '10px',
                        borderRadius: '20px',
                        width: '15px',
                        height: '15px',
                        textAlign: 'center',
                        marginLeft: '7px',
                        color: '#fff',
                        marginTop: '4px',
                        position: 'absolute',
                        fontWeight: '800'
                    }}>???</font>
                   )}  
                     <br /> 
                     <font style={{fontSize: '12px', fontWeight: '400'}}>{data.transfer_date}</font> | <font style={{fontSize: '12px', fontWeight: '400'}}>
                        {data.transfer_account_name !== null && data.transfer_account_name.length > 10 ? data.transfer_account_name.slice(0, 10) : data.transfer_account_name }
                    </font>
                     </p>
                 </td>
                 <td>
                    <button onClick={() => (handleDetailUser({data}), setShow(true))} className="btn btn-primary mt-2" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '12px'}}>
                     Detail
                   </button>
                 </td>
                 <td>
                    <button onClick={() => (setTmpSent({data}), setShowSend(true))} className="btn btn-success mt-2" style={{border: 'none', borderRadius:'5px', float:'left', fontSize: '12px'}}>
                     Send
                   </button>
                 </td>
               </tr>
             </table>
           </div>);
       }) : ( 
         <div>
           <img src="/icons/icon_no_product.svg" />
         </div> )}
     </div>
     {modal ? (
      <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Transfer</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              {/* <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} /> */}
              <div className="">
                <div style={{width: '100%', overflowX: 'scroll'}}>
                    <table className="mt-3 mb-3" style={{width: '100%'}}>
                        <tr>
                            {photo ? photo.map((data, index) => {
                                return (<td key={index}>
                                    <label>
                                        <img alt="" src={data.base64 ? data.base64 : MAIN+data} className="profile-div-photo" style={{border: 'none', padding: '0px', margin: '0px 10px'}} />
                                    </label>
                                </td>);
                            }) : ""}
                        </tr>
                    </table>
                </div>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Transaction Number :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.order_transaction_number ? modal.order_transaction_number : "-"}</font></p>
                <hr />
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Payment Method :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.order_payment_name ? modal.order_payment_name : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Payment Number :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.order_payment_number ? modal.order_payment_number : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Payment Total :</b></font> <br /> <font style={{fontSize: '12px'}}>Rp {modal.order_payment_total ? modal.order_payment_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-"}</font></p>
                <hr />
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Transfer Date :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.transfer_date ? modal.transfer_date : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Transfer Account :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.order_payment_number ? modal.transfer_account_name : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Transfer Total :</b></font> <br /> <font style={{fontSize: '12px'}}>Rp {modal.transfer_total ? modal.transfer_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-"}</font></p>
             </div>
            </Modal.Body>
            <Modal.Footer>
              <Button id={modal.transfer_id} className="btn-danger" variant="secondary" onClick={(e) => handleInActivate(e)}>
                Reject
              </Button>
              <Button id={modal.transfer_id} onClick={(e) => handleActivate(e)} variant="success">
                Verify
              </Button>
            </Modal.Footer>
          </Modal>
     ) : ""}

     {modal ? (
      <Modal centered show={showSend} onHide={() => setShowSend(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Transfer to Rental Owner</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              {/* <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} /> */}
              <div className="">
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Transfer Total :</b></font> <br /> 
                  <input className="form-control mt-2" type="number" onChange={(e)=>setTransferRent(e.target.value)} />
                </p>
                  <label htmlFor="upload" className="button-primary mt-2 ml-1 p-2" onChange={e => handleGetPhoto(e)}>
                  <input id="upload" multiple="true" type="file" style={{display:'none'}} /> 
                  Upload transfer
                </label>
             </div>
            </Modal.Body>
            <Modal.Footer>
              <Button id={modal.transfer_id} className="btn-danger" variant="secondary" onClick={() => setShowSend(false)}>
                Cancel
              </Button>
              <Button id={modal.transfer_id} onClick={() => handleSend()} variant="success">
                Send
              </Button>
            </Modal.Footer>
          </Modal>
     ) : ""}

     <Modal show={modalFilter} onHide={() => setModalFilter(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table width="100%">
          <tr>
              <td>
                <p className="mb-1">Transaction Number</p>
               <input className="form-control" type="text" value={filterTransactionNumber} onChange={(e) => setFilterTransactionNumber(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Transfer Account</p>
               <input className="form-control" type="text" value={filterTransactionAccount} onChange={(e) => setFilterTransactionAccount(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Transfer Date</p>
               <input className="form-control" type="date" value={filterTransactionDate} onChange={(e) => setFilterTransactionDate(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Status</p>
                <table width="100%">
                  <tr>
                    <td><input type="radio" name="status" value="2" checked={filterStatus == 2 ? true : false} onChange={(e) => setFilterStatus(e.target.value)}/> All</td>
                    <td><input type="radio"  name="status" value="1" checked={filterStatus == 1 ? true : false} onChange={(e) => setFilterStatus(e.target.value)} /> Verified</td>
                    <td><input type="radio"  name="status" value="0" checked={filterStatus == 0 ? true : false} onChange={(e) => setFilterStatus(e.target.value)} /> Not Verified</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleFilter()}>
            Filter
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
 );
}
