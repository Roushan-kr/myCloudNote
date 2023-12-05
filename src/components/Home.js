import React from "react";
import Notes from "./Notes";
function Home() {
  return (
    <>
     { !localStorage.getItem("authToken") && <div className="conatiner p-5 d-flex justify-content-center align-items-center">
        <p>First login or signup to view content </p>
      </div>}
      {localStorage.getItem("authToken") && <Notes />}
    </>
  );
}

export default Home;
