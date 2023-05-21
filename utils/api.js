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

/**
 * 获取商品详情
 */
export const getGoodDetailApi = (goodsId) => {
  return request({
    url: `/mall-api/goods/${goodsId}`,
  });
};

/**
 *立即下单
 */
export const getBuyNowOrderApi = (params) => {
  return request({
    url: `/mall-api/order/buy/${params.goodsId}`,
    data: params,
  });
};
/**
 * 购物车去结算确认下单
 */
export const getCartGoodsOrderApi = () => {
  return request({
    url: "/mall-api/order/trade",
  });
};

/* --------------------------地址相关------------------------------- */
/**
 * 获取我的地址
 * @returns
 */
export const getUserAddressApi = () => {
  return request({
    url: "/mall-api/userAddress/findUserAddress",
  });
};
/**
 *获取订单地址
 */
export const getOrderAddressApi = () => {
  return request({
    url: "/mall-api/userAddress/getOrderAddress",
  });
};
/**
 * 删除地址
 */
export const deleteUserAddressApi = (id) => {
  return request({
    url: `/mall-api/userAddress/delete/${id}`,
  });
};
/**
 * 添加地址
 */
export const saveUserAddressApi = (params) => {
  return request({
    url: "/mall-api/userAddress/save",
    method: "POST",
    data: params,
  });
};
/**
 * 选择地址
 */
export const chooseUserAddressApi = (id) => {
  return request({
    url: `/mall-api/userAddress/selectAddress/${id}`,
  });
};
/**
 * 修改地址
 */
export const updateUserAddressApi = (params) => {
  return request({
    url: "/mall-api/userAddress/update",
    method: "POST",
    data: params,
  });
};
/**
 *获取地址详情
 */
export const getAddressDetailApi = (id) => {
  return request({
    url: `/mall-api/userAddress/${id}`,
  });
};

/**
 * 提交订单
 */
export const UserSubmitOrderApi = (data) => {
  return request({
    url: "/mall-api/order/submitOrder",
    method: "POST",
    data,
  });
};
/**
 * 获取订单详情
 */
export const getOrderDetailByOrderNoApi = (orderNo) => {
  return request({
    url: `/mall-api/order/order/${orderNo}`,
  });
};
/**
 * 获取订单分页列表
 */
export const getOrderByPageLimitApi = (page, limit) => {
  return request({
    url: `/mall-api/order/order/${page}/${limit}`,
  });
};

/**
 * 微信下单支付
 */
export const getPayments = (orderNo) => {
  return request({
    url: `/mall-api/webChat/createJsapi/${orderNo}`,
  });
};
/**
 * 微信订单查询
 */
export const queryStatusorderApi = (orderNo) => {
  return request({
    url: `/mall-api/webChat/queryPayStatus/${orderNo}`,
  });
};
