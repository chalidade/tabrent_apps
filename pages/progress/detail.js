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
      <TopNav back="true" text="Detail Booking" arrow="true" search="true" />
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

      <div className="bg-white p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Transaction Number</td>
            <td className="text-right">14000214451</td>
          </tr>
        </table>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Total Payment</td>
            <td className="text-right">
              <font style={{ color: "#2F2F8D", fontWeight: "700" }}>
                Rp 1.400.621
              </font>{" "}
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3 pl-3 pr-3" style={{ height: "210px" }}>
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
            <td width="40%">Status</td>
            <td className="text-right">
              <font style={{ color: "#ffe100", fontWeight: "600" }}>
                Waiting Confirmation
              </font>
            </td>
          </tr>
        </table>
      </div>

      <div
        className="mt-3 text-center"
        style={{
          height: "auto",
          background: "#e5e5e5",
          fontSize: "14px",
          height: "5px",
        }}
      ></div>
    </div>
  );
}
