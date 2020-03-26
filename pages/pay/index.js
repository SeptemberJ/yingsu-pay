//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    status: 0,
    parameter: '返回app的参数'
  },
  backApp: function() {
    // ios 返回的是字符串 android 返回的是对象
    if (app.globalData.platform == "ios") {
      wx.navigateBackApplication({
        "extraData": ""
      })
    } else {
      wx.navigateBackApplication({
        "extraData": {key:""}
      })
    }
  },
  launchAppError: function(e) {
    console.log(e.detail)
  },
  onLoad: function (options) {
    this.setData({
      status: options.status
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
