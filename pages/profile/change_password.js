import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import { useState } from "react";

const style = {
  textField: { marginTop: "10px", marginBottom: "10px" },
  btnOutline: {
    width: "120px",
    textTransform: "capitalize",
    borderColor: "#2F2F8D",
    color: "#2F2F8D",
  },
  btnFill: {
    width: "120px",
    textTransform: "capitalize",
    background: "#2F2F8D",
    color: "#FFF",
  },
  containerButton: {
    position: "absolute",
    bottom: "20px",
    left: "0px",
    paddingRight: "20px",
  },
};

export default function ChangePassword() {
  return (
    <div>
      <TopNav back="true" text="Change Password" arrow="true" />
      <div className="main" style={{ height: "auto" }}>
        <p>
          Create a new strong password and make it sure it’s 6 character or
          more.
        </p>
        <TextField
          style={style.textField}
          fullWidth={true}
          type="password"
          id="standard-basic"
          label="Old Password"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          type="password"
          id="standard-basic"
          label="New Password"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          type="password"
          id="standard-basic"
          label="Confirm New Password"
        />
        <Grid container style={style.containerButton}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Button variant="outlined" style={style.btnOutline}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" style={style.btnFill}>
              Update
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
