var utiltool = {};
utiltool.phone = true;
utiltool.getphone = function(cb) {
  wx.chooseContact({
    success(res) {
      typeof cb == "function" && cb(res);
    }
  })
}
module.exports = utiltool;