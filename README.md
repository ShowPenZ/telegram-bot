# telegram-bot
based on yagop/node-telegram-bot-api 


使用方法
1. 替换config/config.js 下的TOKEN，填入你申请的telegram bot TOKEN
2. 替换config/url.js 下的hostUrl，填入你自己的域名
3. 最简洁的办法修改 <code>node_modules/node-telegram-bot-api/src/telegram.js</code>; 

   第866行 <code>opts.qs.document = sendData[1] 修改为 opts.qs.animation = sendData[1]</code>; 
   也可以自己fork yagop/node-telegram-bot-api 代码下来自己修改代码

3. 在根目录运行 node telegramBot.js 即可启动telegram机器人 
4. 在telegram bot对话栏中输入相应的关键字 即可显示相关的推送

提供功能
1. 搞笑动态图推送        命令为 /gaoxiao
2. 绅士图推送           命令为 /prpr
3. 美丽小姐姐推送        命令为 /beauty
4. 不可描述动态图推送     命令为 /prvo
5. npm包下载量相关查询    命令为 /npmpkg  查询最近一周的下载量
                       命令为 /pkgall  查询总的下载量   

