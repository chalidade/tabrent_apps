import "bootstrap/dist/css/bootstrap.min.css";

export default function login({ setPage, page }) {

  const handleLogin = () => {
    console.log("testing");
  };

  return (
    <div className="main" style={{ height: "auto" }}>
      <center className="mt-5">
        <img src="/profile/icon_login.svg" className="mt-5" />
        <div>
          <img
            src="/profile/icon_user.svg"
            style={{ position: "absolute", left: "63px", marginTop: "15px" }}
          />
          <input
            type="text"
            className="form-control mt-5 pl-5"
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
          <img
            src="/profile/icon_lock.svg"
            style={{ position: "absolute", left: "63px", marginTop: "15px" }}
          />
          <input
            type="password"
            className="form-control mt-3 pl-5"
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
          <font className="color-primary weight-700">Forget Password </font>{" "}
          <br /> or <br /> Don't have account ?{" "}
          <font className="color-primary weight-700">Register</font>
        </p>
      </center>
    </div>
  );
}
