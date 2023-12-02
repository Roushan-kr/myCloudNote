const express = require("express");
const router = express.Router();
const Notes = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// ROUTE: 1 fetch all notes from uid: GET "/api/v1/Notes/fetchAllNotes" require auth
// it is not protected mean a hacker access this using stealing auth-token
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE: 2 Add notes to uid: POST "/api/v1/Notes/addNote" require auth
router.put(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a Valdi Title").isLength({ min: 3 }),
    body("description", "Enter min 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag,
      });

      const savedNote = await note.save();

      res.status(200).json(savedNote);
    } catch (error) {
      // If an error occurs, send a 500 Internal Server Error response
      console.error("Error creating Notes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE: 3 update notes to uid: POST "/api/v1/Notes/updatenote" require auth
router.post("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const newNote = {};
    const { title, description, tag } = req.body;
    // create a new note obj
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    try {
      // getting and checking notes using uid
      // Fetch and check the existing note using the provided ID
      const existingNote = await Notes.findById(req.params.id);
      if (!existingNote) {
        return res.status(404).json({ error: "Note not found" });
      } // Check if the authenticated user is the owner of the note
      if (existingNote.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not Allowed" });
      }
    } catch (error) {
      console.error("Error Fetching Notes:", error);
      res.status(400).json({ error: "Invalid Argument" });
    }

    // Now Updating note
    let resNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(resNote);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error("Error updating Notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ROUTE: 4 delete notes by nid: POST "/api/v1/Notes/delNote" require auth
router.delete("/delNote/:id", fetchUser, async (req, res) => {
  try {
    try {
      // getting and checking notes using uid
      // Fetch and check the existing note using the provided ID
      const existingNote = await Notes.findById(req.params.id);
      if (!existingNote) {
        return res.status(404).json({ error: "Note not found" });
      } // Check if the authenticated user is the owner of the note
      if (existingNote.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not Allowed" });
      }
    } catch (error) {
      console.error("Error Fetching Notes:", error);
      res.status(400).json({ error: "Invalid Argument" });
    }

    // Now delating note
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
    
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error("Error updating Notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
