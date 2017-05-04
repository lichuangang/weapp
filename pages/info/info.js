// pages/info/info.js
var util = require('../../utils/util.js')

var app = getApp();
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    company: {
      title: '',
      desc: '',
      agree: 0,
      address: '',
      createTime: ''
    },
    comments: [],
    commentTxt: ''
  },
  onLoad: function (options) {
    var that = this;
    var info = app.globalData.currentItem;
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: info.name
    });

    that.setData({
      company: {
        desc: info.desc,
        address: info.address,
        agree: info.agree
      }
    });
    wx.request({
      url: app.globalData.baseUrl + 'companies/' + info.id + '/comments',
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          comments: changeDate(res.data.data)
        });
      }
    })
    that.setData({
      winWidth: app.globalData.win.width,
      winHeight: app.globalData.win.height
    });

  },
  onReady: function () {
    // 页面渲染完成
  },
  agree: function (e) {
    var that = this;
    var info = app.globalData.currentItem;

    wx.request({
      url: app.globalData.baseUrl + 'comments',
      data: {
        isDigg: true,
        targetId: info.id,
        type: 0
      },
      method: 'POST',
      success: function (res) {
        if (false == res.data.success) {
          alert(res.data.msg)
        } else {
          that.setData({
            company: {
              desc: info.desc,
              address: info.address,
              agree: info.agree + 1
            }
          });
        }
      }
    })
  },
  pubcomment: function () {
    var that = this;
    var info = app.globalData.currentItem;
    if (this.data.commentTxt == '') {
      alert('请输入评论内容');
      return;
    }

    wx.request({
      url: app.globalData.baseUrl + 'comments',
      data: {
        content: this.data.commentTxt,
        targetId: info.id,
        type: 0
      },
      method: 'POST',
      success: function (res) {
        if (false == res.data.success) {
          alert(res.data.msg)
        } else {
          that.setData({
            comments: changeDate(res.data.data),
            commentTxt: ''
          });
          alert('评论成功！')
        }
      }
    })
  },
  bindChange: function (e) {
    this.setData({
      commentTxt: e.detail.value
    })
  }
})

function changeDate(arr) {
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    item.create_time = util.formatTimes(item.create_time);
  }
  return arr;
}

function alert(title) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 1000
  })
}
