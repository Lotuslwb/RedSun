//index.js
//获取应用实例
const app = getApp()
const lockUtils = require('../../utils/lockCanvasUtils');
const Lock = require('../../libs/lock.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canvasW: 360,
    canvasH: 360,
    mouseDown: false
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log(app.globalData.userInfo)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    var me=this;
    this.lock = new Lock(this,{
      endCallback: me.endCallback
    });
  },
  endCallback: function (pswObj){
    if(pswObj.join('')=='14789'){
      wx.navigateTo({
        url: '../index/index',
      })
    }
  },
  //异常处理
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  }
})
