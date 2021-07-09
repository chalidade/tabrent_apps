import {
  Container,
  Typography
} from "@material-ui/core";
import {
  Card,
  Button,
  Carousel
} from 'react-bootstrap';
import {
  MdDirectionsBike,
  MdMotorcycle,
  MdDirectionsBus,
  MdDirectionsCar
} from "react-icons/md";

const styles = {
  btnItem: {
    backgroundColor: "#2F2F8D",
    borderColor: "#2F2F8D",
    color: "#ffffff",
    width: "90px",
    height: "50px",
    left: "0px",
    top: "-1px",
    borderRadius: "15px",
    marginRight: "5px",
    justifyContent: "center"
  }
};


export default function ButtonIcon({
  type,
  value
}) {
  return (
    <
    td
       > {
        type == 'Bycycle' ? ( < Button size = "sm"
          style = {
            styles.btnItem
          } >
          <
          MdDirectionsBike / > Bycycle < /Button>): type == 'MotorCycle' ? (<Button size="sm" style={styles.btnItem}> <
          MdMotorcycle / > Motor Cycle < /Button>): ''} <
          /td>
        );
      }
