import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images";
import Banner from "../../components/home/banner";
import ButtonIcon from "../../components/home/button_icon";
import Cards from "../../components/home/card";

import { Container, Typograph} from "@material-ui/core";
import { Text, Card, ButtonGroup, Button, Carousel} from 'react-bootstrap';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus, MdDirectionsCar } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";


export default function Index() {

  return (
    <div>
      <TopNav back="true" text="Home" />

      <div className="main">

        <Banner />

          <div className="container mt-3" style={{ height: "auto", width:"auto"}}>
              <ButtonIcon />
          </div>

          <div className="container mt-3" style={{ height: "auto", width:"auto"}}>
          <div className="row">
              <div className="col">
              <p style={{
              width: "119px",
              height: "24px",
              left: "31px",
              top: "409px",
              size:"20px",

              fontFamily: "Calibri",
              fontStyle: "normal",
              fontWeight:"bold",
              fontSize: "20px",
              lineHeight: "24px",

              color: "#000000",

            }}>
              Ready to rent!
              </p>
              </div>

              <div className="col text-right" style={{align:"right"}}>
                  <Button size="md" style={{
                    backgroundColor:"#2F2F8D",
                    borderColor:"#2F2F8D",
                    color:"#ffffff",
                    height:"auto",
                    left:"0px",
                    top:"-1px",
                    borderRadius: "15px",
                  }}><VscSettings style={{weight:"bold"}} /> Filter
                  </Button>
              </div>
          </div>
          </div>
          <Cards />
      </div>

    </div>
  );
}
