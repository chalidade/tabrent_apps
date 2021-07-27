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

  const handleLogout = () => {
    router.push('/');
    localStorage.removeItem("is_login");
  };


  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem("is_login") !== null) {
        let data = JSON.parse(localStorage.getItem('user_data'));
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
        style={{ overflow: "hidden", height: "60vh", top: "50vh" }}
      >
        <p className="weight-600" style={{ fontSize: "12px" }}>
          ORDERS
        </p>
        <table width="100%">
          <tr>
            <td className="text-left">
              <Link href="/profile/list_rent">
                <img src="/icons/icon_new_order.svg" />
              </Link>
            </td>
            <td className="text-center">
              <Link href="/profile/list_rent">
                <img src="/icons/icon_rented.svg" />
              </Link>
            </td>
            <td className="text-right">
              <Link href="/profile/list_rent">
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
        <button onClick={() => router.push('/profile/product_new')} className="button-primary p-3 w-100 mt-3">
          Add New Product
        </button>
      </div>
      <div
        className="profile-mitra text-center"
        style={{ width: "100%", marginLeft: "0px" }}
      >
        <img src="/profile/icon_logo_mitra.svg" style={{ width: "120px" }} />
        <br />
        <p className="mt-3 text-white weight-600" style={{ fontSize: "20px" }}>
          Tabrent rental
        </p>
        <p className="text-white" style={{ marginTop: "-10px" }}>
          There is no rating for this rental shop
        </p>
        <table width="100%" className="profile-name-balance">
          <tr>
            <td className="text-left pl-4">Balance</td>
            <td className="text-right pr-4">Rp 1.000.000</td>
          </tr>
        </table>
      </div>
      <div className="main"></div>
    </div>
  );
}
