import Images from "../../components/globals/images";
import Rating from "@material-ui/lab/Rating";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import router from "next/router";

const styles = {
  owner: {
    fontSize: '0.86rem',
    color: 'rgba(49, 53, 59, 0.96)',
    maxWidth: '100%',
    maxHeight: '100%',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    height: '40px',
    marginBottom: '5px',
    marginTop: '10px',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
    display: '-webkit-box',
  },
  car_name: {
    marginBottom: "5px",
    fontFamily: "Calibri",
    fontStyle: "normal",
    fontHeight: "normal",
    fontSize: "10px",
    lineHeight: "0px",
    color: "#000000",
  },
  price: {
    marginTop: "10px",
    fontFamily: "Calibri",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "bold",
    color: "#000080",
  },
};

export default function Cards({data}) {
  return (
        <div
          className="col-6 p-1"
          style={{
            width: "105px",
            height: "auto",
            marginBottom: "0px",
            align: "left",
            paddingBottom: "0px",
            padding: "0px"
          }}
        >
          <div 
              style= {{border: 'solid thin #eee', padding: '10px', borderRadius: '10px' }}
              onClick={() => router.push({
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
                <p className="p-0" style={styles.owner}> {data.product_name.length > 30 ? data.product_name.slice(0, 27) + "..." : data.product_name }</p>
                <p class="mb-2" style={styles.price}>
                  Rp {data.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "5px",
                marginTop: "-15px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={data.rating !== null ? data.rating : 0}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
  );
}
