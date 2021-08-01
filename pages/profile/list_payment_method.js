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
     </div>
         <button onClick={() => router.push('/profile/new_payment_method')} className="button-primary p-3 w-100 mt-3" style={{position: 'sticky', bottom: '0'}}>
          Add Payment Method
        </button>
   </div>
 );
}
