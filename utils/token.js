// 关于token的操作
/**
 * 获取token
 */
export const getToken = () => {
  return wx.getStorageSync("token");
};
/**
 * 设置token
 * @param {token} token
 */
export const setToken = (token) => {
  wx.setStorageSync("token", token);
};
/**
 * 删除token
 */
export const removeToken = () => {
  wx.removeStorageSync("token");
};
