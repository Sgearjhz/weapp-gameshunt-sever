'use sitrict';                                                                                                     
var https = require('https');
var url = require('url');
var EventEmitter = require('events').EventEmitter;
var resevent = new EventEmitter();

var API = 'https://store.playstation.com/store/api/chihiro/00_09_000/container/'
var region = ''
var data = ''
var result = {}
var json = {}

//请求格式：https://{{host}}/searchid?region=*&id=*

module.exports = function(req, res){
    //------------end事件--------------//
    resevent.on('end', function() {
      res.end(JSON.stringify(result));
    });
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    var params = url.parse(req.url, true).query;
    //------确定地区、语言------//
    switch (params.region) {
      case 'HK':
        region = 'HK/zh';
        break;
      case 'CN':
        region = 'CN/zh';
        break;
      case 'JP':
        region = 'JP/ja';
        break;
      case 'US':
        region = 'US/en';
        break;
      default:
        region = 'HK/zh';
    }
    if (params.id !== undefined) {
      //------------------------JSON中转站--------------------------//
      https.get(API + region + '/999/'+ params.id, function(res) {
        data = '';//清空上次结果
        res.on('data', function(apijson) {
          data += apijson;
      })
      res.on('end', function () {
        json = JSON.parse(data);
        result = {                                                                                
          "id": json.id,                                                                          
          "name": json.short_name,                                                               
          "title_name": json.title_name,
          "release_date": json.release_date,                                                     
          "price": json.display_price,                                                           
          "platform": json.playable_platform,                                                    
          "provider": json.provider_name,                                                        
          "gametype": json.game_contentType,                                                     
          "age_limit": json.age_limit,                                                           
          "rating": json.star_rating.score,                                                      
          "long_desc": json.long_desc,                                                           
          "images": json.images,
          "media": json.mediaList                                                                             
        }                                                                                        
        resevent.emit('end');//触发end事件                                                                    
        });                                                                                      
      });                                                                                        
    };                                                                                            
};