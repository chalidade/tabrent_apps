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
    }
    setPage(router.query ? router.query.page : "Home");
  }, []);

  return (
    <div>
      {page == "Home" ? (
        <Home page={page} setPage={setPage} />
      ) : page == "Progress" ? (
        <Progress page={page} setPage={setPage} />
      ) : page == "Notification" ? (
        <Notification page={page} setPage={setPage} />
      ) : page == "Profile" ? (
        <Profile page={page} setPage={setPage} />
      ) : page == "Login" ? (
        <Login page={page} setPage={setPage} />
      ) : (
        <Home page={page} setPage={setPage} />
      )}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}
