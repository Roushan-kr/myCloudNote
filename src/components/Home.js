import React, { useContext } from "react";
import Notes from "./Notes";
import UserContext from "../context/User/UserContext";
function Home() {
  const { User } = useContext(UserContext);

  return (
    <>
      {!User && (
        <div className="conatiner p-5 d-flex justify-content-center align-items-center">
          <p>First login or signup to view content </p>
        </div>
      )}
      {User && <Notes />}
    </>
  );
}

export default Home;
