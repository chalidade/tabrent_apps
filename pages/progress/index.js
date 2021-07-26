import TopNav from "../../components/globals/top_nav";
import { Container, Typography, Link } from "@material-ui/core";
import ListItem from "../../components/progress/list_item";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX } from "../../config/api_url";

export default function Index() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let user = JSON.parse(localStorage.getItem('user_data'));
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
                "order_user_id",
                "=",
                user.user_id
            ]
        ]
    };
  
      fetch_data(INDEX, json).then(function (order) {
        if (order.success) {
          if (order.count == 1) {
            setOrder([order.result]);
          } else {
            setOrder(order.result);
          }
        }
      });
    }

    
  }, [])
  
  return (
    <div>
      <TopNav back="true" text="Transaction History" />
      <div className="main">
        {order.length !== 0 ? order.map((data, index) => {
          return <ListItem data={data} />;
        }) : ""}
      </div>
    </div>
  );
}
