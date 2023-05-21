const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/routes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/routes.html"))
);

require("./routes/apiRoutes")(app);
require("/routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log("Server Listening @ Port 3001");
});
