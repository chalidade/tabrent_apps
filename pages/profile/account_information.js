import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX } from "../../config/api_url";

const style = {
  textField: { marginTop: "10px", marginBottom: "10px" },
  mt50: { marginTop: "50px" },
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
};

export default function AccountInformation() {
  // Store Data
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [gender, setGander] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [ktpNumber, setKtpNumber] = useState();
  const [address, setAddress] = useState();
  const [uploadIdCard, setUploadIdCard] = useState();
  const [uploadIdPhoto, setUploadIdPhoto] = useState();

  const handleFinish = async () => {
    let json = {
      action : "update",
      db : "tabrent",
      table : "tx_user",
      where : [["user_id", "=", userId]],
      value: {
              user_id: userId,
              user_first_name: firstName,
              user_last_name: lastName,
              user_phone_number: phoneNumber,
              user_email: email,
              user_birthdate: birthdate,
              user_username: username,
              user_password: password,
              user_personal_id_number: ktpNumber,
              user_address: address,
              user_type: 1,
              user_status: 0,
            },
    };

    fetch_data(STORE, json).then(function (result) {
      if (result.success) {
        alert("Update Success");
        let user = result.result[0];
          localStorage.setItem("user_data", JSON.stringify(user));
          setFirstName(user.user_first_name);
          setLastName(user.user_last_name);
          setBirthdate(user.user_birthdate);
          setPhoneNumber(user.user_phone_number);
          setUsername(user.user_username);
          setEmail(user.user_email);
          setKtpNumber(user.user_personal_id_number);
          setAddress(user.user_address);
          setUserId(user.user_id);
      } else {
        alert("Check Your Data");
      }
    });
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_user",
        "where": [
          [
              "user_id",
              "=",
              data.user_id
          ]
        ]
      };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          let user = data.result;
          localStorage.setItem("user_data", JSON.stringify(user));
          setFirstName(user.user_first_name);
          setLastName(user.user_last_name);
          setBirthdate(user.user_birthdate);
          setPhoneNumber(user.user_phone_number);
          setUsername(user.user_username);
          setEmail(user.user_email);
          setKtpNumber(user.user_personal_id_number);
          setAddress(user.user_address);
          setUserId(user.user_id);
        }
      });
    }
  }, [])

  return (
    <div className="mb-30">
      <TopNav
        back="true"
        text="Account Information"
        arrow="true"
        page="Profile"
      />
      <div className="main">
        <TextField
          active={true}
          style={style.textField}
          fullWidth={true}
          value={firstName}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setFirstName(e.target.value)}
          id="standard-basic"
          label="First Name"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Last Name"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={gender}
          onChange={e => setGander(e.target.value)}
          SelectProps={{
            native: true,
          }}
          select
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Gender"
        >
          {["Male", "Female"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          style={style.textField}
          id="date"
          label="Birthday"
          type="date"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Phone Number"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          value={address}
          onChange={e => setAddress(e.target.value)}
          label="Current Address"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Email"
        />
        <div className="mt-15 mb-15">
          <Link href="/profile/change_password">
            <font className="color-primary weight-600">Change Password</font>
          </Link>
        </div>
        <TextField
          style={style.textField}
          fullWidth={true}
          value={ktpNumber}
          onChange={e => setKtpNumber(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="ID Card Number"
        />
        <div className="mt-30 mb-30">
          <p className="weight-500">Photo ID Card</p>
        </div>
        <div className="mt-30 mb-30">
          <p className="weight-500">Photo With ID Card</p>
        </div>
        <div className="mt-30">
          <p className="weight-500">Driving Licence Card</p>
        </div>
        <Grid container style={style.mt50}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Button variant="outlined" onClick={() => router.push("/")} style={style.btnOutline}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleFinish} variant="outlined" style={style.btnFill}>
              Update
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
