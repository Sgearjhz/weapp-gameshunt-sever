'use strict';
                                                       
var mysql  = require('mysql');                                                                   
var connection = mysql.createConnection({                                                        
    host: 'localhost',                                                                      
    user: 'root',                                                                           
    password: '数据库密码',                                                                      
    port: '3306',                                                                                
    database: 'game',                                                                            
});

module.exports = connection;
