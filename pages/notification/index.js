import TopNav from "../../components/globals/top_nav";
import ListItem from "../../components/notification/list_item";

export default function Index() {
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
      <TopNav back="true" text="Notification" />
      <div className="main" style={{ height: data ? "auto" : "100vh" }}>
        {data.map((data, index) => {
          return <ListItem data={data} />;
        })}
      </div>
    </div>
  );
}
