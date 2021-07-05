import Images from "../../components/globals/images";


import { Card } from 'react-bootstrap';
import { Container, Typography } from "@material-ui/core";

const styles= {
  owner: {
    position:"absolute",
    width: "40px",
    height: "10px",
    left: "44px",
    top: "576px",

    fontFamily: "Calibri",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "8px",
    lineHeight: "10px",
    color: "#000000",
  },
  car_name: {
        position: "absolute",
        width: "37px",
        height: "7px",
        left: "44px",
        top: "586px",
        fontFamily: "Calibri",
        fontStyle: "normal",
        fontHeight: "normal",
        fontSize: "6px",
        lineHeight: "7px",
        color: "#000000",
  },
  price: {
    position: "absolute",
    width: "66px",
    height: "15px",
    left: "44px",
    top: "596px",

    fontFamily: "Calibri",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "10px",
    lineFeight: "12px",
    color: "#000080",

  },
};

export default function Cards(){
  return(
    <div className="container mt-2 col" style={{ width : "auto", height:"auto" }}>

      <div className="row">
          <div className="container-standart col" style={{marginRight:"5px",height:"auto"}}>
            <Images image="/home/image_1.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
              <div className="row">
                  <div className="col">
                     <p style={styles.owner}> Pak Rahmat</p>
                  </div>
              </div>
              <div className="row">
                  <div className="col">
                     <p style={styles.car_name}> Daihatsu Ayla</p>
                  </div>
              </div>
              <div className="row">
                  <div className="col">
                     <p style={styles.price}> Rp 250.000 /Day</p>
                  </div>
              </div>
          </div>

          <div className="container-standart col" style={{marginRight:"5px"}}>
          <Images image="/home/image_2.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
          </div>

          <div className="container-standart col" style={{marginRight:"5px"}}>
          <Images image="/home/image_3.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
          </div>

      </div>

    </div>


  );
}
