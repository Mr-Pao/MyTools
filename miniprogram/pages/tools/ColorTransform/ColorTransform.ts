Page({
  data: {
    inputValue: '',
    rgbColor: 'false',
    hexColor: 'false',
    backgroundColor: '',
    rgb: 'rgb(0,154,97)',//初始值
    pick: false
  },

  onLoad(options) {
    const text = decodeURIComponent(options.text);
    console.log(text); // 打印输出传递过来的 {{item.text}} 的值
    this.setData({
      pagename: text,
    });
  },

  //返回主页
  goToHomePage: function (e) {
    wx.reLaunch({
      url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
    });
  },

  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true,
      position:'30%'
    })
  },
  //取色结果回调
  pickColor(e) {
    let rgb = e.detail.color;
    this.setData({
      backgroundColor: rgb,
      inputValue:rgb
    });
    this.performColorConversion(rgb)
  },

  // 处理输入
  handleInput: function (e: any) {
    var inputValue = e.detail.value;
    this.setData({
      inputValue: inputValue,
      backgroundColor: inputValue
    });

    // 调用颜色转换逻辑函数
    this.performColorConversion(inputValue);
  },

  // 将RGB颜色值转换为十六进制颜色值
  rgbToHex: function (val: string) {
    var r, g, b,
      regRgb = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,
      rsa = val.match(regRgb);
    if (!!rsa) {
      r = parseInt(rsa[1]).toString(16).padStart(2, '0');
      g = parseInt(rsa[2]).toString(16).padStart(2, '0');
      b = parseInt(rsa[3]).toString(16).padStart(2, '0');
      return '#' + r + g + b;
    } else {
      return val;
    }
  },

  // 将十六进制颜色值转换为RGB颜色值
  hexToRgb: function (val: string) {
    var regHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
      rsa = val.match(regHex);
    if (!!rsa) {
      var r = parseInt(rsa[1], 16);
      var g = parseInt(rsa[2], 16);
      var b = parseInt(rsa[3], 16);
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    } else {
      return val;
    }
  },

  // 颜色转换逻辑
  performColorConversion: function (inputValue: string) {
    var converted1 = this.rgbToHex(inputValue);
    var converted2 = this.hexToRgb(inputValue);

    this.setData({
      rgbColor: converted2,
      hexColor: converted1
    });
  },

  //点击复制
  copyRGBColor: function () {
    wx.setClipboardData({
      data: this.data.rgbColor,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
  },
  copyhexColor: function () {
    wx.setClipboardData({
      data: this.data.hexColor,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
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
