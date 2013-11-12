// JavaScript Document
/*
// Add kevin.zhang@serviceindeed.com  AND wilshere
// friend detail JS实现
// 2013-11-3
*/
var frienddetail={}

// store current player
var currentPlayer;

frienddetail.loadData=function(memberid){
		om.showloading("正在加载，请稍等……");

		// colse menu
		$.ajax({
                type: "get",
                url: om.pubUrl()+"GetMemberByUsername?username="+memberid,
                dataType: "jsonp",
                jsonpCallback: "call",
                success: function (data) {
					//data解析为JSON数据
					var returnData=eval(data);
					 
					 //访问成功
					 if(returnData.Status=="OK"){
						 //访问成功，得到用户的基础信息
						  var friendInfo=returnData.returnValue;

						  // 对局名称
						  $("#fd_h_username").text(friendInfo.ChineseName);
						  // 会员账号
						  $("#fd_p_account").html("会员账号:  <span >"+friendInfo.MemberId+"</span>");
                          // 性别
						  $("#fd_li_gender").html("性别:  <span >"+friendInfo.GenderName+"</span>");
						  // 段位
						  $("#fd_li_grade").html("段位:  <span >"+friendInfo.CurrentGradeName+"</span>");
						  // 积分
						  $("#fd_li_integral").html("积分:  <span >"+friendInfo.CurrentIntegrate+"</span>");
						  // 对局数
						  $("#fd_li_gamecount").html("对局数:  <span >"+friendInfo.RatingGameQty+"</span>");
						  // 电话
						  //alert(friendInfo.MobilePhoneVisible)
						  if(friendInfo.MobilePhoneVisible==true)
						  {
						 	 $("#fd_i_tel").text(friendInfo.MobilePhone);
						  	 $("#fd_a_tel").attr("href","tel:"+friendInfo.MobilePhone);
						  }
						  else{
						  	 $("#fd_i_tel").text("  未公开");

						  }
						  
						  // 邮箱
						  if(friendInfo.EmailVisible==true)
						 {
						   $("#fd_i_email").text(friendInfo.Email);
                           $("#fd_a_email").attr("href","mailto:"+friendInfo.Email);
						 }
						  else{
						  	 $("#fd_i_email").text("  未公开");

						  }
						  // store current player
						  currentPlayer=friendInfo.MemberId;
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

// pk game method 
frienddetail.PKgame=function(){
		om.showloading("正在加载，请稍等……");
		// get the login username
		var userName = window.localStorage.getItem("name");
		
		// get the selected Handicap 
		var handicapValue= $("#fd_Handicap option:selected").val();

		// invoke ajax menu
		$.ajax({
                type: "get",
                url: om.pubUrl()+"GetCompare?WhitePlayer="+userName+"&BlackPlayer="+currentPlayer+"&Handicap="+handicapValue,
                dataType: "jsonp",
                jsonpCallback: "call",
                success: function (data) {
					//data解析为JSON数据
					var returnData=eval(data);

					 //访问成功
					 if(returnData.Status=="OK"){
						 // declare a variable with whick to build our output
						var output='';
						var returnList=returnData.returnValue;
						
						// iterate the data
						$.each(returnList,function(index,value){
							//*******
							output+= "<li><a class=\"a_PKresult\"  href=\"#\" >";
							output+="<h2>胜算："+value.BProbality+"</h2>";
							output+="<p><strong>让子数/贴目数："+value.Stone+"</strong></p>";
							output+="</a>";
							output+="</li> ";
						});
						
						// empty listview and refresh
						$('#fd_list_PKResult').empty().append(output).listview('refresh');
						  
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

//初始化信息
$(function(pageDom, params){
	
	// get the pass param
	params=$("#omParams").data("omParams");
	
	var loginUserName = window.localStorage.getItem("chineseName");
	
	// add pk add text
    $("#df_btn_text").text(loginUserName+"(白)VS" +params.membername+"(黑)PK开始");
	// 
	// var outstr="<a id=\"fd_a_gamePK\" href=\"#\" data-role=\"button\" data-icon=\"star\" >PK胜算</a>";
	// $("#fd_gamePK").append(outstr);
	
	// add pk click method
	$("#fd_a_gamePK").bind("vclick",function(){
		// pk method	
		frienddetail.PKgame();
	});
	$("#friendDetail_back").bind("vclick",function(){
		// 后退
		javascript:history.back(-1);	
	});
	
	

	//load data
    frienddetail.loadData(params.memberid);
});