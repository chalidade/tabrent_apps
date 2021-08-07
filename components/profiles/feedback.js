import { TextField, Grid, Button, Link, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default function feedback({ data }) {
  return (
    <div className="p-4 bg-white mt-3">
      <p className="m-0">
        <b>{data.order_transaction_number}</b>
      </p>
      <Grid container>
        <Grid item xs={4}>
          <Rating
            size="small"
            disabled
            value={data.rating_number}
            style={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid item xs={8}>
          <font style={{ fontSize: "11px", marginLeft: "-10px" }}>
            ({data.rating_created_at})
          </font>
        </Grid>
      </Grid>
      <p className="mt-1 mb-1" style={{ fontSize: "14px" }}>
        {data.rating_message}
      </p>
    </div>
  );
}
