import TopNav from "../../components/globals/top_nav";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function ListUser() {
 const [product, setProduct] = useState([]);
 const [show, setShow] = useState(false);
 const [user, setUser] = useState();
 const [photo, setPhoto] = useState([]);
 const [modal, setModal] = useState([]);

 const [modalFilter, setModalFilter] = useState(false);
 const [filterProductName, setFilterProductName] = useState("");
 const [filterProductBrand, setFilterProductBrand] = useState("");
 const [filterProductOwner, setFilterProductOwner] = useState("");
 const [filterStatus, setFilterStatus] = useState("2");

 useEffect(() => {
   if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
     let data = JSON.parse(localStorage.getItem('user_data'));
     setUser(data);
     let json = {
       action: "list",
       db: "tabrent",
       table: "tx_product",
       leftJoin: [
        {
            table: "tx_user",
            field1: "tx_user.user_id",
            field2: "tx_product.product_owner"
        }],
        raw: {
        selected: "tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
        }
    };
 
     fetch_data(INDEX, json).then(function (data) {
       if (data.success) {
         if (data.count == 1) {
           setProduct([data.result]);
        //    setPhoto(JSON.parse(data.result.product_image));
         } else {
           setProduct(data.result);
        //    setPhoto(JSON.parse(data.result.product_image));
         }
       }
     });
   }
 }, [])

 const handleDetailUser = ({data}) => {
   setPhoto(JSON.parse(data.product_image));
   setModal(data);
   setShow(true);
 }

const handleInActivate = (e) => {
  let id = e.target.id;
  let json = {
    action: "update",
    db: "tabrent",
    table: "tx_product",
    where: [
        [
            "product_id",
            "=",
            id
        ]
    ],
    value: {
        "product_status": "0"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_product",
            leftJoin: [
             {
                 table: "tx_user",
                 field1: "tx_user.user_id",
                 field2: "tx_product.product_owner"
             }],
             raw: {
             selected: "tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
             }
         };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("Reject Product Successfully");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("Reject Product Successfully");
          }
        }
      });
    }
  });
}

const handleActivate = (e) => {
  let id = e.target.id;
  let json = {
    action: "update",
    db: "tabrent",
    table: "tx_product",
    where: [
        [
            "product_id",
            "=",
            id
        ]
    ],
    value: {
        "product_status": "1"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_product",
            leftJoin: [
             {
                 table: "tx_user",
                 field1: "tx_user.user_id",
                 field2: "tx_product.product_owner"
             }],
             raw: {
             selected: "tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
             }
         };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("Product is Active");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("Product is Active");
          }
        }
      });
    }
  });
}

