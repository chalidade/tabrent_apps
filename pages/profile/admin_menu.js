import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExitToApp } from '@material-ui/icons';
import { Link } from "@material-ui/core";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function AdminMenu() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [countPayment, setCountPayment] = useState(0);

  const handleLogout = () => {
    router.push('/');
    localStorage.removeItem("is_login");
  };


  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      if (localStorage.getItem("is_login") !== null) {
        let data = JSON.parse(localStorage.getItem('user_data'));
        setUser(data);

        let json_user = {
          action: "list",
          db: "tabrent",
          table: "tx_user",
          where: [['user_type', '!=', '3'], ['user_status', '=', '0']]
        };
    
        fetch_data(INDEX, json_user).then(function (data) {
          if (data.success) {
            setCountUser(data.count);
          }
        });

        let json_product = {
          action: "list",
          db: "tabrent",
          table: "tx_product",
          where: [['product_status', '=', '0']]
        };
    
        fetch_data(INDEX, json_product).then(function (data) {
          if (data.success) {
            setCountProduct(data.count);
          }
        });

        let json_payment = {
          action: "list",
          db: "tabrent",
          table: "tx_transfer",
          where: [['transfer_status', '=', '0']]
        };
    
        fetch_data(INDEX, json_payment).then(function (data) {
          if (data.success) {
            setCountPayment(data.count);
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
        <p><b>Admin Menu</b></p>
        <hr />
        <p onClick={() => router.push('/profile/register_shop')} className="mb-1 weight-600" style={{ fontSize: "12px" }}>
            REGISTER RENTAL OWNER
        </p>
        <hr />
        <p onClick={() => router.push('/profile/list_user')} className="mb-1 weight-600" style={{ fontSize: "12px" }}>
            USER LIST 
            {countUser !== 0 ? (
              <div style={{
              background: 'red',
              width: '17px',
              height: '17px',
              position: 'absolute',
              marginTop: '-23px',
              marginLeft: '65px',
              borderRadius: '20px',
              paddingTop: '2px',
              textAlign: 'center',
              fontSize: '9px',
              color: '#fff'
            }}>{countUser}</div>
            ) : ""}
        </p>
        <hr />
        <p onClick={() => router.push('/profile/list_product')} className="mb-1 weight-600" style={{ fontSize: "12px" }}>
            PRODUCT LIST
            {countProduct !== 0 ? (
              <div style={{
                background: 'red',
                width: '17px',
                height: '17px',
                position: 'absolute',
                marginTop: '-23px',
                marginLeft: '90px',
                borderRadius: '20px',
                paddingTop: '2px',
                textAlign: 'center',
                fontSize: '9px',
                color: '#fff'
              }}>{countProduct}</div>
            ) : "" }
        </p>
        <hr />
        <p onClick={() => router.push('/profile/list_payment')} className="mb-1 weight-600" style={{ fontSize: "12px" }}>
            PAYMENT LIST
            {countPayment !== 0 ? (
              <div style={{
                background: 'red',
                width: '17px',
                height: '17px',
                position: 'absolute',
                marginTop: '-23px',
                marginLeft: '90px',
                borderRadius: '20px',
                paddingTop: '2px',
                textAlign: 'center',
                fontSize: '9px',
                color: '#fff'
              }}>{countPayment}</div>
            ) : "" }
        </p>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
            UPDATE HELP 
        </p>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
            NEW NOTIFICATION 
        </p>
      </div>
      <div
        className="profile-mitra text-center"
        style={{ width: "100%", marginLeft: "0px" }}
      >
        <div className="partner-profile-text-logo" style={{fontSize: '40px', paddingTop: '14px'}}> 
        AM
        </div>
        <br />
        <p className="mt-3 text-white weight-600" style={{ fontSize: "20px" }}>
          {user.length !== 0 ? user.user_first_name  : "Administrator" }
        </p>
        <p className="text-white" style={{ marginTop: "-10px" }}>
          Manage system and validation
        </p>
      </div>
      <div className="main"></div>
    </div>
  );
}
