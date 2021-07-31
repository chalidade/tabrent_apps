import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import { useRouter } from "next/router";

export default function OrderDate() {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [lastName, setLastName] = useState();

  const handleSave = () => {
    let json = {
    action: "save",
    db: "tabrent",
    table: "tx_user",
    primaryKey: "user_id",
    value: [{
          user_id: null,
          user_first_name: name,
          user_last_name: lastName,
          user_phone_number: phone,
          user_email: email,
          user_username: email,
          user_address: address,
          user_password: "tabrent",
          user_type: 2,
          user_status: 0
          }]
    }

    fetch_data(STORE, json).then(function (data) {
      if (data.success) {
        alert("Rental Owner Register Successfully");
        router.push('/profile/admin_menu');
      } else {
        alert("Rental Owner Register Failed");
        router.push('/profile/admin_menu');
      }
    });
  }

  return (
    <div style={{ background: "#2F2F8D", overflow: "hidden" }}>
      <TopNav back="true" text="Back" arrow="true" background={false} />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "7vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div className="profile-main" style={{ overflow: "hidden" }}>
        <center>
          <p className="weight-700 color-primary" style={{ fontSize: "20px" }}>
            Register Shop
          </p>
        </center>
        <p className="mt-4 text-secondary weight-600">
          First Name <br />
          <input onChange={(e)=> setName(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Last Name <br />
          <input onChange={(e)=> setLastName(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Email <br />
          <input onChange={(e)=> setEmail(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-5 text-secondary weight-600">
          Phone Number <br />
          <input onChange={(e)=> setPhone(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Address <br />
          <input onChange={(e)=> setAddress(e.target.value)} className="form-control mt-2 p-4" />
        </p>
          <button onClick={() => handleSave()} className="button-primary p-3 w-100 mt-3">Save</button>
      </div>
      <div className="main"></div>
    </div>
  );
}
