const { state, allState } = require("../utils/request");
const { pkg } = require("../config/pkg");

function botEventEmitter(bot, command, type) {
  bot.onText(command, function onLoveText(msg) {
    const chatId = msg.chat.id;
    let pkgDownloadInfo = [];

    if (pkg.length > 0) {
      new Promise(reqs(pkg, type, pkgDownloadInfo))
        .then(res => {
          const text = command.test("/npmpkg")
            ? "npm包最近一周下载量 \n"
            : "npm包总下载量 \n";
          let y = [];

          sourceFree(res, y);

          botAction(bot, chatId, text, y);
        })
        .catch(reason => {
          console.log(reason, "reject");
        });
    }
  });
}

function reqs(p, fun, arr) {
  return (resolve, reject) => {
    p.forEach((d, i) => {
      fun(d.name, (err, res) => {
        arr.push(res);

        if (arr.length === pkg.length) {
          resolve(arr);
        }

        if (err) {
          reject(err);
        }
      });
    });
  };
}

function botAction(bot, id, text, res) {
  bot
    .sendMessage(id, text + res.join(""), {
      parse_mode: "markdown"
    })
    .catch(err => {
      bot.sendMessage(id, "爬出了问题,sorry", err);
    });
}

function sourceFree(res, result) {
  res.forEach((d, i) => {
    let x = `包名:      ${d.package}\n下载量:  ${d.downloads}\n时间:      ${d.start} : ${d.end}\n\n`;

    result.push(x);
  });
}

module.exports = {
  npmpkg: function npmpkg(bot, url) {
    botEventEmitter(bot, /\/npmpkg/, state);
  },
  npmpkgall: function npmpkgall(bot, url) {
    botEventEmitter(bot, /\/pkgall/, allState);
  }
};
