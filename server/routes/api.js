const router = require("express").Router();

var Users = require('./users');
const dboperations = require('./dboperations');


/*****************************/



/****************************/

router.route('').get((request, response)=> {
  dboperations.getUsers().then(result => {
     // console.log(result);
     response.json(result[0])
  })
})
router.post("/login", (req, res) => {
  dboperations.getUsers().then(result => {
    console.log("PersonID: " + result[0][0].PersonID);
    console.log("Username: " + result[0][0].Username);
    console.log("Password: " + result[0][0].Password);
    console.log("LastName: " + result[0][0].LastName);
    console.log("FirstName: " + result[0][0].FirstName);
    console.log("Email: " + result[0][0].Email);
  })
  return res.status(200).json({ message: "call to login" });
});


router.post("/register", (req, res) => {

  const {userID, username, password, fname, lname, email} = req.body;
  //console.log(req.body);
  //console.log(`${userID}, ${username}, ${password}, ${fname}, ${lname}, ${email}`);
  const add = dboperations.insertUser(userID, username, password, fname, lname, email); 
  console.log(add); // Promise { <pending> }
  add.then(function(result) {
    //console.log(result) // "Some User token"
    return res.status(200).json({ message: "This is the add result: " + result });
  });
  /* if (add === error){
    console.log(error);
    return res.status(200).json({error: true, message: "Error po" });
  }  */
  
  /* for (i = 0; i< result[0].length; i++){
    console.log("inserted: " + result[0][i]);
    var x = res.status(200).json({ message: result[0][i] });
  } */

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
          database: 'mockupdb',  //update me
          rowCollectionOnRequestCompletion : true
      }
  };  
    
  var Request = require('tedious').Request;  
  var TYPES = require('tedious').TYPES;  

  var connection = new Connection(config);  
  connection.on('connect', function(err) {  
      // If no error, then good to proceed.  
      console.log("Connected");  
      getAllUsers();  
  });  

  connection.connect();
    

  request = new Request(`INSERT INTO Users VALUES (${userID},${username},${password},${fname},${lname},${email});`, (err, rowCount) => {
    if (err) {  
        console.log(err);
        return res.status(200).json({ message: err });
    }

    request.on('done', function(rowCount, rows) {  
      console.log(rowCount + ' rows returned');  
      console.log("Here's Johnny " + rows);
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        res.status(200).json({ message: rowCount });
    });

  });  

  connection.execSql(request);  



  function getAllUsers() {  
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
          res.status(200).json({ message: "call to reg" });
          result ="";  
      });  

      request.on('done', function(rowCount, rows) {  
        console.log(rowCount + ' rows returned');  
        console.log("Here's Johnny " + rows);
      });  
      
      // Close the connection after the final event emitted by the request, after the callback passes
      request.on("requestCompleted", function (rowCount, more) {
          connection.close();
      });
      connection.execSql(request);  
    }  

 */
}); 


router.get("/deleteUser/:userID", (req, res) => {
  const {userID} = req.params;
  //return res.send(req.params);
  const del = dboperations.deleteUser(userID);
  console.log(del); // Promise { <pending> }
  del.then(function(result) {
    //console.log(result) // "Some User token"
    return res.status(200).json({ message: "This is the delete result: " + result });
  });
});


module.exports = router;
