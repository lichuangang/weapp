//index.js
//获取应用实例  
var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    goodList: [],
    badList: [],
    schoolList: [],
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'companies',
      data: {},
      method: 'GET',
      success: function (res) {         
        app.globalData.gridData.goodList = res.data.data.good;
        app.globalData.gridData.badList = res.data.data.bad;
        app.globalData.gridData.schoolList = res.data.data.school;
        flushUI(that)
      }
    })

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  showInfo: function (e) {
    var cInfo = e.currentTarget.dataset.company;
    app.globalData.currentItem=cInfo;
    wx.navigateTo({
      url: '../info/info'
    })
  }
})  

function flushUI(that){
    that.setData({
        goodList: app.globalData.gridData.goodList,
        badList:app.globalData.gridData.badList,
        schoolList:app.globalData.gridData.schoolList
      })
}