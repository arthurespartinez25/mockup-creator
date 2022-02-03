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

module.exports = {
    getUsers : getUsers
}