const request = require("request");
const help = require("./helper");

function requestNPM(url, cb) {
  request(
    {
      url: url,
      json: true
    },
    (err, res, body) => {
      if (!err) {
        let message = null;

        switch (res.statusCode) {
          case 400:
            message = "Invalid data";
            break;

          case 404:
            message = "Package not found";
            break;

          case 412:
            message = "Precondition failed";
            break;

          default:
            break;
        }

        cb(message, body);
      } else {
        cb(
          "Error",
          "An error has occurred. Please try again later, sorry " + err
        );
      }
    }
  );
}

module.exports = {
  state: function state(pkg, cb) {
    const url = `https://api.npmjs.org/downloads/point/${help.getAWeek()}/${pkg}`;

    requestNPM(url, cb);
  },

  allState: function allState(pkg, cb) {
    const url = `https://api.npmjs.org/downloads/point/1900-01-01:${help.today()}/${pkg}`;

    console.log(url);
    requestNPM(url, cb);
  },

  details: function details(pkg, cb) {
    const url = "https://registry.npmjs.org/".concat(pkg);

    requestNPM(url, cb);
  }
};
