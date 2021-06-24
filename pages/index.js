import BottomNav from "../components/globals/bottom_nav";
import Home from "./home/index";
import Progress from "./progress/index";
import Notification from "./notification/index";
import Profile from "./profile/index";
import { useState } from "react";

export default function Index() {
  const [page, setPage] = useState("Home");
  const [back, setBack] = useState("Home");
  console.log(page);
  return (
    <div>
      {page == "Home" ? (
        <Home />
      ) : page == "Progress" ? (
        <Progress />
      ) : page == "Notification" ? (
        <Notification />
      ) : page == "Profile" ? (
        <Profile />
      ) : (
        <Home />
      )}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}
