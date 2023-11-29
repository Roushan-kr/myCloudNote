import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null); // dark or light theam management nedded
  let location = useLocation();
  useEffect(() => {
    // console.log(location)
  }, [location]);
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
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">
              About
            </Link>
            <Link className={`nav-link ${location.pathname==="/contact"?"active":""}`} aria-current="page" to="/contacts">
              Contact
            </Link>
          </div>

          {user && (
            <div className="navbar-nav ms-auto">
              <div className="nav-item mx-1">{user.name}</div>
            </div>
          )}

          {!user && (
            <div className="navbar-nav ms-auto mx-3">
              <Link
                className="btn btn-primary mx-3"
                aria-current="page"
                to="/signin"
              >
                Signin
              </Link>
              <div className="vr"></div>
              <Link className="btn btn-primary  " to="/login">
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
