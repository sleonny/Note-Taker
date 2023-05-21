const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const PORT = 5500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log("Server Listening @ Port 5500");
});
