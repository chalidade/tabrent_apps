import ImageBanner from "../../components/globals/images";
import { Container, Typography } from "@material-ui/core";
import { Card, ButtonGroup, Button, Carousel} from 'react-bootstrap';
import { MAIN } from "../../config/api_url";

export default function Banner({data}){
  return(
    <div className="mt-3" style={{ height: "auto", shadow: "none" }}>
    <Carousel>
    {data ? data.map((value, index) => {
      let photo = MAIN + value;
      return (
        <Carousel.Item interval={2000}>
          <div
            style={{
              height:'156px',
              width : '100%',
              backgroundImage: `url('${photo}')`,
              backgroundSize:'cover',
              backgroundRepeat:'no-repeat',
              backgroundPosition:'center',
              borderRadius : '10px',
            }}
          >
          </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      );
    }) : ""}
    </Carousel>
    </div>
  );
}
