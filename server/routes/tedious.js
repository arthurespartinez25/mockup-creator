var Connection = require('tedious').Connection;  
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
        rowCollectionOnDone : true,
        encrypt: true,
        database: 'mockupdb'  //update me
    }
};  
var connection = new Connection(config);  

/* connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});
    
connection.connect(); */

module.export = connection;

/* 
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    request = new Request("SELECT * FROM Users;", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
            if (column.value === null) {  
            console.log('NULL');  
            } else {  
            result+= column.value + " ";  
            }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}   */