import { Grid } from "@material-ui/core";
import style from "../templates/profiles/header.module.css";
export default function Header() {
  return (
    <div className={style.container}>
      <Grid
        container
        direction="row"
        style={{ padding: "20px", paddingTop: "25px" }}
      >
        <Grid container item xs={2}>
          <img src="./icons/icon_profile.svg" />
        </Grid>
        <Grid container item xs={7} style={{ paddingLeft: "15px" }}>
          <p className={style.textProfile}>Tabrent Apps</p>
          <p className={style.textSubProfile}>Account Information ></p>
        </Grid>
        <Grid container item xs={3}>
          <button className={style.btnVerified}>Not Verified</button>
        </Grid>
      </Grid>
    </div>
  );
}
