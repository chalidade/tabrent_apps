import TopNav from "../../components/globals/top_nav";
import { Container, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/router";
import ClassNames from "classnames";
import { fetch_data } from "../../components/globals/api";
import { MAIN, STORE, INDEX } from "../../config/api_url";
import { useState, useEffect } from "react";

export default function Detail() {
  const [order, setOrder] = useState([]);
  const [slider, setSlider] = useState([]);
  const router = useRouter();

  const handleRent = () => {
   
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let order_id = router.query.id;
      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_order",
        raw : {
          selected : "tx_order.*, tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
        },
        leftJoin: [
        {
            table: "tx_product",
            field1: "tx_product.product_id",
            field2: "tx_order.order_product_id"
        },
        {
          table : "tx_user",
          field1 : "tx_product.product_owner",
          field2 : "tx_user.user_id"
        }],
        where: [
            [
                "order_id",
                "=",
                order_id
            ]
        ]
    };
  
    fetch_data(INDEX, json).then(function (order) {
      if (order.success) {
        setOrder(order.result);
        setSlider(JSON.parse(order.result.product_image))
        console.log(order.result.product_image);
      }
      });
    }
  }, [])

  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav
        back="true"
        text="Detail Booking"
        arrow="true"
        search="true"
        page="Home"
      />
      <Carousel slide={true} touch={true} indicators={false} controls={false}>
      {slider ? slider.map((data, index) => {
        return <Carousel.Item>
          <div
            style={{
              background: `url(${data ? MAIN+data : "/home/product_2.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>;
      }) : (
        <div>
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
      </div>)}
      </Carousel>
      <div className="bg-white p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Transaction Number</td>
            <td className="text-right">{order.length !== 0 ? order.order_transaction_number : "14000214451"}</td>
          </tr>
        </table>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Total Payment</td>
            <td className="text-right">
              <font style={{ color: "#2F2F8D", fontWeight: "700" }}>
                Rp {order.length !== 0 ? order.order_payment_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "1.400.621"}
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
            <td width="45%">Product Name</td>
            <td width="3%">:</td>
            <td className="text-right">{order.length !== 0 ? order.product_name : "Daihatsu Agya Merah"}</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Brand</td>
            <td width="3%">:</td>
            <td className="text-right">{order.length !== 0 ? order.product_brand : "Daihatsu"}</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Number</td>
            <td width="3%">:</td>
            <td className="text-right">{order.length !== 0 ? order.product_vehicle_number : "-"}</td>
          </tr>
          <tr>
            <td width="45%">Rent Duration</td>
            <td width="3%">:</td>
            <td className="text-right">{order.length !== 0 ? order.order_duration : "4"} Days</td>
          </tr>
          <tr>
            <td width="45%">Pickup</td>
            <td width="3%">:</td>
            <td className="text-right">{order.length !== 0 ? order.order_start_date : "June 14, 2021"}</td>
          </tr>
          <tr>
            <td width="45%">Return</td>
            <td width="3%">:</td>
            <td className="text-right">{order.length !== 0 ? order.order_end_date : "June 18, 2021"}</td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="40%">Status</td>
            <td className="text-right">
            <font style={{color: order.order_status == 0 || order.order_status == 2 ? "rgb(255, 123, 0)" : order.order_status == 3 ? "rgb(0, 89, 255)" : order.order_status == 4 ? "rgb(0, 255, 21)" : "rgb(255, 30, 0)"}}>
              {order.order_status == 5
                ? "Complete Returned"
                : order.order_status == 3
                ? "Payment Success"
                : order.order_status == 4
                ? "Transaction Cancelled"
                : order.order_status == 2
                ? "Waiting Confirm Seller"
                : "Waiting Payment"}
            </font>
            </td>
          </tr>
        </table>
      </div>

      <div
        className="mt-3 text-center"
        style={{
          height: "auto",
          fontSize: "14px",
          height: "5px",
        }}
      >
        <table width="100%">
          <tr>
            <td width="50%"><button className="bg-danger button-primary w-100 p-2" style={{ borderRadius: '0px' }}>Cancel Booking</button></td>
            <td><button onClick={ () => router.push({ pathname: "/home/order_detail", query: {id: order.order_id} })} className="button-primary w-100 p-2" style={{ borderRadius: '0px' }}>Pay</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
