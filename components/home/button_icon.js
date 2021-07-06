import { Container, Typography } from "@material-ui/core";
import { Card,Button, Carousel} from 'react-bootstrap';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus, MdDirectionsCar } from "react-icons/md";

const styles= {
  btnItem: {
    backgroundColor:"#2F2F8D",
    borderColor:"#2F2F8D",
    color:"#ffffff",
    width:"90px",
    height:"50px",
    left:"0px",
    top:"-1px",
    borderRadius: "15px",
    margin : "3px 0px 0px 0px",
    justifyContent : "center"
  }
};


export default function ButtonIcon(){
  return(
        <div className="row" style={{ height: "auto", align:"justify" }}>
          <div className="col">
          <Button size="sm" style={styles.btnItem}>
          <MdDirectionsBike/> Bycycle </Button>
          </div>
          <div className="col">
          <Button size="sm" style={styles.btnItem}>
          <MdMotorcycle/> Motor Cycle </Button>
          </div>
          <div className="col">
          <Button size="sm" style={styles.btnItem}>
          <MdDirectionsCar/> Car </Button>
          </div>
        </div>

  );
}
