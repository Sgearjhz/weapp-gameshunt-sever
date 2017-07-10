'use sitrict';                                                                                                     
                                                                              
var connection = require('./sql');
var url = require('url');                                                                                          
var EventEmitter = require('events').EventEmitter;                                                                 
var resevent = new EventEmitter();

var json = {}
var result = {}

//请求格式：https://{{host}}/searchuser?psnid=*

module.exports = (req, res) => {
  //------------end事件--------------//
  resevent.on('end', function() {
    res.end(JSON.stringify(result));
  });
  var params = url.parse(req.url, true).query;
  if (params.psnid !== undefined) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    //------------------------从user库查询玩家psnid-----------------------//
    if (params.psnid == 'random')
      var sql = "SELECT * FROM user WHERE game8 IS NOT NULL AND game8 != '' ORDER BY RAND() LIMIT 1";
    else
      var sql = "SELECT * FROM user WHERE psnid='"+params.psnid+"'";
    connection.query(sql, function (err, res) {
      if (err) {
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      var i = 0;
      json = {                                                                                
        "psnid": res[i].psnid,                                                                          
        "ava": res[i].ava,
        "platinum": res[i].platinum,                                                     
        "gold": res[i].gold,
        "silver": res[i].silver,
        "bronze": res[i].bronze,
        "total_trophy": res[i].total_trophy,                                                           
        "level": res[i].level,
        "rank": res[i].rank,
        "total_game": res[i].total_game,
        "perfect": res[i].perfect,
        "rate": res[i].rate,
        "games":[
          { "game": res[i].game1,
            "img": res[i].game1_img
          },
          { "game": res[i].game2,
            "img": res[i].game2_img
          },
          { "game": res[i].game3,
            "img": res[i].game3_img
          },
          { "game": res[i].game4,
            "img": res[i].game4_img
          },
          { "game": res[i].game5,
            "img": res[i].game5_img
          },
          { "game": res[i].game6,
            "img": res[i].game6_img
          },
          { "game": res[i].game7,
            "img": res[i].game7_img
          },
          { "game": res[i].game8,
            "img": res[i].game8_img
          },
          { "game": res[i].game9,
            "img": res[i].game9_img
          },    
        ]
      }
      result = json;
      json = {};//清空上次查询结果
      resevent.emit('end');//触发end事件
    });
  }
};