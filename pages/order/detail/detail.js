// pages/order/detail/detail.js
import {
  getBuyNowOrderApi,
  getCartGoodsOrderApi,
  getOrderAddressApi,
  UserSubmitOrderApi,
  getPayments,
  queryStatusorderApi,
} from "../../../utils/api";
import showToast from "../../../utils/showToast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 0,
    blessing: "",
    orderGoods: {},
    isShowPopup: false,
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    userDefaultAddress: {}, //默认地址
    deliveryDate: "", //期望日期
    buyName: "", //购买人名称
    buyPhone: "", //购买人手机号
    cartList: [], //用户提交订单时的商品列表
    remarks: "", //备注
    userAddressId: 0, //送货地址Id
    orderNo: "", //订单号
  },

  /**
   * 立即购买
   */
  async getBuyNowOrder() {
    let res = await getBuyNowOrderApi({ goodsId: this.data.goodsId, blessing: this.data.blessing });
    console.log(res);
    this.setData({
      orderGoods: res.data,
      cartList: res.data.cartVoList,
    });
  },
  /**
   * 购物车确认下单
   */
  async getCartGoodsOrder() {
    try {
      let res = await getCartGoodsOrderApi();
      console.log(res);
      this.setData({
        orderGoods: res.data,
        cartList: res.data.cartVoList,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.getOrderAddress();
    if (options.goodsId) {
      //立即购买
      this.setData({
        goodsId: options.goodsId,
        blessing: options.blessing,
        remarks: options.blessing,
      });
      this.getBuyNowOrder();
    } else {
      //从购物车而来
      this.getCartGoodsOrder();
    }
  },

  /**
   * 期望送达时间页面
   */
  handleShowPopup() {
    this.setData({
      isShowPopup: true,
    });
  },
  /**
   * 确认选择时间
   */
  confirmDate(e) {
    const date = new Date(e.detail);
    let Y = date.getFullYear() + "-";
    let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    let D = date.getDate();
    this.setData({
      deliveryDate: Y + M + D,
      isShowPopup: false,
    });
  },
  /**
   * 关闭期望送达时间页面
   */
  onClose() {
    this.setData({
      isShowPopup: false,
    });
  },

  /**
   * 修改商品数量
   */
  changeGoodsCount(e) {
    const newCount = e.detail;
    const { index } = e.currentTarget.dataset;
    this.data.cartList.forEach((item, itemIndex) => {
      if (itemIndex === index) {
        item.count = newCount;
      }
    });
  },

  /**
   * 去结算
   */
  goPay() {
    console.log(this.data);
    const { deliveryDate, buyName, buyPhone, cartList, remarks, userAddressId } = this.data;
    console.log(deliveryDate);
    if (!(buyName && buyPhone)) {
      showToast("请完善信息");
      return;
    }
    if (!deliveryDate) {
      showToast("请选择期望日期");
      return;
    }
    if (!this.data.userDefaultAddress.id) {
      showToast("请选择收货地址");
      return;
    }
    if (cartList.length == 0) {
      showToast("没有选择商品");
      return;
    }
    let phoneValidate = /^1[3-9][0-9]{9}$/;
    console.log(this.data);
    if (phoneValidate.test(buyPhone)) {
      this.userSubmitOrder({ deliveryDate, buyName, buyPhone, cartList, remarks, userAddressId });
    } else {
      showToast("手机号不合法");
    }
  },
  /**
   * 获取支付参数的功能函数
   */
  async getPaymentParams() {
    try {
      let res = await getPayments(this.data.orderNo);
      console.log(res);
      if (res.code === 200) {
        this.queryStatusorder();
        //鉴权调起支付
        /* 
          nonceStr: "AojPO8UAd3wI7IgI"
          package: "prepay_id=wx2200020312805695fb76c7a7f4096c0000"
          paySign: "5581C3DAFC6EC6CB6D65CC902E431862"
          signType: "MD5"
          timeStamp: "1684684923197"
         */
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: (result) => {
            console.log(result);
            this.queryStatusorder();
          },
        });
      }
    } catch (error) {
      console.log(error);
      showToast("支付失败");
    }
  },

  /**
   * 查询订单是否支付成功
   */
  async queryStatusorder() {
    try {
      let res = await queryStatusorderApi(this.data.orderNo);
      console.log(res);
      if (res.data === "支付成功") {
        showToast("支付成功", "success");
        wx.redirectTo({
          url: "/pages/order/result/result",
        });
      } else {
        showToast("支付失败");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 提交订单的功能函数
   */
  async userSubmitOrder(data) {
    try {
      //会产生一个订单号
      let res = await UserSubmitOrderApi(data);
      console.log(res);
      if (res.code === 200) {
        this.setData({
          orderNo: res.data,
        });
        // wx.navigateTo({
        //   url: "",
        // });
        this.getPaymentParams();
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 获取订单地址
   */
  async getOrderAddress() {
    try {
      let res = await getOrderAddressApi();
      console.log(res, "----------");
      if (res.data) {
        this.setData({
          buyName: res.data.name,
          buyPhone: res.data.phone,
        });
      } else {
        this.setData({
          buyName: "",
          buyPhone: "",
        });
      }
      this.setData({
        userDefaultAddress: res.data,
        userAddressId: res.data.id,
      });
    } catch (error) {
      console.log(error);
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
    this.getOrderAddress();
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
