// pages/address/list/list.js
import { getUserAddressApi, deleteUserAddressApi, chooseUserAddressApi } from "../../../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userAddressList: [], //用户地址列表
  },

  /**
   * 获取用户地址列表
   */
  async getUserAddressList() {
    try {
      let res = await getUserAddressApi();
      console.log(res);
      this.setData({
        userAddressList: res.data,
      });
    } catch (error) {
      console.log(error);
      wx.showToast({
        title: "获取地址失败",
        icon: "error",
      });
    }
  },

  /**
   * 编辑地址
   */
  editAddress(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/address/add/add?id=${id}`,
    });
  },
  /**
   * 删除地址
   */
  deleteAddress(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: "确定要删除吗？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: async (result) => {
        if (result.confirm) {
          try {
            let res = await deleteUserAddressApi(id);
            if (res.code === 200) {
              wx.showToast({
                title: "删除成功",
              });
              this.getUserAddressList();
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
    });
  },
  /**
   * 点击地址选择此次订单的收货地址
   */
  async chooseUserAddress(e) {
    const { id } = e.currentTarget.dataset;
    console.log(id);
    try {
      let res = await chooseUserAddressApi(id);
      if (res.code === 200) {
        console.log(res);
        wx.navigateBack();
      }
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
  onShow() {
    this.getUserAddressList();
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
