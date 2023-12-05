import React, { useContext, useState, useEffect, useRef } from "react";
import NotesContex from "../context/Notes/NotesContex";
import NoteCards from "./NoteCards";

function Notes() {
  const { Notes, addNote, fetchNotes, editNote } = useContext(NotesContex); // delNote in NoteCard
  const [Note, setNote] = useState({ title: "", description: " ", tag: "" });
  const [ENote, setENote] = useState({});

  const onChangeData = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };

  const onEChangeData = (e) => {
    // taking initial input from updateNoteToModal() when edit icon click
    setENote({ ...ENote, [e.target.name]: e.target.value });
  };

  const handelSubmit = (_) => {
    addNote(Note);
    setNote({ title: "", description: " ", tag: "" })
  };
  const handelESubmit = (_) => {
    editNote(ENote);
    document.querySelector(".btn-close").click();
  };

  const updateNoteToModal = (noteEObj) => {
    setENote(noteEObj);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="edesc" className="col-form-label">
                    discription:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="description"
                    value={ENote.description}
                    onChange={onEChangeData}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etitle" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="title"
                    value={ENote.title}
                    onChange={onEChangeData}
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="col-form-label">
                    Tag:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTag"
                    name="tag"
                    value={ENote.tag}
                    onChange={onEChangeData}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelESubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal closed */}
      <div className="container  p-5">
        <h2 className="text-center">Add Notes</h2>
        <div className="mb-3 ">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="form-control"
            placeholder="Min 3 char"
            onChange={onChangeData}
            value={Note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            id="desc"
            type="text"
            name="description"
            className="form-control"
            placeholder="Min 5 char"
            onChange={onChangeData}
            value={Note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            id="tag"
            type="text"
            name="tag"
            className="form-control"
            onChange={onChangeData}
            value={Note.tag}

          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ fontSize: "1.2rem" }}
            onClick={handelSubmit}
            disabled={(Note.title.length < 3 && Note.description.length < 5)}
          >
            Add Note
          </button>
        </div>
      </div>
      {/* returning notes from context */}
      <div className="conatainer row mx-auto ">
        {Notes.map((note) => {
          return (
            <NoteCards
              key={note._id}
              note={note}
              updateNote={updateNoteToModal}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
