import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {NoteState} from "./context/Notes/NotesContex";

function App() {
  // eslint-disable-next-line
  const [name, setName] = useState(null);

  return (
    <NoteState>
    <Router>
      <Navbar name={name} />
      <div className="container m-5">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
