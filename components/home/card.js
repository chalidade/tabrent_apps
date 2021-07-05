import Images from "../../components/globals/images";

import { Container, Typography } from "@material-ui/core";
import { MdStar } from "react-icons/md";

const styles= {
  owner: {
    height:" 10px",
    width:" 40px",
    left:" 44px",

    fontFamily: "Calibri",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "8px",
    lineHeight: "0px",
    color: "#000000",
  },
  car_name: {
    marginBottom : "5px",

    fontFamily: "Calibri",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "6px",
    lineHeight: "0px",
    color: "#000000",
  },
  price: {
    marginTop: "10px",
    marginBottom: "0px",

    fontFamily: "Calibri",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "10px",
    color: "#000080",

  },
};

export default function Cards(){
  return(
    <div className="container mt-2 col" style={{ width : "auto", height:"auto", marginBottom:"0px" }}>

      <div className="row">

          <div className="container-standart col" style={{marginRight:"15px",width:"105px", height:"auto", marginBottom:"0px", align:"left", paddingBottom:"0px"}}>
            <Images image="/home/image_1.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" align="center" />
              <div className="row">
                  <div className="col">
                     <o style={styles.owner}> Pak Rahmat</o>
                     <p style={styles.car_name}> Daihatsu Ayla</p>
                     <p style={styles.price}> Rp 250.000 <small style={{fontWeight: "bold"}}>/Day</small></p>
                  </div>
              </div>
              <div className="row" style={{ height:"auto", marginBottom: "5px", marginTop:"0px" }}>
                  <div className="col">
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  </div>
              </div>
          </div>

          <div className="container-standart col" style={{marginRight:"15px",width:"105px", height:"auto", marginBottom:"0px", align:"left", paddingBottom:"0px"}}>
              <Images image="/home/image_2.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
              <div className="row">
                  <div className="col">
                     <o style={styles.owner}> Pak Budi</o>
                     <p style={styles.car_name}> Honda Verza</p>
                     <p style={styles.price}> Rp 60.000 <small style={{fontWeight: "bold"}}>/Day</small></p>
                  </div>
              </div>
              <div className="row" style={{ height:"auto", marginBottom: "0px", marginTop:"0px" }}>
                  <div className="col">
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#C8C8C8", margin:"0px"}} />
                  <MdStar style={{color : "#C8C8C8", margin:"0px"}} />
                  </div>
              </div>
          </div>

          <div className="container-standart col" style={{marginRight:"15px",width:"105px", height:"auto", marginBottom:"0px", align:"left", paddingBottom:"0px"}}>
            <Images image="/home/image_3.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
              <div className="row">
                  <div className="col">
                     <o style={styles.owner}> Harapan Jaya</o>
                     <p style={styles.car_name}> Exclusive Luxury Bus</p>
                     <p style={styles.price}> Rp 800.000 <small style={{fontWeight: "bold"}}>/Day</small></p>
                  </div>
              </div>
              <div className="row" style={{ height:"auto", marginBottom: "0px", marginTop:"0px" }}>
                  <div className="col">
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  </div>
              </div>
          </div>

          <div className="container-standart col" style={{marginRight:"15px",width:"105px", height:"auto", marginBottom:"0px", align:"left", paddingBottom:"0px"}}>
            <Images image="/home/image_4.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
              <div className="row">
                  <div className="col">
                     <o style={styles.owner}> Pak Handoko</o>
                     <p style={styles.car_name}> Honda Freed</p>
                     <p style={styles.price}> Rp 350.000 <small style={{fontWeight: "bold"}}>/Day</small></p>
                  </div>
              </div>
              <div className="row" style={{ height:"auto", marginBottom: "0px", marginTop:"0px" }}>
                  <div className="col">
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  </div>
              </div>
          </div>

          <div className="container-standart col" style={{marginRight:"15px",width:"105px", height:"auto", marginBottom:"0px", align:"left", paddingBottom:"0px"}}>
            <Images image="/home/image_5.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
              <div className="row">
                  <div className="col">
                     <o style={styles.owner}> Rahmat Rent Car</o>
                     <p style={styles.car_name}> Toyota Avanza</p>
                     <p style={styles.price}> Rp 280.000 <small style={{fontWeight: "bold"}}>/Day</small></p>
                  </div>
              </div>
              <div className="row" style={{ height:"auto", marginBottom: "0px", marginTop:"0px" }}>
                  <div className="col">
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  </div>
              </div>
          </div>

          <div className="container-standart col" style={{marginRight:"15px",width:"105px", height:"auto", marginBottom:"0px", align:"left", paddingBottom:"0px"}}>
            <Images image="/home/image_6.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
              <div className="row">
                  <div className="col">
                     <o style={styles.owner}> Carteran Jaya</o>
                     <p style={styles.car_name}> Suzuky Carry Pickup</p>
                     <p style={styles.price}> Rp 200.000 <small style={{fontWeight: "bold"}}>/Day</small></p>
                  </div>
              </div>
              <div className="row" style={{ height:"auto", marginBottom: "0px", marginTop:"0px" }}>
                  <div className="col">
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#F9EF00", margin:"0px"}} />
                  <MdStar style={{color : "#C8C8C8", margin:"0px"}} />
                  </div>
              </div>
          </div>

      </div>

    </div>


  );
}
