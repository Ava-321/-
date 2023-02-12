import CheckAuth from "../../util/auth"
import request from "../../util/request"

// cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons:[{
      type:'warn',
      text:"删除"   }
    ],
    cartList:[]
  },

  // 购物车勾选
  handleTap(evt){
    console.log("tap",evt.currentTarget.dataset.item)
    var item=evt.currentTarget.dataset.item
    item.checked=!item.checked
    this.handleUpdate(item)
  },
  handleUpdate(item){
    this.setData({
      cartList:this.data.cartList.map(data=>{
        if(data.id===item.id){
          return item
        }
        return data
      })
    })
    request({
      url:`/cart/${item.id}`,
      method:"put",
      data:{
      "username": item.username,
      "tel":"item..tel",
      "goodId":item.goodId,
      "number":item.number,
      "checked":item.checked
      }
    })
  },
  // 减处理
  handleMinus(evt){
    var item=evt.currentTarget.dataset.item
    item.number--
    this.handleUpdate(item)

  },
  // 加处理
  handleAdd(evt){
    var item=evt.currentTarget.dataset.item
    item.number++
    this.handleUpdate(item)

  },
  // 删除购物车
  slideButtonTap(evt){
    var id=evt.currentTarget.dataset.id
    this.setData({
      cartList:this.data.cartList.filter(item=>item.id!==id)
    })
    request({
      url:`/cart/${id}`,
      method:"delete"
    })

  },
  // 全选按钮
  handlechange(evt){
    if(evt.detail.value.length===0){
      // 未全选
      this.setData({
        cartList:this.data.cartList.map(item=>({
          ...item,
          checked:false
        }))
      })
    }else{
      // 全选
      this.setData({
        cartList:this.data.cartList.map(item=>({
          ...item,
          checked:true
        }))
      })
      
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 
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
    CheckAuth(()=>{
      let {nickName}=wx.getStorageSync('token')
      let tel=wx.getStorageSync('tel')
    request({
      url:`/cart?_expand=good&username=${nickName}&tel=${tel}`
    }).then(res=>{
      console.log(res)
      this.setData({
        cartList:res
      })
    })
    })
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