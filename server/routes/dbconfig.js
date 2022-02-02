const config = {
    user : 'dbo',
    password : 'dbo',
    server : 'localhost',
    database : 'testUsers',
    options : {
        trustedconnection : true,
        enableArithAort : true,
        instancename : 'SQLEXPRESS'
    },
    port : process.env.PORT || 8000
}

module.exports = config;