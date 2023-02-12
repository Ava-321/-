import request from "../../util/request"

// pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 搜索列表
  onLoad(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: '超市',
    })
    this.getList(options.id)
  },
  getList(id){
    request({
      url:`/categories/${id}?_embed=goods`
    }).then(res=>{
      console.log(res)
      this.setData({
        goodlist:res.goods
      })
    })
  },
// 搜索列表跳转
handleTap(evt){
  wx.navigateTo({
    url: `/info/food1/food1?id=${evt.currentTarget.dataset.id}&name=${evt.currentTarget.dataset.name}`,
  })

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})