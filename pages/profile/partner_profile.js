import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";
import { Link } from "@material-ui/core";

export default function OrderDate() {
  return (
    <div style={{ background: "#2F2F8D", overflow: "hidden" }}>
      <TopNav
        back="true"
        text="Back"
        arrow="true"
        background={false}
        page="Profile"
      />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "30vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div
        className="profile-main"
        style={{ overflow: "hidden", height: "60vh", top: "50vh" }}
      >
        <p className="weight-600" style={{ fontSize: "12px" }}>
          ORDERS
        </p>
        <table width="100%">
          <tr>
            <td className="text-left">
              <Link href="/profile/list_rent">
                <img src="/icons/icon_new_order.svg" />
              </Link>
            </td>
            <td className="text-center">
              <Link href="/profile/list_rent">
                <img src="/icons/icon_rented.svg" />
              </Link>
            </td>
            <td className="text-right">
              <Link href="/profile/list_rent">
                <img src="/icons/icon_complete.svg" />
              </Link>
            </td>
          </tr>
        </table>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
          PRODUCTS
        </p>
        <p style={{ fontSize: "12px" }}>0 Products</p>
        <hr />
        <p className="mb-1 weight-600" style={{ fontSize: "12px" }}>
          REVIEWS
        </p>
        <p style={{ fontSize: "12px" }}>0 Reviews</p>
        <hr />
        <button className="button-primary p-3 w-100 mt-3">
          Add New Product
        </button>
      </div>
      <div
        className="profile-mitra text-center"
        style={{ width: "100%", marginLeft: "0px" }}
      >
        <img src="/profile/icon_logo_mitra.svg" style={{ width: "120px" }} />
        <br />
        <p className="mt-3 text-white weight-600" style={{ fontSize: "20px" }}>
          Tabrent rental
        </p>
        <p className="text-white" style={{ marginTop: "-10px" }}>
          There is no rating for this rental shop
        </p>
        <table width="100%" className="profile-name-balance">
          <tr>
            <td className="text-left pl-4">Balance</td>
            <td className="text-right pr-4">Rp 1.000.000</td>
          </tr>
        </table>
      </div>
      <div className="main"></div>
    </div>
  );
}
