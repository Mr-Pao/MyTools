import peise from "./PeiSeData";
Page({
  data: {
    peise: [],
    selectedIndex: -1, // 当前选中的调色板索引
    selectedColorIndex: -1 // 当前选中的颜色索引
  },

  onLoad(options) {
    const text = decodeURIComponent(options.text);
    console.log(text); // 打印输出传递过来的 {{item.text}} 的值
    this.setData({
      pagename: text,
      peise: peise.peise
    });
  },

  //返回主页
  goToHomePage: function (e) {
    wx.reLaunch({
      url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
    });
  },

  //点击复制
  selectColor: function (e) {
    const hex = e.currentTarget.dataset.hex;
    wx.setClipboardData({
      data: hex,
      success: function () {
        wx.showToast({
          title: '颜色值已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },

  //分享
  onShareAppMessage() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const url = `/${currentPage.route}`;
    return {
      title: this.data.pagename,
      path: url
    };
  },
  onShareTimeline() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const url = `/${currentPage.route}`;
    return {
      title: this.data.pagename,
      path: url
    };
  }
});
