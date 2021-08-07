import TopNav from "../../components/globals/top_nav";
import ListItem from "../../components/profiles/feedback";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX } from "../../config/api_url";

export default function Favorites() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      let json = {
          action: "list",
          db: "tabrent",
          table: "tx_order",
          raw: {
              selected: "`tx_product`.*, `tx_rating`.*, `tx_order`.*"
          },
          innerJoin: [
              {
                  table: "tx_product",
                  field1: "tx_product.product_id",
                  field2: "tx_order.order_product_id"
              },
              {
                  table: "tx_user",
                  field1: "tx_user.user_id",
                  field2: "tx_order.order_user_id"
              },
              {
                  table: "tx_rating",
                  field1: "tx_rating.rating_order_id",
                  field2: "tx_order.order_id"
              }
          ],
          where: [["user_id", "=", data.user_id]]
      };
        
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
          } else {
            setProduct(data.result);
          }
        }
      });
    }
  }, [])

  return (
    <div style={{ background: "#E5E5E5" }}>
      <TopNav back="true" text="Feedback" arrow="true" page="Profile" />
      <div className="main ml-0 mr-0" style={{ height: 'auto' }}>
      {product && product.length !== 0 ? (
        <div>
          {product.map((product, index) => {
            return <ListItem data={product} />;
          })}
        </div>
      ) : (
        <center style={{
          background: '#fff',
          minHeight: '100vh',
          marginTop: '-20px',
          paddingTop: '80px'
        }}>
           <img src="/icons/icon_no_product.svg" />
         </center>
      )}
      </div>
    </div>
  );
}
