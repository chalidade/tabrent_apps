import { Container, Typography } from "@material-ui/core";
import { Card,Button, Carousel} from 'react-bootstrap';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus, MdDirectionsCar } from "react-icons/md";

const styles= {
  btnItem: {
    backgroundColor:"#2F2F8D",
    borderColor:"#2F2F8D",
    color:"#ffffff",
    width:"auto",
    height:"50px",
    left:"0px",
    top:"-1px",
    borderRadius: "15px",
    marginRight: "3px",
    marginTop : "3px"
  }
};


export default function ButtonIcon(){
  return(
      <div className="container" style={{ height: "auto", align:"justify" }}>

        <Button size="md" style={styles.btnItem}>
        <MdDirectionsBike/> Bycycle </Button>

        <Button size="md" style={styles.btnItem}>
        <MdMotorcycle/> Motor Cycle </Button>

        <Button size="md" style={styles.btnItem}>
        <MdDirectionsCar/> Car </Button>

      </div>
  );
}
