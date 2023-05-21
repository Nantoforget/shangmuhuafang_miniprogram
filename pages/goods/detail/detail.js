// pages/goods/detail/detail.js
import { getGoodDetailApi, updataGoodCountApi, getBuyNowOrderApi } from "../../../utils/api";
import { getToken } from "../../../utils/token";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}, //商品对象
    isShowBlessing: false, //是否显示祝福页面
    blessing: "", //祝福语
    count: 1, //加入购物车的数量
    isShowCount: true, //是否显示数量
  },

  /**
   * 点击加入购物车显示祝福语页面
   */
  showBlessing(e) {
    if (!e.currentTarget.dataset.key) {
      this.setData({
        isShowCount: false,
      });
    }
    this.setData({
      isShowBlessing: true,
    });
  },
  /**
   * 商品的数量
   * @param {事件对象} e
   */
  addGoodsCount(e) {
    this.setData({
      count: e.detail,
    });
  },

  /**
   * 添加到购物车
   */
  async addGoodsToCartOrBuy() {
    const token = getToken("token");
    if (token) {
      const params = {
        count: this.data.count,
        blessing: this.data.blessing.trim(),
        goodsId: this.data.goodsDetail.id,
      };
      if (this.data.isShowCount) {
        try {
          let res = await updataGoodCountApi(params);
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: "添加成功",
              success: () => {
                this.onClose();
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        if (params.blessing) {
          wx.navigateTo({
            url: `/pages/order/detail/detail?goodsId=${params.goodsId}&blessing=${params.blessing}`,
            success: () => {
              this.onClose();
            },
          });
        } else {
          wx.showToast({
            title: "必须填写祝福语",
            icon: "error",
          });
        }
      }
    } else {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },
  /**
   *处理控制台警告，没有处理函数
   */
  handleInput() {},

  /**
   *关闭祝福语页面的回调
   */
  onClose() {
    this.setData({
      isShowBlessing: false,
      blessing: "",
      count: 1,
    });
  },

  /**
   * 根据商品goodsId获取商品详情
   */
  async getGoodsDetail(goodsId) {
    try {
      let res = await getGoodDetailApi(goodsId);
      console.log(res.data);
      this.setData({
        goodsDetail: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsDetail(options.goodsId);
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
