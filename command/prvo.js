const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

module.exports.prvo = function prvo(bot, url) {
  let result = [];

  bot.onText(/\/prvo/, function onLoveText(msg) {
    const chatId = msg.chat.id;
    const idx = parseInt(Math.random() * 1000);

    // console.log(result);
    if (result.length <= 0) {
      request.get(
        {
          url: `${url}${idx}/`,
          encoding: null
        },
        (err, res, body) => {
          if (!err) {
            const html = iconv.decode(body, "UTF-8");
            const $ = cheerio.load(html, { decodeEntities: false });
            const x = $(".list_gifs .item .item-thumb");

            x.map((i, d) => {
              let neihanObj = {};
              let tempSrc = "";
              const regex = /\((.+?)\)/g;
              const regexSrc = $(d)
                .attr("style")
                .match(regex)
                .join("")
                .substring(1);

              tempSrc = regexSrc.substring(0, regexSrc.length - 4) + "mp4";

              neihanObj.src = tempSrc;

              neihanObj.title = $(d)
                .find(".play-gif")
                .attr("data-id");

              neihanObj.id = i;

              return result.push(neihanObj);
            });

            const index = parseInt(Math.random() * result.length);

            bot
              .sendVideo(chatId, result[index].src, {
                caption: result[index].title
              })
              .catch(err => {
                bot.sendMessage(chatId, "爬出问题,sorry", err);
              });
          } else {
            bot.sendMessage(chatId, "爬虫在看小电影");
          }
        }
      );
    } else {
      const index = parseInt(Math.random() * result.length);
      // console.log(result, "cacheResult");
      bot
        .sendVideo(chatId, result[index].src, {
          caption: result[index].title
        })
        .then(() => {
          // console.log(index, "index");
          //console.log(result.length, "deleteResult");
          result.splice(index, 1);
        })
        .catch(err => {
          bot.sendMessage(chatId, "爬出问题,sorry", err);
        });
    }
  });
};
