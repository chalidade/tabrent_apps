import TopNav from "../../components/globals/top_nav";
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";

export default function ListUser() {
  const router = useRouter();
 const [product, setProduct] = useState([]);
 const [show, setShow] = useState(false);
 const [user, setUser] = useState();
 const [photo, setPhoto] = useState([]);
 const [modal, setModal] = useState([]);

 const [modalFilter, setModalFilter] = useState(false);
 const [filterBankName, setFilterBankName] = useState("All Bank");
 const [filterBankNumber, setFilterBankNumber] = useState("");
 const [filterBankOwner, setFilterBankOwner] = useState("");
 const [filterStatus, setFilterStatus] = useState("2");

 useEffect(() => {
   if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
     let data = JSON.parse(localStorage.getItem('user_data'));
     setUser(data);
     let json = {
       action: "list",
       db: "tabrent",
       table: "tx_payment_method"
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

const handleInActivate = (e) => {
  let id = e.target.id;
  let json = {
    action: "update",
    db: "tabrent",
    table: "tx_payment_method",
    where: [
        [
            "payment_id",
            "=",
            id
        ]
    ],
    value: {
        "payment_status": "0"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_payment_method"
         };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("Disable Payment Method");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("Disable Payment Method");
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
    table: "tx_payment_method",
    where: [
        [
            "payment_id",
            "=",
            id
        ]
    ],
    value: {
        "payment_status": "1"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_payment_method"
        }
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("Activate Payment Method");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("Activate Payment Method");
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

  if (filterBankName !== 'All Bank') {
    name = ['payment_name', 'like', '%'+filterBankName+'%'];
    filter.push(name);
  }

  if (filterBankNumber.length !== 0) {
    brand = ['payment_number', 'like', '%'+filterBankNumber+'%'];
    filter.push(brand);
  }
  
  if (filterBankOwner.length !== 0) {
    owner = ['payment_account_name', 'like', '%'+filterBankOwner+'%'];
    filter.push(owner);
  }

  let json = {
    action: "list",
    db: "tabrent",
    table: "tx_payment_method",
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
             <p className="mb-0 weight-700">List Payment Method</p>
           </td>
           <td className="text-right">
            <img src="/icons/icon_filter.png" style={{width: '20px'}} onClick={() => setModalFilter(true)} />
           </td>
         </tr>
       </table>
     </div>
     <div className="profile-div-product" style={{paddingTop: product.length !== 0 ? "20px" : "100px",minHeight: '100vh', paddingBottom: product.length !== 0 ? "20px" : "0px"}}>
       {product.length !== 0 ? product.map((data, index) => {
         return (
           <div className="product-div" style={{height: '75px'}}>
             <table width="100%">
               <tr>
                 <td>
                   <p className="text-left pl-1 p-0 m-0">{data.payment_name} 
                   {data.payment_status == 0 ? (
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
                     <br /> 
                     <font style={{fontSize: '12px', fontWeight: '400'}}>{data.payment_account_name}</font> | <font style={{fontSize: '12px', fontWeight: '400'}}>
                     {data.payment_number}
                    </font>
                     </p>
                 </td>
                 <td>
                    <button id={data.payment_id} onClick={(e) => handleActivate(e)} className="btn btn-success mt-2 ml-1" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '12px'}}>
                      ✓
                   </button>
                   <button id={data.payment_id} onClick={(e) => handleInActivate(e)}  className="btn btn-danger mt-2" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '12px'}}>
                     X
                   </button>
                 </td>
               </tr>
             </table>
           </div>);
       }) : ( 
         <div>
           <img src="/icons/icon_no_product.svg" />
         </div> )}
         
     
     <Modal show={modalFilter} onHide={() => setModalFilter(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table width="100%">
          <tr>
              <td>
                <p className="mb-1">Bank Name</p>
                <select className="form-control" onChange={(e) => setFilterBankName(e.target.value)} style={{ height: '55px' }}>
                  <option value={filterBankName.length == 0 ? "All Bank" : filterBankName}>{filterBankName.length == 0 ? "All Bank" : filterBankName}</option>
                  {filterBankName !==  "All Bank" ? (<option value="All Bank">All Bank</option>) : ""}
                  <option value="BCA">Bank Central Asia (BCA)</option>
                  <option value="BNI">Bank Negara Indonesia (BNI)</option>
                  <option value="BRI">Bank Rakyat Indonesia (BRI)</option>
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank Jatim">Bank Jatim</option>
                  <option value="DANA">DANA</option>
                  <option value="OVO">OVO</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Bank Account Number</p>
               <input className="form-control" type="text" value={filterBankNumber} onChange={(e) => setFilterBankNumber(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Bank Account Name</p>
               <input className="form-control" type="text" value={filterBankOwner} onChange={(e) => setFilterBankOwner(e.target.value)} />
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
         <button onClick={() => router.push('/profile/new_payment_method')} className="button-primary p-3 w-100 mt-3" style={{position: 'sticky', bottom: '0'}}>
          Add Payment Method
        </button>
   </div>
 );
}
