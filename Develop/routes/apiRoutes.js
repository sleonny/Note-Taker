// const app = require("express").Router();
// const fs = require("fs");
// const { stringify } = require("querystring");
// const uuid = require("uuid");

// app.get("/notes", (req, res) => {
//   fs.readFile("../db/db.json", "utf-8", (err, data) => {
//     const notes = JSON.parse(data);
//     res.json(notes);
//   });
// });

// app.post("/notes", (req, res) => {
//   fs.readFile("../db/db.json", "utf-8", (err, data) => {
//     const notes = JSON.parse(data);
//     const { title, text } = req.body;
//     const newNotes = {
//       title,
//       text,
//       id: uuid(),
//     };
//     notes.push(newNotes);
//     fs.writeFile("../db/db.json", JSON.stringify(notes), (err, data) => {
//       res.json(newNotes);
//     });
//   });
// });

const express = require("express");
const fs = require("fs");
const { stringify } = require("querystring");
const uuid = require("uuid");

const router = express.Router();

router.get("/notes", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    const notes = JSON.parse(data);
    const { title, text } = req.body;
    const newNotes = {
      title,
      text,
      id: uuid(),
    };
    notes.push(newNotes);
    fs.writeFile("../db/db.json", JSON.stringify(notes), (err, data) => {
      res.json(newNotes);
    });
  });
});

module.exports = router;
