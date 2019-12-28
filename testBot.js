const TelegramBot = require("node-telegram-bot-api/src/telegram");
const Agent = require("socks5-https-client/lib/Agent");
const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const npm = require("./utils/request");
const { pkg } = require("./config/pkg");

const TOKEN = "xxxx"; // 替换成你的telegram bot TOKEN
const gaoxiaoUrl = "http://www.gaoxiaogif.com/";
const beautyUrl = "https://erowall.com/wallpapers/large/";
// const gifUrl = "http://dl.phncdn.com/gif/6166241.gif";

const vo = "https://xcafe.com/gifs/";

const bot = new TelegramBot(TOKEN, {
  polling: true,
  request: {
    // 设置代理
    agentClass: Agent,
    agentOptions: {
      socksPassword: "", // 填入你的vpn密码
      socksPort: "" // 填入你vpn代理端口
    }
  }
});

bot.onText(/\/prpr/, function onLoveText(msg) {
  const chatId = msg.chat.id;
  request("https://konachan.com/post.json?tags=pussy&limit=50", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body) || [];
      const index = parseInt(Math.random() * result.length);
      bot
        .sendPhoto(chatId, result[index].file_url, {
          caption: "手冲一时爽，一直手冲一直爽"
        })
        .catch(err => {
          bot.sendMessage(chatId, "手冲失败");
        });
    } else {
      bot.sendMessage(chatId, "手冲失败");
    }
  });
});

bot.onText(/\/npmpkg/, function onLoveText(msg) {
  const chatId = msg.chat.id;
  let pkgDownloadInfo = [];

  const reqs = () => {
    return (resolve, reject) => {
      pkg.forEach((d, i) => {
        npm.state(d.name, (err, res) => {
          pkgDownloadInfo.push(res);

          if (pkgDownloadInfo.length === pkg.length) {
            resolve(pkgDownloadInfo);
          }

          if (err) {
            reject(err);
          }
        });
      });
    };
  };

  if (pkg.length > 0) {
    new Promise(reqs())
      .then(res => {
        let y = [];

        res.forEach((d, i) => {
          let x = `下载量:  ${d.downloads}\n时间:      ${d.start} : ${d.end}\n包名:      ${d.package}\n\n`;

          y.push(x);
        });

        bot
          .sendMessage(chatId, y.join(""), {
            parse_mode: "markdown"
          })
          .catch(err => {
            bot.sendMessage(chatId, "爬出问题,sorry", err);
          });
      })
      .catch(reason => {
        console.log(reason, "reject");
      });
  }
});

bot.onText(/\/beauty/, function onLoveText(msg) {
  const chatId = msg.chat.id;
  const index = parseInt(Math.random() * 31000);

  bot
    .sendPhoto(chatId, `${beautyUrl}${index}.jpg`, {
      caption: "oh beautiful lady!"
    })
    .catch(err => {
      bot.sendMessage(chatId, `手冲失败+${err}`);
    });
});

let result = [];
bot.onText(/\/prvo/, function onLoveText(msg) {
  const chatId = msg.chat.id;
  const idx = parseInt(Math.random() * 1000);

  if (result.length <= 0) {
    request.get(
      {
        url: `${vo}${idx}/`,
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

    bot
      .sendVideo(chatId, result[index].src, {
        caption: result[index].title
      })
      .then(() => {
        result.splice(index, 1);
      })
      .catch(err => {
        bot.sendMessage(chatId, "爬出了问题,sorry", err);
      });
  }
});

bot.onText(/\/meizi/, function onLoveText(msg) {
  const chatId = msg.chat.id;
  request.post("http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1", function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body) || [];
      const index = parseInt(Math.random() * result.length);

      bot
        .sendPhoto(chatId, result[index].url, {
          caption: result[index].type
        })
        .catch(err => {
          bot.sendMessage(chatId, `手冲失败+${err}`);
        });
    } else {
      bot.sendMessage(chatId, `手冲失败+${error}`);
    }
  });
});

let results = [];
let page = 1;
bot.onText(/\/gaoxiao/, function onLoveText(msg) {
  const chatId = msg.chat.id;

  if (results.length <= 0) {
    request.get(
      {
        url: page > 1 ? `${gaoxiaoUrl}/index_${page}.html` : gaoxiaoUrl,
        encoding: null
      },
      (err, res, body) => {
        if (!err) {
          const html = iconv.decode(body, "gb2312");
          const $ = cheerio.load(html, { decodeEntities: false });
          const x = $(".all-content  .listgif-giftu");

          x.map((i, d) => {
            let neihanObj = {};

            neihanObj.src = $(d)
              .find("a img")
              .attr("gifsrc");

            neihanObj.title = $(d)
              .find("a img")
              .attr("alt");

            neihanObj.id = i;

            return results.push(neihanObj);
          });

          const index = parseInt(Math.random() * results.length);

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
              bot.sendMessage(chatId, "爬出了问题,sorry", err);
            });
        } else {
          bot.sendMessage(chatId, "爬虫在看小电影");
        }
      }
    );
  } else {
    const index = parseInt(Math.random() * results.length);
    
    bot
      .sendAnimation(chatId, results[index].src, {
        caption: results[index].title
      })
      .then(() => {
        results.splice(index, 1);
        if (results.length <= 0) {
          page += 1;
        }
      })
      .catch(err => {
        bot.sendMessage(chatId, "爬出了问题,sorry", err);
      });
  }
});

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
