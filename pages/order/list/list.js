// pages/order/list/list.js
import showToast from "../../../utils/showToast";
import { getOrderByPageLimitApi } from "../../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contentHeight: 100,
    safeAreaHeight: 500,
    list: [], //订单列表
    loadStatus: 1, //分页上拉刷新数据的标识,0上拉加载，1不显示任何东西，2没有了
    page: 1,
    limit: 10,
  },

  /**
   * 获取订单列表
   */
  async getUserOrderList() {
    try {
      let res = await getOrderByPageLimitApi(this.data.page, this.data.limit);
      if (res.code === 200) {
        if (res.data.records.length == 0) {
          this.setData({
            loadStatus: 2,
          });
          return;
        } else if (res.data.records.length < this.data.limit) {
          this.setData({
            loadStatus: 2,
          });
        } else {
          this.setData({
            loadStatus: 1,
          });
        }
        this.data.list.push(...res.data.records);
        this.setData({
          list: this.data.list,
        });
        console.log(this.data);
      }
    } catch (error) {
      console.log(error);
      showToast("获取失败");
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
    this.getUserOrderList();
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
  onReachBottom() {
    if (this.data.loadStatus == 2) return;
    console.log("到底了");
    this.setData({
      loadStatus: 0,
      page: this.data.page + 1,
    });
    this.getUserOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
