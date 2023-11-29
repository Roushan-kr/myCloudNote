import { createContext, useState } from "react";

const NotesContex = createContext();

const NoteState = (props) => {
  const s1 = {
    name: "roushan",
    branch: "cse",
  };
  const [state, setstate] = useState(s1);
  // const update=()=>{setInterval(() => {
  //   setstate({ name: "rj" });
  // }, 1000);}
  return (
    <NotesContex.Provider value={{state, update:undefined}}>{props.children}</NotesContex.Provider>
  );
};

export default NotesContex;
export { NoteState };
