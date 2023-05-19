// pages/goods/list/list.js

import { getGoodsListApi } from "../../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], //商品列表
    category1Id: "",
    category2Id: "",
    page: 1,
    limit: 10,
    status: "more", //触底发送求情的情况 more loading noMore error
  },

  async getGoodsList() {
    let { page, limit, category1Id, category2Id } = this.data;
    this.setData({
      status: "loading",
    });
    let res = await getGoodsListApi({
      page,
      limit,
      category1Id,
      category2Id,
    });

    if (res.data.records.length > 0) {
      if (res.data.records.length < 10) {
        this.setData({
          status: "noMore",
        });
      } else {
        this.setData({
          status: "more",
        });
      }
      this.data.goodsList.push(...res.data.records);
      this.setData({
        goodsList: this.data.goodsList,
        page: ++page,
      });
    } else {
      this.setData({
        status: "onMore",
      });
    }
  },
  /**
   * 回到首页
   */
  goHome() {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.category1Id) {
      this.setData({
        category1Id: options.category1Id,
        category2Id: options.category2Id,
      });
    }
    this.getGoodsList();
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
  onReachBottom() {
    if (this.data.status === "more") {
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
