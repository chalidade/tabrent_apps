import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images_banner";

import { Container, Typography } from "@material-ui/core";
import { Card, ButtonGroup, Button, Carousel} from 'react-bootstrap';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus, MdDirectionsCar } from "react-icons/md";


export default function Index() {
  return (
    <div>
      <TopNav back="true" text="Home"/>

      <div className="main">

          <div class="row col mt-3" radius="10px">
          <Carousel>
            <Carousel.Item interval={2000}>
              <ImageBanner image="/home/banner_1.jpg" width="350px"  height="150px" repeat="no-repeat"  radius="10px" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <ImageBanner image="/home/banner_2.jpg" width="350px"  height="150px" repeat="no-repeat" radius="10px" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
            <ImageBanner image="/home/banner_3.jpg" width="350px" height="150px" repeat="no-repeat" radius="10px" />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </div>

          <div class="row col mt-3 text-right">
          <center>
                      <Button variant="primary" style={{
                        backgroundColor: "#2F2F8D",
                        color:"#ffffff",
                        height:"60px",
                        width:"115px",
                        left:"0px",
                        top:"-1px",
                        borderRadius: "15px",
                        marginRight: "10px",
                        position: "sticky"
                      }}>
                      <MdDirectionsBike /> Bycycle </Button>

                      <Button variant="primary" style={{
                        backgroundColor: "#2F2F8D",
                        color:"#ffffff",
                        height:"60px",
                        width:"120px",
                        left:"0px",
                        top:"-1px",
                        borderRadius: "15px",
                        marginRight: "10px",
                        position: "sticky"
                      }}>
                    <MdMotorcycle /> Motor Cycle</Button>

                  <Button variant="primary" style={{
                    backgroundColor: "#2F2F8D",
                    color:"#ffffff",
                    height:"60px",
                    width:"100px",
                    left:"0px",
                    top:"-1px",
                    borderRadius: "15px",
                    marginRight: "10px",
                    position: "sticky"
                  }}>
                  <MdDirectionsCar /> Car </Button>

            </center>
          </div>

          <div class="row col mt-3 text-left">
              <div class="col mt-3 text-left">
              <Card style={{ width: "105px", height:"141px"}}>
                <Card.Img variant="top" src="/home/banner_1.jpg" />
                <Card.Body>
                  <Card.Title style={{size:"8px"}} ></Card.Title>
                  <Card.Text style={{size:"6px"}}></Card.Text>
                  <Button variant="primary" size="sm">Ok</Button>
                </Card.Body>
              </Card>

              <Card style={{ width: "105px", height:"141px"}}>
                <Card.Img variant="top" src="/home/banner_1.jpg" />
                <Card.Body>
                  <Card.Title style={{size:"8px"}} ></Card.Title>
                  <Card.Text style={{size:"6px"}}></Card.Text>
                  <Button variant="primary" size="sm">Ok</Button>
                </Card.Body>
              </Card>

              <Card style={{ width: "105px", height:"141px"}}>
                <Card.Img variant="top" src="/home/banner_1.jpg" />
                <Card.Body>
                  <Card.Title style={{size:"8px"}} ></Card.Title>
                  <Card.Text style={{size:"6px"}}></Card.Text>
                  <Button variant="primary" size="sm">Ok</Button>
                </Card.Body>
              </Card>
              </div>
          </div>

      </div>
    </div>
  );
}
