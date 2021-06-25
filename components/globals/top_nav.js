import style from "../templates/globals/top_nav.module.css";

export default function TopNav({
  back = false,
  text = "Back",
  arrow = "false",
}) {
  return (
    <div className={style.navigation}>
      {back && arrow == "false" ? (
        <div>
          <font className={style.textNavBackNoArrow}>{text}</font>
        </div>
      ) : back && arrow ? (
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
