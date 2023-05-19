// pages/personal/personal.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headimgurl: "",
    nickName: "",
  },

  /**
   * 前往登录页面
   */
  goLogin() {
    wx.navigateTo({
      url: "/pages/login/login",
    });
  },
  /**
   * 用户信息修改
   */
  goEdit() {
    wx.navigateTo({
      url: "/pages/edit/edit",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // let userInfo = wx.getStorageSync("userInfo");
    // if (userInfo) {
    //   this.setData({
    //     headimgurl: userInfo.headimgurl,
    //     nickName: userInfo.nickname,
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        headimgurl: userInfo.headimgurl,
        nickName: userInfo.nickname,
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
