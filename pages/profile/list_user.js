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
 const [modal, setModal] = useState([]);
 const [modalFilter, setModalFilter] = useState(false);
 const [showConfirm, setShowConfirm] = useState();

 const [filterEmail, setFilterEmail] = useState("");
 const [filterPhone, setFilterPhone] = useState("");
 const [filterKTP, setFilterKTP] = useState("");
 const [filterFirstName, setFilterFirstName] = useState("");
 const [filterStatus, setFilterStatus] = useState("2");

 useEffect(() => {
   if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
     let data = JSON.parse(localStorage.getItem('user_data'));
     setUser(data);
     let json = {
       action: "list",
       db: "tabrent",
       table: "tx_user",
       where: [['user_type', '!=', '3']]
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

 const handleDetailUser = ({data}) => {
   setModal(data);
   setShow(true);
 }
 

 const handleDelete = (e) => {
  let id = e.target.id;
  let json = {
      action: "delete",
      db: "tabrent",
      table: "tx_user",
      where_delete: [
          [
              "user_id",
              "=",
              id
          ]
      ]
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_user",
        where: [['user_type', '!=', '3']]
    };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShowConfirm(false);
            alert("User Deleted");
          } else {
            setProduct(data.result);
            setShowConfirm(false);
            alert("User Deleted");
          }
        }
      });
    }
  });
}

const handleInActivate = (e) => {
  let id = e.target.id;
  let json = {
    action: "update",
    db: "tabrent",
    table: "tx_user",
    where: [
        [
            "user_id",
            "=",
            id
        ]
    ],
    value: {
        "user_status": "0"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_user",
        where: [['user_type', '!=', '3']]
    };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("User Deactivated Successfully");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("User Deactivated Successfully");
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
    table: "tx_user",
    where: [
        [
            "user_id",
            "=",
            id
        ]
    ],
    value: {
        "user_status": "1"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
      let json = {
        action: "list",
        db: "tabrent",
        table: "tx_user",
        where: [['user_type', '!=', '3']]
    };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            setShow(false);
            alert("User Activated Successfully");
          } else {
            setProduct(data.result);
            setShow(false);
            alert("User Activated Successfully");
          }
        }
      });
    }
  });
}

const handleFilter = () => {
  let email, phone, ktp, status, type, firstName;
  let filter = [];
  
  type = ['user_type', '!=', '3'];
  filter.push(type);

  if (filterStatus !== '2') {
    status = ['user_status', '=', filterStatus];
    filter.push(status);
  }

  if (filterFirstName.length !== 0) {
    firstName = ['user_first_name', 'like', '%'+filterFirstName+'%'];
    filter.push(firstName);
  }

  if (filterEmail.length !== 0) {
    email = ['user_email', 'like', '%'+filterEmail+'%'];
    filter.push(email);
  }
  
  if (filterPhone.length !== 0) {
    ktp = ['user_phone', 'like', '%'+filterPhone+'%'];
    filter.push(ktp);
  }

  if (filterKTP.length !== 0) {
    phone = ['user_email', 'like', '%'+filterKTP+'%'];
    filter.push(phone);
  }

    let json = {
      action: "list",
      db: "tabrent",
      table: "tx_user",
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

    setModalFilter(false);

}

 return (
   <div>
     <TopNav back="true" text="Back" arrow="true" customPage="profile/admin_menu" />
     <div className="main" style={{ height: "auto" }}>
       <table width="100%" className="mt-4">
         <tr>
           <td className="text-left">
             <p className="mb-0 weight-700">List User</p>
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
                   <p className="text-left pl-1 p-0 m-0">{data.user_first_name + " " + data.user_last_name} 
                   {data.user_status == 0 ? (
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
                     <br /> <font style={{fontSize: '12px', fontWeight: '400'}}>May, 20 2020</font> | <font style={{fontSize: '12px', fontWeight: '400'}}>Rental Owner</font>
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
            <Modal.Title>Detail User</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              {/* <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} /> */}
              <div className="">
                <p className="m-1"><font style={{fontSize: '12px'}}>Name :</font> <br /> <b>{modal.user_first_name + " " + modal.user_last_name}</b></p>
                <p className="m-1"><font style={{fontSize: '12px'}}>Phone :</font> <br /> <b>{modal.user_phone_number}</b></p>
                <p className="m-1"><font style={{fontSize: '12px'}}>Email :</font> <br /> <b>{modal.user_email}</b></p>
                <p className="m-1"><font style={{fontSize: '12px'}}>Username :</font> <br /> <b>{modal.user_username}</b></p>
                <p className="m-1"><font style={{fontSize: '12px'}}>Birthday :</font> <br /> <b>{modal.user_birthdate}</b></p>
                <hr className="m-0 p-0" />
                <p className="m-1"><font style={{fontSize: '12px'}}>User Personal ID :</font> <br /> <b>{modal.user_personal_id_number}</b></p>
                <p className="m-1"><font style={{fontSize: '12px'}}>User Bank Number :</font> <br /> <b>{modal.user_bank_number ? modal.user_bank_number : "-" }</b></p>
                <p className="m-1"><font style={{fontSize: '12px'}}>User Bank Type :</font> <br /> <b>{modal.user_bank_type ? modal.user_bank_type : "-"}</b></p>
              </div>
            </Modal.Body>
            <Modal.Footer>
             <Button id={modal.user_id} onClick={() =>  (setShow(false), setShowConfirm(true))} className="btn-danger" variant="success">
                Delete
              </Button>
              <Button id={modal.user_id} className="btn-warning" variant="secondary" onClick={(e) => handleInActivate(e)}>
                Deactivated
              </Button>
              <Button id={modal.user_id} onClick={(e) => handleActivate(e)} variant="success">
                Activate
              </Button>
            </Modal.Footer>
          </Modal>
     ) : ""}
     {modal ? (
     <Modal centered show={showConfirm} onHide={() => setShowConfirm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Box</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              {/* <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} /> */}
             <p>Are you sure delete user {modal.user_first_name + " " + modal.user_last_name} ? </p>
            </Modal.Body>
            <Modal.Footer>
              <Button id={modal.user_id} onClick={() => setShowConfirm(false)} variant="success">
                Cancel
              </Button>
             <Button id={modal.user_id} onClick={(e) => handleDelete(e)} className="btn-danger" variant="success">
                Delete
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
                <p className="mb-1">First Name</p>
               <input className="form-control" type="text" value={filterFirstName} onChange={(e) => setFilterFirstName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Email Address</p>
               <input className="form-control" type="text" value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">KTP Number</p>
               <input className="form-control" type="text" value={filterKTP} onChange={(e) => setFilterKTP(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-1 mt-3">Phone Number</p>
               <input className="form-control" type="text" value={filterPhone} onChange={(e) => setFilterPhone(e.target.value)} />
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
