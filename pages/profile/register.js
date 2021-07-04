import TopNav from "../../components/globals/top_nav";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function Register() {
  const [indexPage, setIndexpage] = useState(0);
  const [page, setPage] = useState([1, 0, 0]);
  const [gender, setGander] = useState();
  const changeGender = (event) => {
    setGander(event.target.value);
  };

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

  const handleNext = () => {
    let tmpPage = [...page];
    let index = indexPage + 1;
    if (index < 3 && index > -1) {
      setIndexpage(index);
      tmpPage[index] = 1;
      setPage(tmpPage);
    }
  };

  const handleBack = () => {
    let tmpPage = [...page];
    let index = indexPage - 1;
    if (index < 4 && index > -1) {
      setIndexpage(index);
      tmpPage[indexPage] = 0;
      setPage(tmpPage);
    }
  };

  return (
    <div>
      <TopNav
        back="true"
        text="Register"
        arrow="true"
        page="Profile"
        onClick={handleBack}
      />
      <div
        className="main ml-3 mr-3 p-3"
        style={{ height: "auto", overflow: "hidden" }}
      >
        <table width="200px">
          <tr>
            {page.map((page, index) => {
              return page == 1 ? (
                <td>
                  <img src="/profile/icon_progrees_active.svg" />
                </td>
              ) : (
                <td>
                  <img src="/profile/icon_progrees.svg" />
                </td>
              );
            })}
          </tr>
        </table>
        <p className="color-primary mt-1" style={{ fontSize: "14px" }}>
          {indexPage !== 2
            ? "Please complete following step below"
            : "Successful Register"}
        </p>
        {indexPage == 0 ? (
          <div>
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
              label="Last Name (Opsional)"
            />
            <TextField
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              label="Phone Number"
            />
            <TextField
              type="email"
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              label="Email"
            />
            <TextField
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              label="Username"
            />
            <TextField
              type="password"
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              label="Password"
            />
            <TextField
              type="password"
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              label="Confirm Password"
            />
            <button
              onClick={handleNext}
              className="button-primary mt-3"
              style={{ width: "100%", padding: "10px" }}
            >
              Next
            </button>
          </div>
        ) : indexPage == 1 ? (
          <div>
            <TextField
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              label="Personal ID Number (KTP)"
            />
            <TextField
              style={style.textField}
              className="mt-15 mb-15"
              fullWidth={true}
              id="standard-basic"
              label="Current Address"
            />
            <p className="mt-3 text-secondary weight-600">
              Upload Your ID Card Photo
            </p>
            <div
              style={{
                width: "100%",
                background: "#F7F7F7",
                height: "90px",
                borderRadius: "10px",
              }}
            ></div>
            <button
              className="button-primary mt-3 pl-5 pr-5"
              style={{ padding: "10px" }}
            >
              Upload
            </button>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>
              (max file size 2 Mb)
            </span>
            <p className="mt-4 text-secondary weight-600">
              Upload Selfie With ID Card Photo
            </p>
            <div
              style={{
                width: "100%",
                background: "#F7F7F7",
                height: "90px",
                borderRadius: "10px",
              }}
            >
              <center>
                <img
                  src="/profile/img_selfie_ktp.svg"
                  style={{ width: "15vh" }}
                />
              </center>
            </div>
            <button
              className="button-primary mt-3 pl-5 pr-5"
              style={{ padding: "10px" }}
            >
              Upload
            </button>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>
              (max file size 2 Mb)
            </span>
            <button
              onClick={handleNext}
              className="button-primary mt-4"
              style={{ width: "100%", padding: "10px" }}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <img
              src="/profile/img_register_success.svg"
              style={{ marginTop: "70px" }}
            />
            <button
              onClick={handleNext}
              className="button-primary"
              style={{ width: "100%", padding: "10px", marginTop: "70px" }}
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
