import style from "../templates/globals/top_nav.module.css";
import { Button, Link } from "@material-ui/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TopNav({
  back = false,
  text = "Back",
  arrow = "false",
  page,
  setOnSearch,
  setSearch,
}) {
  const [tmpSearch, setTmpSearch] = useState();
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
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setTmpSearch(e.target.value);
    if (e.target.value.length == 0) {
      setOnSearch(false);
    } else {
      setOnSearch(true);
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
          <input
            type="text"
            className={style.searchBox}
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
      )}
    </div>
  );
}
