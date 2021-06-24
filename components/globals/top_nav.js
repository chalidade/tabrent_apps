import style from "../templates/globals/top_nav.module.css";

export default function TopNav({
  back = false,
  text = "Back",
  noArrow = false,
}) {
  return (
    <div className={style.navigation}>
      {back && noArrow ? (
        <div>
          <font className={style.textNavBackNoArrow}>{text}</font>
        </div>
      ) : back && noArrow === "false" ? (
        <div>
          <img src="./icons/icon_back.svg" className={style.iconSearch} />
          <font className={style.textNavBack}>{text}</font>
        </div>
      ) : (
        <div>
          <img src="./icons/icon_search.svg" className={style.iconSearch} />
          <input type="text" className={style.searchBox} placeholder="Search" />
        </div>
      )}
    </div>
  );
}
