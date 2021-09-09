import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { MAIN, STORE, INDEX } from "../../config/api_url";
import { Modal } from 'react-bootstrap';

const style = {
  textField: { marginTop: "10px", marginBottom: "10px" },
  mt50: { marginTop: "50px" },
  btnOutline: {
    width: "120px",
    textTransform: "capitalize",
    borderColor: "#2F2F8D",
    color: "#2F2F8D",
  },
  btnFill: {
    width: "120px",
    textTransform: "capitalize",
    background: "#2F2F8D",
    color: "#FFF",
  },
};

export default function AccountInformation() {
  // Store Data
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [gender, setGander] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthdate, setBirthdate] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [ktpNumber, setKtpNumber] = useState();
  const [address, setAddress] = useState();
  const [uploadIdCard, setUploadIdCard] = useState();
  const [uploadIdPhoto, setUploadIdPhoto] = useState();
  const [modalPhoto, setModalPhoto] = useState(false);
  const [modalPhotoData, setModalPhotoData] = useState();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [cityName, setCityName] = useState();
  const [provinceName, setProvinceName] = useState();
  const [districtName, setDistrictName] = useState();


  const handleFinish = async () => {
    let json = {
      action : "update",
      db : "tabrent",
      table : "tx_user",
      where : [["user_id", "=", userId]],
      value: {
              user_id: userId,
              user_first_name: firstName,
              user_last_name: lastName,
              user_phone_number: phoneNumber,
              user_email: email,
              user_birthdate: birthdate,
              user_username: username,
              user_password: password,
              user_personal_id_number: ktpNumber,
              user_province: province,
              user_city: city,
              user_district: district,
              user_address: address,
              user_type: 1
            },
    };

    fetch_data(STORE, json).then(function (result) {
      if (result.success) {
        alert("Update Success");
        let user = result.result[0];
          localStorage.setItem("user_data", JSON.stringify(user));
          setFirstName(user.user_first_name);
          setLastName(user.user_last_name);
          setBirthdate(user.user_birthdate);
          setPhoneNumber(user.user_phone_number);
          setUsername(user.user_username);
          setEmail(user.user_email);
          setKtpNumber(user.user_personal_id_number);
          setAddress(user.user_address);
          setUserId(user.user_id);
      } else {
        alert("Check Your Data");
      }
    });
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let json_city = {
          action: "list",
          db: "tabrent",
          table: "tm_cities",
          orderBy: ["city_name", "ASC"]
      };
      
      let json_provice = {
        action: "list",
        db: "tabrent",
        table: "tm_provinces",
        orderBy: ["prov_name", "ASC"]
      };

    let json_district = {
        action: "list",
        db: "tabrent",
        table: "tm_districts",
        orderBy: ["dis_name", "ASC"]
    };

    let data = JSON.parse(localStorage.getItem('user_data'));
    let json = {
      action : "list",
      db : "tabrent",
      table : "tx_user",
      "where": [
        [
            "user_id",
            "=",
            data.user_id
        ]
      ]
    };
  
      fetch_data(INDEX, json_provice).then(function (province) {
        if (province.success) {
          setProvinces(province.result);
          fetch_data(INDEX, json_city).then(function (cities) {
            if (cities.success) {
                setAllCities(cities.result);
                fetch_data(INDEX, json_district).then(function (districts) {
                  if (districts.success) {
                      setAllDistricts(districts.result);
                      fetch_data(INDEX, json).then(function (data) {
                        if (data.success) {
                          let user = data.result;
                          let card = JSON.parse(user.user_id_photo)[0];
                          let ktp_foto = JSON.parse(user.user_id_photo_with_user)[0];
                          localStorage.setItem("user_data", JSON.stringify(user));
                          
                          if (user.user_city !== null) {
                            let city_name = cities.result.filter(cities => cities.city_id  == user.user_city);
                            city_name = city_name[0].city_name;
                            setCityName(city_name);
                          }
                          
                          if (user.user_province !== null) {
                            let prov_name = province.result.filter(province => province.prov_id  == user.user_province);
                            prov_name = prov_name[0].prov_name;
                            setProvinceName(prov_name);
                          }
                          
                          if (user.user_district !== null) {
                            let dis_name = districts.result.filter(dis => dis.dis_id  == user.user_district);
                            dis_name = dis_name[0].dis_name;
                            setDistrictName(dis_name);
                          }
                
                          setCity(user.user_city);
                          setProvince(user.user_province);
                          setDistrict(user.user_district);
                          setFirstName(user.user_first_name);
                          setLastName(user.user_last_name);
                          setBirthdate(user.user_birthdate);
                          setPhoneNumber(user.user_phone_number);
                          setUsername(user.user_username);
                          setEmail(user.user_email);
                          setKtpNumber(user.user_personal_id_number);
                          setAddress(user.user_address);
                          setUserId(user.user_id);
                          setUploadIdCard(card);
                          setUploadIdPhoto(ktp_foto);
                        }
                      });
                  }
                });
            }
          });
        }
      });
    }
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

  return (
    <div className="mb-30">
      <TopNav
        back="true"
        text="Account Information"
        arrow="true"
        page="Profile"
      />
      <div className="main">
        <TextField
          active={true}
          style={style.textField}
          fullWidth={true}
          value={firstName}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setFirstName(e.target.value)}
          id="standard-basic"
          label="First Name"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Last Name"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={gender}
          onChange={e => setGander(e.target.value)}
          SelectProps={{
            native: true,
          }}
          select
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Gender"
        >
          {["Male", "Female"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          style={style.textField}
          id="date"
          label="Birthday"
          type="date"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Phone Number"
        />
        <p className="mb-1 mt-2 label-form">Province</p>
        <select className="form-control" 
          onChange={(e)=>handleChangeProvince(e)}
          style={{
            color: '#000',
            borderTop: 'none',
            paddingLeft: '0px',
            borderRight: 'none',
            borderBottom: 'thin solid rgb(0, 0, 0)',
            borderLeft: 'none',
            borderImage: 'initial',
            borderRadius: '0px'
        }}>
          <option value={province}>{provinceName}</option>
        {
          provinces.length !== 0 ? provinces.map((provinces, index) => {
            return (<option value={provinces.prov_id}>{provinces.prov_name}</option>)
          }) : ""
        }
          
        </select>
        <p className="mb-1 mt-3 label-form">City</p>
        <select className="form-control" 
          onChange={(e)=>handleChangeCity(e)}
          style={{
            color: '#000',
            borderTop: 'none',
            paddingLeft: '0px',
            borderRight: 'none',
            borderBottom: 'thin solid rgb(0, 0, 0)',
            borderLeft: 'none',
            borderImage: 'initial',
            borderRadius: '0px'
        }}>
          <option value={city}>{cityName}</option>
          {
            cities.length !== 0 ? cities.map((cities, index) => {
              return (<option value={cities.city_id}>{cities.city_name}</option>)
            }) : ""
          }
        </select>
        <p className="mb-1 mt-3 label-form">Districts</p>
        <select className="form-control mb-2" 
          onChange={(e)=>handleChangeDistrict(e)}
          style={{
            color: '#000',
            borderTop: 'none',
            paddingLeft: '0px',
            borderRight: 'none',
            borderBottom: 'thin solid rgb(0, 0, 0)',
            borderLeft: 'none',
            borderImage: 'initial',
            borderRadius: '0px'
        }}>
          <option value={district}>{districtName}</option>
          {
            districts.length !== 0 ? districts.map((districts, index) => {
              return (<option value={districts.dis_id}>{districts.dis_name}</option>)
            }) : ""
          }
        </select>
        <TextField
          style={style.textField}
          fullWidth={true}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          value={address}
          onChange={e => setAddress(e.target.value)}
          label="Current Address"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Email"
        />
        {/* <div className="mt-15 mb-15">
          <Link href="/profile/change_password">
            <font className="color-primary weight-600">Change Password</font>
          </Link>
        </div> */}
        <TextField
          style={style.textField}
          fullWidth={true}
          value={ktpNumber}
          onChange={e => setKtpNumber(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="ID Card Number"
        />
        {/* <div className="mt-30 mb-30">
          <p className="weight-500" onClick={() => (setModalPhoto(true), setModalPhotoData('card'))}>Photo ID Card</p>
        </div>
        <div className="mt-30 mb-30">
          <p className="weight-500" onClick={() => (setModalPhoto(true), setModalPhotoData('card_photo'))}>Photo With ID Card</p>
        </div> */}
        {/* <div className="mt-30">
          <p className="weight-500">Driving Licence Card</p>
        </div> */}
        <Grid container style={style.mt50}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Button variant="outlined" onClick={() => router.push("/")} style={style.btnOutline}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleFinish} variant="outlined" style={style.btnFill}>
              Update
            </Button>
          </Grid>
        </Grid>
      </div>
      <Modal show={modalPhoto} onHide={() => setModalPhoto(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalPhotoData == 'card' ? 'Photo ID Card' : 'Photo With ID Card'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalPhotoData == 'card' ? MAIN+uploadIdCard : MAIN+uploadIdPhoto } style={{width: '100%'}} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
