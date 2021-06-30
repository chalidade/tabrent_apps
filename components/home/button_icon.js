import { Container, Typography } from "@material-ui/core";
import { Card, ButtonGroup, Button, Carousel} from 'react-bootstrap';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus, MdDirectionsCar } from "react-icons/md";

const style = {
  btnItem: {
    backgroundColor: "#2F2F8D",
    color:"#ffffff",
    height:"60px",
    width:"auto",
    left:"0px",
    top:"-1px",
    borderRadius: "15px",
    marginRight: "auto",
  }
};


export default function ButtonIcon(){
  return(

        <Button variant="primary" style={style.btnItem}>
        <MdDirectionsBike /> Bycycle
        </Button>
  
    //
    // <Button variant="primary" style={{
    //   backgroundColor: "#2F2F8D",
    //   color:"#ffffff",
    //   height:"60px",
    //   width:"auto",
    //   left:"0px",
    //   top:"-1px",
    //   borderRadius: "15px",
    //   marginRight: "auto",
    //
    // }}>
    // <MdMotorcycle /> Motor Cycle</Button>
    //
    // <Button variant="primary" style={{
    // backgroundColor: "#2F2F8D",
    // color:"#ffffff",
    // height:"60px",
    // width:"auto",
    // left:"0px",
    // top:"-1px",
    // borderRadius: "15px",
    // marginRight: "auto",
    //
    // }}>
    // <MdDirectionsCar /> Car </Button>

  );
}
