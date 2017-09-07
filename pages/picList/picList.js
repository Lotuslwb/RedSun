// pages/picList/picList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picList:[
{src:'http://dynamic-image.yesky.com/1080x-/uploadImages/2015/285/26/NH95TKU6V8O3.jpg'},
{
  src:'http://dynamic-image.yesky.com/1080x-/uploadImages/2015/285/28/KJ74A5LF19K8.jpg'
},
{ src: 'http://dynamic-image.yesky.com/1080x-/uploadImages/2015/285/26/NH95TKU6V8O3.jpg' },
{
  src: 'http://dynamic-image.yesky.com/1080x-/uploadImages/2015/285/28/KJ74A5LF19K8.jpg'
},
{ src: 'http://dynamic-image.yesky.com/1080x-/uploadImages/2015/285/26/NH95TKU6V8O3.jpg' },
{
  src: 'http://dynamic-image.yesky.com/1080x-/uploadImages/2015/285/28/KJ74A5LF19K8.jpg'
}


    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var picList=this.data.picList;
    picList.push(this.data.picList[0]);
    picList.push(this.data.picList[1]);
    this.setData({
      picList: picList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },
  bindUploadImage:function(){
    var me=this;
    var picList=this.data.picList;
    wx.chooseImage({
      success: function(res) {
        var path=res.tempFilePaths.map((item)=>{ return {src:item}});
        picList=picList.concat(path);
        console.log(picList);
        me.setData({
          picList: picList
        })
      },
    })
  },
  bindPreviewImage: function (e){
    console.log(e.currentTarget.dataset);
    var current = e.currentTarget.dataset.src;
    var picList = this.data.picList;
    var srcArray = picList.map((item) => item.src)
    wx.previewImage({
      current: current||'',
      urls: srcArray
    })
  }  
})