import TopNav from "../../components/globals/top_nav";
import ListItem from "../../components/profiles/feedback";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Favorites() {
  return (
    <div style={{ background: "#fff" }}>
      <TopNav
        back="true"
        text="Terms And Conditions"
        arrow="true"
        page="Notification"
      />
      <div className="main ml-0 mr-0 pl-2 pr-2 mt-5" style={{ height: "auto" }}>
        <center>
          <img src="/icons/icon_term.svg" />
          <p
            style={{
              width: "80%",
              textAlign: "center",
              marginTop: "20px",
              color: "rgb(186 186 186)",
            }}
          >
            In order to start using Tabrent, please first agree to our{" "}
            <font style={{ color: "rgb(0 0 128)", fontWeight: "600" }}>
              Terms & Conditions.
            </font>
          </p>
          <div
            className="pl-4 mt-4 pr-4 text-left"
            style={{ height: "400px", overflow: "auto" }}
          >
            {" "}
            Until recently, the prevailing view assumed lorem ipsum was born as
            a nonsense text. “It's not Latin, though it looks like it, and it
            actually says nothing,” Before & After magazine answered a curious
            reader, “Its ‘words’ loosely approximate the frequency with which
            letters occur in English, which is why at a glance it looks pretty
            real.
            <br />
            <br />” As Cicero would put it, “Um, not so fast.” The placeholder
            text, beginning with the line “Lorem ipsum dolor sit amet,
            consectetur adipiscing elit”, looks like Latin because in its youth,
            centuries ago, it was Latin. Richard McClintock, a Latin scholar
            from Hampden-Sydney College, is credited with discovering the source
            behind the ubiquitous filler text. <br />
            <br />
            In seeing a sample of lorem ipsum, his interest was piqued by
            consectetur—a genuine, albeit rare, Latin word. Consulting a Latin
            dictionary led McClintock to a passage from De Finibus Bonorum et
            Malorum (“On the Extremes of Good and Evil”), a first-century B.C.
            text from the Roman philosopher Cicero. In particular, the garbled
            words of lorem ipsum bear an unmistakable resemblance to sections
            1.10.32–33 of Cicero's work, with the most notable passage excerpted
            below:{" "}
          </div>
        </center>
      </div>
    </div>
  );
}
