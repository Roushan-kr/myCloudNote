import "./App.css";
import { useState } from "react";
import { NoteState } from "./context/Notes/NotesContex";
import { UserState } from "./context/User/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  // eslint-disable-next-line
  const [alert, setalert] = useState(null);

  const showAlert = (alertTyp, msg) => {
    setalert({ msg, alertTyp, alert: "true" });
    console.log({ msg, alertTyp, alert: "true" });

    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Router>
        <UserState>
          <Navbar />
          <Alert alert={alert} />
          <div className="container m-5">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignUp showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </UserState>
      </Router>
    </NoteState>
  );
}

export default App;
