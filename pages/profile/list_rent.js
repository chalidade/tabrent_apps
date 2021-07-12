 import TopNav from "../../components/globals/top_nav";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";

export default function OrderDate() {
  return (
    <div>
      <TopNav back="true" text="Back" arrow="true" />
      <div className="main" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td className="text-center">
              <img
                src="/profile/icon_logo_mitra.svg"
                style={{ width: "50px" }}
              />
            </td>
            <td>
              <p className="weight-700 mb-0 mt-1" style={{ fontSize: "18px" }}>
                Tabrent Rental
              </p>
              <p style={{ fontSize: "11px" }}>
                There is no rating for this rental shop
              </p>
            </td>
          </tr>
        </table>
        <div className="mt-4" style={{ width: "330px", overflowX: "scroll" }}>
          <table>
            <tr>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_bicycle.svg" />
                      </td>
                      <td className="pl-2"> Bicycle</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img
                          src="/icons/icon_motorcyle.svg"
                          style={{ width: "25px" }}
                        />
                      </td>
                      <td className="pl-2"> Motorcycle</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_box.svg" />
                      </td>
                      <td className="pl-2"> Box</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_truck.svg" />
                      </td>
                      <td className="pl-2"> Pickup</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_bus.svg" />
                      </td>
                      <td className="pl-2"> Bus</td>
                    </tr>
                  </table>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <img src="/icons/icon_car.svg" />
                      </td>
                      <td className="pl-2"> Car</td>
                    </tr>
                  </table>
                </button>
              </td>
            </tr>
          </table>
        </div>
        <table width="100%" className="mt-4">
          <tr>
            <td className="text-left">
              <p className="mb-0 weight-700">Vehicles</p>
            </td>
            <td className="text-right">
              <button className="button-primary pl-3 pr-3">
                <table>
                  <tr>
                    <td>
                      <img src="/icons/icon_filter.svg" />
                    </td>
                    <td className="pl-2"> Filter</td>
                  </tr>
                </table>
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div className="profile-div-product">
        <img src="/icons/icon_no_product.svg" />
      </div>
    </div>
  );
}
