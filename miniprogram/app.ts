// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })

    //更新
    checkUpdate()
    /**
     * 版本更新机制兼容低版本代码
     */
    function checkUpdate() {
      // 判断当前微信版本是否支持检测更新接口,注：（基础库版本大于v1.9.90才可以使用getUpdateManager接口所以要做低版本兼容处理）
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        // 请求完新版本信息的回调
        updateManager.onCheckForUpdate(function (res) {
          // 如有新版本则进行静默下载更新并提示
          if (res.hasUpdate) {
            // 新版本下载成功
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: '更新提示',
                content: '发现新版本',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              })
            });
            // 新版本下载失败
            updateManager.onUpdateFailed(function () {
              wx.showModal({
                title: '更新提示',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                showCancel: false
              })
            })
          }
        });
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用最新版的小程序，请升级到最新微信版本后重试。',
          success(res) {
            if (res.confirm) {
              // 使用此接口可直接跳转至微信客户端更新下载页面
              wx.updateWeChatApp();
            }
          }
        })
      }
    }

  },
})