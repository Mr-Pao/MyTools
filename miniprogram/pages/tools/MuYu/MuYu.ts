const audioConfig = {
  bgMusicUrl: 'https://clemmensen.top/static/28297622582.mp3', // 背景音乐链接
  clickSoundUrl:'https://hy87gr-cat.oss.laf.run/qioaji.mp3'
};

const imagePaths = {
  restart: '../../../images/tools/muyu/restart.png', // 重新开始按钮图片路径
  auto: {
    on: '../../../images/tools/muyu/stop.png', // 自动点击按钮打开状态图片路径
    off: '../../../images/tools/muyu/auto.png' // 自动点击按钮关闭状态图片路径
  },
  bgMusic: {
    on: '../../../images/tools/muyu/bgMusicOn.png', // 背景音乐打开状态图片路径
    off: '../../../images/tools/muyu/bgMusicOff.png' // 背景音乐关闭状态图片路径
  }
};

let setInter = null;
const bgAudioContext = wx.createInnerAudioContext();
bgAudioContext.src = audioConfig.bgMusicUrl;
bgAudioContext.loop = true;

const clickAudioContext = wx.createInnerAudioContext();
clickAudioContext.src = audioConfig.clickSoundUrl;

Page({
  data: {
    id: 'default',
    value: 0,
    classStyle: '',
    auto: false,
    restartimg:imagePaths.restart,
    autoimg: imagePaths.auto.off,
    bgMusicIcon: imagePaths.bgMusic.off,
    bgMusicOn: false,
  },

  onLoad: function (options) {
    const { title, bgMusicStatus } = options;
    wx.setNavigationBarTitle({ title });
    if (bgMusicStatus === 'on') {
      this.toggleBgMusic();
    }
  },

  onShow: function () {
    bgAudioContext.pause();
  },

  //返回主页
  goToHomePage: function(e) {
    wx.reLaunch({
      url: '../tools'  // 这里是主页的路径，根据实际情况进行修改
    });
  },

  //播放背景音乐
  toggleBgMusic: function () {
    const { bgMusicOn } = this.data;
    if (!bgMusicOn) {
      bgAudioContext.play();
      this.setData({
        bgMusicIcon: imagePaths.bgMusic.on,
        bgMusicOn: true
      });
    } else {
      bgAudioContext.pause();
      this.setData({
        bgMusicIcon: imagePaths.bgMusic.off,
        bgMusicOn: false
      });
    }
  },

  click: async function () {
    const { classStyle, value } = this.data;
    clickAudioContext.play();
    this.setData({
      classStyle: 'animal',
      id: 'font',
      value: value + 1
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    this.setData({
      classStyle: ''
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    this.setData({
      id: 'default'
    });
  },

  restartFun: function () {
    const { auto, autoimg } = this.data;
    wx.showModal({
      title: '提示',
      content: '是否重置数据',
      complete: (res) => {
        if (!res.confirm) return;
        this.setData({
          value: 0,
          auto: false,
          autoimg: imagePaths.auto.off
        });
        clearInterval(setInter);
      }
    });
  },

  autoFun: function () {
    const { auto } = this.data;
    if (auto) {
      this.setData({
        auto: false,
        autoimg: imagePaths.auto.off
      });
      clearInterval(setInter);
    } else {
      this.setData({
        auto: true,
        autoimg: imagePaths.auto.on
      });
      setInter = setInterval(() => {
        this.click();
      }, 1000);
    }
  },

  onShareAppMessage() {
    const currentPage = getCurrentPages()[getCurrentPages().length - 1];
    const path = currentPage.route;
    const title = `今日我已功德 +${this.data.value}，你也一起来敲电子木鱼吧！`;
    const imageUrl = '../../../images/tools/muyu/muyu.png';
    return {
      title,
      path,
      imageUrl
    };
  },
});
