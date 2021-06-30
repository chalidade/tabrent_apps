import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images";
import Banner from "../../components/home/banner";
import ButtonIcon from "../../components/home/button_icon";
import Cards from "../../components/home/card";

import { Container, Typography } from "@material-ui/core";
import { Card, ButtonGroup, Button, Carousel} from 'react-bootstrap';
import { MdDirectionsBike, MdMotorcycle, MdDirectionsBus, MdDirectionsCar } from "react-icons/md";


export default function Index() {
  // const [search, setSearch] = useState();

  return (
    <div>
      <TopNav back="true" text="Home"/>

      <div className="main">
        <Banner />
        <div className="container mt-3" style={{ height: "auto", width:"auto"}}>
            <ButtonIcon />
            <ButtonIcon />
            <ButtonIcon />
        </div>
        <div className="container mt-3" style={{ width : "auto", height:"auto" }}>
            <Cards />
            <Cards />
        </div>

      </div>
    </div>
  );
}
