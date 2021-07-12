import { useState, useEffect } from "react";
import { Link } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderDate() {
  return (
    <div>
      <div className="main" style={{ height: "auto" }}>
        <center style={{ marginTop: "70px" }}>
          <img
            src="/profile/icon_logo_tabrent.svg"
            style={{ width: "150px" }}
          />
          <p
            className="mt-3"
            style={{ fontSize: "14px", width: "30vh", color: "#959595" }}
          >
            In order to start using Tabrent, please first agree to our{" "}
            <font className="color-primary weight-700">
              Terms & Conditions.
            </font>
          </p>
          <p
            className="text-left pl-3 pr-3 mt-5"
            style={{ height: "400px", overflow: "auto" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa
            tincidunt nunc pulvinar sapien. Enim nulla aliquet porttitor lacus
            luctus. Ipsum consequat nisl vel pretium lectus quam id leo. Felis
            imperdiet proin fermentum leo vel orci porta non pulvinar.
            Pellentesque dignissim enim sit amet venenatis urna cursus eget
            nunc. Risus commodo viverra maecenas accumsan lacus vel. Amet
            facilisis magna etiam tempor orci eu. Ultrices gravida dictum fusce
            ut placerat orci. <br />
            <br />
            Sed faucibus turpis in eu. Viverra nibh cras pulvinar mattis. Et
            egestas quis ipsum suspendisse. Consequat mauris nunc congue nisi
            vitae suscipit tellus. Consequat nisl vel pretium lectus quam id leo
            in vitae. Pretium aenean pharetra magna ac placerat vestibulum. Odio
            morbi quis commodo odio aenean. Amet aliquam id diam maecenas
            ultricies. Sed vulputate odio ut enim blandit. Ornare quam viverra
            orci sagittis. Eget gravida cum sociis natoque penatibus et magnis
            dis. Viverra mauris in aliquam sem fringilla ut morbi tincidunt
            augue. Quis vel eros donec ac odio tempor orci dapibus ultrices.{" "}
            <br />
            <br />
            Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus
            in. Ac tortor vitae purus faucibus ornare suspendisse sed nisi
            lacus. Feugiat in fermentum posuere urna nec tincidunt praesent. Et
            leo duis ut diam quam nulla porttitor. Viverra vitae congue eu
            consequat ac. Ante in nibh mauris cursus. Consectetur a erat nam at.
            Etiam tempor orci eu lobortis elementum. Enim sed faucibus turpis in
            eu mi bibendum neque. Quis varius quam quisque id. Eget velit
            aliquet sagittis id consectetur purus ut faucibus pulvinar. Donec
            enim diam vulputate ut. Aenean vel elit scelerisque mauris
            pellentesque pulvinar pellentesque habitant. Massa tempor nec
            feugiat nisl pretium fusce id velit. Neque aliquam vestibulum morbi
            blandit. <br />
            <br />
            Augue interdum velit euismod in pellentesque massa placerat duis
            ultricies. Viverra mauris in aliquam sem fringilla ut. Volutpat
            lacus laoreet non curabitur gravida arcu. Malesuada fames ac turpis
            egestas sed. Euismod lacinia at quis risus. Amet cursus sit amet
            dictum sit. Gravida dictum fusce ut placerat. Malesuada fames ac
            turpis egestas maecenas pharetra convallis posuere morbi. Fusce id
            velit ut tortor pretium viverra suspendisse potenti nullam. Nullam
            vehicula ipsum a arcu cursus vitae congue mauris. Ipsum nunc aliquet
            bibendum enim facilisis gravida neque convallis a. Habitasse platea
            dictumst quisque sagittis. Sed tempus urna et pharetra pharetra
            massa massa. Proin libero nunc consequat interdum varius sit amet
            mattis vulputate. Sed felis eget velit aliquet. <br />
            <br />
          </p>
        </center>
      </div>
      <Link href="/profile/register_shop/">
        <button
          className="button-primary w-100 p-2"
          style={{ borderRadius: "0px", position: "absolute", bottom: "0px" }}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
