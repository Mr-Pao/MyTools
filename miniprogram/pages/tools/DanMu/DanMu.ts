// pages/index/index.js
Page({
  data: {
    backgroundColor: '#000',
    fontSize: 500,
    animateTime: 10,
    fontColor: 'red',
    text: '请输入弹幕内容',
    showModalStatus: false,
    currentTab: 0,
    sliderValOfFontSize: 500,
    sliderValOfAnimateTime: 10,
    colorArr: [
      { color: '#FF0000' },
      { color: '#FF7F00' },
      { color: '#FFFF00' },
      { color: '#00FF00' },
      { color: '#00FFFF' },
      { color: '#0000FF' },
      { color: '#8B00FF' },
      { color: '#000000' },
      { color: '#FFFFFF' }
    ],
    danmuList: [] // 弹幕列表
  },

  onLoad(options) {
    const text = decodeURIComponent(options.text);
    console.log(text); // 打印输出传递过来的 {{item.text}} 的值
    this.setData({
      pagename: text,
    });
  },

    //返回主页
    goToHomePage: function(e) {
      wx.reLaunch({
        url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
      });
    },

  inputBlur: function (e: any) {
    this.setData({
      text: e.detail.value
    });
  },

  sendBtn: function () {
    // 获取弹幕内容
    var text = this.data.text;

    // 检查是否为空
    if (text.trim() === '') {
      wx.showToast({
        title: '请输入弹幕内容',
        icon: 'none'
      });
      return;
    }
  },

  showModal: function () {
    this.setData({
      showModalStatus: true
    });
  },

  hideModal: function () {
    this.setData({
      showModalStatus: false
    });
  },

  clickTab: function (e: any) {
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: current
    });
  },

  swiperTab: function (e: any) {
    var current = e.detail.current;
    this.setData({
      currentTab: current
    });
  },

  changeFontSize: function (e: any) {
    this.setData({
      sliderValOfFontSize: e.detail.value,
      fontSize: e.detail.value
    });
  },

  setColor: function (e: any) {
    var index = e.currentTarget.dataset.index;
    var selectedColor = this.data.colorArr[index].color;

    this.setData({
      fontColor: selectedColor
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
