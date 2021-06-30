import ImageBanner from "../../components/globals/images";
import { Card } from 'react-bootstrap';
import { Container, Typography } from "@material-ui/core";

export default function Cards(){
  return(
    <Card style={{ width: "105px", height:"141px", marginRight:"2px"}}>
    <center>
      <Card.Img variant="top" src="/home/image_1.jpg" style={{ width: "81px", height:"70px"}} />
    </center>
      <Card.Body>
        <Card.Title style={{size:"2px"}}></Card.Title>
        <Card.Text style={{size:"2px"}}></Card.Text>
        <Card.Title style={{size:"2px"}}></Card.Title>
      </Card.Body>
    </Card>

  );
}
