import React, { useContext } from "react";
import NotesContex from "../context/Notes/NotesContex";

function NoteCards(props) {
  const { delNote } = useContext(NotesContex);
  const { title, description, tag, _id } = props.note;
  return (
    <div className="col-md-3 my-1">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>{tag}</h5>
          <div>
            <i
              className="fas fa-pen-to-square mx-2"
              onClick={() => props.updateNote(props.note)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>
            <i
              className="fas fa-trash"
              onClick={() => {
                delNote(_id);
              }}
            ></i>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteCards;
