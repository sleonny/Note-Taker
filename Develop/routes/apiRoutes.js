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

module.exports = router;
