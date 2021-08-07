import TopNav from "../../components/globals/top_nav";
import { TextField, Grid, Button, Link, Input } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

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
  const [productId, setProductId] = useState();
  const [photo, setPhoto] = useState([]);
  const [userId, setUserId] = useState();
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceWidthDriver, setPriceWithDriver] = useState(0);
  const [priceWidthDriverDiscount, setPriceWithDriverDiscount] = useState(0);
  const [generalRegulation, setGeneralRegulation] = useState();
  const [overTime, setOvertime] = useState();
  const [returnDate, setReturnDate] = useState();
  const [pickupDate, setPickupDate] = useState();
  const [pickupRule, setPickupRule] = useState();
  const [cancel, setCancel] = useState();
  
  const handleFinish = async () => {
    let json, json_file;
    if (productId) {
      json = {
        action : "update",
        db : "tabrent",
        table : "tx_product",
        where : [["product_id", "=", productId]],
        value: {
              product_id: productId,
              product_name : name,
              product_price : price,
              product_discount: discount,
              product_price_with_driver: priceWidthDriver,
              product_price_with_driver_discount: priceWidthDriverDiscount,
              product_brand : brand,
              product_category : category,
              product_rental_rules_overtime : overTime,
              product_rental_rules_regulation : generalRegulation,
              product_pickup_rules : pickupRule, 
              product_return_date: returnDate,
              product_pickup_date: pickupDate,
              product_cancelation_policy : cancel,
              product_owner : userId,
              product_status : 0
              },
      };
    } else {
      json = {
        action : "save",
        db : "tabrent",
        table : "tx_product",
        primaryKey : "product_id",
        value: [{
              product_name : name,
              product_price : price,
              product_discount: discount,
              product_price_with_driver: priceWidthDriver,
              product_price_with_driver_discount: priceWidthDriverDiscount,
              product_rent_count : 0,
              product_brand : brand,
              product_category : category,
              product_rental_rules_overtime : overTime,
              product_rental_rules_regulation : generalRegulation,
              product_pickup_rules : pickupRule, 
              product_return_date: returnDate,
              product_pickup_date: pickupDate,
              product_cancelation_policy : cancel,
              product_owner : userId,
              product_status : 0
              }],
      };
    }

    fetch_data(STORE, json).then(function (result) {
      if (result.success) {
        setProductId(result.id);

        // Image Upload
        json_file = {
          "action": "upload_base64",
          "db": "tabrent",
          "table": "tx_product",
          "update" : "product_image",
          "main" : true,
          "where": [
              [
                  "product_id",
                  "=",
                  result.id
              ]
          ],
          "value" : photo
        }

      fetch_data(STORE, json_file).then(function (result_file) {
        if (result_file.success) {
          alert("Update Success");
          router.push('/profile/list_rent');
        } else {
          alert("Upload File Failed");
        }
      });
      } else {
        alert("Check Your Data");
      }
    });

  };

  const handlePhoto = (e) => {
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
        allFiles.push(fileInfo);

        // If all files have been proceed
        if(allFiles.length == files.length){
            setPhoto(allFiles);
        }
      }
    }
  }

useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let data = JSON.parse(localStorage.getItem('user_data'));
      setUserId(data.user_id);
      setProductId(router.query.id);

      let json = {
        action : "list",
        db : "tabrent",
        table : "tx_product",
        "where": [
          [
              "product_id",
              "=",
              router.query.id
          ]
        ]
      };

      fetch_data(INDEX, json).then(function (data) {
        if (data.success) { 
          let product = data.result;
          setProductId(product.product_id);
          setCategory(product.product_category);
          setName(product.product_name);
          setBrand(product.product_brand);
          setPrice(product.product_price);
          setGeneralRegulation(product.product_rental_rules_regulation);
          setOvertime(product.product_rental_rules_overtime);
          setReturnDate(product.product_return_date);
          setPickupDate(product.product_pickup_date);
          setPickupRule(product.product_pickup_rules);
          setPhoto(JSON.parse(product.product_image));
          setCancel(product.product_cancelation_policy);
        }
      });
    }
  }, [])

  return (
    <div className="mb-30">
      <TopNav
        back="true"
        text="Product Name"
        arrow="true"
      />
      <div className="main">
      <h6 className="mt-3 mb-1" style={{fontWeight:'700'}}>Product Photo</h6>
      <div style={{width: '100%', overflowX: 'scroll'}}>
        <table className="mt-3 mb-3" style={{width: '100%'}}>
            <tr>
                <td>
                    <label htmlFor="upload_ktp" onChange={e => handlePhoto(e)} className="profile-div-photo">
                        <input 
                            type="file"
                            multiple="true"
                            id="upload_ktp"
                            style={{display:'none'}}
                        />
                        Add Photo
                    </label>
                </td>
                    {photo ? photo.map((data, index) => {
                        return (<td key={indexedDB}>
                            <label>
                                <img alt="" src={data.base64 ? data.base64 : MAIN+data} className="profile-div-photo" style={{border: 'none', padding: '0px', margin: '0px 10px'}} />
                            </label>
                        </td>);
                    }) : ""}
            </tr>
        </table>
      </div>
        <TextField
          style={style.textField}
          fullWidth={true}
          value={name}
          onChange={e => setName(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Product Name"
        />
        <TextField
          active={true}
          style={style.textField}
          fullWidth={true}
          value={brand}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setBrand(e.target.value)}
          id="standard-basic"
          label="Product Brand"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={category}
          onChange={e => setCategory(e.target.value)}
          SelectProps={{
            native: true,
          }}
          select
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Category"
        >
          {["Car", "Motorcycle", "Bus", "Motorcycle", "Pickup", "Bus", "Truck", "Ambulance"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={price}
          onChange={e => setPrice(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Price Per Day"
        />
        <TextField
          style={style.textField}
          className="mt-15 mb-15"
          fullWidth={true}
          value={discount}
          onChange={e => setDiscount(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Discount Price"
        />
         <TextField
          style={style.textField}
          fullWidth={true}
          value={priceWidthDriver}
          onChange={e => setPriceWithDriver(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Price With Driver"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          value={priceWidthDriverDiscount}
          onChange={e => setPriceWithDriverDiscount(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Price With Driver Discount Price"
        />
        <h6 className="mt-3 mb-1" style={{fontWeight:'700'}}>Rental Rules</h6>
        <TextField
          style={style.textField}
          fullWidth={true}
          value={overTime}
          onChange={e => setOvertime(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Overtime"
        />
        <TextField
          style={style.textField}
          fullWidth={true}
          value={generalRegulation}
          onChange={e => setGeneralRegulation(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="General Regulation"
        />
        <h6 className="mt-3 mb-1" style={{fontWeight:'700'}}>Pickup Rules</h6>
        <TextField
          style={style.textField}
          id="date"
          label="Pickup Date"
          type="time"
          value={pickupDate}
          onChange={e => setPickupDate(e.target.value)}
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={style.textField}
          id="date"
          label="Date Of Return"
          type="time"
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <h6 className="mt-3 mb-1" style={{fontWeight:'700'}}>Pickup Rules</h6>
        <Input
          style={style.textField}
          fullWidth={true}
          value={pickupRule}
          onChange={e => setPickupRule(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Pickup Rule"
        />

        <h6 className="mt-3 mb-1" style={{fontWeight:'700'}}>Cancellation Policy</h6>
        <Input
          style={style.textField}
          fullWidth={true}
          value={cancel}
          onChange={e => setCancel(e.target.value)}
          id="standard-basic"
          InputLabelProps={{
            shrink: true,
          }}
          label="Cancellation Policy"
        />
        
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
    </div>
  );
}
