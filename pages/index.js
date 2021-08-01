import BottomNav from "../components/globals/bottom_nav";
import Home from "./home/index";
import Progress from "./progress/index";
import Notification from "./notification/index";
import Profile from "./profile/index";
import ProfileOwner from "./profile/partner_profile";
import Login from "./profile/login";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState("Home");
  const [back, setBack] = useState("Home");
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let getUser = JSON.parse(localStorage.getItem('user_data'));
      setUser(getUser);
      if (localStorage.getItem("is_login") !== null) {
        if(getUser.user_type == 2) {
          router.push('/profile/partner_profile');
        } if(getUser.user_type == 3) {
          router.push('/profile/admin_menu');
        } else {
          setPage("Profile");
        }
      } else {
        router.push('/profile/login');
      }
    }
    setPage(router.query ? router.query.page : "Home");
  }, []);

  return (
    <div>
      {user && page == "Home" ? (
        <Home page={page} setPage={setPage} />
      ) : user && page == "Progress" ? (
        <Progress page={page} setPage={setPage} />
      ) : user && page == "Notification" ? (
        <Notification page={page} setPage={setPage} />
      ) : user && page == "Profile" ? (
        <Profile page={page} setPage={setPage} />
      ) : user && user.user_type == 1 ? (
        <Home page={page} setPage={setPage} />
      ) : ""}
      {user  && user.user_type == 1 ? (<BottomNav page={page} setPage={setPage} />) : ""}
    </div>
  );
}
