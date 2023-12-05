import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/User/UserContext";
{
  /* TODO: manage login and signup buttons based on authToken not on userContext  */
}

function Navbar() {
  const { User, setUser } = useContext(UserContext);
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(location)
  }, [location, User]);

  const handelLogOut = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyCloudNotes
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              aria-current="page"
              to="/"
            >
              Home
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              aria-current="page"
              to="/about"
            >
              About
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}
              aria-current="page"
              to="/contacts"
            >
              Contact
            </Link>
          </div>

          {User && (
            <div className="navbar-nav ms-auto">
              {/* Popup user profile */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-capitalize"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle me-2"></i>
                  {User.name}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="fas fa-user me-2"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="fas fa-cog me-2"></i> Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li onClick={handelLogOut}>
                    <Link className="dropdown-item" to="#">
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          )}
          {!User && (
            <div className="navbar-nav ms-auto mx-2">
              <Link
                className="btn btn-primary mx-2"
                aria-current="page"
                to="/signup"
              >
                Sign up
              </Link>
              <div className="vr"></div>
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
