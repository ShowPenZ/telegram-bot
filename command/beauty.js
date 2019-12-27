module.exports.beauty = function beauty(bot, url) {
  bot.onText(/\/beauty/, function onLoveText(msg) {
    const chatId = msg.chat.id;
    const index = parseInt(Math.random() * 31000);

    bot
      .sendPhoto(chatId, `${url}${index}.jpg`, {
        caption: "oh beautiful lady!"
      })
      .catch(err => {
        bot.sendMessage(chatId, `发送失败+${err}`);
      });
  });
};
