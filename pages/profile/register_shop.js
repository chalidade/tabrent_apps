import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import { useRouter } from "next/router";

export default function OrderDate() {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [lastName, setLastName] = useState();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();

  const handleSave = () => {
    let json = {
    action: "save",
    db: "tabrent",
    table: "tx_user",
    primaryKey: "user_id",
    value: [{
          user_id: null,
          user_first_name: name,
          user_last_name: lastName,
          user_phone_number: phone,
          user_email: email,
          user_username: email,
          user_address: address,
          user_password: "tabrent",
          user_province: province,
          user_city: city,
          user_district: district,
          user_type: 2,
          user_status: 0
          }]
    }

    fetch_data(STORE, json).then(function (data) {
      if (data.success) {
        alert("Rental Owner Register Successfully");
        router.push('/profile/admin_menu');
      } else {
        alert("Rental Owner Register Failed");
        router.push('/profile/admin_menu');
      }
    });
  }

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
        <p className="mt-3 text-secondary weight-600">
          First Name <br />
          <input onChange={(e)=> setName(e.target.value)} className="form-control mt-2" />
        </p>
        <p className="mt-3 text-secondary weight-600">
          Last Name <br />
          <input onChange={(e)=> setLastName(e.target.value)} className="form-control mt-2" />
        </p>
        <p className="mt-3 text-secondary weight-600">
          Email <br />
          <input onChange={(e)=> setEmail(e.target.value)} className="form-control mt-2" />
        </p>
        <p className="mt-3 text-secondary weight-600">
          Phone Number <br />
          <input onChange={(e)=> setPhone(e.target.value)} className="form-control" />
        </p>
        <p className="mt-3 text-secondary weight-600">Province</p>
            <select className="form-control" 
              onChange={(e)=>handleChangeProvince(e)}
              >
              <option selected disabled>-- Your Province --</option>
            {
              provinces.length !== 0 ? provinces.map((provinces, index) => {
                return (<option value={provinces.prov_id}>{provinces.prov_name}</option>)
              }) : ""
            }
              
            </select>
            <p className="mt-3 text-secondary weight-600">City</p>
            <select className="form-control" 
              onChange={(e)=>handleChangeCity(e)}
              >
              <option selected disabled>-- Your City --</option>
              {
                cities.length !== 0 ? cities.map((cities, index) => {
                  return (<option value={cities.city_id}>{cities.city_name}</option>)
                }) : ""
              }
            </select>
            <p className="mt-3 text-secondary weight-600">Districts</p>
            <select className="form-control" 
              onChange={(e)=>handleChangeDistrict(e)}
              >
              <option selected disabled>-- Your District --</option>
              {
                districts.length !== 0 ? districts.map((districts, index) => {
                  return (<option value={districts.dis_id}>{districts.dis_name}</option>)
                }) : ""
              }
            </select>
        <p className="mt-3 text-secondary weight-600">
          Address <br />
          <input onChange={(e)=> setAddress(e.target.value)} className="form-control mt-2" />
        </p>
          <button onClick={() => handleSave()} className="button-primary p-3 w-100 mt-3">Save</button>
      </div>
      <div className="main"></div>
    </div>
  );
}
