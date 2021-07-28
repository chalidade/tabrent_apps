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
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function OrderDate() {
  const [product, setProduct] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [user, setUser] = useState();
  const router = useRouter();

  const handleEdit = e => {
    router.push({
      pathname: '/profile/product_new/',
      query: { id: e.target.id },
    })
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
      let data = JSON.parse(localStorage.getItem('user_data'));
      setUser(data);
      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_product",
        "where": [
          [
              "product_owner",
              "=",
              data.user_id
          ]
        ]
      };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
          } else {
            setProduct(data.result);
          }
        }
      });
    }
  }, [])


  return (
    <div>
      <TopNav back="true" text="Back" arrow="true" customPage="profile/partner_profile" />
      <div className="main" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td className="text-center">
              <div className="partner-profile-text-logo" style={{fontSize: '24px', width: '50px', height: '50px', boxShadow: 'none', background: '#343434'}}> 
                {user ? user.user_first_name.charAt(0) + user.user_last_name.charAt(0) : "TR" }
              </div>
            </td>
            <td>
              <p className="weight-700 mb-0 mt-1" style={{ fontSize: "18px" }}>
              {user ? user.user_first_name + " " + user.user_last_name : "Rental Owner" }
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
      <div className="profile-div-product" style={{paddingTop: product.length !== 0 ? "20px" : "100px", paddingBottom: product.length !== 0 ? "20px" : "0px"}}>
        {product.length !== 0 ? product.map((data, index) => {
          return (
            <div className="product-div">
              <table>
                <tr>
                  <td>
                    <center>
                      <div className="product-profile-div" style={{background: `url(${data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"})`, backgroundSize: 'cover'}}></div>
                    </center>
                  </td>
                  <td>
                    <p className="text-left pl-3 p-0 m-0" style={{ fontWeight: '700' }}>{data.product_name}</p>
                    <p className="text-left pl-3 p-0 m-0" style={{ fontSize: '12px' }}>{data.product_brand}</p>
                    <p className="text-left pl-3 p-0 m-0" style={{ fontSize: '14px' }}>{data.product_price}</p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="pl-3 text-left">
                    <button id={data.product_id} onClick={e => handleEdit(e)} style={{border: 'none', background: 'none', fontSize: '14px'}}>
                      <img src="/icons/icon_edit.svg" style={{marginTop: '-5px', width: '15px'}} /> Edit
                    </button>

                    {/* <button onClick={() => handleDelete()} style={{border: 'none', background: 'none', marginLeft: '25px', fontSize: '14px'}}>
                      <img src="/icons/icon_trash.svg" style={{marginTop: '-5px', width: '15px'}} /> Delete
                    </button> */}
                  </td>
                </tr>
              </table>
            </div>);
        }) : ( 
          <div>
            <img src="/icons/icon_no_product.svg" />
          </div> )}
      </div>
    </div>
  );
}
