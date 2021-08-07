import TopNav from "../../components/globals/top_nav";
import { Container, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { INDEX, MAIN, STORE } from "../../config/api_url";
import { fetch_data } from "../../components/globals/api";

export default function Detail() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [orderData, setOrderData] = useState();
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState();

  const handleRating = () => {
    if (rating && desc) {
      let value = {
        rating_message : desc,
        rating_number : rating, 
        rating_product_id : orderData.product_id,
        rating_order_id : orderData.order_id,
        rating_status : 1
      }

     let json = {
        action : "save",
        db : "tabrent",
        table : "tx_rating",
        primaryKey : "rating_id",
        value: [value],
        };

    fetch_data(STORE, json).then(function (rating) {
        if (rating.success) {
          let value = {
            product_rent_count : orderData.product_rent_count + 1
          }

          let json = {
            action : "update",
            db : "tabrent",
            table : "tx_product",
            primaryKey : "product_id",
            value: value,
            where: [['product_id', '=', orderData.product_id]]
          };
          
          let value_order = {
            order_status : 9
          }

          let json_order = {
            action : "update",
            db : "tabrent",
            table : "tx_order",
            primaryKey : "order_id",
            value: value_order,
            where: [['order_id', '=', orderData.order_id]]
            };

            fetch_data(STORE, json_order).then(function (order) {
              if (order.success) {
                console.log("Review Success");
              } else {
                console.log("Review Unsuccess");
              }
            });

            fetch_data(STORE, json).then(function (rating) {
              if (rating.success) {
                router.push({
                  pathname: "/",
                  query: {page: "Progress"}
                });
                alert("Send Rating Success");
              } else {
                alert("Review Empty");
              }
            });
        } else {
            alert("Send Rating Failed");
        }
    });
    } else {
      alert("Review Empty");
    }
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let order_id = router.query.id;
      let order_transaction_number = router.query.order_transaction_number;

      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_order",
        raw : {
          selected : "tx_rating.*, tx_order.*, tx_product.*"
        },
        innerJoin: [
        {
            table: "tx_product",
            field1: "tx_product.product_id",
            field2: "tx_order.order_product_id"
        },
        {
          table : "tx_rating",
          field1 : "tx_product.product_id",
          field2 : "tx_rating.rating_product_id"
        }],
        where: [
            [
              "order_transaction_number",
              "=",
              order_transaction_number
            ],
            [
              "rating_order_id",
              "=",
              order_id
            ]
        ]
    };

      fetch_data(INDEX, json).then(function (data) {
        if (data.success) { 
            let order = data.result;
            let getUser = JSON.parse(localStorage.getItem('user_data'));
            setOrderData(order);
            setUser(getUser);
        } else {
          let json = {
              action: "list",
              db: "tabrent",
              table: "tx_order",
              raw : {
                selected : "tx_order.*, tx_product.*"
              },
              leftJoin: [
              {
                  table: "tx_product",
                  field1: "tx_product.product_id",
                  field2: "tx_order.order_product_id"
              }],
              where: [
                  [
                    "order_transaction_number",
                    "=",
                    order_transaction_number
                  ]
              ]
            };
            fetch_data(INDEX, json).then(function (data) {
              if (data.success) { 
                let order = data.result;
                let getUser = JSON.parse(localStorage.getItem('user_data'));
                setOrderData(order);
                setUser(getUser);
              }
            });
        }
      });
    }
  }, [])

  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "800vh" }}>
      <TopNav back="true" text="Back" arrow="true" />
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%" cellPadding="5" style={{ fontSize:'14px' }}>
          <tr>
            <td width="50%">Transaction Number</td>
            <td className="text-left">{orderData ? orderData.order_transaction_number : "110551214"}</td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%" cellPadding="5" style={{ fontSize:'14px' }}>
          <tr>
            <td width="50%">Vehicle Name</td>
            <td className="text-left">{orderData ? orderData.product_name : "-"}</td>
          </tr>
          <tr>
            <td>Vehicle Brand</td>
            <td className="text-left">{orderData ? orderData.product_brand : "-"}</td>
          </tr>
          <tr>
            <td>Vehicle Category</td>
            <td className="text-left">{orderData ? orderData.product_category : "-"}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td className="text-left">
            {orderData ? (
                <font style={{color: orderData.order_status == 0 || orderData.order_status == 1 ? "rgb(255, 123, 0)" : orderData.order_status == 2 ? "rgb(0, 89, 255)" : orderData.order_status == 3 ? "rgb(0, 255, 21)" : "rgb(255, 30, 0)"}}>
                {orderData.order_status == "3"
                    ? "Process to Rent Owner"
                    : orderData.order_status == "2"
                    ? "Payment Success"
                    : orderData.order_status == "4"
                    ? "Rented"
                    : orderData.order_status == "5"
                    ? "Done"
                    : orderData.order_status == "6"
                    ? "Reject"
                    : orderData.order_status == "7"
                    ? "Booking Cancel"
                    : orderData.order_status == "8"
                    ? "Payment Reject"
                    : orderData.order_status == "9"
                    ? "Reviewed"
                    : orderData.order_status == "1"
                    ? "Waiting Confirm By Tabrent"
                    : "Waiting Payment"}
                </font>
            ) : ""}
            </td>
          </tr>
        </table>
      </div>

      <div
        className="bg-white mt-3 p-3  pl-4 pr-4"
        style={{
          minHeight: "300px",
          background: "#fff",
          fontSize: "14px",
          height: "auto"
        }}
      >
        <p>
          <b className="ml-2">Tell us what you think</b>
          <br />
          {orderData && parseInt(orderData.rating_order_id) === orderData.order_id ? (
            <Rating  
              value={orderData.rating_number} 
              disabled
              style={{ marginTop: "20px", fontSize: '48px' }} 
            />
          ) : (
            <div>
              <Rating  
                onChange={(event, newValue) => {
                setRating(newValue);
                }} 
                size="large" 
                value={rating} 
                style={{ marginTop: "20px" }} 
              />
            </div>
          ) }
          <br />
          {orderData && parseInt(orderData.rating_order_id) === orderData.order_id ? (
            <p className="ml-2 mt-4 pl-2" style={{ textAlign: 'justify' }}>{orderData.rating_message}</p>
          ) : (
            <div>
              <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows="5"
              type="text"
              className="mt-3"
              style={{
                width: "100%",
                background: "#d4d4d469",
                padding: "15px",
                borderRadius: "10px",
                border: "none",
                fontSize: "12px",
              }}
              placeholder="Describe your experience (optional)"
            />
            <button onClick={() => handleRating()} className="button-primary" style={{ float: "right" }}>
              Post
            </button>
          </div>
          )}
        </p>
      </div>
    </div>
  );
}
