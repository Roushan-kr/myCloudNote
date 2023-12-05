import React , {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/User/UserContext";

const host = process.env.REACT_APP_HOST;

function SignUp(props) {
  const [ passwordVisible, setpasswordVisible ] = useState(false) 
  const [ ConfPasswordVisible, setConfPasswordVisible ] = useState(false) 
  const {setUser} = useContext(UserContext)

  const navigate = useNavigate();

  const togglePasswordVisibility=()=>{
    setpasswordVisible(!passwordVisible)
  }  
  const toggleConfPasswordVisibility=()=>{
    setConfPasswordVisible(!ConfPasswordVisible)
  }  
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const Cnfpassword = formData.get("Cnfpassword");
    const name = formData.get("name");

    if(password!==Cnfpassword){
      return props.showAlert("Warning", "Enter Password not Matched")
    }
    const response = await fetch(`${host}/api/v1/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password  }),
    });
    const result = await response.json();

    if (result.authToken) {
      localStorage.setItem("authToken", result.authToken);
      // setAuthToken(result.authToken)
      setUser({name: result.name || "Buddy"})
      navigate("/");
    } else {
      console.log(result)
      props.showAlert("Warning",result.error[0].msg|| result.error )
    }
    console.log();
  };
  return (
    <form className="container p-5 d-flex flex-column align-items-center align-self-center " onSubmit={handelSubmit}>
      <div className="mb-3">
        <label htmlFor="userName" className="form-label">
          Your Name: 
        </label>
        <input
          type="text"
          className="form-control"
          id="userName"
          name="name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userEmail" className="form-label">
          Email address:
        </label>
        <input
          type="email"
          className="form-control"
          id="userEmail"
          name="email"
          required
        />
      </div>
      <div className="mb-3 ">
        <label htmlFor="userPasswd" className="form-label">
          Password:
        </label>
        <div className="d-flex align-items-center ">
        <input
          type={passwordVisible?"text":"password"}
          className="form-control "
          id="userPasswd"
          name="password"
          minLength={5}
          required
        />
        <i className={passwordVisible?"fa-solid fa-eye-slash m-1":"fa-solid fa-eye" } onClick={togglePasswordVisibility}></i>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="userConfPasswd" className="form-label">
          Conform Password:
        </label>
        <div className="d-flex align-items-center ">
        <input
          type={ConfPasswordVisible?"text":"password"}
          className="form-control"
          id="userConfPasswd"
          name="Cnfpassword"
          required
        />
        <i className={ConfPasswordVisible?"fa-solid fa-eye-slash":"fa-solid fa-eye " } onClick={toggleConfPasswordVisibility}></i>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SignUp;
