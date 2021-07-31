import TopNav from "../../components/globals/top_nav";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function ListUser() {
 const [product, setProduct] = useState([]);
 const [show, setShow] = useState(false);
 const [user, setUser] = useState();
 const [photo, setPhoto] = useState([]);
 const [modal, setModal] = useState([]);

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

const handleSend = ({data}) => {
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
            "order_status": "3"
        }
      };

    fetch_data(STORE, update_order).then(function (data) {
    if (data.success) {
        alert("Order Send to Rental Owner");
    }
    });
}

 return (
   <div>
     <TopNav back="true" text="Back" arrow="true" customPage="profile/admin_menu" />
     <div className="main" style={{ height: "auto" }}>
       <table width="100%" className="mt-4">
         <tr>
           <td className="text-left">
             <p className="mb-0 weight-700">List Transfer</p>
           </td>
           <td className="text-right">

           </td>
         </tr>
       </table>
     </div>
     <div className="profile-div-product" style={{paddingTop: product.length !== 0 ? "20px" : "100px", paddingBottom: product.length !== 0 ? "20px" : "0px"}}>
       {product.length !== 0 ? product.map((data, index) => {
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
                    }}>✓</font>
                   )}  
                     <br /> 
                     <font style={{fontSize: '12px', fontWeight: '400'}}>{data.transfer_date}</font> | <font style={{fontSize: '12px', fontWeight: '400'}}>
                        {data.transfer_account_name.length > 10 ? data.transfer_account_name.slice(0, 10) + "..." : data.transfer_account_name }
                    </font>
                     </p>
                 </td>
                 <td>
                    <button onClick={() => (handleDetailUser({data}), setShow(true))} className="btn btn-primary mt-2" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '12px'}}>
                     Detail
                   </button>
                 </td>
                 <td>
                    <button onClick={() => (handleSend({data}))} className="btn btn-success mt-2" style={{border: 'none', borderRadius:'5px', float:'left', fontSize: '12px'}}>
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
   </div>
 );
}
