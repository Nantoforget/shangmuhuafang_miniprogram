import request from "./request";

/**
 * 首页轮播图
 * @returns 请求得到的数据
 */
export const getBannerApi = () => {
  return request({
    url: "/mall-api/index/findBanner",
  });
};
/**
 * 一级分类
 * @returns 一级分类请求
 */
export const getCategoryApi = () => {
  return request({
    url: "/mall-api/index/findCategory1",
  });
};
/**
 * 猜你喜欢
 * @returns 猜你喜欢的数据
 */
export const getLikeGoodsApi = () => {
  return request({
    url: "/mall-api/index/findListGoods",
  });
};
/**
 * 人气推荐
 * @returns 人气推荐
 */
export const getHotGoodsApi = () => {
  return request({
    url: "/mall-api/index/findRecommendGoods",
  });
};
/**
 * 分类
 * @returns 分类列表及其子数据
 */
export const getCategoryTreeApi = () => {
  return request({
    url: "/mall-api/index/findCategoryTree",
  });
};
/**
 * 分页数据
 * @param {获取分页商品数据的参数对象} params
 * @returns 返回请求到的数据
 */
export const getGoodsListApi = (params) => {
  return request({
    url: `/mall-api/goods/list/${params.page}/${params.limit}`,
    data: params,
  });
};
/**
 *登录获取用户token
 * @param {登录时产生的code} code
 * @returns
 */
export const login = (code) => {
  return request({
    url: `/mall-api/weixin/wxLogin/${code}`,
  });
};
/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfoApi = () => {
  return request({
    url: "/mall-api/weixin/getuserInfo",
  });
};
/**
 * 保存修改的用户信息
 */
export const updataUserInfoApi = (params) => {
  return request({
    url: "/mall-api/weixin/updateUser",
    method: "POST",
    data: params,
  });
};
/**
 *获取购物车列表
 */
export const getCartListApi = () => {
  return request({
    url: "/mall-api/cart/getCartList",
  });
};

/**
 * 选中与取消某个商品
 */
export const isCheckedGoodsApi = ({ goodsId, isChecked }) => {
  return request({
    url: `/mall-api/cart/checkCart/${goodsId}/${isChecked}`,
  });
};
/**
 * 删除指定商品
 */
export const deleteGoodByIdApi = (goodsId) => {
  return request({
    url: `/mall-api/cart/delete/${goodsId}`,
  });
};
/**
 * 修改指定商品的数量
 */
export const updataGoodCountApi = (params) => {
  return request({
    url: `/mall-api/cart/addToCart/${params.goodsId}/${params.count}`,
    data: params,
  });
};
/**
 * 全选与全不选
 */
export const checkAllCartApi = (isChecked) => {
  return request({
    url: `/mall-api/cart/checkAllCart/${isChecked}`,
  });
};
