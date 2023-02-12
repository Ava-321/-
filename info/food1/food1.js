import CheckAuth from "../../util/auth";
import request from "../../util/request";

// pages/food1/food1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:"",
    info:"",
    current:0,
    commentList:[]
  },
// 获取id
  getDetailInfo(id){
    var that=this;
    wx.request({
      url: `http://localhost:3001/goods/${id}`,
      success(res){
         console.log(res)
       that.setData({
          info:res.data
          
        })
      }
    })
  },
  // 获取评价信息
  getCommentInfo(id){
    var that=this;
    wx.request({
      url: `http://localhost:3001/goods/${id}`,
      success(res){
        console.log(res)
        that.setData({
          commentList:res
        })

      }
    })

  },
  // 加入购物车
  addCar(){
  
    // 1判断本地存储是否有手机号信息,如果有直接加入
    // 2没有手机号，判断是否有token信息，如果有，引导调整手机号绑定
    // 3没有token授权信息，我们引导用户授权页面
    CheckAuth(()=>{
      console.log("准备加入购物车")
      let {nickName}=wx.getStorageSync('token')
      let tel=wx.getStorageSync('tel')
      var goodId=this.data.info.id
      request({
        url:"/cart",
        data:{
          tel,
          goodId,
          nickName
        }
      }).then(res=>{
        console.log(res)
        if(res.length===0){
          return request({
            url:"/cart",
            method:"post",
            data:{
              "username":nickName,
              "tel":tel,
              "goodId":goodId,
              "number":1,
              "checked":false
            }
          })
        }
        else{
          return request({
            url:`/cart/${res[0].id}`,
            method:"put",
            data:{
              ...res[0],
              number:res[0].number+1
            }

          })
        }
      }).then(res=>{
        wx.showToast({
          title: '加入购物车成功',
        })
      })
        
      })
  },
//  跳转至购物车
toCar(){
  wx.switchTab({
    url: '/pages/cart/cart',
  })

},
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDetailInfo(options.id);
    this.getCommentInfo(options.id);
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
  handleActive(evt){
    this.setData({
      current:evt.currentTarget.dataset.index
    })
  },

})