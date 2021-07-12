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
  onClick,
  background = true,
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
    <div
      className={style.navigation}
      style={{
        position: background ? "unset" : "absolute",
        background: background ? "#fff" : "none",
        boxShadow: background ? "0px 3px 10px rgb(0 0 0 / 10%)" : "none",
      }}
    >
      {back && arrow == "false" ? (
        <div>
          <font className={style.textNavBackNoArrow}>{text}</font>
        </div>
      ) : back && arrow ? (
        <div onClick={onClick ? () => onClick() : handleBack}>
          <Button
            style={{
              position: "absolute",
              marginTop: background ? "9px" : "7px",
              border: "none",
              marginLeft: background ? "-10px" : "0px",
              background: "none",
            }}
          >
            {background ? (
              <img src="/icons/icon_back.svg" />
            ) : (
              <img src="/icons/icon_back_white.svg" />
            )}
          </Button>
          <font
            className={style.textNavBack}
            style={{ color: background ? "#2f2f8d" : "#FFF" }}
          >
            {text}
          </font>
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
