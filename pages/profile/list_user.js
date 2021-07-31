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
 const [showConfirm, setShowConfirm] = useState();

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
   </div>
 );
}
