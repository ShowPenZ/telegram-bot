const { beauty } = require("./command/beauty");
const { prvo } = require("./command/prvo");
const { gaoxiao } = require("./command/happy");
const { prpr } = require("./command/prpr");
const { npmpkg, npmpkgall } = require("./command/npmPkgPoint");

const TelegramBot = require("node-telegram-bot-api/src/telegram");
const express = require("express");
const bodyParser = require("body-parser");

const urlDefine = require("./config/url");
const config = require("./config/config");

const bot = new TelegramBot(config.TOKEN);
bot.setWebHook(`${urlDefine.hostUrl}/bot${config.TOKEN}`);

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post(`/bot${config.TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);

  res.sendStatus(200);
});

app.listen(config.port, () => {
  console.log(`Express server is listening on ${config.port}`);
});

prpr(bot, urlDefine.prprUrl);
gaoxiao(bot, urlDefine.gaoxiaoUrl);
prvo(bot, urlDefine.prvoUrl);
beauty(bot, urlDefine.beautyUrl);
npmpkg(bot);
npmpkgall(bot);


bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

process.on("uncaughtException", function(error) {
  console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});
process.on("unhandledRejection", function(error) {
  console.log("\x1b[31m", "Error: ", error.message, "\x1b[0m");
});
