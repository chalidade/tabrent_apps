import Header from "../../components/profiles/header";
import ListItem from "../../components/profiles/list_item";
import BottomNav from "../../components/globals/bottom_nav";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Index({ page, setPage }) {
  return (
    <div>
      <Header />
      <div className="main" style={{ overflow: "hidden" }}>
        <ListItem
          value="Became a rental owner"
          icon="./icons/icon_market.svg"
        />
        <hr />
        <ListItem
          value="My favorite"
          icon="./icons/icon_love.svg"
          url="/profile/favorite"
        />
        <ListItem
          value="Feedbacks"
          icon="./icons/icon_star_outline.svg"
          url="/profile/feedback"
        />
        <ListItem
          value="Referral Code"
          icon="./icons/icon_referal_code.svg"
          url="/profile/referral_code"
        />
        <ListItem
          value="Share to your friends"
          icon="./icons/icon_market.svg"
        />
        <hr />
        <ListItem
          value="Emergency Call"
          highlight="true"
          icon="./icons/icon_emergency.svg"
        />
        <ListItem
          value="Contact us"
          icon="./icons/icon_contact_us.svg"
          url="/profile/contact_us"
        />
        <ListItem
          value="Get help"
          icon="./icons/icon_help.svg"
          url="/profile/get_help"
        />
        <ListItem value="Rate us" icon="./icons/icon_like.svg" />
        <hr />
        <ListItem
          highlight="true"
          value="Logout"
          icon="./icons/icon_logout.svg"
        />
      </div>
    </div>
  );
}
