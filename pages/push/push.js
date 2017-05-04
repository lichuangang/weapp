//获取应用实例  
var app = getApp()
var util = require('../../utils/util.js')

Page({
    data: {
        winWidth: 0,
        winHeight: 0,
        array: [
            { name: '坑爹公司', value: 0, checked: true },
            { name: '福利公司', value: 1 },
            { name: '培训学校', value: 2 }
        ],
        name: '',
        desc: '',
        address: '',
        cType: '0'
    },
    onLoad: function () {
        var that = this;
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
    bindName: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindDesc: function (e) {
        this.setData({
            desc: e.detail.value
        })
    },
    bindAddress: function (e) {
        this.setData({
            address: e.detail.value
        })
    },
    bindType: function (e) {
        this.setData({
            cType: e.detail.value
        })
    },
    save: function (e) {
        var that = this;
        if (this.data.name == '') {
            util.alert('请输入公司名称！');
            return;
        }

        if (this.data.desc == '') {
            util.alert('请输入公司描述信息！');
            return;
        }

        if (this.data.address == '') {
            util.alert('请输入公司地址！');
            return;
        }

        var data = {
            name: this.data.name,
            desc: this.data.desc,
            address: this.data.address,
            'type': this.data.cType
        }
        wx.request({
            url: app.globalData.baseUrl + 'companies',
            data: data,
            method: 'POST',
            success: function (res) {
                if (res.data.success) {
                    util.alertTimes('公司添加成功，审核一会儿就过去了！', 3000);
                    that.setData({
                        name: '',
                        desc: '',
                        address: '',
                        cType: 0
                    })
                } else {
                    util.alert(res.data.msg)
                }
            }
        })

    }
})