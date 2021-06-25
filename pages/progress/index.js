import TopNav from "../../components/globals/top_nav";
import { Container, Typography } from "@material-ui/core";
import ListItem from "../../components/progress/list_item";

export default function Index() {
  let data = [
    {
      item: "Daihatsu Agya Merah",
      item_image: "./progress/product_1.svg",
      item_seller: "Pak Bambang",
      item_number: "AB 123 BC",
      item_price: "1.120.610",
      item_status: "return",
      item_transaction: "11092817811",
    },
    {
      item: "Toyota Xenia",
      item_image: "./progress/product_2.svg",
      item_seller: "Bu Tejo",
      item_number: "AB 256 BC",
      item_price: "1.250.610",
      item_status: "success",
      item_transaction: "11092817812",
    },
    {
      item: "Daihatsu Ayla",
      item_image: "./progress/product_3.svg",
      item_seller: "Superjo Rent",
      item_number: "AB 456 BC",
      item_price: "1.120.700",
      item_status: "cancel",
      item_transaction: "11092817813",
    },
    {
      item: "Honda Brio",
      item_image: "./progress/product_5.svg",
      item_seller: "Sby Rent",
      item_number: "AB 458 BC",
      item_price: "1.120.800",
      item_status: "confirmation",
      item_transaction: "11092817814",
    },
  ];
  return (
    <div>
      <TopNav back="true" text="Transaction History" />
      <div className="main">
        {data.map((data, index) => {
          return <ListItem data={data} />;
        })}
      </div>
    </div>
  );
}
