const request = require("request");

module.exports.prpr = function prpr(bot, url) {
  bot.onText(/\/prpr/, function onLoveText(msg) {
    const chatId = msg.chat.id;

    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body) || [];
        const index = parseInt(Math.random() * result.length);

        bot
          .sendPhoto(chatId, result[index].file_url, {
            caption: "手冲一时爽，一直手冲一直爽"
          })
          .catch(err => {
            bot.sendMessage(chatId, "手冲失败", err);
          });
      } else {
        bot.sendMessage(chatId, "手冲失败");
      }
    });
  });
};
