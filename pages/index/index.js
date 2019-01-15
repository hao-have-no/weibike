//index.js
Page({
  data: {
    lng:0,//记录当前的经纬度
    lat:0,
    controls:[],
    markers:[]
  },
  /**
   * 生命周期函数-监听页面加载
   */
  onLoad: function () {
    //首次加载获取{地理位置
    var that=this;
    wx.getLocation({
      success: function(res) {
        console.log(res);
        var longitude=res.longitude;
        var latitude=res.latitude;
        that.setData({
          lng: longitude,
          lat: latitude
        })
      },
    })

      wx.getSystemInfo({
        success: function(res){
          console.log(res);
          var windowHeight=res.windowHeight;
          var windowWidth=res.windowWidth;
          that.setData({
            controls: [
              //扫码按钮
              {
                id: 1,
                iconPath: '/image/saoma.png',
                position: {
                  width: 40,
                  height: 35,
                  left: windowWidth / 2 - 20,
                  top: windowHeight - 70
                },
                clickable: true
              },
              {
                //定位按钮
                id: 2,
                iconPath: '/image/img1.png',
                position: {
                  width: 40,
                  height: 40,
                  left: 10,
                  top: windowHeight - 60
                },
                clickable: true
              },
              //中心点位置
              {
                //定位按钮
                id: 3,
                iconPath: '/image/location.png',
                position: {
                  width: 20,
                  height: 35,
                  left: windowWidth / 2 - 10,
                  top: windowHeight / 2 - 40
                },
                clickable: true
              },
              //充值按钮
              {
                id:4,
                iconPath:"/image/pay.png",
                position:{
                  width:40,
                  height:40,
                  left:windowWidth-45,
                  top:windowHeight-100
                },
                 clickable: true
              },
              //添加车辆
              {
                id:5,
                iconPath: "/image/add.png",
                position: {
                  width: 35,
                  height: 35,
                  display:true
                },
                clickable: true
              },
              //报修
              {
                id:6,
                iconPath:"/image/warn.png",
                position:{
                  width:35,
                  height:35,
                  left:windowWidth-42,
                  top:windowHeight-60
                },
                clickable:true
              }
            ]
          })
        }
      })

    
  },

  /**
   * 控件被点击事件
   */
  controltap:function(e){
    var that=this;
    var cid=e.controlId;
    switch (cid){
        //扫码
        case 1:{
          //根据用户状态跳转对应页面
          var status=getApp().globalData.status;
          console.log("status",status);
          if(status == 0){
            //跳转手机注册
            wx.navigateTo({
              url: '../register/register',
            })
          } 
          break;                  
        }
        //定位
        case 2:{
          this.mapCtx.moveToLocation()
          break;
        }
        //添加车辆
        case 5:{
          // var bikes=that.data.markers;
          this.mapCtx.getCenterLocation({
            success: function (res) {
              var log=res.longitude;
              var lat=res.latitude;
              wx.request({
                url: 'http://127.0.0.1:8154/addBike',
                data:{
                  longitude:log,
                  latitude:lat
                },
                method:"POST",
                success:function(res){
                  console.log(res);
                }
              })
              //移动位置后增加车辆
              // bikes.push(
              //     {
              //     iconPath: "/image/bike.png",
              //       width: 35,
              //       height: 40,
              //       longitude: log,
              //       latitude: lat
              //     } 
              //   )
              // that.setData({
              //   markers:bikes
              // })
            }
          })
          break;
        }
    }
  },
  
/**
 * 光标移动添加车
 */
  regionchange:function(e){
   
  },

  /**
   * 页面渲染完成
   */
  onReady:function(){
    // 使用 wx.createMapContext 获取 map 上下文,需要与map主键进行绑定关联
    this.mapCtx = wx.createMapContext('myMap')
  }
})
