const config = {
    user : 'user',
    password : 'user',
    server : 'localhost',
    database : 'testUsers',
    type: "default",
    options : {
        trustedconnection : true,
        trustServerCertificate: true,
        enableArithAort : true,
        instancename : 'SQLEXPRESS'
    },
    port : 1433
}

module.exports = config;