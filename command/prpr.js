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
            caption: "奇摸鸡"
          })
          .catch(err => {
            bot.sendMessage(chatId, "发送失败", err);
          });
      } else {
        bot.sendMessage(chatId, "发送失败");
      }
    });
  });
};
