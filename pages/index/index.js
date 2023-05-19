// index.js

import { getBannerApi, getCategoryApi, getHotGoodsApi, getLikeGoodsApi } from "../../utils/api";

Page({
  data: {
    banner: [], //轮播图数据
    category1: [], //一级分类
    likeList: [], //猜你喜欢
    hotList: [], //人气推荐
  },
  /**
   * 获取轮播图数据
   */
  async getBannerList() {
    let result = await getBannerApi();
    this.setData({
      banner: result.data,
    });
  },
  /**
   * 获取一级分类图标
   */
  async getCategoryList() {
    let result = await getCategoryApi();
    this.setData({
      category1: result.data,
    });
  },

  async getLikeList() {
    let res = await getLikeGoodsApi();
    this.setData({
      likeList: res.data,
    });
  },

  async getHotList() {
    let res = await getHotGoodsApi();
    this.setData({
      hotList: res.data,
    });
  },
  /**
   * 生命周期，页面加载时执行
   */
  onLoad() {
    this.getBannerList();
    this.getCategoryList();
    this.getLikeList();
    this.getHotList();
  },
});
