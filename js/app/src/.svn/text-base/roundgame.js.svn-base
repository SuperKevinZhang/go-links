// Add by Wilshere
// round game list
// 2013/11/06

var roundgame={};

// get round game
roundgame.searchGame=function(touramentid,touramentname,roundvalue){
	// waiting dialog
    om.showloading("正在加载，请稍等……");	

	$.ajax({
		type:"get",
		url:om.pubUrl()+"QueryGameList/"+touramentid+"/"+roundvalue,
		dataType:"jsonp",
		jsonpCallback:"call",
		success: function(data){
				// parse json to js json
				var returnData=eval(data);
				// get request state
				var state=returnData.Status;
				if(state=="OK")
				{				
					// declare a variable with which to build our output and set the list title
					var output="<li data-role=\"list-divider\" >当前赛事："+touramentname+"  轮次：第"+roundvalue+"轮</li>";
					var returnList=returnData.returnValue;
					//console.log(returnList);
					// iterate the data
					$.each(returnList,function(index,value){
						//alert(value.GameId);
						//*******
/*						var gameid=value.GameId;
						if(gameid=="")
						{
							gameid=value.ById;
						}*/
						
						output+= "<li><a class='myGame_a' onclick=\"om.changeHashPage('gameDetail.html',{gameid:'"+value.GameId+"',id:'"+value.Id+"'})\" href='#' id='a_game' >";
						output+=" <img src='img/game_96.png' class='list_image'>"
						output+="<h6  class='detail_name'>执黑:"+value.BlackPlayerName+"</h6>";
						output+="<h6  class='detail_name'>执白:"+value.WhitePlayerName+"</h6>";
						output+="<p>对局结果：<strong style='color:red'>"+value.ResultName+"</strong></p>";
						output+="<p>棋谱/相片数："+value.SGFQty+"/"+value.PICQty+"</strong></p>";
						output+="<p class='ui-li-aside'><strong>"+value.GameDate+"</strong></p>";
						output+="</a>";
						output+="</li> ";
					});
					
					// empty listview and refresh
					$('#roundgame_list').empty().append(output).listview('refresh');
					
					// hide
					om.hideloading();					 
				}
				else
				{
					// request false
					var msg=returnData.Message;			
					om.showloading(msg,true);
					om.showloadingtimeout();
				}
			},
        error:function(error){
				// request false
				om.showloading("远程调用出错",true);
				om.showloadingtimeout();
			}
	});
}

// init view method
$(function(){
	// get the pass param
	params=$("#omParams").data("omParams");
	/*$("#roundgame_back").bind("vclick",function(){
		// 后退
		javascript:history.back(-1);	
	});*/
	// search game
	roundgame.searchGame(params.touramentid,params.touramentname,params.roundvalue);
});
