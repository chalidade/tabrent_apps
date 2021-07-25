import TopNav from "../../components/globals/top_nav";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function OrderDate() {
  const router = useRouter();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [productId, setProductId] = useState();

  const handleConfirm = () => {
    let json = {
      order_start_date : startDate, 
      order_end_date : endDate
    };
    localStorage.setItem("order_data", JSON.stringify(json));
    router.push({
      pathname: "/home/order",
      query: {id: productId}
    })
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setProductId(router.query.id);
      if (JSON.parse(localStorage.getItem('order_data'))) {
        let data = JSON.parse(localStorage.getItem('order_data'));
        setStartDate(data.order_start_date);
        setStartDate(data.order_end_date);
      }
    }
  }, [])

  return (
    <div>
      <TopNav back="true" text="Select Date" arrow="true" />
      <div className="main" style={{ height: "auto" }}>
        <p
          className="text-center mt-4"
          style={{ color: "#2F2F8D", fontWeight: 700, fontSize: "2.5vh" }}
        >
          Please select date and time
        </p>
        <center className="mt-5">
          <img src="/home/img_date_select.svg" />
        </center>
        <div className="mt-5">
          <p
            className="text-center text-secondary"
            style={{ fontWeight: "600" }}
          >
            Select the desired date and time so we can prepare what you need
          </p>
          <table width="100%" className="ml-1">
            <tr>
              <td>
                <label for="checkIn" className=" text-secondary">
                  Start Rent Date
                  <input
                    id="checkIn"
                    type="date"
                    onChange={e => setStartDate(e.target.value)}
                    className="pt-2 pb-2 mt-2"
                    style={{
                      border: "solid 2px #D2D2D2",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
              </td>
              <td>
                <label for="checkOut" className=" text-secondary">
                  End Rent Date
                  <input
                    id="checkOut"
                    type="date"
                    onChange={e => setEndDate(e.target.value)}
                    className="pt-2 pb-2 mt-2"
                    style={{
                      border: "solid 2px #D2D2D2",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
              </td>
            </tr>
          </table>
          <center>
          {startDate && endDate ? (
            <button
              onClick={handleConfirm}
              className="button-primary mt-4 p-2"
              style={{ width: "100%" }}
            >
              Confirm
            </button>
          ) : ""}
            
          </center>
        </div>
      </div>
    </div>
  );
}
