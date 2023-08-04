Page({
  data: {
    randomResult: '嘻',
    minNum: 0,
    maxNum: 9,
    isDisabledStart: false,
    myNumber: '',
    isRotating: false
  },
  onLoad(options) {
    const text = decodeURIComponent(options.text);
    console.log(text); // 打印输出传递过来的 {{item.text}} 的值
    this.setData({
      pagename: text,
    });
  },

  getMinNum: function (e) {
    this.setData({ minNum: e.detail.value })
  },
  getMaxNum: function (e) {
    this.setData({ maxNum: e.detail.value })
  },

  startRandom: function () {
    this.setData({
      isDisabledStart: true
    });
    var that = this;
    //将计时器复制给myNumber
    // that.data.myNumber = setInterval(function () {
    //   var minNum = that.data.minNum;
    //   var maxNum = parseInt(that.data.maxNum)+1;
    //   console.log(maxNum)
    //   var result = parseInt(Math.random() * (maxNum - minNum)) + parseInt(minNum);
    //   that.setData({ randomResult: result })
    // }, 100);

    var minNum = that.data.minNum;
    var maxNum = parseInt(that.data.maxNum) + 1;
    var interval = 1; // 初始时间间隔为100毫秒
    function generateRandomNumber() {
      var result = parseInt(Math.random() * (maxNum - minNum)) + parseInt(minNum);
      that.setData({ randomResult: result });
      if (interval <= 500) {
        interval *= 1.1; // 增加时间间隔
        console.log(interval)
        setTimeout(generateRandomNumber, interval); // 下一次定时器触发的延迟时间
      }else(
        that.setData({
          isDisabledStart: false
        })
      )
    }
    setTimeout(generateRandomNumber, interval); // 开始执行第一次定时器


    // setTimeout(function () {
    //   //停止
    //   clearInterval(that.data.myNumber);
    //   that.setData({
    //     isDisabledStart: false
    //   })
    // }, 2000);
  },

  //刷新
  refresh: function () {
    this.setData({
      isRotating: true,
    });
    // 在这里执行刷新操作
    setTimeout(() => {
      this.setData({
        isRotating: false,
        randomResult: "嘻"
      });
    }, 500); // 假设刷新操作需要1秒钟
  },


  //返回主页
  goToHomePage: function (e: any) {
    wx.reLaunch({
      url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
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
