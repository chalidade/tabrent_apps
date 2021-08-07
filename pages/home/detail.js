import TopNav from "../../components/globals/top_nav";
import { Container, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel, Tab, Tabs } from "react-bootstrap";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { useState, useEffect } from "react";
import { INDEX, MAIN } from "../../config/api_url";

export default function Detail() {
  const router = useRouter();
  const [key, setKey] = useState('home');
  const [product, setProduct] = useState([]);
  const [percent, setPercent] = useState();
  const [percentDriver, setPercentDriver] = useState();
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      let product_id = router.query.id;
      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_product",
        raw : {
          selected : "ROUND((SUM(`rating_number`) / COUNT(`rating_number`)), 0) as `rating`, tx_product.*, tx_user.user_first_name,  tx_user.user_last_name, tx_user.user_profile"
        },
        leftJoin : [{
          table : "tx_user",
          field1 : "tx_user.user_id",
          field2 : "tx_product.product_owner"
        },
        {
          table: "tx_rating",
          field1: "tx_rating.rating_product_id",
          field2: "tx_product.product_id"
        }],
        "where": [
          [
              "product_id",
              "=",
              product_id
          ]
        ]
      };

      
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) { 
          let product = data.result;

          // Percent no Driver
          let price = parseInt(product.product_price);
          let discount = parseInt(product.product_discount);
          let percent = (((price - discount) / (price)) * 100).toFixed();

           // Percent With Driver
           let price_driver = parseInt(product.product_price_with_driver);
           let discount_driver = parseInt(product.product_price_with_driver_discount);
           let percent_driver = (((price_driver - discount_driver) / (price_driver)) * 100).toFixed();

          setPercent(percent);
          setPercentDriver(percent_driver);
          setProduct(product);
          setSlider(JSON.parse(product.product_image))
          localStorage.setItem("product", JSON.stringify(product));
        }
      });
    }
  }, [])
  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav back="true" text="Detail" arrow="true" search="true" />
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
      <div className="bg-white mt-3 p-3 pl-4 pr-4" style={{ height: "auto" }}>
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
          <Tab eventKey="home" title="Regular Rent">
            <p className="m-0" style={{ fontSize: "14px" }}>
              <b>{product.product_name ? product.product_name : "Product Name"}</b>
            </p>
            <p className="m-0">
              <font style={{ color: "#2F2F8D", fontSize: "22px" }}>
                <b>Rp. {product.length !== 0 && product.product_discount !== "0" ? product.product_discount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : product && product.product_discount == "0" ? product.product_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""} </b>
              </font>
              <font style={{ color: "#2F2F8D", fontSize: "14px" }}> / Day </font>
            </p>

            {product && product.product_discount !== "0" ? (
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
                {percent} %
              </button>
              <font
                style={{
                  color: "#C8C8C8",
                  fontSize: "12px",
                  textDecoration: "line-through",
                }}
              >
                Rp. {product.product_price ? product.product_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "120.000"} / Day
              </font>
            </p>
            ) : "" }
            
            <table>
              <tr>
                <td>
                  <Rating
                    name="read-only"
                    size="small"
                    readOnly
                    value={product.rating ? product.rating : 0}
                    style={{ marginTop: "10px" }}
                  />
                </td>
                <td>
                  <font style={{ fontSize: "11px", marginLeft: "5px" }}>{product.rating ? product.rating : 0}</font>
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
                    Rented {product.product_rent_count ? product.product_rent_count : 0} Times
                  </font>
                </td>
              </tr>
            </table>
          </Tab>
          <Tab eventKey="profile" title="With Driver">
            <p className="m-0" style={{ fontSize: "14px" }}>
                <b>{product.product_name ? product.product_name : "Product Name"}</b>
              </p>
              <p className="m-0">
                <font style={{ color: "#2F2F8D", fontSize: "22px" }}>
                  <b>Rp. {product.length !== 0 && product.product_price_with_driver_discount !== "0" ? product.product_price_with_driver_discount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : product && product.product_price_with_driver_discount == "0" ? product.product_price_with_driver.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""} </b>
                </font>
                <font style={{ color: "#2F2F8D", fontSize: "14px" }}> / Day </font>
              </p>

              {product && product.product_price_with_driver_discount !== "0" ? (
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
                  {percent} %
                </button>
                <font
                  style={{
                    color: "#C8C8C8",
                    fontSize: "12px",
                    textDecoration: "line-through",
                  }}
                >
                  Rp. {product.product_price_with_driver ? product.product_price_with_driver.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "120.000"} / Day
                </font>
              </p>
              ) : "" }
              
              <table>
                <tr>
                  <td>
                    <Rating
                      name="read-only"
                      size="small"
                      readOnly
                      value={product.rating ? product.rating : 0}
                      style={{ marginTop: "10px" }}
                    />
                  </td>
                  <td>
                    <font style={{ fontSize: "11px", marginLeft: "5px" }}>{product.rating ? product.rating : 0}</font>
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
                      Rented {product.product_rent_count ? product.product_rent_count : 0} Times
                    </font>
                  </td>
                </tr>
              </table>
          </Tab>
       </Tabs>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "90px" }}>
        <table>
          <tr>
            <td>
              <img src={product.user_profile ? MAIN + product.user_profile : "/icons/icon_profile.svg"} />
            </td>
            <td className="pl-3">
              <p className="m-0">
                <b>{product.user_first_name ? product.user_first_name + " " + product.user_last_name : "Merchant Name"}</b>
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
          {product.product_rental_rules_overtime ? product.product_rental_rules_overtime : "Biaya overtime adalah 10% dari harga yang tertera pada rental perjam."} 
          </font>
        </p>
        <p className="mt-3">
          <font style={{ fontSize: "14px", color: "#C8C8C8" }}>
            General Regulation
          </font>
          <br />
          <font style={{ fontSize: "14px" }}>
          {product.product_rental_rules_regulation ? product.product_rental_rules_regulation : "Biaya overtime adalah 10% dari harga yang tertera pada rental perjam."}
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
            {product.product_pickup_date ? product.product_pickup_date : "12:00"}
            </td>
          </tr>
          <tr>
            <td>
              <font style={{ fontSize: "14px", color: "#C8C8C8" }}>
                Time of return
              </font>
            </td>
            <td className="text-right" style={{ fontSize: "14px" }}>
              {product.product_return_date ? product.product_return_date : "13:00"}
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <p className="m-0" style={{ color: "#2F2F8D" }}>
          <b>Cancellation Policy</b>
        </p>
        <p className="mt-2">
          <font style={{ fontSize: "14px", color: "#C8C8C8" }}>{product.product_cancelation_policy ? product.product_cancelation_policy : "No Refund."}</font>
          <br />
        </p>
      </div>
      

     {product && product.product_price_with_driver !== "0" ? (
      <div
        className="mt-3 text-center text-white"
        style={{
          height: "auto",
          background: "#fff",
          position: "sticky",
          bottom: "0px",
          fontSize: "14px",
        }}
      >
        <table width="100%">
          <tr>
            <td width="50%">
              <button
                onClick={() => router.push({
                    pathname: "/home/order_date",
                    query: {
                      id: product.product_id, 
                      type: 0
                    }
                  })} 
                className="p-2 btn-primary" 
                style={{ width:'100%', border: 'none' }}
              >Regular Rent</button>
            </td>
            <td>
              <button
                onClick={() => router.push({
                    pathname: "/home/order_date",
                    query: {
                      id: product.product_id, 
                      type: 1
                    }
                  })} 
                className="p-2 btn-success" 
                style={{ width:'100%', border: 'none' }}
              >Rent With Driver</button>
            </td>
          </tr>
        </table>
      </div>
     ) : (
      <div
        className="mt-3 p-2 text-center text-white"
        style={{
          height: "auto",
          background: "#2F2F8D",
          position: "sticky",
          bottom: "0px",
          fontSize: "14px",
        }}
        onClick={() => router.push({
          pathname: "/home/order_date",
          query: {
            id: product.product_id,
            type: 0
            }
        })}
      >
        Rent Now
      </div>
     )}
    </div>
  );

}
