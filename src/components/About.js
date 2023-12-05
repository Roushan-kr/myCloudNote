import React from "react";
import {Link} from 'react-router-dom'
function About() {
  return (
    <div className="conatiner p-5 d-flex justify-content-center align-items-center">
      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">About MyCloudNote</h1>
          <p class="lead text-muted">A basic online notes storing website where you able to store and manage your saved note using Authentation </p>
          <p>
            <Link to="/" class="btn btn-primary m-2">Go to Home</Link>
            <Link to="#" class="btn btn-secondary m-2">login or signUp</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
