// pages/address/add/add.js
console.log("修改");
import { getAddressDetailApi, updateUserAddressApi, saveUserAddressApi } from "../../../utils/api";
import showToast from "../../../utils/showToast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //地址id
    address: {}, //当前地址对象
    region: "", //三级联动 省市区
    name: "",
    phone: "",
    fullAddress: "",
    tagName: "家",
    isDefault: 0,
  },

  /**
   * 获取地址详情
   */
  async getAddressDetail() {
    try {
      let res = await getAddressDetailApi(this.data.id);
      console.log(res);
      if (res.code === 200) {
        this.setData({
          address: res.data,
          region: res.data.provinceName + "/" + res.data.cityName + "/" + res.data.districtName,
          name: res.data.name,
          phone: res.data.phone,
          fullAddress: res.data.address,
          tagName: res.data.tagName,
          isDefault: res.data.isDefault,
        });
      }
    } catch (error) {
      console.log(error);
      showToast("获取详情失败");
    }
  },
  /**
   * 修改地址的回调函数
   */
  chengeRegion(e) {
    this.setData({
      region: e.detail.value[0] + "/" + e.detail.value[1] + "/" + e.detail.value[2],
    });
    this.data.address.provinceName = e.detail.value[0];
    this.data.address.provinceCode = e.detail.code[0];
    this.data.address.cityName = e.detail.value[1];
    this.data.address.cityCode = e.detail.code[1];
    this.data.address.districtName = e.detail.value[2];
    this.data.address.districtCode = e.detail.code[2];
  },

  /**
   * 改变是否默认地址
   */
  changeIsDefault(e) {
    this.data.isDefault = +e.detail.value;
  },

  /**
   * 保存修改
   */
  async saveAddress() {
    const { region, name, phone, fullAddress } = this.data;
    if (region && name && phone && fullAddress) {
      this.data.address.name = name;
      this.data.address.phone = phone;
      this.data.address.address = this.data.fullAddress;
      this.data.address.tagName = this.data.tagName;
      this.data.address.isDefault = this.data.isDefault;
      try {
        let res;
        if (this.data.address.id) {
          res = await updateUserAddressApi(this.data.address);
          console.log(res);
          console.log("修改");
        } else {
          res = await saveUserAddressApi(this.data.address);
          console.log(res);
          console.log("添加");
        }
        if (res.code === 200) {
          console.log(123);
          wx.navigateBack();
        }
      } catch (error) {
        console.log(error);
        showToast("修改失败");
      }
    } else {
      showToast("请填写完整信息");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
    });
    this.getAddressDetail();
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
