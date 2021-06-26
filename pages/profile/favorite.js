import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import ListItem from "../../components/profiles/favorite";
import { useState } from "react";
let data = [
  {
    item: "Daihatsu Agya Merah",
    item_image: "/progress/product_1.svg",
    item_seller: "Pak Bambang",
    item_price: "250.000",
    item_reviewer: 100,
    item_star: 4,
  },
  {
    item: "Toyota Xenia",
    item_image: "/progress/product_2.svg",
    item_seller: "Bu Tejo",
    item_price: "208.000",
    item_reviewer: 25,
    item_star: 5,
  },
  {
    item: "Daihatsu Ayla",
    item_image: "/progress/product_3.svg",
    item_seller: "Superjo Rent",
    item_price: "155.000",
    item_reviewer: 20,
    item_star: 4.5,
  },
  {
    item: "Honda Brio",
    item_image: "/progress/product_5.svg",
    item_seller: "Sby Rent",
    item_price: "285.000",
    item_reviewer: 10,
    item_star: 4,
  },
];

export default function Favorites() {
  return (
    <div>
      <TopNav back="true" text="My Favorites" arrow="true" page="Profile" />
      <div className="main" style={{ height: "auto" }}>
        {data.map((data, index) => {
          return <ListItem data={data} />;
        })}
      </div>
    </div>
  );
}
