import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "@material-ui/core";
import TopNav from "../../components/globals/top_nav";

export default function OrderDate() {
  return (
    <div style={{ background: "#2F2F8D", overflow: "hidden" }}>
      <TopNav back="true" text="Back" arrow="true" background={false} />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "5vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div
        className="profile-main"
        style={{ overflow: "hidden", height: "90.5vh", top: "20vh" }}
      >
        <center>
          <p className="weight-700 color-primary" style={{ fontSize: "20px" }}>
            Register Shop
          </p>
        </center>
        <p className="mt-5 text-secondary weight-600">
          Personal ID Number (KTP) <br />
          <input className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Upload Your ID Card Photo <br />
          <div className="profile-photo-div"></div>
          <label htmlFor="upload_id_card" className="button-primary">
            Upload
            <input
              id="upload_id_card"
              type="file"
              style={{ display: "none" }}
            />
          </label>
          <span className="ml-2" style={{ fontSize: "12px" }}>
            (max file size 2 Mb)
          </span>
        </p>
        <p className="mt-4 text-secondary weight-600">
          Upload With ID Card Photo <br />
          <div className="profile-photo-div"></div>
          <label htmlFor="upload_id_card_with_photo" className="button-primary">
            Upload
            <input
              id="upload_id_card_with_photo"
              type="file"
              style={{ display: "none" }}
            />
          </label>
          <span className="ml-2" style={{ fontSize: "12px" }}>
            (max file size 2 Mb)
          </span>
        </p>
        <Link href="/profile/partner_profile">
          <button className="button-primary p-3 w-100 mt-3">Finish</button>
        </Link>
      </div>
      <div className="main"></div>
    </div>
  );
}
