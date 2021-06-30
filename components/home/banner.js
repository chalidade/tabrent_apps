import ImageBanner from "../../components/globals/images";
import { Container, Typography } from "@material-ui/core";
import { Card, ButtonGroup, Button, Carousel} from 'react-bootstrap';

export default function Banner(){
  return(
    <div className="container mt-3" style={{ height: "auto", shadow: "none" }}>
    <Carousel>
        <Carousel.Item interval={2000}>
          <ImageBanner image="/home/banner_1.jpg" width="auto"  height="156px" repeat="no-repeat"  radius="10px" />
            <Carousel.Caption>
            </Carousel.Caption>
            </Carousel.Item>

        <Carousel.Item interval={2000}>
            <ImageBanner image="/home/banner_2.jpg" width="auto"  height="156px" repeat="no-repeat" radius="10px" />
            <Carousel.Caption>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
            <ImageBanner image="/home/banner_3.jpg" width="auto" height="156px" repeat="no-repeat" radius="10px" />
            <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    </div>
  );
}
