const express = require('express');
const app = require("./src/app");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require("./src/database");

const port = process.env.PORT || 8080;

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Server Listening on ${port}`);
});
