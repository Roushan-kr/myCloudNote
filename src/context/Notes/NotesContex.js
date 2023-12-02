import { createContext, useState } from "react";

const NotesContex = createContext();

const host = process.env.REACT_APP_HOST;

const NoteState = (props) => {

  // Notes assigment
  const [Notes, setNotes] = useState([]);

  // Get all Notes
  const fetchNotes = async () => {
    // API  Call
    const response = await fetch(`${host}/api/v1/Notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MDM0N2ZmNTcwYzA0MTMyZTg2ODg0In0sImlhdCI6MTcwMDgwMzczM30.V2qCx6JXbmsOibzU8gCFDHYWLk7YtCb22UFWwnLzHF4",
      }
    });
    const notes =await response.json();
    console.log(notes)
    setNotes(notes);
  };

  // Add a Note
  const addNote = async (obj) => {
    const { title, description, tag } = obj;
    // API  Call
    const response = await fetch(`${host}/api/v1/Notes/addNote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MDM0N2ZmNTcwYzA0MTMyZTg2ODg0In0sImlhdCI6MTcwMDgwMzczM30.V2qCx6JXbmsOibzU8gCFDHYWLk7YtCb22UFWwnLzHF4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // logic for Client Side
    const note = await response.json();
    
    setNotes(Notes.concat(note));
  };


  // Delete a Note
  const delNote = async (id) => {
    // TODO: APi call
    const response = await fetch(`${host}/api/v1/Notes/delNote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MDM0N2ZmNTcwYzA0MTMyZTg2ODg0In0sImlhdCI6MTcwMDgwMzczM30.V2qCx6JXbmsOibzU8gCFDHYWLk7YtCb22UFWwnLzHF4",
      },
    });
    console.log(response)
    // Frontend Logic
    console.log(id, ": Deleted");
    const NewNotes = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(NewNotes);
  };


  // Modify a Note
  const editNote = async (NoteObj) => {
    console.log(NoteObj)
    const { title, description, tag, _id } = NoteObj;
    // API  Call
    const response = await fetch(`${host}/api/v1/Notes/updateNote/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MDM0N2ZmNTcwYzA0MTMyZTg2ODg0In0sImlhdCI6MTcwMDgwMzczM30.V2qCx6JXbmsOibzU8gCFDHYWLk7YtCb22UFWwnLzHF4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response.json());

    // Logic for Client Side
    console.log(_id, ": Edited");
    const NewNotes = Notes.map((note) => {
      if (note._id === _id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      return note;
    });
    setNotes(NewNotes);
  };
  return (
    <NotesContex.Provider
      value={{ Notes, setNotes, addNote, delNote, editNote , fetchNotes}}
    >
      {props.children}
    </NotesContex.Provider>
  );
};

export default NotesContex;
export { NoteState };
