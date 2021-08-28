import TopNav from "../../components/globals/top_nav";
import { TextField } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { INDEX, STORE } from "../../config/api_url";

export default function Register() {
  // Store Data
  const [firstName, setFirstName] = useState();
  const [show, setShow] = useState(false);
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState(0);
  const [ktpNumber, setKtpNumber] = useState();
  const [address, setAddress] = useState();
  const [asId, setAsId] = useState();
  const [asName, setAsName] = useState();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [uploadIdCard, setUploadIdCard] = useState();
  const [uploadIdPhoto, setUploadIdPhoto] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();

  const router = useRouter();
  const [indexPage, setIndexpage] = useState(0);
  const [page, setPage] = useState([1, 0, 0]);
  const [gender, setGander] = useState();
  const [registerAs, setRegisterAs] = useState();
  const changeGender = (event) => {
    setGander(event.target.value);
  };

  const style = {
    textField: { marginTop: "10px", marginBottom: "10px" },
    textFieldAlert: { marginTop: "10px", marginBottom: "10px", borderBottom: "solid thin red" },
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

  const handleNext = () => {
    let tmpPage = [...page];
    let index = indexPage + 1;
    if (index < 3 && index > -1) {
      setIndexpage(index);
      tmpPage[index] = 1;
      setPage(tmpPage);
    }
  };

  const handleFinish = async () => {
    let json_check = {
      action: "list",
      db: "tabrent",
      table: "tx_user",
      where: [['user_email', '=', email]]
  };

    fetch_data(INDEX, json_check).then(function (data) {
      if (data.success) {
       alert("Email Already Register on Our System");
      } else {
        let json = {
          action : "save",
          db : "tabrent",
          table : "tx_user",
          primaryKey : "user_id",
          value: [
            {
              user_id: null,
              user_first_name: firstName,
              user_last_name: lastName,
              user_phone_number: phoneNumber,
              user_email: email,
              user_username: username,
              user_password: password,
              user_personal_id_number: ktpNumber,
              user_address: address,
              user_province: province,
              user_city: city,
              user_district: district,
              user_type: asId ? asId : 1,
              user_status: 0,
            },
          ],
        };
    
        
        fetch_data(STORE, json).then(function (result) {
          if (result.success) {
            let id = result.id;
            let json_ktp = {
              action: "upload_base64",
              db: "tabrent",
              table: "tx_user",
              where: [
                  [
                      "user_id",
                      "=",
                      id
                  ]
              ],
              update : "user_id_photo",
              main : false,
              value : [uploadIdCard]
          }
    
          let json_ktp_photo = {
            action: "upload_base64",
            db: "tabrent",
            table: "tx_user",
            where: [
                [
                    "user_id",
                    "=",
                    id
                ]
            ],
            update : "user_id_photo_with_user",
            main : false,
            value : [uploadIdPhoto]
        }
        
        fetch_data(STORE, json_ktp).then(function (data) {
          if (data.success) {
           console.log("Upload KTP Success");
          } else {
           console.log("Upload KTP Failed");
          }
        });
    
        fetch_data(STORE, json_ktp_photo).then(function (data) {
          if (data.success) {
           console.log("Upload KTP + Photo Success");
          } else {
           console.log("Upload KTP + Photo Failed");
          }
        });
            handleNext();
          } else {
            alert("Check Your Data");
          }
        });
      }
    });
  };

  const handleBack = () => {
    let tmpPage = [...page];
    let index = indexPage - 1;
    if (index < 4 && index > -1) {
      setIndexpage(index);
      tmpPage[indexPage] = 0;
      setPage(tmpPage);
    } else {
      router.back();
    }
  };

  const handleGetPhotoID = (e) => {
        // get the files
        let files = e.target.files;

        // Process each file
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {
    
          let file = files[i];
    
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
    
            // Make a fileInfo Object
            let fileInfo = {
              name: file.name,
              type: file.type,
              size: Math.round(file.size / 1000) + ' kB',
              base64: reader.result,
              file: file,
            };
    
            // Push it to the state
            setUploadIdPhoto(fileInfo);
          }
        }
  }

  const handleGetPhotoKTP = (e) => {
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        setUploadIdCard(fileInfo);
      }
    }
  }

  const handleSetAs = (id, name) => {
    setAsId(id);
    setAsName(name);
    setShow(false);
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
    <div>
      <TopNav
        back="true"
        text="Register"
        arrow="true"
        page="Profile"
        onClick={handleBack}
      />
      <div
        className="main ml-3 mr-3 p-3"
        style={{ height: "auto", overflow: "hidden" }}
      >
        <table width="200px">
          <tr>
            {page.map((page, index) => {
              return page == 1 ? (
                <td>
                  <img src="/profile/icon_progrees_active.svg" />
                </td>
              ) : (
                <td>
                  <img src="/profile/icon_progrees.svg" />
                </td>
              );
            })}
          </tr>
        </table>
        <p className="color-primary mt-1" style={{ fontSize: "14px" }}>
          {indexPage !== 2
            ? "Please complete following step below"
            : "Successful Register"}
        </p>
        {indexPage == 0 ? (
          <div>
            {/* <p onClick={() => setShow(true)} style={{ borderBottom: 'solid thin black', paddingBottom: '10px' }}>{asName ? asName : "Register As"}</p> */}
            <TextField
              style={style.textField}
              fullWidth={true}
              onChange={(e) => setFirstName(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="First Name"
            />
            <TextField
              style={style.textField}
              className="mt-15 mb-15"
              fullWidth={true}
              onChange={(e) => setLastName(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="Last Name (Opsional)"
            />
            <TextField
              style={style.textField}
              fullWidth={true}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="Phone Number"
            />
            <TextField
              type="email"
              style={style.textField}
              fullWidth={true}
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="Email"
            />
            <TextField
              style={style.textField}
              fullWidth={true}
              onChange={(e) => setUsername(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="Username"
            />
            <TextField
              type="password"
              style={style.textField}
              fullWidth={true}
              onChange={(e) => setPassword(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="Password"
            />
            <TextField
              type="password"
              style={password !== confirmPassword ? style.textFieldAlert : style.textField}
              fullWidth={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              label="Confirm Password"
            />
            {
              password.length !== 0 && password == confirmPassword ? (
                <button
                  onClick={handleNext}
                  className="button-primary mt-3"
                  style={{ width: "100%", padding: "10px"}}
                >
                  Next
                </button>
              ) : ""
            }
            
          </div>
        ) : indexPage == 1 ? (
          <div>
            <TextField
              style={style.textField}
              fullWidth={true}
              id="standard-basic"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setKtpNumber(e.target.value)}
              defaultValue=""
              label="Personal ID Number (KTP)"
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
              <option selected disabled>-- Your Province --</option>
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
              <option selected disabled>-- Your City --</option>
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
              <option selected disabled>-- Your District --</option>
              {
                districts.length !== 0 ? districts.map((districts, index) => {
                  return (<option value={districts.dis_id}>{districts.dis_name}</option>)
                }) : ""
              }
            </select>
            <TextField
              style={style.textField}
              className="mt-15 mb-15"
              fullWidth={true}
              onChange={(e) => setAddress(e.target.value)}
              id="standard-basic"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              label="Full Address"
            />
            <p className="mt-4 text-secondary weight-600">
              Upload Your ID Card Photo
            </p>
            <div
              style={{
                width: "100%",
                background: `url(${uploadIdCard ? uploadIdCard.base64 : "#F7F7F7"})`,
                height: "170px",
                borderRadius: "10px",
                backgroundSize: "cover"
              }}
            ></div>
            <label htmlFor="upload_ktp" onChange={e => handleGetPhotoKTP(e)} className="button-primary mt-3 pl-5 pr-5" style={{ padding: "10px" }}>
            <input 
              type="file"
              id="upload_ktp"
              style={{display:'none'}}
            />
            Upload
            </label>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>
              (max file size 2 Mb)
            </span>
            <p className="mt-4 text-secondary weight-600">
              Upload Selfie With ID Card Photo
            </p>
            <div
              style={{
                width: "100%",
                background: `url(${uploadIdPhoto ? uploadIdPhoto.base64 : "#F7F7F7"})`,
                height: "170px",
                borderRadius: "10px",
                backgroundSize: "cover"
              }}
            >
            {uploadIdPhoto ? "" : (
              <center>
                <img
                  src="/profile/img_selfie_ktp.svg"
                  style={{ width: "15vh" }}
                />
              </center>
              )}
              
            </div>
            <label htmlFor="upload_ktp_with_photo" onChange={e => handleGetPhotoID(e)} className="button-primary mt-3 pl-5 pr-5" style={{ padding: "10px" }}>
            <input 
              type="file"
              id="upload_ktp_with_photo"
              style={{display:'none'}}
            />
            Upload
            </label>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>
              (max file size 2 Mb)
            </span>
            <button
              onClick={handleFinish}
              className="button-primary mt-4"
              style={{ width: "100%", padding: "10px" }}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <img
              src="/profile/img_register_success.svg"
              style={{ marginTop: "70px" }}
            />
            <button
              onClick={() => router.push('/')}
              className="button-primary"
              style={{ width: "100%", padding: "10px", marginTop: "70px" }}
            >
              Finish
            </button>
          </div>
        )}
      </div>
        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Body>
            <h4 className="text-center mb-4 pb-3">Register As</h4>
            <table width="100%">
              <tr>
                <td className="text-center">
                  <div onClick={(id, name) => handleSetAs(1, "Standart User")}>
                    <img
                      src="/icons/icon_standart_user.png"
                    />
                    <p style={{ fontWeight: '700', marginTop: '10px' }}>Standart User <br /> <font style={{fontWeight: '500', fontSize: '12px'}}>if you want rent car</font></p>
                  </div>
                </td>
                <td className="text-center" onClick={(id, name) => handleSetAs(2, "Rental Owner")}>
                  <div>
                    <img
                      src="/icons/icon_owner.png"
                    />
                    <p style={{ fontWeight: '700', marginTop: '10px' }}>Rental Owner <br /><font style={{fontWeight: '500', fontSize: '12px'}}>if you are rental owner</font></p>
                  </div>
                </td>
              </tr>
            </table>
          </Modal.Body>
      </Modal>
    </div>
  );
}
