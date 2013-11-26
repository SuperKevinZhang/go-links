// Add by Wilshere
// round list
// 2013/11/06

var matchRound={};

// get my round
matchRound.searchRound=function(touramentid,touramentname){
	if(typeof(touramentid)=="undefined")
	  {
		  console.log("error: 返回比赛轮次List画面(rund)没有参数");
		  return;
	  }
	// waiting dialog
    om.showloading("正在加载，请稍等……");	
	$.ajax({
		type:"get",
		url:om.pubUrl()+"GetTouramentRounds?TouramentId="+touramentid,
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
					// declare a variable with which to build our output and set the list title
					var output="<li data-role=\"list-divider\" >当前赛事："+touramentname+"</li>";
					var returnList=returnData.returnValue;
					
					// iterate the data
					$.each(returnList,function(index,value){
						//******* 
						output+="<li><a href=\"#\" onclick=\"om.changeHashPage('#roundgame_page' ,{touramentid:'"+touramentid+"',roundvalue:'"+value.Round+"',touramentname:'"+touramentname+"'})\" data-theme=\"e\">第"+value.Round+"轮 <span class=\"ui-li-count\">对局数:"+value.count+"</span></a></li>";
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
					om.hideloading();					 
				}
			},
            error:function(error){
				// request false
				om.hideloading();					 
				om.showloading("远程调用出错",true);
			}
	});
}

// init view method
$(function(){
	try{
		// get the pass param
		params=$("#omParams").data("omParams");
		
		//分享返回使用
		//debugger;
		if(typeof(params)=="undefined" || params==null)
		{
			round_touramentid=window.localStorage.getItem("round_touramentid");
			round_touramentname=window.localStorage.getItem("round_touramentname");

		}
		else
		{
			round_touramentid=params.touramentid;
			round_touramentname=params.touramentname;
			window.localStorage.setItem("round_touramentid", params.touramentid);
			window.localStorage.setItem("round_touramentname", params.touramentname);
		}
		
		// search match
		matchRound.searchRound(round_touramentid,round_touramentname);
	}catch(ex){
		om.clog("比赛轮次加载出错:"+ex);
	}
});