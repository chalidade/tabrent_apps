import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";

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
              <font style={{ fontSize: "12px" }}>+62 857 855 658</font>
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
              <font style={{ fontSize: "12px" }}>tabrent01@gmail.com</font>
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
