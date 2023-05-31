const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const express = require("express");
const app = express();

app.use(express.json()); // Add this line to parse JSON data in the request body

app.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to read notes from the file." });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to read notes from the file." });
    }
    const notes = JSON.parse(data);

    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4(),
    };

    notes.push(newNote);

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Failed to write notes to the file." });
        }
        res.json(notes);
      }
    );
  });
});

module.exports = app;
