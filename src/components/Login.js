import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/User/UserContext";

const host = process.env.REACT_APP_HOST;

function Login(props) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${host}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    if (result.authToken) {
      localStorage.setItem("authToken", result.authToken);
      // setAuthToken(result.authToken)
      navigate("/");
      setUser({ name: "Buddy" });
    } else {
      props.showAlert("Warning", result.error);
      console.log(result.error);
    }
    console.log();
  };
  return (
    <form className="container p-5" onSubmit={handelSubmit}>
      <div className="mb-3">
        <label htmlFor="userEmail" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="userEmail"
          name="email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userPasswd" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="userPasswd"
          name="password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
