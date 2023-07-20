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

  //放大
  selectColor: function(e) {
    var colorIndex = e.currentTarget.dataset.colorIndex; // 获取点击的圆形元素的颜色索引
    var paletteIndex = e.currentTarget.dataset.paletteIndex; // 获取点击的圆形元素的调色板索引
  
    // 获取当前选中的颜色索引和调色板索引
    var selectedColorIndex = this.data.selectedIndex.colorIndex;
    var selectedPaletteIndex = this.data.selectedIndex.paletteIndex;
  
    // 判断是否同时选中了目标颜色和调色板，并触发动画
    if (colorIndex === selectedColorIndex && paletteIndex === selectedPaletteIndex) {
      this.setData({
        'selectedIndex.colorIndex': -1,
        'selectedIndex.paletteIndex': -1
      }, function() {
        setTimeout(() => {
          // 延时 200ms 后再次更新 selectedIndex，使元素缩小回原始大小
          this.setData({
            'selectedIndex.colorIndex': selectedColorIndex,
            'selectedIndex.paletteIndex': selectedPaletteIndex
          });
        }, 200);
      });
    } else {
      // 更新选中的索引
      this.setData({
        'selectedIndex.colorIndex': colorIndex,
        'selectedIndex.paletteIndex': paletteIndex
      });
    }
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
  }
});