const handleFilter = () => {
  let name, brand, owner, status;
  let filter = [];

  if (filterStatus !== '2') {
    status = ['product_status', '=', filterStatus];
    filter.push(status);
  }

  if (filterProductName.length !== 0) {
    name = ['product_name', 'like', '%'+filterProductName+'%'];
    filter.push(name);
  }

  if (filterProductBrand.length !== 0) {
    brand = ['product_brand', 'like', '%'+filterProductBrand+'%'];
    filter.push(brand);
  }
  
  if (filterProductOwner.length !== 0) {
    date = ['user_first_name', 'like', '%'+filterProductOwner+'%'];
    owner.push(owner);
  }

  let json = {
      action: "list",
      db: "tabrent",
      table: "tx_product",
      leftJoin: [
      {
          table: "tx_user",
          field1: "tx_user.user_id",
          field2: "tx_product.product_owner"
      }],
      raw: {
      selected: "tx_product.*, tx_user.user_first_name, tx_user.user_last_name"
      },
      where: filter
  };

  console.log(json);

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

  setModalFilter(false);

}


 return (
   <div>
     <TopNav back="true" text="Back" arrow="true" customPage="profile/admin_menu" />
     <div className="main" style={{ height: "auto" }}>
       <table width="100%" className="mt-4">
         <tr>
           <td className="text-left">
             <p className="mb-0 weight-700">List Product</p>
           </td>
           <td className="text-right">
            <img src="/icons/icon_filter.png" style={{width: '20px'}} onClick={() => setModalFilter(true)} />
           </td>
         </tr>
       </table>
     </div>
     <div className="profile-div-product" style={{paddingTop: product.length !== 0 ? "20px" : "100px", paddingBottom: product.length !== 0 ? "20px" : "0px"}}>
       {product.length !== 0 ? product.map((data, index) => {
         return (
           <div className="product-div" style={{height: '75px'}}>
             <table width="100%">
               <tr>
                 <td>
                   <p className="text-left pl-1 p-0 m-0">{data.product_name.length > 23 ? data.product_name.slice(0, 23) + "..." : data.product_name} 
                   {data.product_status == 0 ? (
                    <font style={{
                        background: 'red',
                        fontSize: '10px',
                        borderRadius: '20px',
                        width: '15px',
                        height: '15px',
                        textAlign: 'center',
                        marginLeft: '7px',
                        color: '#fff',
                        marginTop: '4px',
                        position: 'absolute',
                        fontWeight: '800'
                    }}>-</font>
                   ) : (
                    <font style={{
                        background: '#04ff04d1',
                        fontSize: '10px',
                        borderRadius: '20px',
                        width: '15px',
                        height: '15px',
                        textAlign: 'center',
                        marginLeft: '7px',
                        color: '#fff',
                        marginTop: '4px',
                        position: 'absolute',
                        fontWeight: '800'
                    }}>✓</font>
                   )}  
                     <br /> <font style={{fontSize: '12px', fontWeight: '400'}}>May, 20 2020</font> | <font style={{fontSize: '12px', fontWeight: '400'}}>{data.user_first_name+ " "+ data.user_last_name}</font>
                     </p>
                 </td>
                 <td>
                    <button onClick={() => (handleDetailUser({data}), setShow(true))} className="btn btn-primary mt-2" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '14px'}}>
                     Detail
                   </button>
                 </td>
               </tr>
             </table>
           </div>);
       }) : ( 
         <div>
           <img src="/icons/icon_no_product.svg" />
         </div> )}
     </div>
     {modal ? (
      <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Product</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              {/* <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} /> */}
              <div className="">
                <div style={{width: '100%', overflowX: 'scroll'}}>
                    <table className="mt-3 mb-3" style={{width: '100%'}}>
                        <tr>
                            {photo ? photo.map((data, index) => {
                                return (<td key={index}>
                                    <label>
                                        <img alt="" src={data.base64 ? data.base64 : MAIN+data} className="profile-div-photo" style={{border: 'none', padding: '0px', margin: '0px 10px'}} />
                                    </label>
                                </td>);
                            }) : ""}
                        </tr>
                    </table>
                </div>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Product name :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_name ? modal.product_name : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Product Brand :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_brand ? modal.product_brand : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Category :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_category ? modal.product_category : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Price Per Day :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_price ? modal.product_price : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Overtime Rules :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_rental_rules_overtime ? modal.product_rental_rules_overtime : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>General Regulation :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_rental_rules_regulation ? modal.product_rental_rules_regulation : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Cancel Policy :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_cancelation_policy ? modal.product_cancelation_policy : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Product Pickup Policy :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_pickup_rules ? modal.product_pickup_rules : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Pickup Time :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_pickup_date ? modal.product_pickup_date : "-"}</font></p>
                <p className="m-1"><font style={{fontSize: '14px'}}><b>Return Time :</b></font> <br /> <font style={{fontSize: '12px'}}>{modal.product_return_date ? modal.product_return_date : "-"}</font></p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button id={modal.product_id} className="btn-danger" variant="secondary" onClick={(e) => handleInActivate(e)}>
                Reject
              </Button>
              <Button id={modal.product_id} onClick={(e) => handleActivate(e)} variant="success">
                Verify
              </Button>
            </Modal.Footer>
          </Modal>
     ) : ""}

     
     <Modal show={modalFilter} onHide={() => setModalFilter(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table width="100%">
          <tr>
              <td>


                <p className="mb-1">Product Name</p>
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
                <p className="mb-1 mt-3">Product Owner</p>
               <input className="form-control" type="text" value={filterProductOwner} onChange={(e) => setFilterProductOwner(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Status</p>
                <table width="100%">
                  <tr>
                    <td><input type="radio" name="status" value="2" checked={filterStatus == 2 ? true : false} onChange={(e) => setFilterStatus(e.target.value)}/> All</td>
                    <td><input type="radio"  name="status" value="1" checked={filterStatus == 1 ? true : false} onChange={(e) => setFilterStatus(e.target.value)} /> Verified</td>
                    <td><input type="radio"  name="status" value="0" checked={filterStatus == 0 ? true : false} onChange={(e) => setFilterStatus(e.target.value)} /> Not Verified</td>
                  </tr>
                </table>
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
