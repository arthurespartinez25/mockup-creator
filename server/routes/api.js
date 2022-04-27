const router = require("express").Router();

var Users = require('./users');
const dboperations = require('./dboperations');
const { resourceLimits } = require("worker_threads");
const bcrypt = require("bcrypt");
const auth = require('./auth')


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
  let newUser = {
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 8),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email
	}
  // const {username, password, fname, lname, email} = req.body;
  //console.log(req.body);
  //console.log(`${userID}, ${username}, ${password}, ${fname}, ${lname}, ${email}`);
  const add = dboperations.insertUser(newUser.username, newUser.password, newUser.fname, newUser.lname, newUser.email); 
  //console.log(add); // Promise { <pending> }
  add.then(function(result) {
    //console.log(result) // "Some User token"
    try{
      console.log(result);
      return res.status(200).json({ Message: "This is the add result: " + result });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
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
router.get('/getProjects/:userID', (req, res)=>{
  const {userID} = req.params;
  dboperations.getProjects(userID).then(result=>{
    return res.status(200).json(result);
  })
})

router.get('/getProject/:projectID', (req, res)=>{
  const {projectID} = req.params;
  dboperations.getSingleProject(projectID).then(result=>{
    return res.status(200).json(result);
  })
})

router.get('/getAllProjects/', (req, res)=>{
  dboperations.getAllProjects().then(result=>{
    return res.status(200).json(result);
  })
})

router.get('/total/:userID', (req, res) => {
  const {userID} = req.params;
  dboperations.getTotal(userID).then(result => {
    console.log(result);
    return res.status(200).json({result});
 });
});

router.post('/save', (req, res) => {
  const {userID, projectName, projectID} = req.body;
  const save = dboperations.saveProject(userID, projectName, projectID); 
  save.then(function(result) {
    try{
      console.log(result);
      return res.status(200).json({ Message: "This is the save result: " + result });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
  });
});

router.post('/saveTabs', (req,res) => {
  const {canvasKeys, canvasNames} = req.body;
  const save = dboperations.saveTabs(canvasKeys, canvasNames);
  save.then(function(result) {
    try{
      console.log(result);
      return res.status(200).json({ Message: "This is the save result: " + result });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
  });
});

router.post('/saveComponents', (req, res) => {
  const {componentList, canvasKeys, canvasNativeKeys} = req.body;
  const save = dboperations.saveComponents(componentList, canvasKeys, canvasNativeKeys);
  save.then(function(result) {
    try{
      console.log(result);
      return res.status(200).json(result);
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
  });
});

router.post('/saveCss', (req, res) => {
  const {projectID, name, properties} = req.body;
  const save = dboperations.saveCss(projectID, name, properties);
  save.then(function(result) {
    try{
      console.log(result);
      return res.status(200).json({ Message: "This is the save result: " + result });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
  });
});

router.post('/previousState', (req, res) => {
  const {projectID, tabID, tabSequence} = req.body;
  const save = dboperations.savePrevious(projectID, tabID, tabSequence);
  save.then(function(result) {
    try{
      console.log(result);
      return res.status(200).json({ Message: "This is the save result: " + result });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
  });
});

router.post('/tableContent', (req, res) => {
  const {projectID, tblIds, tblContent} = req.body;
  const save = dboperations.saveTableContent(projectID, tblIds, tblContent);
  save.then(function(result) {
    try{
      console.log(result);
      return res.status(200).json({ Message: "This is the save result: " + result });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ Error: error });
    }
  });
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

router.get("/deleteProject/:projectID", (req, res) => {
  const {projectID} = req.params;
  const del = dboperations.deleteProject(projectID);
  del.then(function(result) {
    return res.status(200).json(result);
  });
});
router.get("/deleteComponents/:projectID", (req, res) => {
  const {projectID} = req.params;
  const del = dboperations.deleteComponents(`${projectID}_canvas`);
  del.then(function(result) {
    return res.status(200).json(result);
  });
});
router.get("/deleteCss/:projectID", (req, res) => {
  const {projectID} = req.params;
  const del = dboperations.deleteCss(projectID);
  del.then(function(result) {
    return res.status(200).json(result);
  });
});
router.get("/deleteTabs/:projectID", (req, res) => {
  const {projectID} = req.params;
  const del = dboperations.deleteTabs(`${projectID}_canvas`);
  del.then(function(result) {
    return res.status(200).json(result);
  });
});
router.get("/deletePreviousState/:projectID", (req, res) => {
  const {projectID} = req.params;
  const del = dboperations.deletePreviousState(projectID);
  del.then(function(result) {
    return res.status(200).json(result);
  });
});
router.get("/deleteTable/:projectID", (req, res) => {
  const {projectID} = req.params;
  const del = dboperations.deleteTable(projectID);
  del.then(function(result) {
    return res.status(200).json(result);
  });
});

router.get("/getComponents/:tabsID", (req, res) => {
  const {tabsID} = req.params;
  dboperations.getComponents(`${tabsID}_canvas`).then(result => {

    res.json(result[0])
 })
});
router.get("/getCanvas/:tabID", (req, res) => {
  const {tabID} = req.params;
  dboperations.getCanvas(`${tabID}_canvas`).then(result => {
    res.json(result)
 })
});
router.get("/getCss/:projectID", (req, res) => {
  const {projectID} = req.params;
  dboperations.getCss(projectID).then(result => {
    res.json(result)
 })
});

module.exports = router;
