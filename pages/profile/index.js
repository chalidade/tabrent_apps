import Header from "../../components/profiles/header";
import ListItem from "../../components/profiles/list_item";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Index() {
  return (
    <div>
      <Header />
      <div className="main">
        <ListItem
          value="Became a rental owner"
          icon="./icons/icon_market.svg"
        />
        <hr />
        <ListItem value="My favorite" icon="./icons/icon_love.svg" />
        <ListItem value="Feedbacks" icon="./icons/icon_star_outline.svg" />
        <ListItem value="Referral Code" icon="./icons/icon_referal_code.svg" />
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
        <ListItem value="Contact us" icon="./icons/icon_contact_us.svg" />
        <ListItem value="Get help" icon="./icons/icon_help.svg" />
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
