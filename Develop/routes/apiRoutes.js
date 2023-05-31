const app = require('express').Router;
const fs = require('fs');
const uuid = require('uuid');

app.get('/notes', (req, res) => {
  fs.readFile('../db/db.json', 'utf-8', (err, data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

