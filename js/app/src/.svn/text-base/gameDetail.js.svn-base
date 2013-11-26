// Add by Wilshere
// 对局明细
// 2013/11/4

var gameDetail = {};

// store id 
var id_param;
var sharecontent="我在假日围棋社";//分享内容
var shareurl="http://183.129.206.88:8089/res/images/login/logo.jpg";
gameDetail.loadData=function(id,fromgame){
	try{
		  if(typeof(id)=="undefined")
		  {
			  console.log("error: 返回对局明细画面(gameDetail)没有参数");
			  return;
		  }
          // start loading
          om.showloading("正在加载，请稍等……");     
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
							 	//load image
								gameDetail.loadImage(id);
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
								//debugger;
							    // share by sina weibo
							   if(gameInfo.ResultName=="白胜")
								{
									sharecontent="假日围棋社【"+gameInfo.TouramentName+"】-第【"+gameInfo.Round+
											"】轮 执黑棋手【"+gameInfo.BlackPlayerFull+"】 惜败 执白棋手【"+gameInfo.WhitePlayerFull+"】";
								}
								else if(gameInfo.ResultName=="黑胜")
								{
									 sharecontent="假日围棋社【"+gameInfo.TouramentName+"】-第【"+gameInfo.Round+
											"】轮 执黑棋手【"+gameInfo.BlackPlayerFull+"】 大胜 执白棋手【"+gameInfo.WhitePlayerFull+"】";
								}
								else
							    {
										sharecontent="假日围棋社【"+gameInfo.TouramentName+"】-第【"+gameInfo.Round+
											"】轮 执黑棋手【"+gameInfo.BlackPlayerFull+"】 正在对局 执白棋手【"+gameInfo.WhitePlayerFull+"】";
								}
								 
								 baidu.socShare.destroy();
								 var config = {
												"afterRender" : function() {
													//your code
												},
												"order" : ["qqdenglu","sinaweibo","qqweibo","renren","kaixin","mail","sms"],
												"client_id" : "ZVEpDSsmZ0qxa1gmgDAh1Fje",
												"dom_id" : "gd_a_gameShare",
												"content" : sharecontent,
												"theme" : "native",
												"animate":true,
												"u":encodeURIComponent("javascript:history.back(-2)"),
												"url" : encodeURIComponent("http://183.129.206.88:8089"),
												"pic_url" : encodeURIComponent(shareurl)
											};
								baidu.socShare.init(config); 
	
                                // game result
                                $("#gd_p_gameResult").text("对局结果:  "+gameInfo.ResultName);     
                                // 执黑
                                $("#gd_p_blackplayer").text("  执黑:  "+gameInfo.BlackPlayerFull);
                                // 执白
                                $("#gd_p_whiteplayer").text("  执白:  "+gameInfo.WhitePlayerFull);

								// if come from match  ,disable comfirm 
                                if(fromgame=="roundgame"||gameInfo.ConfirmFlag)
                                {
                                          // disable comfirm button       
                                        $('#gd_a_gameComfirm').addClass('ui-disabled');
                                }
                                
                                // game comfirm
                                if(!gameInfo.ConfirmFlag)
                                {
									//这里判断逻辑有问题
									//debugger;
									/*userID = window.localStorage.getItem("name");
									if((userID==gameInfo.BlackPlayer&&gameInfo.ResultName=="白胜")||(userID==gameInfo.WhitePlayer&&gameInfo.ResultName=="黑胜"))*/
                                    if(gameDetail_winflag=="-1")
                                     {
                                          // disable comfirm button       
                                          $('#gd_a_gameComfirm').removeClass("ui-disabled").addClass('ui-enabled');
                                     }
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
					// hide 
                    om.hideloading(); 
                    om.showloading("远程访问出错",true);
                }
    });
  }catch(ex){
		om.clog("对局明细-加载基本信息:"+ex);
	}
};

