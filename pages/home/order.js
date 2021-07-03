import TopNav from "../../components/globals/top_nav";
import { Container, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const handleRent = () => {
    router.push({
      pathname: "/home/order_detail",
    });
  };

  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav back="true" text="Confirm Order" arrow="true" search="true" />
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
      <div className="bg-white p-3 pl-3 pr-3" style={{ height: "210px" }}>
        <table
          cellpadding="4"
          style={{ fontSize: "14px", width: "100%", fontWeight: "600" }}
        >
          <tr>
            <td width="45%">Vehicle Name</td>
            <td width="3%">:</td>
            <td className="text-right">Daihatsu Agya Merah</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Brand</td>
            <td width="3%">:</td>
            <td className="text-right">Daihatsu</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Number</td>
            <td width="3%">:</td>
            <td className="text-right">A 1234 BA</td>
          </tr>
          <tr>
            <td width="45%">Rent Duration</td>
            <td width="3%">:</td>
            <td className="text-right">4 Days</td>
          </tr>
          <tr>
            <td width="45%">Pickup</td>
            <td width="3%">:</td>
            <td className="text-right">June 14, 2021</td>
          </tr>
          <tr>
            <td width="45%">Return</td>
            <td width="3%">:</td>
            <td className="text-right">June 18, 2021</td>
          </tr>
        </table>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Message</td>
            <td>
              <input
                type="text"
                placeholder="Drop Message Here"
                style={{
                  border: "none",
                  width: "100%",
                  fontSize: "12px",
                  textAlign: "right",
                }}
              />
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Payment Method</td>
            <td className="text-right">Transfer Bank </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <center>
          <button
            style={{
              background: "#2F2F8D",
              width: "90%",
              border: "none",
              color: "#fff",
              padding: "10px",
              fontSize: "12px",
              borderRadius: "5px",
            }}
          >
            Term and Conditions
          </button>
          <p
            className="mt-2 mb-0 text-left"
            style={{ color: "red", fontSize: "14px", width: "90%" }}
          >
            * The vehicle is taken at the address listed and shows proof of
            payment
          </p>
        </center>
      </div>

      <div
        className="mt-3 text-center"
        style={{
          height: "auto",
          background: "#FFF",
          position: "sticky",
          bottom: "0px",
          fontSize: "14px",
        }}
      >
        <table width="100%">
          <tr>
            <td width="60%" className="text-right p-2">
              <p className="mb-0">
                <font style={{ fontSize: "10px" }}>Total Price</font>
                <br />
                <font style={{ fontWeight: "700", color: "#2F2F8D" }}>
                  Rp 1.200.000
                </font>
              </p>
            </td>
            <td style={{ background: "#2F2F8D" }} className="text-center">
              <button
                style={{
                  border: "none",
                  background: "none",
                  width: "100%",
                  color: "#fff",
                }}
                onClick={handleRent}
              >
                Confirm
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
