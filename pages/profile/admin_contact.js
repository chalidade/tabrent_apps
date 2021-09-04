import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import { useRouter } from "next/router";

export default function OrderDate() {
  const router = useRouter();
  const [contact_name, setContactName] = useState();
  const [contact_number, setContactNumber] = useState();

  const handleSave = () => {
    let json = {
    action: "update",
    db: "tabrent",
    table: "tx_contact",
    where: [
        [
            "contact_id",
            "=",
            1
        ]
      ],
    value: {
        "contact_number": contact_number,
        "contact_name" : contact_name
      }
    }

    fetch_data(STORE, json).then(function (data) {
      if (data.success) {
        alert("Update Contact Successfully");
      } else {
        alert("Update Contact Failed");
      }
    });
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_contact"
     };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setContactName(data.result.contact_name);
            setContactNumber(data.result.contact_number);
          }
        }
      });
    }
  }, [])

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
      <div className="profile-main" style={{ overflow: "hidden", top: "20vh", minHeight: '50vh' }}>
        <center>
          <p className="weight-700 color-primary" style={{ fontSize: "20px" }}>
            Update Contact
          </p>
        </center>
        <p className="mt-4 text-secondary weight-600">
          Name <br />
          <input onChange={(e)=> setContactName(e.target.value)} value={contact_name} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Number <br />
          <input onChange={(e)=> setContactNumber(e.target.value)} value={contact_number} className="form-control mt-2 p-4" />
        </p>
          <button onClick={() => handleSave()} className="button-primary p-3 w-100 mt-3">Save</button>
      </div>
      <div className="main"></div>
    </div>
  );
}
