import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import { useRouter } from "next/router";

export default function OrderDate() {
  const router = useRouter();
  const [name, setName] = useState();
  const [accountName, setAccountName] = useState();
  const [accountNumber, setAccountNumber] = useState();

  const handleSave = () => {
    let json = {
    action: "save",
    db: "tabrent",
    table: "tx_payment_method",
    primaryKey: "payment_id",
    value: [{
          payment_name: name,
          payment_account_name: accountName,
          payment_number: accountNumber,
          payment_status: 1
          }]
    }

    fetch_data(STORE, json).then(function (data) {
      if (data.success) {
        alert("Rental Owner Register Successfully");
        router.push('/profile/list_payment_method');
      } else {
        alert("Rental Owner Register Failed");
        router.push('/profile/list_payment_method');
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
          top: "0vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div className="profile-main" style={{ overflow: "hidden", top: "20vh", minHeight: '90vh' }}>
        <center>
          <p className="weight-700 color-primary" style={{ fontSize: "20px" }}>
            New Payment Method
          </p>
        </center>
        <p className="mt-4 text-secondary weight-600">
          Payment Name <br />
          <input onChange={(e)=> setName(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Account Name <br />
          <input onChange={(e)=> setAccountName(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Account Number <br />
          <input onChange={(e)=> setAccountNumber(e.target.value)} className="form-control mt-2 p-4" />
        </p>
          <button onClick={() => handleSave()} className="button-primary p-3 w-100 mt-3">Save</button>
      </div>
      <div className="main"></div>
    </div>
  );
}
