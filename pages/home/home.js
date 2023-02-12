// home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    //轮播图数据
    imagelist:[
      "https://p1.music.126.net/icxzUKmJ3_Tuz0-EfhkHlQ==/109951168063002688.jpg",
    "https://p1.music.126.net/qnH_9VW4J0jZctZhR3Ld4Q==/109951168063208816.jpg",
    "https://p1.music.126.net/v_VnChSfVtEXsJlnLD5Qww==/109951168063017788.jpg",
    "https://p1.music.126.net/YNJvs1uJPF3J7okEsS77-A==/109951168063072264.jpg"
     ],
    productList:[]
  
  },
 getproductList:function(){
   var that=this;
   wx.request({
     url: 'http://localhost:3001/goods',
     success(res){
       that.setData({
         productList:res.data
       })
     }
   })
 },
//  跳转搜索框
handleEvent(){
  wx.navigateTo({
    url: '/pages/search/search',
  })
},
//  跳转
 handlechangepage(evt){
   var id=evt.currentTarget.dataset.id
   var name=evt.currentTarget.dataset.name
   wx.navigateTo({
     url:`/info/food1/food1?id=${id}&name=${name}`,
   })

 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  this.getproductList();
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

  },
})