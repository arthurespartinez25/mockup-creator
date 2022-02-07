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

module.exports = {
    getUsers : getUsers,
    insertUser : insertUser,
    deleteUser : deleteUser
}