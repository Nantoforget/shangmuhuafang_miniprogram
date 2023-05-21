// components/goods-card/goods-card.js
import { updataGoodCountApi } from "../../utils/api";
import { getToken } from "../../utils/token";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 跳转详情页
     * @param {事件对象} e
     */
    goGoodDetail(e) {
      const goodsId = e.currentTarget.dataset.goodsid;
      console.log(goodsId);
      wx.navigateTo({
        url: `/pages/goods/detail/detail?goodsId=${goodsId}`,
      });
    },
    /**
     *点击购物车小图标，添加到购物车
     */
    async addGoodsCart() {
      const token = getToken("token");
      if (token) {
        const params = {
          count: 1,
          goodsId: this.properties.good.id,
        };
        console.log(params);
        try {
          let res = await updataGoodCountApi(params);
          if (res.code == 200) {
            wx.showToast({
              title: "添加购物车成功",
            });
          }
        } catch (error) {}
      } else {
        wx.navigateTo({
          url: "/pages/login/login",
        });
      }
    },
  },
});
