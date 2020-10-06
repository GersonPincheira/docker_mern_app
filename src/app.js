const express = require('express');
const app = express();

app.use("/api/v1/searchProducts", require("./routes/products"));


module.exports = app;