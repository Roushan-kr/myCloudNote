import { useContext, useEffect } from "react";
import NotesContex from "../context/Notes/NotesContex";

function About() {
  const a = useContext(NotesContex);
  // useEffect(()=>{a.update();});
  return (
    <div>
      <h1>This is a about</h1>
      <p>
        this is {a.state.name} from {a.state.branch}
      </p>
    </div>
  );
}

export default About;
