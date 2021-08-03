import { Grid, Link } from "@material-ui/core";
import style from "../templates/progress/list_item.module.css";
import ClassNames from "classnames";
import { MAIN } from "../../config/api_url";
import { useRouter } from "next/router";

export default function ListItem({ data }) {
  const router = useRouter();

  const handleClickList = () => {
    router.push({
      pathname: "/progress/detail",
      query: {id: data.order_id}
  });
  }

  return (
    <div className={style.container} onClick={handleClickList}>
      <Grid container direction="row">
        <Grid container item xs={12}>
          <Link href="/progress/detail">
            <font className={ClassNames(style.textTransaction, "return")}>
              Transaction Number #{data.order_transaction_number}
            </font>
          </Link>
        </Grid>
        <Grid container item xs={4} style={{ paddingTop: "10px" }}>
          <div
            className={style.imgItem}
            style={{
              background: `url(${
                MAIN+data.product_image_main ? MAIN+data.product_image_main : "/progress/img_item.svg"
              })`,
              backgroundSize: "cover",
              borderRadius: "15px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Grid>
        <Grid container item xs={8} style={{ paddingTop: "5px" }}>
          <p className={ClassNames(style.textTitle, "m-0")} style={{ fontSize: '14px' }}>{data.product_name}</p>
          <p className={ClassNames(style.textSubTitle, "m-0")}>
            {data.user_first_name+" "+data.user_last_name}
          </p>
          <p className={ClassNames(style.textSubTitlePrice, "m-0")}>
            Rp. {data.order_payment_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className={ClassNames(style.textSubTitlePrice, "mt-1", data.order_status == 0 || data.order_status == 1 ? style.waiting : data.order_status == 1 ? style.success : data.order_status == 2 ? style.complete : style.cancel)}>
            {data.order_status == "3"
                ? "Process to Rent Owner"
                : data.order_status == "2"
                ? "Payment Success"
                : data.order_status == "4"
                ? "Rented"
                : data.order_status == "5"
                ? "Done"
                : data.order_status == "6"
                ? "Reject"
                : data.order_status == "1"
                ? "Waiting Confirm By Tabrent"
                : "Waiting Payment"}
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
