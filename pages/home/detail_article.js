import TopNav from "../../components/globals/top_nav";
import { Container, Typography } from "@material-ui/core";
import ListItem from "../../components/progress/list_item";

export default function DetailArticle() {
  return (
    <div>
      <TopNav back="true" text="Detail Information" arrow="true" />
      <div className="main">testing</div>
    </div>
  );
}
