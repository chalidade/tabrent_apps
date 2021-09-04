import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import { useState, useEffect } from "react";

const style = {
  btnFill: {
    textTransform: "capitalize",
    background: "#2F2F8D",
    color: "#FFF",
    position: "absolute",
    bottom: "0px",
    borderRadius: "0px",
  },
};

export default function ContactUs() {
  const [contact_name, setContactName] = useState();
  const [contact_number, setContactNumber] = useState();

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      if (localStorage.getItem("is_login") !== null) {
        let data = JSON.parse(localStorage.getItem('user_data'));

        let json_contact = {
          action: "list",
          db: "tabrent",
          table: "tx_contact"
      };
    
        fetch_data(INDEX, json_contact).then(function (data) {
          if (data.success) {
            if (data.count == 1) {
              setContactName(data.result.contact_name);
              setContactNumber(data.result.contact_number);
            }
          }
        });
      }
    }
  }, []);


  return (
    <div>
      <TopNav back="true" text="Contact Us" arrow="true" page="Profile" />
      <div className="main" style={{ height: "auto" }}>
        <center className="mt-5">
          <img src="/profile/img_contact.svg" />
        </center>
        <Grid container style={{ marginTop: "20px" }}>
          <Grid item xs={2}>
            <img src="/profile/icon_phone.svg" />
          </Grid>
          <Grid item xs={8}>
            <p className="ml-2">
              <b>Phone</b> <br />
              <font style={{ fontSize: "12px" }}>+{contact_number ? contact_number : '6285708279238'}</font>
            </p>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <Grid item xs={2}>
            <img src="/profile/icon_email.svg" />
          </Grid>
          <Grid item xs={8}>
            <p className="ml-2">
              <b>Email</b> <br />
              <font style={{ fontSize: "12px" }}>tabrent.id@gmail.com</font>
            </p>
          </Grid>
        </Grid>
        <hr className="mt-4" />
        <p
          className="text-center"
          style={{ color: "#959595", fontSize: "11px" }}
        >
          24 hours customer service, Sunday - Monday, including national
          holidays
        </p>
      </div>
    </div>
  );
}
