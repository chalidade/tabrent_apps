import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images";
import Banner from "../../components/home/banner";
import ButtonIcon from "../../components/home/button_icon";
import Cards from "../../components/home/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX } from "../../config/api_url";
import { Button } from "react-bootstrap";
import { BsFilterRight } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";

export default function Index() {
  const [product, setProduct] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_product",
        raw : {
          selected : "ROUND((SUM(`rating_number`) / COUNT(`rating_number`)), 0) as `rating`, `tx_product`.*"
        },
        groupby: "product_id",
        leftJoin: [
          {
              table: "tx_rating",
              field1: "tx_rating.rating_product_id",
              field2: "tx_product.product_id"
          }],
        where: [["product_status", "=", "1"]]
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

      let json_banner = {
        action: "list",
        db: "tabrent",
        table: "tx_banner"
     };
  
      fetch_data(INDEX, json_banner).then(function (data) {
        if (data.success) {
          let photo = [];
          if (data.count == 1) {
            let photo_data = JSON.parse(data.result.banner_image);
            photo.push(photo_data[0]);
          } else {
              data.result.forEach(value => {
                let photo_data = JSON.parse(value.banner_image);
                photo.push(photo_data[0]);
              });
          }
          setBanner(photo);
        } else {
         setBanner([]);
        }
      });

    }
  }, [])

  const handleFilter = (e) => {
    let category = e;
    let json = {
      action : "list",
      db : "tabrent",
      table : "tx_product",
      where: [["product_status", "=", "1"], ["product_category", "=", category]]
    };

    fetch_data(INDEX, json).then(function (data) {
      if (data.success) {
        if (data.count == 1) {
          setProduct([data.result]);
        } else {
          setProduct(data.result);
        }
      } else {
        setProduct([]);
      }
    });

  }

  return (
    <div>
      <TopNav back="true" text="Home" />
      <div className="main" style={{ height: "auto", minHeight: "100vh" }}>
        <Banner data={banner} />
        <div className="mt-4" style={{ width: "100%", overflowX: "scroll" }}>
          <table>
            <tr>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Bicycle"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                    <img id="Bicycle" src="/icons/icon_bicycle.svg" className="mr-2" />
                    <span id="Bicycle">Bicycle</span>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Motorcycle"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <img id="Motorcycle" src="/icons/icon_bicycle.svg" className="mr-2" />
                  <span id="Motorcycle">Motorcycle</span>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Box"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <img id="Box" src="/icons/icon_box.svg" className="mr-2" />
                  <span id="Box">Box</span>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Pickup"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <img id="Pickup" src="/icons/icon_truck.svg" className="mr-2" />
                  <span id="Pickup">Pickup</span>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Bus"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <img id="Bus" src="/icons/icon_bus.svg" className="mr-2" />
                  <span id="Bus">Bus</span>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Car"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <img id="Car" src="/icons/icon_car.svg" className="mr-2" />
                  <span id="Car">Car</span>
                </button>
              </td>
              <td className="mr-3" style={{ paddingRight: "10px" }}>
                <button
                  id="Ambulance"
                  onClick={e => handleFilter(e.target.id)}
                  className="button-primary p-3 pl-3 pr-3"
                  style={{
                    borderRadius: "10px",
                    height: "55px",
                    width: "125px",
                  }}
                >
                  <img id="Ambulance" src="/icons/icon_car.svg" className="mr-2" style={{width: '30px'}} />
                  <span id="Ambulance">Ambulance</span>
                </button>
              </td>
            </tr>
          </table>
        </div>

        <div
          className="container mt-3"
          style={{ height: "auto", width: "auto" }}
        >
          <div className="row">
            <div className="col">
              <p
                style={{
                  width: "119px",
                  height: "24px",
                  left: "31px",
                  top: "409px",
                  size: "20px",
                  fontFamily: "Calibri",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "20px",
                  lineHeight: "24px",

                  color: "#000000",
                }}
              >
                Ready to rent!
              </p>
            </div>
          </div>
        </div>
        <div
          className="container mt-2 col"
          style={{ width: "auto", height: "auto", marginBottom: "0px" }}
        >
          <div className="row mt-4">
            {product.length !== 0 ? product.map((data, index) => {
              return <Cards data={data} />;
            })  : (<center style={{width: '100%',marginTop: '40px'}}><img src="/icons/icon_no_product.svg" /></center>)}
          </div>
        </div>
      </div>
    </div>
  );
}
