//index.js
import { hexMD5 } from "../../utils/md5.js"
import { sha1 } from "../../utils/sha1.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    param: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      param: options.or ? JSON.toString(options) : ''
    })
    // let timestamp = (new Date()).getTime()
    // let str = 'appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111'
    // let str = 'appid=wx2421b1c4370ec43b&body=JSAPI支付测试&mch_id=10000100&nonce_str=1add1a30ac87aa2db72f57a2375d8fec&notify_url=http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php&out_trade_no=1415659990&spbill_create_ip=14.23.150.211&total_fee=10&trade_type=JSAPI'
    // console.log(hexMD5(str).toUpperCase());
    // console.log(sha1(timestamp.toString()))
    // console.log(sha1(timestamp.toString()).substring(0, 16))
    // this.weChatPayTest()
  },
  toPay: function () {
    wx.request({
      url: '/JsapiPay.do',
      data: {
        total_fee: Math.round(totalPrice * 100),// * 100
        out_trade_no: orderNum,
        body: bodyString.toString(),
        open_id: app.globalData.oppenid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log('调起支付成功----')
        console.log(res)
      },
      fail: (res) => {
        wx.showToast({
          title: '支付接口出错!',
          image: '../../image/icon/attention.png',
          duration: 2000
        })
      },
      complete: (res) => {
        this.setData({
          loadingHidden: true
        })
      }
    })
  },
  // 微信支付
  weChatPayTest: function (InfoStr) {
    let timestamp = (new Date()).getTime()
    wx.requestPayment({
      timeStamp: '1490840662',
      nonceStr: sha1('1490840662').substring(0, 16),
      package: 'prepay_id = wx2017033010242291fcfe0db70013231072',
      signType: 'MD5',
      paySign: '22D9B4E54AB1950F51E0649E8810ACD6',
      success: (res) => {
        console.log('success', res)
      },
      fail: (res) => {
        console.log('fail', res)
        // wx.navigateTo({
        //   url: '../pay/index?status=-1'
        // })
        wx.redirectTo({
          url: '../pay/index?status=-1'
        })
      }
    })
  },
  weChatPay: function () {
    let timestamp = (new Date()).getTime()
    // 获取接口返回数据调起微信支付
    wx.requestPayment({
      timeStamp: timestamp,
      nonceStr: sha1(timestamp.toString()).substring(0, 16),
      package: '',
      signType: 'MD5',
      paySign: '',
      success: (res) => { },
      fail: (res) => { }
    })
  }
})
