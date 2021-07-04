import { Grid, Button, Link } from "@material-ui/core";
import style from "../templates/profiles/list_item.module.css";
export default function ListItem({
  value,
  icon,
  highlight = false,
  url,
  onClick,
}) {
  return (
    <Link href={url}>
      <Button fullWidth="true" onClick={() => onClick()}>
        <Grid
          container
          direction="row"
          style={{ paddingTop: "15px", paddingBottom: "15px" }}
        >
          <Grid container item xs={11}>
            <font
              className={highlight ? style.textListHighlight : style.textList}
            >
              {value}
            </font>
          </Grid>
          <Grid container item xs={1}>
            <img src={icon} />
          </Grid>
        </Grid>
      </Button>
    </Link>
  );
}
