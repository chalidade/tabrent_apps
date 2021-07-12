import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";

export default function OrderDate() {
  return (
    <div style={{ background: "#2F2F8D", overflow: "hidden" }}>
    <TopNav back="true" text="Back" arrow="true" background={false} />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "7vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div className="profile-main" style={{ overflow: "hidden" }}>
        <center>
          <p className="weight-700 color-primary" style={{ fontSize: "20px" }}>
            Register Shop
          </p>
        </center>
        <p className="mt-5 text-secondary weight-600">
          Phone Number <br />
          <input className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Address <br />
          <input className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Bank <br />
          <input className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Bank Account <br />
          <input className="form-control mt-2 p-4" />
        </p>
        <button className="button-primary p-3 w-100 mt-3">Next</button>
      </div>
      <img src="/profile/icon_logo_mitra.svg" className="profile-mitra" />
      <div className="main"></div>
    </div>
  );
}