//加载图片
var globle_pics;
gameDetail.loadImage=function(id){
	try{
	  $.ajax({
			type: "get",
			url: om.pubUrl()+"ImageLoad/"+id,//?GameId=&Id=
			dataType: "jsonp",
			jsonpCallback: "call",
			timeout:20000,
			success: function (imgData) {
					//debugger;

					 //data解析为JSON数据
					 var returnImage=eval(imgData);
					 //访问成功
					 if(returnImage.Status=="OK"){
						  //访问成功，加载图片
							var smallImage = document.getElementById('smallImage');
							globle_pics=returnImage.returnValue;//全局照片
							$("#imageCount").text(returnImage.returnValue.length);
							
							if(returnImage.returnValue.length>0)
							{
								smallImage.src ='data:image/jpg;base64,'+returnImage.returnValue[returnImage.returnValue.length-1].pic;	
								//debugger;
								shareurl = returnImage.returnValue[returnImage.returnValue.length-1].UrlFilePath;
								$("#autoImage").autoIMG();
								
								baidu.socShare.destroy();
							   var config = {
											"afterRender" : function() {
												//your code
											},
											"order" : ["qqdenglu","sinaweibo","qqweibo","renren","kaixin","mail","sms"],
											"client_id" : "ZVEpDSsmZ0qxa1gmgDAh1Fje",
											"dom_id" : "gd_a_gameShare",
											"content" : sharecontent,
											"theme" : "native",
											"animate":true,
											"u":encodeURIComponent("javascript:history.back(-2)"),
											"url" : encodeURIComponent("http://183.129.206.88:8089"),
											"pic_url" : encodeURIComponent(shareurl)
										};
							   baidu.socShare.init(config); 
							
							
							}
						
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
	}catch(ex){
		om.clog("对局明细-加载照片出错:"+ex);
	}
};


// comfirm game method
gameDetail.comfirmGame=function(){
	try{
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
							om.changeHashPage("#mygame_page");               
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
	}catch(ex){
		om.clog("对局明细-确认对局错误:"+ex);
	}
};
	 

// init gameDetail
$(function(){
	try{
		 // get the pass param
		 params=$("#omParams").data("omParams");
		 //照片按钮隐藏
		 $("#gameDetail_selectPic").hide();
		 smallImage= document.getElementById('smallImage');
		 smallImage.src = "img/person.png";
	
		 //照片墙
		 $("#gameDetail_picList").unbind();
		 $("#gameDetail_picList").bind("click",function(){
			if($("#imageCount").text()=="0")
			{
				 om.showloading("没有照片",true);
				 return;
			}
			else
			{
				om.changeHashPage('#photo_page',{pics:globle_pics});
			}
		 });
		 
		 //拍照
		 $("#gameDetail_pic").unbind();
		 $("#gameDetail_pic").bind("click",function(){
			  console.log('拍照: ' );
	
			  capturePhoto("game");
		 });
		 //本地选择
		 $("#gameDetail_file").unbind();
		 $("#gameDetail_file").bind("click",function(){
			  console.log('选择照片: ' +pictureSource.SAVEDPHOTOALBUM);
			  getPhoto(pictureSource.SAVEDPHOTOALBUM,"game");
		 });
	
		 //gameDetail_selectPic
		 // click comfirm button
		 $("#gd_a_gameComfirm").unbind();
		 $("#gd_a_gameComfirm").bind("click",function(){
				  // comfirm game
				   gameDetail.comfirmGame();
			  });
	
		//分享返回使用
		//debugger;
		if(typeof(params)=="undefined" || params==null)
		{
			gameDetail_id=window.localStorage.getItem("gameDetail_id");
			gameDetail_fromgame=window.localStorage.getItem("gameDetail_fromgame");
			gameDetail_winflag=window.localStorage.getItem("gameDetail_winflag");

		}
		else
		{
			gameDetail_id=params.id;
			gameDetail_fromgame=params.fromgame;
			gameDetail_winflag = params.winflag
			window.localStorage.setItem("gameDetail_id", params.id);
			window.localStorage.setItem("gameDetail_fromgame", params.fromgame);
			window.localStorage.setItem("gameDetail_winflag", params.winflag);
		}
		 //load data
		gameDetail.loadData(gameDetail_id,gameDetail_fromgame);
	}catch(ex){
		om.clog("对局明细加载出错:"+ex);
	}
});