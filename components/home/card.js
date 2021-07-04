import Images from "../../components/globals/images";


import { Card } from 'react-bootstrap';
import { Container, Typography } from "@material-ui/core";

const styles= {
  owner: {

  },
  car_name: {

  },
  price: {

  },
};

export default function Cards(){
  return(
    <div className="container mt-3" style={{ width : "auto", height:"auto" }}>

      <div className="row">

          <div className="container-standart col" style={{marginRight:"5px"}}>
          <Images image="/home/image_1.jpg" width="81.85px"  height="70px" repeat="no-repeat" radius="10px" />
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
