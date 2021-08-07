 import TopNav from "../../components/globals/top_nav";
 import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function OrderDate() {
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();

  const handleProcess = (e) => {
    let order_id = e.target.id;
    let json = {
      action: "update",
      db: "tabrent",
      table: "tx_order",
      where: [
          [
              "order_id",
              "=",
              order_id
          ]
      ],
      value: {
          "order_status" : "5"
      }
    }

    fetch_data(STORE, json).then(function (data) {
      if (data.success) {
        setShow(false);
        let json = {
          action: "list",
          db: "tabrent",
          table: "tx_order",
          raw: {
            "selected": "tx_order.*, tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
          },
          leftJoin : [
          {
              table : "tx_product",
              field1 : "tx_product.product_id",
              field2 : "tx_order.order_product_id"
          },
          {
            table: "tx_user",
            field1: "tx_user.user_id",
            field2: "tx_order.order_user_id"
          }],
          where: [
              [
                  "product_owner",
                  "=",
                  user.user_id
              ],
              [
                  "order_status",
                  "=",
                  "4"
              ]
          ]
      };
    
        fetch_data(INDEX, json).then(function (data) {
          if (data.count == 1) {
            setProduct([data.result]);
          } else {
            setProduct(data.result);
          }
        });
      } else {
        setShow(false);
      }
    });
  }


  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      let data = JSON.parse(localStorage.getItem('user_data'));
      setUser(data);
      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_order",
        raw: {
          "selected": "tx_order.*, tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
        },
        leftJoin : [
        {
            table : "tx_product",
            field1 : "tx_product.product_id",
            field2 : "tx_order.order_product_id"
        },
        {
          table: "tx_user",
          field1: "tx_user.user_id",
          field2: "tx_order.order_user_id"
        }],
        where: [
            [
                "product_owner",
                "=",
                data.user_id
            ],
            [
                "order_status",
                "=",
                "4"
            ]
        ]
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


  return (
    <div>
      <TopNav back="true" text="Back" arrow="true" customPage="profile/partner_profile" />
      <div className="main" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td className="text-center">
              <div className="partner-profile-text-logo" style={{fontSize: '24px', width: '50px', height: '50px', boxShadow: 'none', background: '#343434'}}> 
                {user ? user.user_first_name.charAt(0) + user.user_last_name.charAt(0) : "TR" }
              </div>
            </td>
            <td>
              <p className="weight-700 mb-0 mt-1" style={{ fontSize: "18px" }}>
              {user ? user.user_first_name + " " + user.user_last_name : "Rental Owner" }
              </p>
              <p style={{ fontSize: "11px" }}>
                There is no rating for this rental shop
              </p>
            </td>
          </tr>
        </table>
        <table width="100%" className="mt-4">
          <tr>
            <td className="text-left">
              <p className="mb-0 weight-700">Rented Order</p>
            </td>
            <td className="text-right">

            </td>
          </tr>
        </table>
      </div>
      <div className="profile-div-product" style={{paddingTop: product.length !== 0 ? "20px" : "100px", paddingBottom: product.length !== 0 ? "20px" : "0px"}}>
        {product.length !== 0 ? product.map((data, index) => {
          return (
            <div className="product-div">
              <table width="100%">
                <tr>
                  <td>
                    <p className="text-left pl-1 p-0 m-0">{data.user_first_name + " " + data.user_last_name} 
                      <br /> <font style={{fontSize: '12px', fontWeight: '400'}}>May, 20 2020</font>
                      </p>
                  </td>
                </tr>
                <tr>
                <td className="text-left pl-1 "><font style={{fontSize: '14px', fontWeight: '700'}}>Rp {data.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</font></td>
                  <td className="text-left">
                    <button onClick={() => setShow(true)} className="btn btn-primary mt-2" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '14px'}}>
                      Detail
                    </button>
                  </td>
                </tr>
              </table>
              <Modal centered show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Detail Order</Modal.Title>
              </Modal.Header>
                <Modal.Body>
                  <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} />
                  <div className="mt-3">
                    <p className="m-1"><font style={{fontSize: '12px'}}>Transaction Number :</font> <br /> <b>{data.order_transaction_number}</b></p>
                    <hr className="m-0 p-0" />
                    <p className="m-1"><font style={{fontSize: '12px'}}>Product Name :</font> <br /> <b>{data.product_name}</b></p>
                    <p className="m-1"><font style={{fontSize: '12px'}}>Rent Duration :</font> <br /> <b>{data.order_duration} Days</b></p>
                    <p className="m-1"><font style={{fontSize: '12px'}}>Pickup Date :</font> <br /> <b>{data.order_start_date}</b></p>
                    <p className="m-1"><font style={{fontSize: '12px'}}>Return Date :</font> <br /> <b>{data.order_end_date}</b></p>
                    <p className="m-1"><font style={{fontSize: '12px'}}>Message :</font> <br /> <b>{data.order_message}</b></p>
                    <hr className="m-0 p-0" />
                    <p className="m-1"><font style={{fontSize: '12px'}}>User Booking Name :</font> <br /> <b>{data.user_first_name + " " + data.user_last_name}</b></p>
                    <p className="m-1"><font style={{fontSize: '12px'}}>Total Payment :</font> <br /> <b>{data.order_payment_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btn-danger" variant="secondary" onClick={()=>setShow(false)}>
                    Close
                  </Button>
                  <Button id={data.order_id} onClick={(e) => handleProcess(e)} variant="success">
                    Return
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>);
        }) : ( 
          <div>
            <img src="/icons/icon_no_product.svg" />
          </div> )}
      </div>
    </div>
  );
}
