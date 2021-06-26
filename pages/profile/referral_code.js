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

export default function ReferralCode() {
  return (
    <div>
      <TopNav back="true" text="Referral Code" arrow="true" page="Profile" />
      <div className="main" style={{ height: "auto" }}>
        <center className="mt-5">
          <img src="/profile/img_referal.svg" />
        </center>
        <p className="mt-4">
          <b>Have a Referral Code?</b> <br />
          <font style={{ fontSize: "12px" }}>
            Enter your referral code below to redeem it.
          </font>
        </p>
        <TextField fullWidth={true} id="standard-basic" label="Referral Code" />
      </div>
      <Button fullWidth={true} style={style.btnFill}>
        Reedem Your Code
      </Button>
    </div>
  );
}
