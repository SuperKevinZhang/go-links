// Add by Wilshere
// match list
// 2013/11/06

var mymatch={};

// get my match
mymatch.searchMatch=function(pageIndex){
	// waiting dialog
    om.showloading("正在加载，请稍等……");	
	
	// get the login username
	userName = window.localStorage.getItem("name");
	
	$.ajax({
		type:"get",
		url:om.pubUrl()+"GetMyTourament?username="+userName,
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
					
					// iterate the data
					$.each(returnList,function(index,value){
						//******* 
						output+= "<li><a class='list_a' onclick=\"om.changeHashPage('round.html',{touramentid:'"+value.TouramentId+"',touramentname:'"+value.ShortName+"'})\" href='#' id='mymatch_a_match' >";
						// output+=" <img src='img/match_96.png' class='list_image'>"
						output+="<h2>"+value.ShortName +"</h2>";
						output+="<p><strong>轮次："+value.TotalRound+"</strong></p>";
						output+="<p>"+ value.StartDate+"~"+value.EndDate +"</p>";
						output+="<p>棋谱/照片数:"+value.SGFQty+"/"+value.PICQty+"</p>";
						output+="<p class='ui-li-aside'><strong>"+value.StatusName+"</strong></p>";
						output+="<span class=\"ui-li-count\">对局数:"+value.GameQty+"</span>"
						output+="</a>";
						output+="<a href=\"#\" data-rel=\"popup\" onclick=\"om.changeHashPage('photo.html',{touramentId:'"+value.TouramentId+"'})\" data-position-to=\"window\" data-transition=\"pop\"></a>";
						output+="</li> ";
					});
					
					// empty listview and refresh
					$('#myMatch_list').empty().append(output).listview('refresh');
					
					// hide
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

// init view method
$(function(){
	// menu method
	//om.memu("match_menu");
		//打开面板
	/*$("#match_menu_a").bind("vclick", function () {
			$( "#match_panel" ).panel( "open" );
		});*/
	// slide to the right and open the menu
	/*$("#match_page").bind("swiperight",function(){
		$("#match_panel").panel("open");
	});*/
	/* //菜单按钮
	 $("#match_menu").find("#dashboard").on("vclick" ,function(){om.changeHashPage('dashboard.html')});
	 $("#match_menu").find("#match").on("vclick" ,function(){om.changeHashPage('match.html')});
	 $("#match_menu").find("#mygame").on("vclick" ,function(){om.changeHashPage('mygame.html')});
	 $("#match_menu").find("#chart").on("vclick" ,function(){om.changeHashPage('chart.html')});
	 $("#match_menu").find("#friend").on("vclick" ,function(){om.changeHashPage('friend.html')});
	 $("#match_menu").find("#messages").on("vclick" ,function(){om.changeHashPage('messages.html')});*/
		
	// search match
	mymatch.searchMatch();
	
	
});