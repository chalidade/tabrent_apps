import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images_banner";
import { Container, Typography } from "@material-ui/core";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { DirectionsBike, Motorcycle, DirectionsBus } from '@material-ui/icons';
import { FaMotorcycle, FaBus, FaBicycle } from 'react-icons/fa';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus } from "react-icons/md";


export default function Index() {
  return (
    <div>
      <TopNav back="true" text="Home"/>
      <div className="main">
          <div class="row col-md-12 mt-3" radius="10px">
          <Carousel>
            <Carousel.Item interval={2000}>
              <ImageBanner image="/home/banner_1.jpg"  width="306px" height="150px" repeat="no-repeat"  radius="10px" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <ImageBanner image="/home/banner_2.jpg"  width="306px" height="150px" repeat="no-repeat" radius="10px" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
            <ImageBanner image="/home/banner_3.jpg"  width="306px" height="150px" repeat="no-repeat" radius="10px" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>

          <div class="row col-md-12 mt-3">
          <center>
                <Button variant="primary" style={{
                  backgroundColor: "#2F2F8D",
                  color:"#ffffff",
                  height:"49px",
                  width:"109px",
                  left:"0px",
                  top:"-1px",
                  borderRadius: "15px"
                }}>
                <MdDirectionsBike /> Bycycle </Button>

                <Button variant="primary" style={{
                  backgroundColor: "#2F2F8D",
                  color:"#ffffff",
                  height:"49px",
                  width:"109px",
                  left:"0px",
                  top:"-1px",
                  borderRadius: "15px"
                }}>
              <MdMotorcycle /> Motor Cycle </Button>

                <Button variant="primary" style={{
                  backgroundColor: "#2F2F8D",
                  color:"#ffffff",
                  height:"49px",
                  width:"109px",
                  left:"0px",
                  top:"-1px",
                  borderRadius: "15px"
                }}>
                <MdDirectionsBus /> Bus </Button>
            </center>
          </div>

      </div>
    </div>
  );
}
