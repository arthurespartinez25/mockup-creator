"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./server/routes/api");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.use(router);

