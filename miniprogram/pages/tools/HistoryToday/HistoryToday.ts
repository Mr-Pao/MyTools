Page({
  data: {
    data: '',
    isExpanded: false,
    expandedDetails: "",
    today: "", // 用于存储今天的日期
    hideLoading:false
  },
  onLoad(options) {
    const today = new Date().toLocaleDateString();
    this.setData({
      today: today
    });

    const text = decodeURIComponent(options.text);
    console.log(text); // 打印输出传递过来的 {{item.text}} 的值
    this.setData({
      pagename: text
    });

    this.getData();
  },

  //返回主页
  goToHomePage: function (e: any) {
    wx.reLaunch({
      url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
    });
  },

  //获取数据
  getData: function () {
    const that = this;
    wx.request({
      url: 'https://hy87gr.laf.run/MyTools-HistoryToday',
      success(res) {
        that.setData({
          data: res.data,
          hideLoading:true
        });
      }
    })
  },

  //点击展开
  toggleDetails(e) {
    const index = e.currentTarget.dataset.index;
    const details = this.data.data[index].details.replace(/\s/g, '<br/>');
    this.setData({
      isExpanded: true,
      expandedDetails: details
    });
  },

  closeModal() {
    this.setData({
      isExpanded: false
    });
  },

  //点击复制
  copyData: function () {
    wx.setClipboardData({
      data: this.data.displayText,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'none', // 这里使用 'none' 表示不显示图标，你也可以使用其他合适的图标类型
          // duration: 2000 // 提示持续时间，单位为毫秒，这里设定为2秒
        })
      }
    })
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
