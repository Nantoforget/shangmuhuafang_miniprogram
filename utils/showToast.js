function showToast(title, icon = "error") {
  wx.showToast({
    title: title,
    icon: icon,
  });
}
export default showToast;
