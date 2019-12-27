module.exports = {
  getAWeek: function getAWeek() {
    //now
    const date = new Date().toLocaleDateString().split("/");
    let nowDate = date[2] + "-" + date[0] + "-" + date[1];

    //a week ago
    const timestamp = Math.round(new Date().getTime() / 1000);
    const aWeekAgo = new Date((timestamp - 7 * 86400) * 1000)
      .toLocaleDateString()
      .split("/");
    let aWeekAgoDate = aWeekAgo[2] + "-" + aWeekAgo[0] + "-" + aWeekAgo[1];

    return `${aWeekAgoDate}:${nowDate}`;
  },
  today: function today() {
    const date = new Date().toLocaleDateString().split("/");
    const nowDate = date[2] + "-" + date[0] + "-" + date[1];
    
    return nowDate;
  }
};
