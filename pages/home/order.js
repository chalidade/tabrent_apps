import TopNav from "../../components/globals/top_nav";
import { Carousel, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MAIN, STORE, INDEX } from "../../config/api_url";
import { fetch_data } from "../../components/globals/api";

export default function Detail() {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState(false);
  const [order, setOrder] = useState([]);
  const [productId, setProductId] = useState();
  const [message, setMessage] = useState();
  const [paymentId, setPaymentId] = useState(0);
  const [paymentName, setPaymentName] = useState();
  const [paymentNumber, setPaymentNumber] = useState();
  const [orderData, setOrderData] = useState();
  const [duration, setDuration] = useState();
  const [product, setProduct] = useState();
  const [slider, setSlider] = useState();
  const [paymentMethod, setPaymentMethod] = useState();

  const handleRent = () => {
    const timeElapsed = Date.now();
    let today = new Date(timeElapsed);
    today = today.toLocaleDateString();
    let randNumber = Math.floor(Math.random() * 200);
    let transaction_number = today.toString().replaceAll("/", "");

    let payment_total;

    if (product && orderData.order_type == 0 && product.product_discount !== "0") {
      payment_total = (product.product_discount * duration);
    } else if(product && orderData.order_type == 0 && product.product_discount == "0") {
      payment_total = (product.product_price * duration);
    } else if(product && orderData.order_type == 1 && product.product_price_with_driver_discount !== "0") {
      payment_total = (product.product_price_with_driver_discount * duration);
    } else if(product && orderData.order_type == 1 && product.product_price_with_driver_discount == "0") {
      payment_total = (product.product_price_with_driver * duration);
    } else {
      payment_total = (product.product_price * duration);
    }

    let value = orderData;
    value.order_user_id = user.user_id;
    value.order_transaction_number = "INV/"+product.product_id+"/"+user.user_id+"/"+transaction_number+"/"+randNumber;
    value.order_product_id = product.product_id;
    value.order_duration = duration;
    value.order_payment_id = paymentId;
    value.order_payment_name = paymentName;
    value.order_payment_number = paymentNumber;
    value.order_message = message;
    value.order_status = 0;
    value.order_payment_total = payment_total;

    let check_order = {
      action : "list",
      db : "tabrent",
      table : "tx_order",
      where: [
        [
            "order_transaction_number",
            "=",
            "INV/"+product.product_id+"/"+user.user_id+"/"+transaction_number
        ]
      ]
    };
    
    let json;
    
    if (paymentId == 0) {
      alert("Please Choose Payment Method");
    } else {
      fetch_data(INDEX, check_order).then(function (data) {
        if (data.success) { 
          json = {
            action : "update",
            db : "tabrent",
            table : "tx_order",
            where: [
              [
                  "order_transaction_number",
                  "=",
                  "INV/"+product.product_id+"/"+user.user_id+"/"+transaction_number
              ]
            ],
            value: value
          };
        } else {
          json = {
            action : "save",
            db : "tabrent",
            table : "tx_order",
            primaryKey : "order_id",
            value: [value],
          };
        }
        
        fetch_data(STORE, json).then(function (result) {
          if (result.success) {
            localStorage.setItem("order_data", JSON.stringify(result.data));
            router.push({
                pathname: "/home/order_detail",
                query: {id: result.id}
            });
          } else {
            alert("Check Your Data");
          }
        });

      });
    }
  };

  const handlePayment = (id, name, number) => {
    setPaymentId(id);
    setPaymentName(name);
    setPaymentNumber(number);
    setShowPayment(false);
  }

useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      let getUser = JSON.parse(localStorage.getItem('user_data'));
      setUser(getUser);
      setProductId(router.query.id);

      let json_payment = {
        action : "list",
        db : "tabrent",
        table : "tx_payment_method",
        where : [['payment_status', "=", "1"]]
      };

      fetch_data(INDEX, json_payment).then(function (data) {
        if (data.success) {
          if (data.count == 1) {
            setPaymentMethod([data.result]);
          } else {
            setPaymentMethod(data.result);
          }
        } 
      });

      let order = JSON.parse(localStorage.getItem('order_data'));
      let product = JSON.parse(localStorage.getItem('product'));
      let start_date = new Date(order.order_start_date);
      let end_date = new Date(order.order_end_date);

      // To calculate the time difference of two dates
      var Difference_In_Time = end_date.getTime() - start_date.getTime();
        
      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      setDuration(Difference_In_Days);
      setOrderData(order);
      setSlider(JSON.parse(product.product_image))
      setProduct(product);
    }
  }, [])

  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav back="true" text="Confirm Order" arrow="true" search="true" />
      <Carousel slide={true} touch={true} indicators={false} controls={false}>
      {slider ? slider.map((data, index) => {
        return <Carousel.Item>
          <div
            style={{
              background: `url(${data ? MAIN+data : "/home/product_2.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>;
      }) : (
        <div>
        <Carousel.Item>
          <div
            style={{
              background: "url(/home/product_3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              background: "url(/home/product_4.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "345px",
            }}
          ></div>
        </Carousel.Item>
      </div>)}
      </Carousel>
     <div className="bg-white p-3 pl-3 pr-3" style={{ height: "210px" }}>
        <table
          cellPadding="4"
          style={{ fontSize: "14px", width: "100%", fontWeight: "600" }}
        >
          <tr>
            <td width="45%">Product Name</td>
            <td width="3%">:</td>
            <td className="text-right">{product ? product.product_name : "Daihatsu Agya Merah"}</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Brand</td>
            <td width="3%">:</td>
            <td className="text-right">{product ? product.product_brand : "Daihatsu"}</td>
          </tr>
          <tr>
            <td width="45%">Category</td>
            <td width="3%">:</td>
            <td className="text-right">{product ? product.product_category : "A 1234 BA"}</td>
          </tr>
          <tr>
            <td width="45%">Rent Duration</td>
            <td width="3%">:</td>
            <td className="text-right">{duration ? duration : 0} Days</td>
          </tr>
          <tr>
            <td width="45%">Pickup</td>
            <td width="3%">:</td>
            <td className="text-right">{orderData ? orderData.order_start_date : "June 17, 2021" }</td>
          </tr>
          <tr>
            <td width="45%">Return</td>
            <td width="3%">:</td>
            <td className="text-right">{orderData ? orderData.order_end_date : "June 18, 2021" }</td>
          </tr>
        </table>
      </div>
      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Message</td>
            <td>
              <input
                onChange={e => setMessage(e.target.value)}
                type="text"
                placeholder="Drop Message Here"
                style={{
                  border: "none",
                  width: "100%",
                  fontSize: "12px",
                  textAlign: "right",
                }}
              />
            </td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Payment Method</td>
            <td className="text-right" onClick={() => setShowPayment(true)}>{paymentName ? paymentName : "Pilih Pembayaran"}</td>
          </tr>
        </table>
      </div>

      {/* <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <center>
          <button
            style={{
              background: "#2F2F8D",
              width: "90%",
              border: "none",
              color: "#fff",
              padding: "10px",
              fontSize: "12px",
              borderRadius: "5px",
            }}
          >
            Term and Conditions
          </button>
          <p
            className="mt-2 mb-0 text-left"
            style={{ color: "red", fontSize: "14px", width: "90%" }}
          >
            * The vehicle is taken at the address listed and shows proof of
            payment
          </p>
        </center>
      </div> */}

      <div
        className="mt-3 text-center"
        style={{
          height: "auto",
          background: "#FFF",
          position: "sticky",
          bottom: "0px",
          fontSize: "14px",
        }}
      >
        <table width="100%">
          <tr>
            <td width="60%" className="text-right p-2">
              <p className="mb-0">
                <font style={{ fontSize: "10px" }}>Total Price</font>
                <br />
                <font style={{ fontWeight: "700", color: "#2F2F8D" }}>
                  Rp {
                      product && orderData.order_type == 0 && product.product_discount !== "0" ? 
                        (product.product_discount * duration).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                      product && orderData.order_type == 0 && product.product_discount == "0" ? 
                        (product.product_price * duration).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                      product && orderData.order_type == 1 && product.product_price_with_driver_discount !== "0" ? 
                        (product.product_price_with_driver_discount * duration).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                      product && orderData.order_type == 1 && product.product_price_with_driver_discount == "0" ? 
                        (product.product_price_with_driver * duration).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                        "1.200.000"}
                </font>
              </p>
            </td>
            <td style={{ background: "#2F2F8D" }} className="text-center">
              <button
                style={{
                  border: "none",
                  background: "none",
                  width: "100%",
                  color: "#fff",
                }}
                onClick={handleRent}
              >
                Confirm
              </button>
            </td>
          </tr>
        </table>
      </div>
      
      <Modal centered show={showPayment} onHide={() => setShowPayment(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Payment Method</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table width="100%" cellPadding="5">
              {paymentMethod ? paymentMethod.map((data, index) => {
                return (
                  <tr >
                    <td>
                      {data.payment_name == "BCA" ? (
                        <img src="/icons/icon_bca.png" width="70px" />
                      ) : data.payment_name == "BNI" ? (
                        <img src="/icons/icon_bni.png" width="70px" />
                      ) : data.payment_name == "BRI" ? (
                        <img src="/icons/icon_bri.png" width="70px" />
                      ) : data.payment_name == "Bank Mandiri" ? (
                        <img src="/icons/icon_mandiri.png" width="70px" />
                      ) : data.payment_name == "Bank Jatim" ? (
                        <img src="/icons/icon_bank_jatim.png" width="70px" />
                      ) : data.payment_name == "DANA" ? (
                        <img src="/icons/icon_dana.png" width="70px" />
                      ) : data.payment_name == "OVO" ? (
                        <img src="/icons/icon_ovo.png" width="70px" />
                      ) : ""}
                      </td>
                    <td className="pl-3">
                      <div onClick={(id, name, number) => handlePayment(data.payment_id, data.payment_name, data.payment_number)}>
                        <font style={{fontSize: "20px", fontWeight: "500"}}> {data.payment_name} </font>
                        <br /> <font style={{fontSize: "14px"}}> {data.payment_number} a/n {data.payment_account_name} </font>
                      </div>
                    </td>
                  </tr>
                );
              })  : "" }
            </table>
        </Modal.Body>
      </Modal>

    </div>
  );
}
