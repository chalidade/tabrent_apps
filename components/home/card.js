import Images from "../../components/globals/images";
import { Container, Typography, Link } from "@material-ui/core";
import { MdStar } from "react-icons/md";
import Rating from "@material-ui/lab/Rating";

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

export default function Cards() {
  return (
    <div
      className="container mt-2 col"
      style={{ width: "auto", height: "auto", marginBottom: "0px" }}
    >
      <div className="row">
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
          <Link href="/home/detail">
            <Images
              image="/home/image_1.jpg"
              width="100%"
              height="70px"
              repeat="no-repeat"
              radius="10px"
              align="center"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> Pak Rahmat</o>
                <p style={styles.car_name}> Daihatsu Ayla</p>
                <p style={styles.price}>
                  {" "}
                  Rp 250.000 <small style={{ fontWeight: "bold" }}>/Day</small>
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
                  value={4}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </Link>
        </div>

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
          <Link href="/home/detail">
            <Images
              image="/home/image_2.jpg"
              width="100%"
              height="70px"
              repeat="no-repeat"
              radius="10px"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> Pak Budi</o>
                <p style={styles.car_name}> Honda Verza</p>
                <p style={styles.price}>
                  {" "}
                  Rp 60.000 <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={4}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </Link>
        </div>

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
          <Link href="/home/detail">
            <Images
              image="/home/image_3.jpg"
              width="100%"
              height="70px"
              repeat="no-repeat"
              radius="10px"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> Harapan Jaya</o>
                <p style={styles.car_name}> Exclusive Luxury Bus</p>
                <p style={styles.price}>
                  {" "}
                  Rp 800.000 <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={4}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </Link>
        </div>

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
          <Link href="/home/detail">
            <Images
              image="/home/image_4.jpg"
              width="100%"
              height="70px"
              repeat="no-repeat"
              radius="10px"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> Pak Handoko</o>
                <p style={styles.car_name}> Honda Freed</p>
                <p style={styles.price}>
                  {" "}
                  Rp 350.000 <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={4}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </Link>
        </div>

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
          <Link href="/home/detail">
            <Images
              image="/home/image_5.jpg"
              width="100%"
              height="70px"
              repeat="no-repeat"
              radius="10px"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> Rahmat Rent Car</o>
                <p style={styles.car_name}> Toyota Avanza</p>
                <p style={styles.price}>
                  {" "}
                  Rp 280.000 <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={4}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </Link>
        </div>

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
          <Link href="/home/detail">
            <Images
              image="/home/image_6.jpg"
              width="100%"
              height="70px"
              repeat="no-repeat"
              radius="10px"
            />
            <div className="row">
              <div className="col">
                <o style={styles.owner}> Carteran Jaya</o>
                <p style={styles.car_name}> Suzuky Carry Pickup</p>
                <p style={styles.price}>
                  {" "}
                  Rp 200.000 <small style={{ fontWeight: "bold" }}>/Day</small>
                </p>
              </div>
            </div>
            <div
              className="row"
              style={{
                height: "auto",
                marginBottom: "10px",
                marginTop: "-10px",
              }}
            >
              <div className="col">
                <Rating
                  name="read-only"
                  size="small"
                  readOnly
                  value={4}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
            </Link>
          </div>
      </div>
    </div>
  );
}