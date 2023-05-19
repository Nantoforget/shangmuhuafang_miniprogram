// components/goods-list/goods-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //标题
    title: {
      type: String,
      value: "",
    },
    //接收的数据
    list: {
      type: Array,
      value: [],
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
    goGoodsList() {
      wx.navigateTo({
        url: "/pages/goods/list/list",
      });
    },
  },
});
