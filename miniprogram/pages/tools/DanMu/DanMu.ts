// pages/index/index.js

Page({
  data: {
    backgroundColor: '#000',
    fontSize: 500,
    animateTime: 5,
    fontColor: 'red',
    text: '请输入弹幕内容',
    showModalStatus: false,
    currentTab: 0,
    sliderValOfFontSize: 500,
    sliderValOfAnimateTime: 5,
    colorArr: [
      { color: '#000000' },
      { color: '#ff0000' },
      { color: '#00ff00' },
      { color: '#0000ff' }
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

  changeTextSpeend: function (e: any) {
    this.setData({
      sliderValOfAnimateTime: e.detail.value,
      animateTime: e.detail.value
    });
  },

  setBackGroundColor: function (e: any) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var selectedColor = this.data.colorArr[index].color;

    this.setData({
      backgroundColor: selectedColor
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
