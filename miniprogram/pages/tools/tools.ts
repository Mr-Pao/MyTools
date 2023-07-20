// pages/tools/tools.ts
// 定义保存按钮信息的数组
const buttons = [
  { icon: '../../images/tools_icon/DanMu.png', text: '手持弹幕', path: 'DanMu/DanMu' },
  { icon: '../../images/tools_icon/ColorTransform.png', text: '色彩转换', path: 'ColorTransform/ColorTransform' },
  { icon: '../../images/tools_icon/ChineseColor.png', text: '传统颜色', path: 'ChineseColor/ChineseColor' },
  { icon: '../../images/tools_icon/MuYu.png', text: '电子木鱼', path: 'MuYu/MuYu' },
  { icon: '../../images/tools_icon/test.png', text: '在做了', path: '' },
  { icon: '../../images/tools_icon/test.png', text: '在做了', path: '' }
];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: buttons
  },

  //点击跳转
  handleButtonClick(event) {
    const path = event.currentTarget.dataset.save.path;
    const text = event.currentTarget.dataset.save.text;
    wx.navigateTo({
      url: `${path}?text=${encodeURIComponent(text)}`
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onShareTimeline() {

  }
})