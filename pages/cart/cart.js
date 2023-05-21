// pages/cart/cart.js
import {
  getCartListApi,
  isCheckedGoodsApi,
  deleteGoodByIdApi,
  updataGoodCountApi,
  checkAllCartApi,
} from "../../utils/api";
import { getToken } from "../../utils/token";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [], //购物车列表
    allGoodsPrice: 0, //总价格
    allIschecked: false, //是否全选了
    allGoodsCount: 0, //选中的商品总个数
  },

  /**
   * 获取购物车列表的功能函数
   */
  async getCartList() {
    try {
      let res = await getCartListApi();
      this.setData({
        cartList: res.data,
      });
      this.allGoodsIsChecked();
      this.allPrice();
      this.allCount();
    } catch (error) {
      console.log(error);
      wx.showToast({
        title: "获取数据失败",
        icon: "error",
      });
    }
  },

  /**
   * 点击单选框的回调
   */
  async handleChangeChecked(e) {
    let isChecked = +e.detail;
    let goodsId = e.currentTarget.dataset.id;
    try {
      await isCheckedGoodsApi({ goodsId, isChecked });
      this.getCartList();
      wx.hideLoading({});
    } catch (error) {
      console.log(error);
      wx.showToast({
        title: "修改失败",
        icon: "error",
      });
    }
  },
  /**
   * 点击删除指定商品
   */
  deleteGood(e) {
    let goodsId = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    wx.showModal({
      title: `确定要删除吗?`,
      content: name,
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: async (result) => {
        if (result.confirm) {
          try {
            await deleteGoodByIdApi(goodsId);
            this.getCartList();
          } catch (error) {
            console.log(error);
          }
        }
      },
    });
  },

  /**
   * 修改购物车商品数量的回调函数
   */
  updataCartGoodCount(e) {
    const { goodsid, oldcount } = e.currentTarget.dataset;
    let newcount = +e.detail;
    if (newcount == oldcount) return;
    let count = newcount - oldcount;
    this.updataGoodCount({ goodsId: goodsid, count });
  },
  /**
   * 修改指定商品的数量的功能函数
   */
  async updataGoodCount(params) {
    try {
      let res = await updataGoodCountApi(params);
      res.code === 200 && this.getCartList();
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 全选操作
   */
  async changeAllIsChecked(e) {
    let isChecked = +e.detail;
    try {
      let res = await checkAllCartApi(isChecked);
      res.code == 200 && this.getCartList();
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 计算是否全选
   */
  allGoodsIsChecked() {
    let is;
    if (this.data.cartList.length == 0) {
      is = false;
    } else {
      is = this.data.cartList.every((item) => {
        return item.isChecked;
      });
    }
    this.setData({
      allIschecked: is,
    });
  },
  /**
   * 计算选中的商品对象数组
   */
  isCheckedGoods() {
    const isChecked_arr = [];
    this.data.cartList.forEach((item) => {
      if (item.isChecked) {
        isChecked_arr.push(item);
      }
    });
    return isChecked_arr;
  },
  /**
   * 计算总价格
   */
  allPrice() {
    const isChecked_arr = this.isCheckedGoods();
    this.setData({
      allGoodsPrice: isChecked_arr.reduce((p, n) => {
        return p + n.price * n.count;
      }, 0),
    });
  },
  /**
   * 计算总数量
   */
  allCount() {
    const isChecked_arr = this.isCheckedGoods();
    this.setData({
      allGoodsCount: isChecked_arr.reduce((p, n) => {
        return p + n.count;
      }, 0),
    });
  },

  /**
   * 购物车确认下单
   */
  goOrderBuy() {
    wx.navigateTo({
      url: "/pages/order/detail/detail",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const token = getToken("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCartList();
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
