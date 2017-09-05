//index.js
//获取应用实例
const app = getApp()
const lockUtils = require('../../utils/lockCanvasUtils');

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
    this.initCanvas();
  },
  //初始化canvas
  initCanvas: function () {
    var me = this;
    var myCtx=me.data.myCtx = wx.createCanvasContext('lockCanvas');
    //存放所有圆
    this.data.pointList = [];
    //存放所有经过的圆
    this.data.activePointList = [];
    this.initLayout(myCtx);
  },
  // 初始化布局
  initLayout: function (myCtx) {
    var me = this;
    //重置pointList
    me.data.pointList = [];
    //重置画板
    // myCtx.clearRect(0, 0, me.data.canvasW, me.data.canvasH);

    // 3*3  九宫格
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var r = me.data.canvasH / 10;
        var point = {
          x: i * 3 * r + 2 * r,
          y: j * 3 * r + 2 * r,
          r: r,
          smallR: 8,
          index: (i + 1) + 3 * j
        };
        me.data.pointList.push(point);
        lockUtils.drawCircle(myCtx, point);
      }
    }
    myCtx.draw();
  },
  reloadLayout: function () {
    var activePointList = this.data.activePointList;
    var myCtx = this.data.myCtx;
    this.initLayout(myCtx);
    lockUtils.drawActivePointList(myCtx, activePointList);
    myCtx.draw(true);
  },
  //异常处理
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  //canvas 事件处理
  canvasTouchStart: function (e) {
    var me = this;
    var x = e.touches[0].x, y = e.touches[0].y;
    var activePointList = me.data.activePointList;
    var activePoint = me.data.pointList.filter(function (point) {
      return lockUtils.inBall({ x: x, y: y}, point)
    })[0];
    if (activePoint) {
      me.data.mouseDown = true;
      !lockUtils.inActivePointList(activePointList, activePoint) && activePointList.push(activePoint);
      me.reloadLayout();
    }
  },
  canvasTouchMove:function(e){
    var me=this;
    var myCtx = me.data.myCtx;
    var activePointList = me.data.activePointList;
    var x=e.touches[0].x,y=e.touches[0].y;

    if (!me.data.mouseDown) {
      return false;
    }

    var activePoint = me.data.pointList.filter(function (point) {
      return lockUtils.inBall({ x: x, y: y }, point, true)
    })[0];
    if (activePoint) {
      !lockUtils.inActivePointList(activePointList, activePoint) && activePointList.push(activePoint);
      me.reloadLayout();
    } else {
      me.reloadLayout();
      myCtx.beginPath();
      myCtx.setLineWidth(4);
      myCtx.setStrokeStyle('red');
      myCtx.moveTo(activePointList[activePointList.length - 1].x, activePointList[activePointList.length - 1].y);
      myCtx.lineTo(x, y);
      myCtx.closePath();
      myCtx.stroke();
      myCtx.draw(true);
    }
  },
  canvasTouchEnd:function(e){
    var me=this;
    if (!me.data.mouseDown) {
      me.reloadLayout();
      return false;
    }
    me.reloadLayout();
    var indexArry = lockUtils.getIndex(me.data.activePointList);
    me.data.activePointList = [];
    me.data.mouseDown = false;
    indexArry.length > 1 && wx.showToast({
      title: indexArry.toString(),
      icon: 'success',
      duration: 2000
    });
    me.reloadLayout();
  }
})
