import TopNav from "../../components/globals/top_nav";
import ListItem from "../../components/profiles/feedback";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

let data = [
  {
    item: "Daihatsu Agya Merah",
    item_review: "Murah banget dan pelayanannya sangat baik!",
    item_date: "Jan 29, 2021",
    item_star: 4,
  },
  {
    item: "Toyota Xenia",
    item_review: "Murah banget dan pelayanannya sangat baik!",
    item_date: "Jan 29, 2021",
    item_star: 5,
  },
  {
    item: "Daihatsu Ayla",
    item_review: "Murah banget dan pelayanannya sangat baik!",
    item_date: "Jan 29, 2021",
    item_star: 4.5,
  },
  {
    item: "Honda Brio",
    item_review: "Murah banget dan pelayanannya sangat baik!",
    item_date: "Jan 29, 2021",
    item_star: 4,
  },
];

export default function Favorites() {
  return (
    <div style={{ background: "#E5E5E5" }}>
      <TopNav back="true" text="Feedback" arrow="true" page="Profile" />
      <div className="main ml-0 mr-0">
        {data.map((data, index) => {
          return <ListItem data={data} />;
        })}
      </div>
    </div>
  );
}
