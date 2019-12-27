const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

let results = [];
let page = 1;
module.exports.gaoxiao = function gaoxiao(bot, url) {
  bot.onText(/\/gaoxiao/, function onLoveText(msg) {
    const chatId = msg.chat.id;
    console.log(results);

    if (results.length <= 0) {
      request.get(
        {
          url: page > 1 ? `${url}/index_${page}.html` : url,
          encoding: null
        },
        (err, res, body) => {
          console.log(url);
          if (!err) {
            const html = iconv.decode(body, "gb2312");
            const $ = cheerio.load(html, { decodeEntities: false });
            const x = $(".all-content  .listgif-giftu");

            x.map((i, d) => {
              let neihanObj = {};

              neihanObj.src = $(d)
                .find("a img")
                .attr("gifsrc");

              console.log(neihanObj.src);

              neihanObj.title = $(d)
                .find("a img")
                .attr("alt");

              neihanObj.id = i;

              return results.push(neihanObj);
            });

            console.log(results);

            const index = parseInt(Math.random() * results.length);

            // console.log("results", results);
            const fileOptions = {
              // Explicitly specify the MIME type.
              contentType: "images/gif"
            };
            bot
              .sendAnimation(
                chatId,
                results[index].src,
                { caption: results[index].title },
                fileOptions
              )
              .catch(err => {
                bot.sendMessage(chatId, "爬出了屎,sorry", err);
              });
          } else {
            bot.sendMessage(chatId, "爬虫在看小电影");
          }
        }
      );
    } else {
      const index = parseInt(Math.random() * results.length);
      // console.log(result, "cacheResult");
      bot
        .sendAnimation(chatId, results[index].src, {
          caption: results[index].title
        })
        .then(() => {
          // console.log(index, "index");
          console.log(results.length, "deleteResult");
          results.splice(index, 1);
          if (results.length <= 0) {
            page += 1;
          }
        })
        .catch(err => {
          bot.sendMessage(chatId, "爬出了屎,sorry", err);
        });
    }
  });
};
