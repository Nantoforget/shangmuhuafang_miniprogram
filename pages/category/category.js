import { getCategoryTreeApi } from "../../utils/api";

// pages/category/category.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryTree: [], //分类列表树结构
    title: "", //分类标题
    children: [], //存储子结构数据
    categoryIndex: 0, //选中分类的下标，初始为0
    category1Id: 0, //一级分类的id
    category2Id: 0, //二级分类的id
  },
  /**
   * 获取分类列表数据
   */
  async getCategoryTree() {
    try {
      let res = await getCategoryTreeApi();
      this.setData({
        categoryTree: res.data,
        children: res.data[0].children,
        title: res.data[0].name,
        category1Id: res.data[0].id,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 切换选中的列表
   * @param {事件对象} event
   */
  changeCategory(event) {
    const { index } = event.currentTarget.dataset;
    this.setData({
      title: this.data.categoryTree[index].name,
      children: this.data.categoryTree[index].children,
      categoryIndex: index,
      category1Id: this.data.categoryTree[index].id,
    });
  },
  /**
   *路由跳转商品列表
   * @param {事件对象} event
   */
  async goGoodsList(event) {
    this.setData({
      category2Id: event.currentTarget.dataset.category2id,
    });
    wx.navigateTo({
      url: `/pages/goods/list/list?category1Id=${this.data.category1Id}&category2Id=${this.data.category2Id}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCategoryTree();
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
