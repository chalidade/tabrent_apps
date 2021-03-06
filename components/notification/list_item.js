import { Container, Typography, Button, Link } from "@material-ui/core";

const style = {
  btnFill: {
    marginTop: "20px",
    textTransform: "capitalize",
    background: "#2F2F8D",
    color: "#FFF",
  },
};

export default function ListItem({ data }) {
  let url_detail = "/notification/detail_article";
  return (
    <div className="container-standart" style={{ height: "auto" }}>
      <h1 style={{ fontSize: "20px", textTransform: "Capitalize" }}>
        {data.item_title}
      </h1>
      <p className="mt-3">{data.item_date}</p>
      <p>{data.item_desc}</p>
      <Link href={url_detail}>
        <Button variant="outlined" fullWidth={true} style={style.btnFill}>
          Read More
        </Button>
      </Link>
    </div>
  );
}
