#微信小程序 GamesHunt 服务端  - Node.js

本项目是基于 [腾讯云微信小程序服务端 Demo - Node.js](https://github.com/tencentyun/wafer-node-server-demo) 开发的。示例需要和 [微信小程序 GamesHunt - weapp](https://github.com/Sgearjhz/weapp-gameshunt) 配合一起使用。

## 运行示例

按照[小程序创建资源配置指引](https://github.com/tencentyun/weapp-doc)进行操作，可以得到运行本项目所需的资源和服务，其中包括已部署好的示例代码及自动下发的 SDK 配置文件 `/etc/qcloud/sdk.config`。

- 本地开发环境：`VSCode 1.13.1`
- 代码部署目录：`/data/release/node-weapp-demo`
- 运行示例的 Node 版本：`v4.6.0`
- Node 进程管理工具：`pm2`
- 数据库版本：`MySQL 5.5.52-MariaDB`

## 项目结构

```
Demo
├── README.md
├── app.js
├── business
├── config.js
├── globals.js
├── package.json
├── process.json
├── routes
│   ├── index.js
│   ├── sql.js
│   ├── list.js
│   ├── searchid.js
│   ├── searchname.js
│   └── searchuser.js
└── setup-qcloud-sdk.js
```

其中，`app.js` 是 启动文件，`config.js` 配置了启动服务监听的端口号，`process.json` 是运行本示例 的 `pm2` 配置文件。

`setup-qcloud-sdk.js` 用于初始化 SDK 配置，配置从文件 `/etc/qcloud/sdk.config` 中读取。 配置文件包含如下配置项：

```
json
{
    "serverHost": "业务服务器的主机名",                      //更改为小程序解决方案分配的域名
    "authServerUrl": "鉴权服务器地址",                      //没有用到，不需要更改
    "tunnelServerUrl": "信道服务器地址",                    //没有用到，不需要更改
    "tunnelSignatureKey": "和信道服务器通信的签名密钥"
}
```

`routes/` 目录除了包含了示例用到的4个路由(没有用到)，还有基于demo开发的其他四个路由，路由和处理文件映射关系如下：

```
// 首页指引
/ => routes/welcome.js

// 游戏表单
/list => routes/list.js

// 根据游戏ID获取游戏信息
/searchid => routes/searchid.js

// 根据游戏名称模糊搜索游戏
/searchname => routes/searchname.js

// 获取玩家信息
/searchuser => routes/searchuser.js
```r

`routes/sql.js` 用来登陆数据库。
