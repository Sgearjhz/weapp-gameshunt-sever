'use strict';
                                                       
var mysql  = require('mysql');                                                                   
var connection = mysql.createConnection({                                                        
    host: 'localhost',                                                                      
    user: 'root',                                                                           
    password: 'Qwer1234a',                                                                      
    port: '3306',                                                                                
    database: 'game',                                                                            
});

module.exports = connection;
