// pages/edit/edit.js
import { updataUserInfoApi } from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headimgurl: "",
    nickName: "孙悟空",
    tempname: "", //保存进入用户信息页面时的名字，用于取消使用
  },

  /**
   * 获取用户自定义头像
   */
  onChooseAvatar(e) {
    console.log(e);
    this.setData({
      headimgurl: e.detail.avatarUrl,
    });
  },

  /**
   * 保存按钮
   */
  async submitUserInfo() {
    const params = {
      headimgurl: this.data.headimgurl,
      nickname: this.data.nickName,
    };
    try {
      await updataUserInfoApi(params);
      wx.showToast({
        title: "修改成功",
        success: () => {
          // wx.removeStorageSync("userInfo");
          wx.setStorage({
            key: "userInfo",
            data: params,
            success: () => {
              wx.navigateBack();
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
  onLoad(options) {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      headimgurl: userInfo.headimgurl,
      nickName: userInfo.nickname,
    });
  },

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
