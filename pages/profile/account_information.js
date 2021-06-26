import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button } from "@material-ui/core";
import { useState } from "react";

const style = {
  textField: { marginTop: "10px", marginBottom: "10px" },
  mt40: { marginTop: "40px" },
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
  const [gender, setGander] = useState();
  const changeGender = (event) => {
    setGander(event.target.value);
  };

  return (
    <div>
      <TopNav
        back="true"
        text="Account Information"
        arrow="true"
        page="Profile"
      />
      <div className="main mb-30">
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
          label="First Name"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          id="standard-basic"
          label="Last Name"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={gender}
          onChange={changeGender}
          SelectProps={{
            native: true,
          }}
          select
          id="standard-basic"
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
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
          label="Phone Number"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
          label="Current Address"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
          label="Email"
        />
        <div className="mt-15 mb-15">
          <font className="color-primary weight-600">Change</font>
        </div>
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
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
        <Grid container style={style.mt40}>
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
