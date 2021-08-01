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
  const [modal, setModal] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [showConfirm, setShowConfirm] = useState();

  const handleDetailUser = ({data}) => {
    setPhoto(JSON.parse(data.banner_image));
    setModal(data);
    setShow(true);
  }

 useEffect(() => {
   if (typeof localStorage !== 'undefined' && localStorage.getItem('user_data')) {
     let data = JSON.parse(localStorage.getItem('user_data'));
     setUser(data);
     let json = {
       action: "list",
       db: "tabrent",
       table: "tx_banner"
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
 }, [])

const handleInActivate = (e) => {
  let id = e.target.id;
  let json = {
      action: "delete",
      db: "tabrent",
      table: "tx_banner",
      where_delete: [
        [
            "banner_id",
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
            table: "tx_banner"
         };
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            alert("Delete Banner");
          } else {
            setProduct(data.result);
            alert("Delete Banner");
          }
        } else {
          setProduct([]);
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
    table: "tx_banner",
    where: [
        [
            "banner_id",
            "=",
            id
        ]
    ],
    value: {
        "banner_status": "1"
    }
  };

  fetch_data(STORE, json).then(function (data) {
    if (data.success) {
        let json = {
            action: "list",
            db: "tabrent",
            table: "tx_banner"
        }
  
      fetch_data(INDEX, json).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setProduct([data.result]);
            alert("Activate Banner");
          } else {
            setProduct(data.result);
            alert("Activate Banner");
          }
        } else {
          setProduct([]);
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
             <p className="mb-0 weight-700">List Banner</p>
           </td>
           <td className="text-right">

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
                   <p className="text-left pl-1 p-0 m-0">{data.banner_title} 
                   {data.banner_status == 0 ? (
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
                     <font style={{fontSize: '12px', fontWeight: '400'}}>{data.banner_create_at}</font>
                     </p>
                 </td>
                 <td>
                    <button id={data.banner_id}  onClick={() => (handleDetailUser({data}), setShow(true))} className="btn btn-primary mt-2 ml-1" style={{border: 'none', borderRadius:'5px', float:'right', fontSize: '12px'}}>
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

         {modal ? (
        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Banner</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="">
                  {photo ? photo.map((data, index) => {
                      return (
                          <label>
                              <img alt="" src={data.base64 ? data.base64 : MAIN+data} style={{border: 'none', padding: '0px', margin: '0px 10px', width: '100%'}} />
                          </label>
                      );
                  }) : ""}
                <p className="m-1"><font style={{fontSize: '12px'}}><b>Title :</b></font> <br /> {modal.banner_title}</p>
                <p className="m-1"><font style={{fontSize: '12px'}}><b>Description :</b></font> <br /> {modal.banner_desc}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
             <Button id={modal.banner_id} onClick={() =>  (setShow(false), setShowConfirm(true))} className="btn-danger" variant="success">
                Delete
              </Button>
              <Button id={modal.banner_id} onClick={(e) => handleActivate(e)} variant="success">
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
             <p>Are you sure delete user {modal.banner_title} ? </p>
            </Modal.Body>
            <Modal.Footer>
              <Button id={modal.banner_id} onClick={() => setShowConfirm(false)} variant="success">
                Cancel
              </Button>
             <Button id={modal.banner_id} onClick={(e) => handleInActivate(e)} className="btn-danger" variant="success">
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
      ) : ""}
     </div>
         <button onClick={() => router.push('/profile/new_banner')} className="button-primary p-3 w-100 mt-3" style={{position: 'sticky', bottom: '0'}}>
          Add Banner
        </button>
   </div>
 );
}
