import TopNav from "../../components/globals/top_nav";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DateFnsUtils from "@date-io/date-fns";
import { useState, useEffect } from "react";

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function OrderDate() {
  const [value, setValue] = useState([null, null]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <TopNav back="true" text="Select Date" arrow="true" />
      <div className="main" style={{ height: "auto" }}>
        <p
          className="text-center mt-4"
          style={{ color: "#2F2F8D", fontWeight: 700, fontSize: "2.5vh" }}
        >
          Please select date and time
        </p>
        <center className="mt-5">
          <img src="/home/img_date_select.svg" />
        </center>
        <div className="mt-5">
          <p
            className="text-center text-secondary"
            style={{ fontWeight: "600" }}
          >
            Select the desired date and time so we can prepare what you need
          </p>
          <table width="100%" className="ml-1">
            <tr>
              <td>
                <label for="checkIn" className=" text-secondary">
                  Start Rent Date
                  <input
                    id="checkIn"
                    type="date"
                    className="pt-2 pb-2 mt-2"
                    style={{
                      border: "solid 2px #D2D2D2",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
              </td>
              <td>
                <label for="checkOut" className=" text-secondary">
                  End Rent Date
                  <input
                    id="checkOut"
                    type="date"
                    className="pt-2 pb-2 mt-2"
                    style={{
                      border: "solid 2px #D2D2D2",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
              </td>
            </tr>
          </table>
          <center>
            <button
              className="button-primary mt-4 p-2"
              style={{ width: "100%" }}
            >
              Confirm
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
