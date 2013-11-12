// Add by Wilshere
// round list
// 2013/11/06

var matchRound={};

// get my round
matchRound.searchRound=function(touramentid,touramentname){
	// waiting dialog
    om.showloading("正在加载，请稍等……");	
	
	$.ajax({
		type:"get",
		url:om.pubUrl()+"GetTouramentRounds?TouramentId="+touramentid,
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
					var output="<li data-role=\"list-divider\" >当前赛事："+touramentname+"</li>";
					var returnList=returnData.returnValue;
					
					// iterate the data
					$.each(returnList,function(index,value){
						//******* 
						output+="<li><a href=\"#\" onclick=\"om.changeHashPage('roundgame.html' ,{touramentid:'"+touramentid+"',roundvalue:'"+value.Round+"',touramentname:'"+touramentname+"'})\" data-theme=\"e\">第"+value.Round+"轮 <span class=\"ui-li-count\">对局数:"+value.count+"</span></a></li>";
					});
					
					// empty listview and refresh
					$('#round_list').empty().append(output).listview('refresh');
					
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
	/*$("#round_back").bind("vclick",function(){
		// 后退
		javascript:history.back(-1);	
	});*/
	
	// search match
	matchRound.searchRound(params.touramentid,params.touramentname);
});