'use sitrict';                                                                                                     
                                                                              
var connection = require('./sql');
var url = require('url');                                                                                          
var EventEmitter = require('events').EventEmitter;                                                                 
var resevent = new EventEmitter();

var json = {"datas":[]}
var result = {}

//请求格式：https://{{host}}/searchname?region=*&name=*

module.exports = (req, res) => {
  //------------end事件--------------//
  resevent.on('end', function() {
    res.end(JSON.stringify(result));
  });
  var params = url.parse(req.url, true).query;
  if (params.name !== undefined) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    //-----------------------根据地区查询不同数据库，模糊查询游戏名称-----------------------//
    var sql = "SELECT * FROM "+params.region+" WHERE name LIKE '%"+params.name+"%'";
    connection.query(sql, function (err, res) {
      if (err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      for (var i = 0; i < res.length; i++){
        json.datas[i] = {                                                                                
          "id": res[i].id,                                                                          
          "name": res[i].name,
          "release_date": res[i].date,                                                     
          "price": res[i].price,
          "platform": res[i].platform,
          "gametype": res[i].type,
          "language": res[i].language,                                                           
          "images": res[i].img_src,
          "discount": res[i].discount,
        }
      }
      result = json;
      json = {"datas":[]};//清空上次查询结果
      resevent.emit('end');//触发end事件
    });
  }
};