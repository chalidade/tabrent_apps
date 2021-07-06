import TopNav from "../../components/globals/top_nav";

import { Container, Typography } from "@material-ui/core";

export default function detail(){
  
import { Container, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const handleRent = () => {
    router.push({
      pathname: "/home/order",
    });
  };
  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav back="true" text="Detail" arrow="true" search="true" />
      <Carousel slide={true} touch={true} indicators={false} controls={false}>
        <Carousel.Item>
          <div
            style={{
              background: "url(/home/product_2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              background: "url(/home/product_3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              background: "url(/home/product_4.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>
      </Carousel>
      <div className="bg-white mt-3 p-3 pl-4 pr-4" style={{ height: "145px" }}>
        <p className="m-0" style={{ fontSize: "14px" }}>
          <b>Daihatsu Agya Merah</b>
        </p>
        <p className="m-0">
          <font style={{ color: "#2F2F8D", fontSize: "22px" }}>
            <b>Rp. 280.000 </b>
          </font>
          <font style={{ color: "#2F2F8D", fontSize: "14px" }}> / Day </font>
        </p>
        <p className="m-0 mt-1">
          <button
            style={{
              background: "#FFA9A9",
              color: "#F82C2C",
              borderRadius: "5px",
              border: "none",
              fontSize: "12px",
              marginRight: "10px",
            }}
          >
            17%
          </button>
          <font
            style={{
              color: "#C8C8C8",
              fontSize: "12px",
              textDecoration: "line-through",
            }}
          >
            Rp. 300.000 / Day
          </font>
        </p>
        <table>
          <tr>
            <td>
              <Rating
                name="read-only"
                size="small"
                readOnly
                value={4}
                style={{ marginTop: "10px" }}
              />
            </td>
            <td>
              <font style={{ fontSize: "11px", marginLeft: "5px" }}>3.6</font>
            </td>
            <td>
              <span
                style={{
                  color: "#C8C8C8",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                |
              </span>
              <font style={{ fontSize: "11px", marginLeft: "5px" }}>
                Rented 27 Times
              </font>
            </td>
          </tr>
        </table>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "90px" }}>
        <table>
          <tr>
            <td>
              <img src="/icons/icon_profile.svg" />
            </td>
            <td className="pl-3">
              <p className="m-0">
                <b>Pak Bambang</b>
              </p>
              <p className="m-0" style={{ fontSize: "12px" }}>
                89% partner positive rating
              </p>
            </td>
          </tr>
        </table>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p className="m-0" style={{ color: "#2F2F8D" }}>
          <b>Rental Rules</b>
        </p>
        <p className="mt-2">
          <font style={{ fontSize: "14px", color: "#C8C8C8" }}>Overtime</font>
          <br />
          <font style={{ fontSize: "14px" }}>
            Biaya overtime adalah 10% dari harga yang tertera pada rental
            perjam.
          </font>
        </p>
        <p className="mt-3">
          <font style={{ fontSize: "14px", color: "#C8C8C8" }}>
            General Regulation
          </font>
          <br />
          <font style={{ fontSize: "14px" }}>
            Biaya overtime adalah 10% dari harga yang tertera pada rental
            perjam.
          </font>
        </p>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p className="m-0" style={{ color: "#2F2F8D" }}>
          <b>Pickup Rules</b>
        </p>
        <table className="mt-2" style={{ width: "100%" }}>
          <tr>
            <td width="70%">
              <font style={{ fontSize: "14px", color: "#C8C8C8" }}>
                Pickup time
              </font>
            </td>
            <td className="text-right" style={{ fontSize: "14px" }}>
              05:00 - 22:00
            </td>
          </tr>
          <tr>
            <td>
              <font style={{ fontSize: "14px", color: "#C8C8C8" }}>
                Time of return
              </font>
            </td>
            <td className="text-right" style={{ fontSize: "14px" }}>
              05:00 - 22:00
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p className="m-0" style={{ color: "#2F2F8D" }}>
          <b>Cancellation Policy</b>
        </p>
        <p className="mt-2">
          <font style={{ fontSize: "14px", color: "#C8C8C8" }}>No Refund.</font>
          <br />
        </p>
      </div>

      <div
        className="mt-3 p-2 text-center text-white"
        style={{
          height: "auto",
          background: "#2F2F8D",
          position: "sticky",
          bottom: "0px",
          fontSize: "14px",
        }}
        onClick={handleRent}
      >
        Rent Now
      </div>
    </div>
  );

}
