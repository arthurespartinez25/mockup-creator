var config = require('./dbconfig');
const sql = require('mssql');

async function getUsers(){
    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from Users");
        //console.log(users.recordsets[0][0].PersonID);
        return users.recordsets;
    }
    catch (error) {
        console.warn(error);
    }
}

async function insertUser(username, password, fname, lname, email){
    try{
        let pool = await sql.connect(config);
        let addQuery = await pool.request().query(
            `INSERT INTO Users (
                UserName, 
                Password, 
                FirstName, 
                LastName, 
                Email
            ) VALUES (
                '${username}',
                '${password}',
                '${fname}',
                '${lname}',
                '${email}');`
        );
        //let addedUser = await pool.request().query(`SELECT * from Users WHERE UserID = ` + userID + `;`);
        //console.log(users.recordsets[0][0].PersonID);
        //return users.recordsets;
        //console.log("Here's Johnny " + addQuery);
        return addQuery;
    }
    catch (error) {
        //console.warn(error);
        return error;
    }
}

async function getTotal(userID){
    try{
        let pool = await sql.connect(config);
        let total = await pool.request().query(`SELECT * from projects_table WHERE user_id=${userID}`);
        return total.rowsAffected[0];
    }
    catch (error) {
        console.warn(error);
    }
}

async function deleteUser(userID){
    try{
        let pool = await sql.connect(config);
        //let tobeDeletedUser = await pool.request().query(`SELECT FROM Users WHERE UserID=${userID};`);
        let deleteUser = await pool.request().query(`DELETE FROM Users WHERE UserID=${userID};`);
        //console.log(tobeDeletedUser);
        return deleteUser;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function saveProject(userID, projectName, projectID) {
    let query = `INSERT INTO projects_table (user_id, project_id, project_name, date) VALUES ('${userID}', '${projectID}', '${projectName}', CURRENT_TIMESTAMP);`;
    try {
        let pool = await sql.connect(config);
        let total = await pool.request().query(query);
        return total;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function saveTabs(canvasKeys, canvasNames) {
    let query = `INSERT INTO tab_table (tab_id, tab_name) VALUES `;

    for (let i = 0; i < canvasKeys.length; i++) { //query builder for single query insert
        query += `('${canvasKeys[i]}', '${canvasNames[i]}')`;
        if (i < (canvasKeys.length - 1)) {
            query += `, `;
        }
    }
    
    try {
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        return results;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

module.exports = {
    getUsers : getUsers,
    insertUser : insertUser,
    deleteUser : deleteUser,
    saveProject : saveProject,
    getTotal : getTotal,
    saveTabs : saveTabs
}