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

export default function newpassword() {
  return (
    <div>
      <TopNav back="true" text="Contact Us" arrow="true" page="Profile" />
      <div className="main" style={{ height: "auto" }}>
        <center className="mt-5">
          <p
            className="color-primary weight-700 mb-3"
            style={{ fontSize: "20px" }}
          >
            Enter a new password
          </p>
          <img src="/profile/image_new_password.svg" />
          <p className="mb-3 mt-3 text-secondary" style={{ fontSize: "14px" }}>
            Please enter a new strong password <br />
            and make it sure it’s 6 characters or more
          </p>
          <div>
            <img
              src="/profile/icon_lock_form.svg"
              style={{
                position: "absolute",
                marginTop: "40px",
                marginLeft: "15px",
              }}
            />
            <input
              className="mt-4"
              type="password"
              placeholder="New Password"
              style={{
                width: "80%",
                border: "solid 2px #D2D2D2",
                padding: "10px",
                paddingLeft: "50px",
                borderRadius: "10px",
              }}
            />
          </div>
          <div>
            <img
              src="/profile/icon_lock_form.svg"
              style={{
                position: "absolute",
                marginTop: "40px",
                marginLeft: "15px",
              }}
            />
            <input
              className="mt-4"
              type="password"
              placeholder="Confirm Password"
              style={{
                width: "80%",
                border: "solid 2px #D2D2D2",
                padding: "10px",
                paddingLeft: "50px",
                borderRadius: "10px",
              }}
            />
          </div>
          <div>
            <button
              className="button-primary mt-4"
              style={{ width: "80%", padding: "12px" }}
            >
              Reset Password
            </button>
          </div>
        </center>
      </div>
    </div>
  );
}
