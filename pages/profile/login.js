import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { fetch_data } from "../../components/globals/api";
import { INDEX } from "../../config/api_url";
import { useState, useEffect } from "react";

export default function login() {
  const router = useRouter();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handleLogin = () => {
    let json = {
      action : "list",
      db : "tabrent",
      table : "tx_user",
      where: [
        [
            "user_username",
            "=",
            username
        ],
        [
            "user_password",
            "=",
            password
        ]
      ],
      orWhere: ["user_email", username]
    };

    fetch_data(INDEX, json).then(function (data) {
      if (data.success) {
        localStorage.setItem("is_login", true);
        localStorage.setItem("user_data", JSON.stringify(data.result));
        router.push('/');
      } else {
        alert("Please Check Username / Password");
      }
    });
  };

  const handleRegister = () => {
    router.push({
      pathname: "/profile/register",
    });
  };

  return (
    <div className="main" style={{ height: "auto", minHeight: '680px' }}>
      <center className="mt-5">
        <img src="/profile/icon_login.svg" className="mt-5" />
        <div>
          {/* <img
            src="/profile/icon_user.svg"
            style={{ position: "absolute", left: "63px", marginTop: "15px" }}
          /> */}
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            className="form-control mt-5 pl-4"
            placeholder="Username"
            style={{
              padding: "25px",
              width: "35vh",
              borderRadius: "10px",
              border: "solid 2px #D2D2D2",
            }}
          />
        </div>
        <div>
          {/* <img
            src="/profile/icon_lock.svg"
            style={{ position: "absolute", left: "63px", marginTop: "15px" }}
          /> */}
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            className="form-control mt-3 pl-4"
            placeholder="Password"
            style={{
              padding: "25px",
              width: "35vh",
              borderRadius: "10px",
              border: "solid 2px #D2D2D2",
            }}
          />
        </div>
        <button
          onClick={handleLogin}
          className="button-primary mt-3"
          style={{ width: "35vh", fontSize: "16px", padding: "12px" }}
        >
          Login
        </button>
        <p className="mt-3" style={{ fontSize: "14px" }}>
          {/* <font className="color-primary weight-700">Forget Password </font>{" "}
          <br /> or  */}
          <br /> Don't have account ?{" "}
          <font className="color-primary weight-700" onClick={handleRegister}>
            Register
          </font>
        </p>
      </center>
    </div>
  );
}
