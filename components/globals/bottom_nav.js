import style from "../templates/globals/bottom_nav.module.css";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, ListAlt, Notifications, Person } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TopNav({ back = false, text = "Back", page, setPage }) {
  const router = useRouter();
  const [value, setValue] = useState(page);
  const handleChangePage = (event, newValue) => {
    setValue(newValue);
    setPage(newValue);
  };

  useEffect(() => {
    setValue(router.query ? router.query.page : "Home");
  }, []);

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
