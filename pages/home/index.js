import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images";
import Banner from "../../components/home/banner";
import ButtonIcon from "../../components/home/button_icon";
import Cards from "../../components/home/card";

import { Container, Typograph } from "@material-ui/core";
import { Text, Card, ButtonGroup, Button, Carousel } from "react-bootstrap";
import {
  MdDirectionsBike,
  MdMotorcycle,
  MdDirectionsBus,
  MdDirectionsCar,
} from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";

export default function Index() {
  return (
    <div>
      <TopNav back="true" text="Home" />
      <div className="main" style={{ height: "auto" }}>
        <Banner />
        <div className="mt-4" style={{ width: "330px", overflowX: "scroll" }}>
          <table>
            <tr>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_bicycle.svg" />
                      </td>
                      <td className="pl-2"> Bicycle</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img
                          src="/icons/icon_motorcyle.svg"
                          style={{ width: "25px" }}
                        />
                      </td>
                      <td className="pl-2"> Motorcycle</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_box.svg" />
                      </td>
                      <td className="pl-2"> Box</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_truck.svg" />
                      </td>
                      <td className="pl-2"> Pickup</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_bus.svg" />
                      </td>
                      <td className="pl-2"> Bus</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_car.svg" />
                      </td>
                      <td className="pl-2"> Car</td>
                    </tr>
                  </table>
                </button>
              </td>
            </tr>
          </table>
        </div>

        <div
          className="container mt-3"
          style={{ height: "auto", width: "auto" }}
        >
          <div className="row">
            <div className="col">
              <p
                style={{
                  width: "119px",
                  height: "24px",
                  left: "31px",
                  top: "409px",
                  size: "20px",

                  fontFamily: "Calibri",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "20px",
                  lineHeight: "24px",

                  color: "#000000",
                }}
              >
                Ready to rent!
              </p>
            </div>

            <div className="col text-right" style={{ align: "right" }}>
              <Button
                size="md"
                style={{
                  backgroundColor: "#2F2F8D",
                  borderColor: "#2F2F8D",
                  color: "#ffffff",
                  height: "auto",
                  left: "0px",
                  top: "-1px",
                  borderRadius: "15px",
                }}
              >
                <VscSettings style={{ weight: "bold" }} /> Filter
              </Button>
            </div>
          </div>
        </div>
        <Cards />
      </div>
    </div>
  );
}
