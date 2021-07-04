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

export default function emailsent() {
  return (
    <div>
      <TopNav back="true" text="Contact Us" arrow="true" page="Profile" />
      <div className="main" style={{ height: "auto" }}>
        <center className="mt-5">
          <p
            className="color-primary weight-700 mb-1"
            style={{ fontSize: "20px" }}
          >
            Email has been sent!
          </p>
          <p className="mb-5 mt-3 text-secondary" style={{ fontSize: "14px" }}>
            Please check you inbox and click <br />
            in the recieved link to reset you password
          </p>
          <img src="/profile/img_email.svg" />
          <div>
            <button
              className="button-primary mt-5"
              style={{ width: "80%", padding: "12px" }}
            >
              Login
            </button>
          </div>
          <p className="mt-3 text-secondary" style={{ fontSize: "14px" }}>
            Don’t recieve the link?{" "}
            <font className="color-primary weight-700">Resend</font>
          </p>
        </center>
      </div>
    </div>
  );
}
