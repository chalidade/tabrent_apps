import TopNav from "../../components/globals/top_nav";
import ModalSearch from "../../components/globals/modal_search";
import ListItem from "../../components/notification/list_item";
import { useState, useEffect } from "react";

export default function Index() {
  const [search, setSearch] = useState(0);
  const [onSearch, setOnSearch] = useState("none");
  let data = [
    {
      item_title: "Tips untuk memilih kendaraan yang baik",
      item_date: "01/01/2001",
      item_image: "/progress/product_5.svg",
      item_desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      item_title: "Layar Besar, Baterai Besar",
      item_date: "01/01/2001",
      item_image: "/progress/product_5.svg",
      item_desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      item_title: "Tampilan Layar Poni",
      item_date: "01/01/2001",
      item_image: "/progress/product_5.svg",
      item_desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
  ];

  return (
    <div>
      <TopNav
        text="Notification"
        back="false"
        setSearch={setSearch}
        search={search}
        setOnSearch={setOnSearch}
      />

      <ModalSearch
        setSearch={setSearch}
        search={search}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />

      <div className="main" style={{ height: data ? "auto" : "100vh" }}>
        {data.map((data, index) => {
          return <ListItem data={data} />;
        })}
      </div>
    </div>
  );
}
