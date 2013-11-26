// Add by Wilshere
// 对局列表
// 2013/11/04

var mygame = {};

var pageIndex=0;

// search method
mygame.searchGame=function(searchtype){
try{
		// waiting dialog
		om.showloading("正在加载，请稍等……");	
		// get the login username
		userName = window.localStorage.getItem("name");
		// hide the showmore button
		 $("#showmore").hide();
		 // value="search" reload listview，otherwise  append listview item
		 if(searchtype=="search"){
			  pageIndex=0;
		 }
		$.ajax({
			type:"get",
			url:om.pubUrl()+"QueryGamesByMemberId?MemberId="+userName+"&DateFrom=&DateTo=&PageIndex="+pageIndex,
			dataType:"jsonp",
			jsonpCallback:"call",
			timeout:10000,
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
						var listcount=0;
						// iterate the data
						$.each(returnList,function(index,value){
							// game result
							var gameResult="进行中";
							
							if(value.WinFlag=="0")
							{
								gameResult="平";
							}
							else if(value.WinFlag=="-1")
							{
								gameResult="负";	
							}
							else if(value.WinFlag=="1")
							{
								gameResult="胜";
							}
							
							// score reduce
							var scoreReduce= Math.abs(value.Score).toFixed(1);
							
							//*******
							/*output+= "<li><a class='myGame_a' onclick=\"om.changeHashPage('gameDetail.html',{id:'"+value.Id+"',winflag:'"+value.WinFlag+"',fromgame:'mygame',opponentName:'"+value.OpponentName+"'})\" href='#' id='a_game' >";*/
							
							output+= "<li><a class='myGame_a' onclick=\"om.changeHashPage('#gameDetail_page',{id:'"+value.Id+"',winflag:'"+value.WinFlag+"',fromgame:'mygame',opponentName:'"+value.OpponentName+"'})\" href='#' id='a_game' >";
							
							// judge the player color
							if(value.Color=="B")
							{
								output+=" <img src='img/blackPlayer_96.png'  class='list_image'>";
							}
							else
							{
								output+=" <img src='img/whitePlayer_96.png'  class='list_image'>";
							}
							
							output+="<h6  class='detail_name'>"+value.OpponentName+"</h6>";
							output+="<h6  class='detail_name' >"+value.Opponent+"</h6>";
							output+="<p><strong style='color:red'>结果:"+gameResult+"   积分差:"+value.Score+"</strong></p>";
							output+="<p>照片/棋谱数："+value.PICQty+"/"+value.SGFQty+"</p>";
	
							output+="<p class='ui-li-aside'><strong>"+value.GameDate+"</strong></p>";
							output+="</a>";
							if(value.GameStatus=="未确认")
							{
								output+="<a href=\"#\" data-rel=\"popup\" onclick=\"om.changeHashPage('#creategame_page',{Id:'"+value.Id+"'})\" data-position-to=\"window\" data-icon=\"edit\" data-transition=\"pop\"></a>";
							}
							else
							{
								output+="<a href=\"#\" data-rel=\"popup\" onclick=\"om.changeHashPage('#creategame_page',{Id:'"+value.Id+"'})\" data-position-to=\"window\" data-transition=\"pop\" data-icon=\"check\" class=\"ui-disabled\"></a>";
							}
							output+="</li> ";
							
							// count ++
							listcount++; 
						});
	
						 // empty listview and refresh
						 if(searchtype=="search"){
							  $('#mygame_list').empty();
						 }
						 $('#mygame_list').append(output).listview('refresh');
						
						 om.hideloading();		
						 //chanage value
						 pageIndex++;
						 
						 // judge the list count
						 if(listcount>=10)
						 {
							  $("#showmore").show();
						 }			 
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
	}catch(ex){
	om.clog("我的对局ajax出错:"+ex);
  }
}
	
//初始化登录信息
$(function(){
	try{
		 //om.memu("mygame_menu");
		// add click event
		$("#mygame_a_creategame").unbind();
		$("#mygame_a_creategame").bind("click",function(e,ui){
			om.changeHashPage("#creategame_page",{gameIDValue:'',Id:''});
		});
		
		/*//打开面板
		$("#mygame_menu_a").bind("vclick", function () {
				$( "#mygame_Panel" ).panel( "open" );
			});*/
		
		/*//右滑动，打开菜单	
		$("#mygame_page").bind("swiperight", function () {
				$( "#mygame_Panel" ).panel( "open" );
			});*/
		 
		// hide;
		om.hideloading();	
		
		// search game pageindex  default 0 
		mygame.searchGame("search");
		
		//bind showmore button click enent
		 $("#showmore").unbind();
		 $("#showmore").bind("click",function(e,ui){
			  mygame.searchGame("showmore");
		 }); 
	  }catch(ex){
	  om.clog("我的对局加载出错:"+ex);
	}
});
	