import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX } from "../../config/api_url";

const style = {
  textField: { marginTop: "10px", marginBottom: "10px" },
  textFieldAlert: { marginTop: "10px", marginBottom: "10px", borderBottom: "solid thin red" },
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
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [currentPassword, setCurrentPassword] = useState(0);
  const [password, setPassword] = useState(0);
  const [newPassword, setNewPassword] = useState(0);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(0);

  const handleUpdate = () => {
    let json = {
      action : "update",
      db : "tabrent",
      table : "tx_user",
      where : [["user_id", "=", userId]],
      value: {
              user_password: newPassword
            },
    };

    fetch_data(STORE, json).then(function (result) {
      if (result.success) {
        alert("Update Success");
        router.push('/account_information');
      } else {
        alert("Check Your Data");
      }
    });
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      setCurrentPassword(data.user_password);
      setUserId(data.user_id);
      console.log(data);
    }
  }, []);

  return (
    <div>
      <TopNav back="true" text="Change Password" arrow="true" />
      <div className="main" style={{ height: "auto" }}>
        <p>
          Create a new strong password and make it sure it’s 6 character or
          more.
        </p>
        <TextField
          style={password !== 0 && currentPassword !== password ? style.textFieldAlert : style.textField}
          fullWidth={true}
          onChange={e => setPassword(e.target.value)}
          type="password"
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Old Password"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          type="password"
          id="standard-basic"
          onChange={e => setNewPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          label="New Password"
        />
        <TextField
          style={newPasswordConfirm !== 0 && newPasswordConfirm !== newPassword ? style.textFieldAlert : style.textField}
          fullWidth={true}
          type="password"
          id="standard-basic"
          onChange={e => setNewPasswordConfirm(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          label="Confirm New Password"
        />
        <Grid container style={style.containerButton}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Button variant="outlined" onClick={() => router.back()} style={style.btnOutline}>
              Back
            </Button>
          </Grid>
          <Grid item xs={4}>
          {newPassword !== 0 && newPassword == newPasswordConfirm ? (
            <Button variant="outlined" onClick={handleUpdate} style={style.btnFill}>
              Update
            </Button>
          ) : "" }
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
