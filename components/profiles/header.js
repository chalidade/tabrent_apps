import { Grid, Link } from "@material-ui/core";
import style from "../templates/profiles/header.module.css";
export default function Header({ user }) {
  return (
    <div className={style.container}>
      <Grid
        container
        direction="row"
        style={{ padding: "20px", paddingTop: "25px" }}
      >
        <Grid container item xs={2}>
        <font style={{
              fontWeight: '700',
              color: '#fff',
              paddingLeft: '5px',
              paddingTop: '2px',
              fontSize: '24px',
        }}>
          {user ? user.user_first_name.charAt(0) + user.user_last_name.charAt(0) : "TR" }
        </font>
        </Grid>
        <Grid container item xs={7} style={{ paddingLeft: "15px" }}>
          <p className={style.textProfile}>{user ? user.user_first_name + " " + user.user_last_name : "Rental Owner" } 
            <span>
              {user && user.user_status == 0 ? (
                <button className={style.btnVerified}>x</button>
              ) : (
                <button className={style.btnVerified} style={{background: '#04ff04d1'}}>✓</button>
              )
              }
            </span>
          </p>
          <Link href="/profile/account_information">
            <p className={style.textSubProfile}>Account Information &gt; </p>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
