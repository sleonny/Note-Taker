const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const express = require("express");
const app = express();

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

app.post("/notes", (req, res) => {
  let db = fs.readFileSync(path.join(__dirname, "../db/db.json"));
  db = JSON.parse(db);

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid.v4(),
  };

  db.push(newNote);
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db));

  res.json(db);
});

module.exports = app;
