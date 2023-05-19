// pages/login/login.js
import { login, getUserInfoApi } from "../../utils/api";
import { setToken } from "../../utils/token";
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 点击登录授权获取用户信息(token)
   */
  getUserProfile() {
    let that = this;
    wx.login({
      success(res) {
        that.getUserToken(res.code);
      },
    });
  },
  /**
   * 获取用户的token
   */
  async getUserToken(code) {
    let res = await login(code);
    setToken(res.data.token);
    this.getUserInfo();
  },
  /**
   * 根据token获取用户信息
   */
  async getUserInfo() {
    try {
      let res = await getUserInfoApi();
      wx.setStorage({
        key: "userInfo",
        data: res.data,
        success: () => {
          wx.showToast({
            title: "登录成功",
            success: () => {
              wx.redirectTo({
                url: "/pages/edit/edit",
              });
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
