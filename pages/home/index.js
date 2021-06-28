import TopNav from "../../components/globals/top_nav";
import { Container, Typography } from "@material-ui/core";
import { useState } from "react";

export default function Index() {
  const [search, setSearch] = useState();

  return (
    <div>
      <TopNav setSearch={setSearch} />
      <div className="main">Homepage</div>
    </div>
  );
}
