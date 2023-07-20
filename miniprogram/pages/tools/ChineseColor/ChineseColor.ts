import colors from "./colors";
Page({
  data: {
    colors: [],
    backgroundColor: '#FFFFFF',
    selectedColor: null,
    animationDuration: 1000,  // 动画持续时间，单位ms
    animationInterval: 10,  // 每一帧动画的时间间隔，单位ms
    animationId: null,
  },

  onLoad(options) {
    const text = decodeURIComponent(options.text);
    console.log(text); // 打印输出传递过来的 {{item.text}} 的值
    this.setData({
      pagename: text,
      colors: colors.colors
    });
  },

  //返回主页
  goToHomePage: function (e) {
    wx.reLaunch({
      url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
    });
  },

  //点击复制
  copyHex: function (e) {
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
  },

  changeBackground: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的卡片索引
    var selectedColor = this.data.colors[index]; // 获取对应索引的颜色

    // this.setData({
    //   selectedColor: selectedColor,
    //   backgroundColor: selectedColor.hex
    // });

    var currentColor = this.data.backgroundColor;
    var targetColor = selectedColor.hex;
    var animationDuration = this.data.animationDuration;
    var animationInterval = this.data.animationInterval;

    var stepCount = Math.floor(animationDuration / animationInterval);  // 计算总步数
    var rStep = (parseInt(targetColor.slice(1, 3), 16) - parseInt(currentColor.slice(1, 3), 16)) / stepCount;  // R通道每步的变化量
    var gStep = (parseInt(targetColor.slice(3, 5), 16) - parseInt(currentColor.slice(3, 5), 16)) / stepCount;  // G通道每步的变化量
    var bStep = (parseInt(targetColor.slice(5, 7), 16) - parseInt(currentColor.slice(5, 7), 16)) / stepCount;  // B通道每步的变化量

    var step = 0;
    var that = this;
    var animationId = setInterval(function() {
      if (step >= stepCount) {
        clearInterval(animationId);
        that.setData({
          backgroundColor: targetColor,
        });
        return;
      }

      var r = parseInt(currentColor.slice(1, 3), 16) + Math.round(rStep * step);
      var g = parseInt(currentColor.slice(3, 5), 16) + Math.round(gStep * step);
      var b = parseInt(currentColor.slice(5, 7), 16) + Math.round(bStep * step);
      var newColor = '#' + (r < 16 ? '0' : '') + r.toString(16) + (g < 16 ? '0' : '') + g.toString(16) + (b < 16 ? '0' : '') + b.toString(16);

      that.setData({
        backgroundColor: newColor,
      });

      step++;
    }, animationInterval);

    this.setData({
      animationId: animationId,
      selectedColor: selectedColor,
    });
  }
});
