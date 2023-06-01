const express = require("express");
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/notes", (req, res) => {
  fs.readFile(
    path.resolve(__dirname, "../db/db.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      }
      const notes = JSON.parse(data);
      res.json(notes);
    }
  );
  console.log("here");
});

router.post("/notes", (req, res) => {
  fs.readFile(
    path.resolve(__dirname, "../db/db.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      }
      const notes = JSON.parse(data);
      const { title, text } = req.body;
      const newNotes = {
        title,
        text,
        id: uuidv4(),
      };
      notes.push(newNotes);
      fs.writeFile(
        path.resolve(__dirname, "../db/db.json"),
        JSON.stringify(notes),
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res.json(newNotes);
        }
      );
    }
  );
});

router.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile(
    path.resolve(__dirname, "../db/db.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      let notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== noteId);

      if (notes.length === filteredNotes.length) {
        res.status(404).json({ error: "Note not found" });
        return;
      }

      fs.writeFile(
        path.resolve(__dirname, "../db/db.json"),
        JSON.stringify(filteredNotes),
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          res.json({ message: "Note deleted successfully" });
        }
      );
    }
  );
});

module.exports = router;
