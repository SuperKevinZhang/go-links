// JavaScript Document
/*
// Add kevin.zhang@serviceindeed.com
// message notice JS实现
// 2013-10-31
*/
var messages={}
dashboard.loadData=function(data){
		// colse menu
		//$( "#menupanel" ).panel( "toggle" );
		om.showloading("正在加载，请稍等……");
		$.ajax({
                type: "get",
                url: om.pubUrl()+"GetRecentNotice",
                dataType: "jsonp",
                jsonpCallback: "call",
				timeout:10000,
                success: function (data) {
					//data解析为JSON数据
					 data=eval(data);
					 //访问成功
					 if(data.Status=="OK"){
						 //访问成功，得到用户的基础信息
						  var infoList=data.returnValue;
						 /* 	<div   data-theme="d" data-role="collapsible"  data-collapsed-icon="arrow-r" and 	data-expanded-icon="arrow-d">
						   <h3>公告发布</h3>
						   <h3>公告发布</h3>
						   <p style="text-align:right">2013-10-10</p>
						   <p>I'm the collapsible content. By default I'm closed, but you can click the header to open me.</p>
						  
						</div>*/
						  //循环生成公告
						  var output="";
						  console.log("Message: " + infoList);

						  $.each(infoList,function(index,value){
							  //list 生成
							  output+="<div data-content-theme=\"d\"  data-theme=\"d\" data-role=\"collapsible\"  data-collapsed-icon=\"arrow-r\" and 	data-expanded-icon=\"arrow-d\">";
							  output+="<h3>"+value.Title+"</h3>";
							  output+="<h3>"+value.Title+"</h3>";
							  
							  output+="<p style=\"text-align:right\">"+value.CreateTime+"</p>";
							  output+=" <p>"+value.Content+"</p></div>";
						  });
						    $("#message_list").empty();
						    $("#message_list").append(output);
						    $("#message_list").trigger('create');
						    om.hideloading();						
					}else{
						//得到错误提示信息file:///Volumes/Macintosh%20HD/Users/indeed/Desktop/Project/I-GoMember/www/html/messages.html#menupanel
						var msg=data.Message;
						om.showloading(msg,true);
					}
				},
                error: function (error) {
                    om.showloading("远程访问出错",true);
                }
    });
}
//初始化信息
$(function(pageDom, params){
	//om.memu("messages_menu");
	
		//打开面板
/*	$("#messsages_menu_a").bind("click", function () {
			$( "#messages_menupanel" ).panel( "open" );
		});		*/	
 	/*//右滑动，打开菜单	
	$("#messages_page").bind("swiperight", function () {
			$( "#messages_menupanel" ).panel( "open" );
	});*/
	/*//菜单按钮	
   $("#messages_menu").find("#dashboard").on("vclick" ,function(){om.changeHashPage('dashboard.html')});
   $("#messages_menu").find("#match").on("vclick" ,function(){om.changeHashPage('match.html')});
   $("#messages_menu").find("#mygame").on("vclick" ,function(){om.changeHashPage('mygame.html')});
   $("#messages_menu").find("#chart").on("vclick" ,function(){om.changeHashPage('chart.html')});
   $("#messages_menu").find("#friend").on("vclick" ,function(){om.changeHashPage('friend.html')});
   $("#messages_menu").find("#messages").on("vclick" ,function(){om.changeHashPage('messages.html')});
	   */
	//pageDom, params
	//alert(0);
	params=$("#omParams").data("omParams");
	
	

	//alert(params.type);
	//load data
	dashboard.loadData();
	
	
});