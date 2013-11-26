// Add by Wilshere
// round game list
// 2013/11/06

var roundgame={};

// get round game
roundgame.searchGame=function(touramentid,touramentname,roundvalue){
	
	 if(typeof(touramentid)=="undefined"||typeof(roundvalue)=="undefined")
	  {
		  console.log("error: 返回对局List画面(rundgame)没有参数");
		  return;
	  }
     // waiting dialog
    om.showloading("正在加载，请稍等……");     
     $.ajax({
          type:"get",
          url:om.pubUrl()+"QueryGameList/"+touramentid+"/"+roundvalue,
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
                         var output="<li data-role=\"list-divider\" >当前赛事："+touramentname+"  轮次：第"+roundvalue+"轮</li>";
                         var returnList=returnData.returnValue;
                         //console.log(returnList);
                         // iterate the data
                         $.each(returnList,function(index,value){
                              output+= "<li><a class='myGame_a' onclick=\"om.changeHashPage('#gameDetail_page',{gameid:'"+value.GameId+"',id:'"+value.Id+"',fromgame:'roundgame'})\" href='#' id='a_game'>";
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
	try{
		 // get the pass param
		 params=$("#omParams").data("omParams");
	
		//分享返回使用
		//debugger;
		if(typeof(params)=="undefined" || params==null)
		{
			roundgame_touramentid=window.localStorage.getItem("roundgame_touramentid");
			roundgame_touramentname=window.localStorage.getItem("roundgame_touramentname");
			roundgame_roundvalue=window.localStorage.getItem("roundgame_roundvalue");


		}
		else
		{
			roundgame_touramentid=params.touramentid;
			roundgame_touramentname=params.touramentname;
			roundgame_roundvalue=params.roundvalue;
			window.localStorage.setItem("roundgame_touramentid", params.touramentid);
			window.localStorage.setItem("roundgame_touramentname", params.touramentname);
			window.localStorage.setItem("roundgame_roundvalue", params.roundvalue);
		}
		
     	//roundgame.searchGame(params.touramentid,params.touramentname,params.roundvalue);
		roundgame.searchGame(roundgame_touramentid,roundgame_touramentname,roundgame_roundvalue);
		
	}catch(ex){
		om.clog("对局列表加载出错:"+ex);
	}
});