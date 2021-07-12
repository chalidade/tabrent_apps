import { Grid, Button, IconButton, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import style from "../templates/profiles/favorite.module.css";
import ClassNames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import "bootstrap/dist/css/bootstrap.min.css";

const customStyle = {
  textField: { marginTop: "10px", marginBottom: "10px" },
  mt50: { marginTop: "50px" },
  btnTrash: { marginTop: "-4px", marginLeft: "-10px" },
  btnFill: {
    marginTop: "5px",
    textTransform: "capitalize",
    background: "#2F2F8D",
    color: "#FFF",
  },
};

export default function ListItem({ data }) {
  return (
    <div className={style.container}>
      <Grid container direction="row">
        <Grid container item xs={4}>
          <div
            className={style.imgItem}
            style={{
              background: `url(${
                data.item_image ? data.item_image : "/progress/img_item.svg"
              })`,
              backgroundSize: "contain",
              borderRadius: "15px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Grid>
        <Grid container item xs={8}>
          <p
            className={ClassNames(style.textSubTitle)}
            style={{ marginTop: "-7px" }}
          >
            {data.item}
          </p>
          <p
            className={ClassNames(style.textTitle)}
            style={{ marginTop: "-15px", fontWeight: 800 }}
          >
            Rp {data.item_price}
          </p>
          <p
            className={ClassNames(style.textSubTitle)}
            style={{ marginTop: "-15px" }}
          >
            {data.item_seller}
          </p>
          <Rating
            name="read-only"
            size="small"
            readOnly
            value={data.item_star}
            style={{ marginTop: "-10px" }}
          />
          <font
            style={{ fontSize: "11px", marginTop: "-9px", marginLeft: "5px" }}
          >
            (Rented {data.item_reviewer} Times)
          </font>
          <Grid container xs={12} style={{ marginTop: "5px" }}>
            <Grid item xs={2}>
              <IconButton aria-label="delete" style={customStyle.btnTrash}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Link href="/home/detail">
                <Button
                  fullWidth={true}
                  size="small"
                  style={customStyle.btnFill}
                >
                  Detail
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
