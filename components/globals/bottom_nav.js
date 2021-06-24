import style from "../templates/globals/bottom_nav.module.css";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, ListAlt, Notifications, Person } from "@material-ui/icons";
import { useState } from "react";

export default function TopNav({ back = false, text = "Back", page, setPage }) {
  const [value, setValue] = useState("Home");
  const handleChangePage = (event, newValue) => {
    setValue(newValue);
    setPage(newValue);
  };
  return (
    <div className={style.navigation}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleChangePage(event, newValue)}
        showLabels
      >
        <BottomNavigationAction label="Home" value="Home" icon={<Home />} />
        <BottomNavigationAction
          label="Progress"
          value="Progress"
          icon={<ListAlt />}
        />
        <BottomNavigationAction
          label="Notification"
          value="Notification"
          icon={<Notifications />}
        />
        <BottomNavigationAction
          label="Profile"
          value="Profile"
          icon={<Person />}
        />
      </BottomNavigation>
    </div>
  );
}
