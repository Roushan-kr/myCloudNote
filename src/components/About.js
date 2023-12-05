import React from "react";
import {Link} from 'react-router-dom'
function About() {
  return (
    <div className="conatiner p-5 d-flex justify-content-center align-items-center">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">About MyCloudNote</h1>
          <p className="lead text-muted">A basic online notes storing website where you able to store and manage your saved note using Authentation </p>
          <p>
            <Link to="/" className="btn btn-primary m-2">Go to Home</Link>
            <Link to="#" className="btn btn-secondary m-2">login or signUp</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
