// Add by Wilshere
// 对局列表
// 2013/11/04

var mygame = {};

// search method
mygame.searchGame=function(pageIndex){
	// waiting dialog
    om.showloading("正在加载，请稍等……");	
	
	// get the login username
	userName = window.localStorage.getItem("name");
	
	$.ajax({
		type:"get",
		url:om.pubUrl()+"QueryGamesByMemberId?MemberId="+userName+"&DateFrom=&DateTo=",
		dataType:"jsonp",
		jsonpCallback:"call",
		success: function(data){
				// parse json to js json
				var returnData=eval(data);
				// get request state
				var state=returnData.Status;
				if(state=="OK")
				{				
					// declare a variable with whick to build our output
					var output='';
					var returnList=returnData.returnValue;
					
					// iterate the data
					$.each(returnList,function(index,value){
						// game result
						var gameResult="胜";
						
					    if(value.Score<0)
						{
							gameResult="负";
						}
						else if(value.Score==0)
						{
							gameResult="平";	
						}
						
						// score reduce
						var scoreReduce= Math.abs(value.Score).toFixed(1);
						
						//*******
						output+= "<li><a class='myGame_a' onclick=\"om.changeHashPage('gameDetail.html',{id:'"+value.Id+"',winflag:'"+value.WinFlag+"'})\" href='#' id='a_game' >";
						
						output+=" <img src='img/game_96.png'  class='list_image'>"
						output+="<h2  class='detail_name'>"+value.OpponentName +"</h2>";
						output+="<p>对局结果：<strong style='color:red'>"+gameResult+"</strong></p>";
						
						// compare score
						if(value.Score>=0)
						{		
							output+="<i class='icon-plus' style='color:red'> "+scoreReduce+"</i>";
						}
						else
						{	
							output+="<i class='icon-minus' style='color:green'> "+scoreReduce+"</i>";
						}
						output+="<p class='ui-li-aside'><strong>"+value.GameDate+"</strong></p>";
						output+="</a>";
						output+="<a href=\"#\" data-rel=\"popup\" onclick=\"om.changeHashPage('createGame.html',{Id:'"+value.Id+"'})\" data-position-to=\"window\" data-transition=\"pop\"></a>";
						output+="</li> ";
					});
					
					// empty listview and refresh
					$('#mygame_list').empty().append(output).listview('refresh');
					
//					// bind change page on listview
//					$(".myGame_a").bind("click",function(){
//							$.mobile.changePage("gameDetail.html");
//						});
					 om.hideloading();					 
				}
				else
				{
					// request false
					var msg=returnData.Message;			
					om.showloading(msg,true);
				}
			},
        error:function(error){
				// request false
				om.showloading("远程调用出错",true);
			}
	});
}
	
//初始化登录信息
$(function(){
	om.memu("mygame_menu");
	
	// hide;
	om.hideloading();	
	
	// add click event
	$("#mygame_a_creategame").bind("vclick",function(e,ui){
		om.changeHashPage("createGame.html",{gameIDValue:'',Id:''});
	});
	
	//打开面板
	$("#mygame_menu_a").bind("vclick", function () {
			$( "#mygame_Panel" ).panel( "open" );
		});
	
	//右滑动，打开菜单	
	$("#mygame_header").bind("swiperight", function () {
			$( "#mygame_Panel" ).panel( "open" );
		});
	// search game pageindex  default 0 
	mygame.searchGame(0);
});
	