import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExitToApp } from '@material-ui/icons';
import { Link } from "@material-ui/core";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function OrderDate() {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [newOrder, setNewOrder] = useState(0);
  const [rented, setRented] = useState(0);

  const handleLogout = () => {
    router.push('/');
    localStorage.removeItem("is_login");
  };


  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      if (localStorage.getItem("is_login") !== null) {
        let data = JSON.parse(localStorage.getItem('user_data'));
        setUser(data);
        let json = {
          action : "list",
          db : "tabrent",
          table : "tx_product",
          "where": [
            [
                "product_owner",
                "=",
                data.user_id
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

        let json_new_order = {
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
                  "3"
              ]
          ]
      };
    
        fetch_data(INDEX, json_new_order).then(function (data) {
          setNewOrder(data.count);
        });

        let json_rented = {
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
    
        fetch_data(INDEX, json_rented).then(function (data) {
          setRented(data.count);
        });

      }
    }
  }, [])
  return (
    <div style={{ background: "#2F2F8D", overflow: "hidden" }}>
        <div onClick={() => handleLogout()} style={{position:'absolute', top: '10px', right: '10px', color: '#fff'}}><ExitToApp /><span style={{ padding: '10px' }}>Logout</span></div>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "30vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div
        className="profile-main"
        style={{ overflow: "hidden", height: "68vh", top: "50vh" }}
      >
        <p className="weight-600" style={{ fontSize: "12px" }}>
          ORDERS
        </p>
        <table width="100%">
          <tr>
            <td className="text-left">
              <Link href="/profile/list_new_order">
                <img src="/icons/icon_new_order.svg" />
                {newOrder !== 0 ? (
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      position: 'absolute',
                      marginTop: '-60px',
                      background: 'red',
                      color: 'white',
                      marginLeft: '56px',
                      borderRadius: '50px',
                      textAlign: 'center',
                      fontSize: '13px',
                }}>{newOrder}</div>
                ) : ""}
               
              </Link>
            </td>
            <td className="text-center">
              <Link href="/profile/list_rented_order">
                <img src="/icons/icon_rented.svg" />
                {rented !== 0 ? (
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      position: 'absolute',
                      marginTop: '-60px',
                      background: 'red',
                      color: 'white',
                      marginLeft: '50px',
                      borderRadius: '50px',
                      textAlign: 'center',
                      fontSize: '13px',
                }}>{rented}</div>
                ) : ""}
              </Link>
            </td>
            <td className="text-right">
              <Link href="/profile/list_done_order">
                <img src="/icons/icon_complete.svg" />
              </Link>
            </td>
          </tr>
        </table>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
          PRODUCTS
        </p>
        <p onClick={() => router.push("/profile/list_rent")} style={{ fontSize: "12px" }}>{product.length} Products</p>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
          REVIEWS
        </p>
        <p style={{ fontSize: "12px" }}>0 Reviews</p>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
          PAYMENTS
        </p>
        <p onClick={() => router.push("/profile/list_payment_rental")} style={{ fontSize: "12px" }}>{product.length} Payments</p>
        <hr />
      </div>
      <div
        className="profile-mitra text-center"
        style={{ width: "100%", marginLeft: "0px" }}
      >
        <div className="partner-profile-text-logo"> 
          {user.length !== 0 ? user.user_first_name.charAt(0) + user.user_last_name.charAt(0) : "TR" }
        </div>
        <br />
        <p className="mt-3 text-white weight-600" style={{ fontSize: "20px" }}>
          {user.length !== 0 ? user.user_first_name + " " + user.user_last_name : "Rental Owner" }
        </p>
        <p className="text-white" style={{ marginTop: "-10px" }}>
          There is no rating for this rental shop
        </p>
        {/* <table width="100%" className="profile-name-balance">
          <tr>
            <td className="text-left pl-4">Balance</td>
            <td className="text-right pr-4">Rp 1.000.000</td>
          </tr>
        </table> */}
      </div>
      <div className="main"></div>
      <div style={{
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        zIndex: '1'
      }}>
        <table width="100%">
            <tr>
              <td width="80%">
              <button onClick={() => router.push('/profile/product_new')} className="button-primary p-3 w-100 mt-3">
                Add New Product
              </button>
              </td>
              <td style={{paddingTop: '15px'}}>
                <a href="https://api.whatsapp.com/send?phone=6285708279238&text=Hi%20Admin%20Tabrent">
                  <center 
                    className="button-white" 
                    style={{
                      padding: '5px',
                      border: 'solid thin #2f2f8d',
                      borderRadius: '5px'
                    }}>
                    <img src="/icons/icon_wa.png" style={{ width: "35px" }} />
                  </center>
                </a>
              </td>
            </tr>
          </table>
      </div>
    </div>
  );
}
