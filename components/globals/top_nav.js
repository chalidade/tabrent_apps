import style from "../templates/globals/top_nav.module.css";
import { Button, Link } from "@material-ui/core";
import { useRouter } from "next/router";

export default function TopNav({
  back = false,
  text = "Back",
  arrow = "false",
  page,
}) {
  const router = useRouter();
  const handleBack = () => {
    if (page) {
      router.push({
        pathname: "/",
        query: { page: page },
      });
    } else {
      router.back();
    }
  };

  return (
    <div className={style.navigation}>
      {back && arrow == "false" ? (
        <div>
          <font className={style.textNavBackNoArrow}>{text}</font>
        </div>
      ) : back && arrow ? (
        <div onClick={handleBack}>
          <Button
            style={{
              position: "absolute",
              marginTop: "9px",
              border: "none",
              marginLeft: "-10px",
              background: "none",
            }}
          >
            <img src="/icons/icon_back.svg" />
          </Button>
          <font className={style.textNavBack}>{text}</font>
        </div>
      ) : (
        <div>
          <img src="/icons/icon_search.svg" className={style.iconSearch} />
          <input type="text" className={style.searchBox} placeholder="Search" />
        </div>
      )}
    </div>
  );
}
