import TopNav from "../../components/globals/top_nav";
import { Container, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Rate() {
  const router = useRouter();
  const handleRent = () => {
    router.push({
      pathname: "/home/order_detail",
    });
  };

  return (
    <div style={{ background: "#E5E5E5", height: "auto", minHeight: "100vh" }}>
      <TopNav back="true" text="Rate" arrow="true" search="true" />

      <div className="bg-white p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="60%">Transaction Number</td>
            <td className="text-right">14000214451</td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3 pl-3 pr-3" style={{ height: "auto" }}>
        <table
          cellpadding="4"
          style={{ fontSize: "14px", width: "100%", fontWeight: "600" }}
        >
          <tr>
            <td width="45%">Vehicle Name</td>
            <td width="3%">:</td>
            <td className="text-right">Daihatsu Agya Merah</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Brand</td>
            <td width="3%">:</td>
            <td className="text-right">Daihatsu</td>
          </tr>
          <tr>
            <td width="45%">Vehicle Number</td>
            <td width="3%">:</td>
            <td className="text-right">A 1234 BA</td>
          </tr>
          <tr>
            <td width="45%">Status</td>
            <td width="3%">:</td>
            <td className="text-right">Complete</td>
          </tr>
        </table>
      </div>

      <div className="bg-white mt-3 p-3  pl-4 pr-4" style={{ height: "auto" }}>
        <table width="100%">
          <tr>
            <td width="40%">Status</td>
            <td className="text-right">
              <font style={{ color: "#ffe100", fontWeight: "600" }}>
                Waiting Confirmation
              </font>
            </td>
          </tr>
        </table>
      </div>

      <div
        className="bg-white mt-3 p-3  pl-4 pr-4"
        style={{
          height: "220px",
          background: "#fff",
          fontSize: "14px",
        }}
      >
        <p>
          <b>Tell us what you think</b>
          <br />
          <Rating size="large" value={4} style={{ marginTop: "20px" }} />
          <br />
          <input
            type="text"
            className="mt-3"
            style={{
              width: "100%",
              background: "#d4d4d469",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              fontSize: "12px",
            }}
            placeholder="Describe your experience (optional)"
          />
        </p>
        <button className="button-primary" style={{ float: "right" }}>
          Post
        </button>
      </div>
    </div>
  );
}
