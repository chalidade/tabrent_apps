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
          <p
            className="color-primary weight-700 mb-1"
            style={{ fontSize: "20px" }}
          >
            Forgot your password
          </p>
          <p className="mb-5 mt-3 text-secondary" style={{ fontSize: "14px" }}>
            Don’t worry, enter you registerd <br />
            email id to recieve password reset link
          </p>
          <img src="/profile/img_forget_password.svg" />
          <div>
            <img
              src="/profile/icon_email_form.svg"
              style={{
                position: "absolute",
                marginTop: "40px",
                marginLeft: "15px",
              }}
            />
            <input
              className="mt-4"
              type="text"
              placeholder="Email"
              style={{
                paddingLeft: "50px",
                width: "80%",
                border: "solid 2px #D2D2D2",
                padding: "10px",
                borderRadius: "10px",
              }}
            />
            <p className="mt-3" style={{ fontSize: "14px" }}>
              Remember password ?{" "}
              <font className="color-primary weight-700">Log In</font>
            </p>
            <button
              className="button-primary mt-3"
              style={{ width: "80%", padding: "12px" }}
            >
              Send
            </button>
          </div>
        </center>
      </div>
    </div>
  );
}
