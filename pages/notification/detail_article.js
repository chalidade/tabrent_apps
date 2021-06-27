import TopNav from "../../components/globals/top_nav";
import { Container, Typography } from "@material-ui/core";

export default function DetailArticle() {
  return (
    <div>
      <TopNav
        back="true"
        text="Detail Information"
        arrow="true"
        page="Notification"
      />
      <div className="main">
        <img src="/notification/img_banner.svg" style={{ width: "100%" }} />
        <h1
          style={{
            fontSize: "20px",
            textTransform: "Capitalize",
            color: "#2F2F8D",
          }}
        >
          Tips untuk memilih kendaraan yang baik
        </h1>
        <p className="mt-3" style={{ fontSize: "12px" }}>
          01/01/2001
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
