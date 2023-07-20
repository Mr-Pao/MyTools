// pages/about/index.js
Page({
  data:{
    friendApps:[
      {
        logo:'../../images/friendlinks/火大猫谱.png',
        name:'火大猫谱',
        appid: 'wx5d52c6c8f098ed5e'
      },
      {
        logo:'../../images/friendlinks/SpaceLaunch.png',
        name:'SpaceLaunch',
        appid: 'wxb1a4cbb5fa337016'
      }
    ]
  },

  //点击复制
  copy: function (e:any) {
    let item = e.currentTarget.dataset.item;
    wx.setClipboardData({
      data: item,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: "success"
        });
      }
    });
  },

  //跳转小程序
  clickFriendLink(e) {
    console.log(e)
    const appid = e.currentTarget.dataset.appid;
    wx.navigateToMiniProgram({
      appId: appid
    })
  },

  goToMiniProgram1: function () {
    wx.navigateToMiniProgram({
      appId: 'wx5d52c6c8f098ed5e', // 其他小程序APPID,必填
      path: '', //其他小程序地址，非必填
      success: res => {
        // 打开成功
        console.log("打开成功", res);
      },
      fail: err => {
        console.log(err);
      }
    });
  },

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onShareTimeline() {

  }
})