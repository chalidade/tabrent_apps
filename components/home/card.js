import Images from "../../components/globals/images";
import { Container, Typography, Link } from "@material-ui/core";
import { MdStar } from "react-icons/md";
import Rating from "@material-ui/lab/Rating";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import router from "next/router";

const styles = {
  owner: {
    height: " 10px",
    width: " 40px",
    left: " 44px",
    fontFamily: "Calibri",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "0px",
    color: "#000000",
  },
  car_name: {
    marginBottom: "5px",
    fontFamily: "Calibri",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "10px",
    lineHeight: "0px",
    marginTop: "5px",
    color: "#000000",
  },
  price: {
    marginTop: "10px",
    fontFamily: "Calibri",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "10px",
    color: "#000080",
  },
};

export default function Cards({data}) {
  return (
        <div
          className="container-standart col"
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            width: "105px",
            height: "auto",
            marginBottom: "0px",
            align: "left",
            paddingBottom: "0px",
          }}
        >
          <div onClick={() => router.push({
              pathname: "/home/detail",
              query: { id: data.product_id },
            })}>
            <Images
              image={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"}
              width="100%"
              height="118px"
              repeat="no-repeat"
              radius="10px"
              align="center"
              size= "cover"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> {data.product_name}</o>
                <p style={styles.car_name}> {data.product_brand}</p>
                <p style={styles.price}>
                  {" "}
                  Rp {data.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "5px",
                marginTop: "-10px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={data.product_rating !== null ? data.product_rating : 0}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
  );
}
