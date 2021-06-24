import { Grid } from "@material-ui/core";
import style from "../templates/progress/list_item.module.css";
import ClassNames from "classnames";

export default function ListItem({ data }) {
  return (
    <div className={style.container}>
      <Grid container direction="row">
        <Grid container item xs={12}>
          <font className={ClassNames(style.textTransaction, "return")}>
            Transaction Number #{data.item_transaction}
          </font>
        </Grid>
        <Grid container item xs={4} style={{ paddingTop: "10px" }}>
          <div
            className={style.imgItem}
            style={{
              background: `url(${
                data.item_image ? data.item_image : "./progress/img_item.svg"
              })`,
              backgroundSize: "contain",
              borderRadius: "15px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Grid>
        <Grid container item xs={8} style={{ paddingTop: "5px" }}>
          <p className={ClassNames(style.textTitle, "m-0")}>{data.item}</p>
          <p className={ClassNames(style.textSubTitle, "m-0")}>
            {data.item_seller}
          </p>
          <p className={ClassNames(style.textSubTitle, "m-0")}>
            {data.item_number}
          </p>
          <p className={ClassNames(style.textSubTitlePrice, "m-0")}>
            Rp. {data.item_price}
          </p>
          <p className={ClassNames(style.textStatus, data.item_status)}>
            {data.item_status == "return"
              ? "Complete Returned"
              : data.item_status == "success"
              ? "Payment Success"
              : data.item_status == "cancel"
              ? "Transaction Cancelled"
              : "Waiting Confirmation"}
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
