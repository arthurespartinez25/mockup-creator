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
app.use(bodyParser.urlencoded({ extended: true }));

/* var Connection = require('tedious').Connection;  
var config = {  
    server: 'localhost',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'mockuser', //update me
            password: 'Awsol12#'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'mockupdb'  //update me
    }
};  
var connection = new Connection(config);  

connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});
    
connection.connect();
 */

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.use(router);

