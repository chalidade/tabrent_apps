import Header from "../../components/profiles/header";
import ListItem from "../../components/profiles/list_item";
import BottomNav from "../../components/globals/bottom_nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Index({ page, setPage }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      let getUser = JSON.parse(localStorage.getItem('user_data'));
      setUser(getUser);
      if (localStorage.getItem("is_login") !== null) {
        if(getUser.user_type == 2) {
          router.push('/profile/partner_profile');
        } else {
          setPage("Profile");
          setIsLogin(true);
        }
      } else {
        setPage("Login");
        setIsLogin(false);
      }
    } else {
      if (localStorage.getItem("is_login") !== null) {
          setPage("Profile");
          setIsLogin(true);
      } else {
        setPage("Login");
        setIsLogin(false);
      }
    }
    
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("is_login");
      setPage("Login");
      setIsLogin(false);
    } catch (e) {
      setPage("Login");
      setIsLogin(false);
    }
  };

  return (
    <div>
      <Header user={user} />
      <div className="main" style={{ overflow: "hidden" }}>
      {user && user.user_type == 2 ? (<div>
        <ListItem
          value="My Shop"
          icon="./icons/icon_market.svg"
          url="/profile/partner_profile"
        />
        <hr />
      </div>) : ""}
       
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
        {/* <ListItem
          value="Share to your friends"
          icon="./icons/icon_market.svg"
          url="/profile/"
        /> */}
        <hr />
        <ListItem
          value="Emergency Call"
          highlight="true"
          icon="./icons/icon_emergency.svg"
          url="/profile/"
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
       
        {/* <ListItem value="Rate us" icon="./icons/icon_like.svg" /> */}
        <hr />
        <ListItem
          onClick={handleLogout}
          highlight="true"
          value="Logout"
          icon="./icons/icon_logout.svg"
        />
      </div>
    </div>
  );
}
