import TopNav from "../../components/globals/top_nav";
import ImageBanner from "../../components/globals/images";
import Banner from "../../components/home/banner";
import ButtonIcon from "../../components/home/button_icon";
import Cards from "../../components/home/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX } from "../../config/api_url";
import { Modal, Button } from "react-bootstrap";
import { BsFilterRight } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";

export default function Index() {
  const [product, setProduct] = useState([]);
  const [banner, setBanner] = useState([]);

  const [modalFilter, setModalFilter] = useState(false);
  const [filterProductName, setFilterProductName] = useState("");
  const [filterProductBrand, setFilterProductBrand] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [city, setCity] = useState('');
  const [province_id, setProvince] = useState('');
  const [district, setDistrict] = useState('');

  useEffect(() => {
      let json = {
        action: "list",
        db: "tabrent",
        table: "tm_cities",
        orderBy: ["city_name", "ASC"]
     };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
            setAllCities(data.result);
        }
      });

      let json_provice = {
        action: "list",
        db: "tabrent",
        table: "tm_provinces",
        orderBy: ["prov_name", "ASC"]
     };
  
      fetch_data(INDEX, json_provice).then(function (data) {
        if (data.success) {
          setProvinces(data.result);
        }
      });

      let json_district = {
        action: "list",
        db: "tabrent",
        table: "tm_districts",
        orderBy: ["dis_name", "ASC"]
     };
  
      fetch_data(INDEX, json_district).then(function (data) {
        if (data.success) {
            setAllDistricts(data.result);
        }
      });
  }, [])

  
  const handleChangeProvince = (e) => {
    let city = allCities.filter(cities => cities.prov_id  == e.target.value);
    setProvince(e.target.value);
    setCities(city);
  }

  const handleChangeCity = (e) => {
    let district = allDistricts.filter(districts => districts.city_id  == e.target.value);
    setCity(e.target.value);
    setDistricts(district);
  }

  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
  }



  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      let status, getProvince;
      let filter = [];
    
      status = ['product_status', '=', '1'];
      filter.push(status);
    
      if (data.user_province !== null) {
        getProvince = ['user_province', '=', data.user_province];
        filter.push(getProvince);
      }

      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_product",
        raw : {
          selected : "ROUND((SUM(`rating_number`) / COUNT(`rating_number`)), 0) as `rating`, `tx_product`.*, tx_user.user_province, tx_user.user_city, tx_user.user_district"
        },
        groupby: "product_id",
        leftJoin: [
          {
              table: "tx_rating",
              field1: "tx_rating.rating_product_id",
              field2: "tx_product.product_id"
          },
          {
            table: "tx_user",
            field1: "tx_user.user_id",
            field2: "tx_product.product_owner"
          }],
        where: filter
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
      let status, name, brand, minPrice, maxPrice, filterCity, filterProvince, filterDistrict, filterRating;
      let filter = [];
      
      status = ['product_status', '=', '1'];
      filter.push(status);

      console.log(filterProductName);
    
      if (filterProductName !== '') {
        name = ['product_name', 'like', '%'+filterProductName+'%'];
        filter.push(name);
      }

      if (filterProductBrand !== '') {
        brand = ['product_brand', '=', '%'+filterProductBrand+'%'];
        filter.push(brand);
      }

      if (filterMinPrice !== '') {
        minPrice = ['product_price', '>=', filterMinPrice];
        filter.push(minPrice);
      }

      if (filterMaxPrice !== '') {
        maxPrice = ['product_price', '<=', filterMaxPrice];
        filter.push(maxPrice);
      }

      if (city !== '') {
        filterCity = ['user_city', '=', city];
        filter.push(filterCity);
      }

      if (province_id !== '') {
        filterProvince = ['user_province', '=', province_id];
        filter.push(filterProvince);
      }

      if (district !== '') {
        filterDistrict = ['user_district', '=', district];
        filter.push(filterDistrict);
      }


      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_product",
        raw : {
          selected : "ROUND((SUM(`rating_number`) / COUNT(`rating_number`)), 0) as `rating`, `tx_product`.*, tx_user.user_province, tx_user.user_city, tx_user.user_district "
        },
        groupby: "product_id",
        leftJoin: [
          {
              table: "tx_rating",
              field1: "tx_rating.rating_product_id",
              field2: "tx_product.product_id"
          },
          {
            table: "tx_user",
            field1: "tx_user.user_id",
            field2: "tx_product.product_owner"
          }],
        where: filter
      };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
          } else {
            setProduct(data.result);
          }
        } else {
          setProduct(data.result);
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

      setModalFilter(false);
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
            <div className="col-10">
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
            <div className="col">
              <img src="/icons/icon_filter.png" style={{width: '20px'}} onClick={() => setModalFilter(true)} />
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
      <Modal show={modalFilter} onHide={() => setModalFilter(false)} style={{paddingLeft: '0px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table width="100%">
            <tr>
              <td>
                <p className="mb-1 mt-3">Product Name</p>
               <input className="form-control" type="text" value={filterProductName} onChange={(e) => setFilterProductName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Product Brand</p>
               <input className="form-control" type="text" value={filterProductBrand} onChange={(e) => setFilterProductBrand(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Product Min Price</p>
               <input className="form-control" type="text" value={filterMinPrice} onChange={(e) => setFilterMinPrice(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Product Max Price</p>
               <input className="form-control" type="text" value={filterMaxPrice} onChange={(e) => setFilterMaxPrice(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Province</p>
                <select className="form-control" onChange={(e)=>handleChangeProvince(e)}>
                    <option selected disabled>-- Your Province --</option>
                  {
                    provinces.length !== 0 ? provinces.map((provinces, index) => {
                      return (<option value={provinces.prov_id}>{provinces.prov_name}</option>)
                    }) : ""
                  }
              </select>
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">City</p>
                <select className="form-control" onChange={(e)=>handleChangeCity(e)}>
                    <option selected disabled>-- Your City --</option>
                    {
                      cities.length !== 0 ? cities.map((cities, index) => {
                        return (<option value={cities.city_id}>{cities.city_name}</option>)
                      }) : ""
                    }
                  </select>
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">District</p>
                <select className="form-control mb-2" onChange={(e)=>handleChangeDistrict(e)}>
                    <option selected disabled>-- Your District --</option>
                    {
                      districts.length !== 0 ? districts.map((districts, index) => {
                        return (<option value={districts.dis_id}>{districts.dis_name}</option>)
                      }) : ""
                    }
                  </select>
              </td>
            </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleFilter()}>
            Filter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
