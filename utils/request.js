/**
 * 封装发送请求的基础功能函数库
 */
import { getToken } from "./token";
const BASEURL = "https://gmall-prod.atguigu.cn"; //公共路径
export default (params) => {
  wx.showLoading({
    title: "正在加载中",
    mask: true,
  });
  return new Promise((resolve, reject) => {
    let header = {
      "Content-type": "application/json",
    };
    let token = getToken();
    token && (header.token = token);
    //执行异步任务
    wx.request({
      url: BASEURL + params.url,
      data: params.data || {},
      method: params.method || "GET",
      header,
      success: (res) => {
        // console.log(res);
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        wx.hideLoading();
      },
    });
  });
};
