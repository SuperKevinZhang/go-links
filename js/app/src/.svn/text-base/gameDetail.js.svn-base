// Add by Wilshere
// 对局明细
// 2013/11/4

var gameDetail = {};

// store id 
var id_param;

gameDetail.loadData=function(id,winflag,fromgame){
          // start loading
          om.showloading("正在加载，请稍等……");     
          /*aa=om.pubUrl()+"GameDetail?GameId="+gameid+"&Id="+id
          alert( aa );     */

          // colse menu
          $.ajax({
                type: "get",
                url: om.pubUrl()+"GameDetail?GameId=&Id="+id,//?GameId=&Id=
                dataType: "jsonp",
                jsonpCallback: "call",
                    timeout:10000,
                success: function (data) {
                         //data解析为JSON数据
                         var returnData=eval(data);
                         
                         //访问成功
                         if(returnData.Status=="OK"){
                              //访问成功，得到用户的基础信息
                                var gameInfo=returnData.returnValue;

                                // 赛事名称
                                $("#gd_h_username").text(gameInfo.TouramentName);
                                // 轮次/台次
                                $("#gd_p_roundPosition").text("轮次/台次:  "+gameInfo.Round+"/"+gameInfo.Position);
                          // 对局规则
                                $("#gd_li_rule").text(" 对局规则:  "+gameInfo.RuleName);
                                // 棋份
                                $("#gd_li_handicap").text("   棋份:  "+gameInfo.HandicapName);
                                // 让子数
                                $("#gd_li_stones").text("  让子数:  "+gameInfo.Stones);
                                // 贴目数
                                $("#gd_li_komi").text("  贴目数:  "+gameInfo.Komi);
                                // 是否参与积分
                                if(gameInfo.RatingFlag)
                                {
                                     $("#gd_li_ratingFlag").text("是否参与积分:  是");
                                }
                                else
                                {
                                     $("#gd_li_ratingFlag").text("是否参与积分:  否");
                                }
                               
                                // game result
                                $("#gd_p_gameResult").text("对局结果:  "+gameInfo.ResultName);     
                                // 执黑
                                $("#gd_p_blackplayer").text("  执黑:  "+gameInfo.BlackPlayerFull);
                                // 执白
                                $("#gd_p_whiteplayer").text("  执白:  "+gameInfo.WhitePlayerFull);

                                // game comfirm
                                if(!gameInfo.ConfirmFlag)
                                {
                                     if(winflag!="-1")
                                     {
                                          // disable comfirm button       
                                          $('#gd_a_gameComfirm').addClass('ui-disabled');
                                     }
                                }
                                
                                // if come from match  ,disable comfirm 
                                if(fromgame=="roundgame"||gameInfo.ConfirmFlag)
                                {
                                          // disable comfirm button       
                                        $('#gd_a_gameComfirm').addClass('ui-disabled');
                                }
                                
                                // store id 
                                id_param=gameInfo.Id;
                                
                                // hide 
                                om.hideloading();                              
                         }else{
                              //得到错误提示信息
                              var msg=data.Message;
                              om.showloading(msg,true);
                         }
                    },
                error: function (error) {
                    om.showloading("远程访问出错",true);
                }
    });
};

// comfirm game method
gameDetail.comfirmGame=function(){
          // start loading
          om.showloading("正在加载，请稍等……");     
          // get the login username
          var userName = window.localStorage.getItem("name");

          $.ajax({
                         type: "get",
                         url: om.pubUrl()+"ConfirmGameResult/"+id_param+"/"+userName,
                         dataType: "jsonp",
                         jsonpCallback: "call",
                              timeout:10000,
                         success: function (data) {
                              //data解析为JSON数据
                              var returnData=eval(data);
                              
                              //访问成功
                              if(returnData.Status=="OK"){
                                   // hide 
                                   om.hideloading(); 
                                           
                                           // disable comfirm button       
                                   $('#gd_a_gameComfirm').addClass('ui-disabled');    
                                   
                                   //访问成功，得到用户的基础信息
                                   var gameInfo=returnData.returnValue;
                                         om.showloading("对局确认成功！",true); 
                                             
                                             // change page to gamelist
                                             om.changeHashPage("mygame.html");               
                              }else{
                                   //得到错误提示信息
                                   var msg=data.Message;
                                   om.showloading(msg,true);
                              }
                         },
                         error: function (error) {
                              om.showloading("远程访问出错",true);
                         }
          });
     };

// init gameDetail
$(function(){
     // get the pass param
     params=$("#omParams").data("omParams");
     //照片按钮隐藏
     $("#gameDetail_selectPic").hide();

	 $("#smallImage").unbind();
     $("#smallImage").bind("click",function(){
          $("#gameDetail_selectPic").toggle();
     });
     
     //拍照
	 $("#gameDetail_pic").unbind();
     $("#gameDetail_pic").bind("click",function(){
          console.log('拍照: ' );

          capturePhoto();
     });
     //本地选择
	 $("#gameDetail_file").unbind();
     $("#gameDetail_file").bind("click",function(){
          console.log('选择照片: ' +pictureSource.SAVEDPHOTOALBUM);
          getPhoto(pictureSource.SAVEDPHOTOALBUM);
     });

     //gameDetail_selectPic
     // click comfirm button
	 $("#gd_a_gameComfirm").unbind();
     $("#gd_a_gameComfirm").bind("click",function(){
              // comfirm game
               gameDetail.comfirmGame();
          });

     //load data
    gameDetail.loadData(params.id,params.winflag,params.fromgame);
     window.localStorage.setItem("gameDetail_id", params.id);
});