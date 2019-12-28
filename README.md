# telegram-bot

based on yagop/node-telegram-bot-api

### 关于如何申请机器人以及如何搭建请点击

[telegram bot](https://showpenz.github.io/2019/12/28/telegram-%E6%9C%BA%E5%99%A8%E4%BA%BA/)

### 使用方法

#### 第一种本地测试

1. 直接 <code>npm i or yarn</code>
2. 替换 testBot.js 内的 bot TOKEN,以及你的 vpn 密码，端口
3. 如果使用到 sendAnimation 方法 最简洁的办法修改 <code>node_modules/node-telegram-bot-api/src/telegram.js</code>;

   第 866 行 <code>opts.qs.document = sendData[1] 修改为 opts.qs.animation = sendData[1]</code>;
   也可以自己 fork yagop/node-telegram-bot-api 代码下来自己修改代码

4. 最后直接在根目录运行 node testBot.js
5. 打开 telegram 机器人发送相应命令即可

#### 第二种线上部署使用

1. 替换 config/config.js 下的 TOKEN，填入你申请的 telegram bot TOKEN
2. 替换 config/url.js 下的 hostUrl，填入你自己的域名
3. 最简洁的办法修改 <code>node_modules/node-telegram-bot-api/src/telegram.js</code>;

   第 866 行 <code>opts.qs.document = sendData[1] 修改为 opts.qs.animation = sendData[1]</code>;
   也可以自己 fork yagop/node-telegram-bot-api 代码下来自己修改代码

4. 在根目录运行 node telegramBot.js 即可启动 telegram 机器人
5. 在 telegram bot 对话栏中输入相应的关键字 即可显示相关的推送

提供功能

1. 搞笑动态图推送 命令为 /gaoxiao
2. 绅士图推送 命令为 /prpr
3. 美丽小姐姐推送 命令为 /beauty
4. 不可描述动态图推送 命令为 /prvo
5. npm 包下载量相关查询 命令为 /npmpkg 查询最近一周的下载量
   命令为 /pkgall 查询总的下载量
