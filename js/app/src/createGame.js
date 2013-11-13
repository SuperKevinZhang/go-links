// Add by Wilshere
// create game
// 2013/11/07


var createGame = {};
var txt_playtypeid;
var whitePlayerID;
var blackPlayerID;
var TouramentID;

// search player
createGame.SearchPlayer=function(txt_playid){
		om.showloading("正在加载，请稍等……");
		// get the login username
		var userName = window.localStorage.getItem("name");
		
		// get black player name
		var searchText;
		if(txt_playid=="cg_text_black")
		{
			searchText=$("#cg_text_black").val();
			blackPlayerID="";
		}
		else
		{
			searchText=$("#cg_text_white").val();
			whitePlayerID="";
		}
		
		// init empty the list
		$('#cg_ul_blackPlayers').empty();
		$('#cg_ul_whitePlayers').empty();
		
		// get the selected Handicap 
		var handicapValue= $("#fd_Handicap option:selected").val();

		// invoke ajax menu
		$.ajax({
                type: "get",
                url: om.pubUrl()+"GetMemberByName?Name="+searchText+"&MemberIds=",
                dataType: "jsonp",
                jsonpCallback: "call",
				timeout:10000,
                success: function (data) {
					//data解析为JSON数据
					var returnData=eval(data);

					 //访问成功
					 if(returnData.Status=="OK"){
						// declare a variable with whick to build our output
						var output="";
						var returnList=returnData.returnValue;
						
						// iterate the data
						$.each(returnList,function(index,value){
							// joint the html string
							output+="<li><a onclick=\"createGame.bindpalyer('"+value.MemberId+"','"+value.ChineseName+"')\" href=\"#\">"+value.ChineseName+"/"+value.MemberId+"</a></li>";        	
						});

						// refresh
						if(txt_playid=="cg_text_black")
						{
							$('#cg_ul_blackPlayers').empty().append(output).listview('refresh');
						}
						if(txt_playid=="cg_text_white")
						{
							$('#cg_ul_whitePlayers').empty().append(output).listview('refresh');
						}
						 
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

// select menu 
function onSelectChange(){
	    // get the selected value
	    var handicapValue= $("#cg_select_chess option:selected").val();

		if(handicapValue=="R01")
		{
			// stone and komi num
			$("#cg_stonesNum").val(1);
			$("#cg_komiNum").val(7.5);
			
			// disable stones and able cg_komiNum
			$("#cg_stonesNum").prop("disabled", true);
			$("#cg_komiNum").prop("disabled", false);
			
			//$("#cg_roundNum").textinput("disable");		
			 //$('#cg_roundNum').addClass('ui-disabled');
			//$('#cg_roundNum').attr('disabled');
		}
		else if(handicapValue=="R02")
		{
			// stone and komi num
			$("#cg_stonesNum").val(1);
			$("#cg_komiNum").val(0);
			
			// disable stones and able komi 
			$("#cg_stonesNum").prop("disabled", true);
			$("#cg_komiNum").prop("disabled", true);
		}
		else if(handicapValue=="R03")
		{
			// stone and komi num
			$("#cg_stonesNum").val(2);
			$("#cg_komiNum").val(0);
			
			// able stones and komi
			$("#cg_stonesNum").prop("disabled", false);
			$("#cg_komiNum").prop("disabled", true);
		}
	}
	
// submit the form
createGame.savegame=function(Id){	
		var num={i:1,};
		console.log("新增对局点击次数"+num.i++);
		// valide the data
		// round
		if($("#cg_roundNum").val().length==0)
		{
			om.showloading("轮次不能为空",true);
			return;
		}	
		var roundflag=createGame.isInterger($("#cg_roundNum").val());
		if(!roundflag)
		{
			om.showloading("轮次请输入正整数",true);
			return;
		}
		// position
		if($("#cg_positionNum").val().length==0)
		{
			om.showloading("台次不能为空",true);
			return;
		}	
		var positionflag=createGame.isInterger($("#cg_positionNum").val());
		if(!positionflag)
		{
			om.showloading("台次请输入正整数",true);
			return;
		}
		// 日期
		if($("#date_game").val().length==0)
		{
			om.showloading("日期不能为空",true);
			return;
		} 
		// date
		if($("#date_game").val().length==0)
		{
			om.showloading("日期不能为空",true);
			return;
		} 
		// black player
		if(blackPlayerID.length==0)
		{
			om.showloading("请从下拉列表选择执白人员",true);
			return;
		} 
		// white player
		if(whitePlayerID.length==0)
		{
			om.showloading("请从下拉列表选择执黑人员",true);
			return;
		} 		
		// stones 
		var stonesValue =$("#cg_stonesNum").val();
		if(stonesValue.length==0)
		{
			om.showloading("让子数不能为空",true);
			return;
		} 
		var stonesflag=createGame.isInterger(stonesValue);
		if(!stonesflag||stonesValue>9)
		{
			om.showloading("让子数请输入1~9整数",true);
			return;
		}
		// komi
		var komiValue=$("#cg_komiNum").val();
		if($("#cg_komiNum").val().length==0)
		{
			om.showloading("贴目数不能为空",true);
			return;
		} 
		var trun=isNaN($("#cg_komiNum").val());
		if(trun||komiValue%0.5!=0||komiValue<-30||komiValue>30)
		{
			om.showloading("贴目数请输入-30~30之间0.5倍数数字",true);
			return;
		}
		// 
		if(blackPlayerID==whitePlayerID)
		{
			om.showloading("执黑执白不能相同",true);
			return;
		} 
		
		// get the login username
		var userName = window.localStorage.getItem("name");
		
		// black or white must have the login user
		if(blackPlayerID!=userName&&whitePlayerID!=userName) 
		{
			om.showloading("执黑执白必须选一个自己",true);
			return;
		}
		
		om.showloading("正在加载，请稍等……");
		
		// alert($("#slider_IsParticipate option:selected").val());

	  	var publishUrl=om.pubUrl()+"UpdateLoadResult/"+userName;
		publishUrl+="?jsonGame={'Id':'"+Id+"','Result':'"+$("#cg_game_result option:selected").val()+"','Round':'"+$("#cg_roundNum").val()+"','GameId':'','WhitePlayer':'"+whitePlayerID+"','Handicap':'"+$("#cg_select_chess option:selected").val()+"','Stones':'"+$("#cg_stonesNum").val()+"','GameDate':'"+$("#date_game").val()+"','Position':'"+$("#cg_positionNum").val()+"','TouramentId':'"+TouramentID+"','Komi':'"+$("#cg_komiNum").val()+"','RatingFlag':'"+$("#slider_IsParticipate option:selected").val()+"','Judge':'','BlackPlayer':'"+blackPlayerID+"'}";

		// invoke ajax menu
		$.ajax({
                type: "get",
                url: publishUrl,
                dataType: "jsonp",
                jsonpCallback: "call",
                success: function (data) {
					//data解析为JSON数据
					var returnData=eval(data);

					 //访问成功
					 if(returnData.Status=="OK"){
						// declare a variable with whick to build our output
						om.hideloading();	
						om.showloading("新增成功",true);	
						om.changeHashPage("mygame.html");			
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
}

// select player 
createGame.bindpalyer=function(name,ChineseName){
//	alert(txt_playid);
//	alert(memberid);
		// refresh
		if(txt_playtypeid=="cg_text_black")
		{
			$("#cg_text_black").val(ChineseName+"/"+name);
			$('#cg_ul_blackPlayers').empty();
			blackPlayerID=name;
		}
		else
		{
			// set the player value
			$("#cg_text_white").val(ChineseName+"/"+name);
			// empty the list
			$('#cg_ul_whitePlayers').empty();
			whitePlayerID=name;
		}
	}
	
// create game init	
createGame.initbyCreateGame=function(){
	 // init the data	
	// get the login username
	var userName = window.localStorage.getItem("name");
 	var chineseName=window.localStorage.getItem("chineseName");
	//var gameInfo=returnData.returnValue;

	// init page 
	// match round position date
	TouramentID="T20130101";
	$("#text_match").val("Casual赛事");
	
 	// player name	
	whitePlayerID=userName;
    blackPlayerID=userName;
 	$("#cg_text_black").val(chineseName+"/"+userName);
	$("#cg_text_white").val(chineseName+"/"+userName);
	//  round position datetime
	$("#cg_roundNum").val(1);
	$("#cg_positionNum").val(1);
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' +
		(month<10 ? '0' : '') + month + '-' +
		(day<10 ? '0' : '') + day;
	$("#date_game").val(output);
	
	// stone and komi num
	$("#cg_stonesNum").val(1);
	$("#cg_komiNum").val(7.5);	
	// disable stones and able cg_komiNum
	$("#cg_stonesNum").prop("disabled", true);
	$("#cg_komiNum").prop("disabled", false);
	
	// $("#cg_select_chess").selectedIndex =2; 
	// $("#cg_select_chess").options[2].selected = true; 
	// $("#cg_select_chess option").eq(2).prop("selected",true);
	$('#cg_select_chess :nth-child(2)').prop('selected', true); 
};
	
    // update game init
createGame.initbyUpdateGame=function(id){
		// start loading
		om.showloading("正在加载，请稍等……");
		
		// invoke ajax menu
		$.ajax({
                type: "get",
                url: om.pubUrl()+"GameDetail?GameId=&Id="+id,
                dataType: "jsonp",
                jsonpCallback: "call",
				timeout:10000,
                success: function (data) {	
					//data解析为JSON数据
					var returnData=eval(data);
					
					// alert(JSON.stringify(returnData));
					
					 //访问成功
					 if(returnData.Status=="OK"){
						 
						 om.hideloading();	
						 
						// get the game object
						var gameInfo=returnData.returnValue;
						// init page 
						// match round position date
						TouramentID=gameInfo.TouramentId;
						$("#text_match").val(gameInfo.TouramentName);
						$("#cg_roundNum").val(gameInfo.Round);
						$("#cg_positionNum").val(gameInfo.Position);
						$("#date_game").val(gameInfo.GameDate);
						// black player and white player
						$("#cg_text_black").val(gameInfo.BlackPlayerFull);
						blackPlayerID=gameInfo.BlackPlayer;
						$("#cg_text_white").val(gameInfo.WhitePlayerFull);	
						whitePlayerID=gameInfo.WhitePlayer;	
						// Handicap stones komi
						var Handicap = gameInfo.Handicap;
						// select
						var handicapSelect = $('#cg_select_chess');						
						// Select the relevant option, de-select any others
						handicapSelect.val(Handicap).attr('selected', true).siblings('option').removeAttr('selected');
						// jQM refresh
						handicapSelect.selectmenu("refresh", true);
						// stones
						$("#cg_stonesNum").val(gameInfo.Stones);
						// cg_komiNum
						$("#cg_komiNum").val(gameInfo.Komi);
						// result istakepoint	
						var gameResult = gameInfo.Result ;
						// alert("x"+gameResult+"x");
						// select
						var resultSelect = $('#cg_game_result');						
						// Select the relevant option, de-select any others
						resultSelect.val($.trim(gameResult)).attr('selected', true).siblings('option').removeAttr('selected');
						// jQM refresh
						resultSelect.selectmenu("refresh", true);
						// IsParticipate					
						var IsParticipate = gameInfo.RatingFlag;
						// select
						var IsParticipateSelect = $('#slider_IsParticipate');	
						
						if(IsParticipate)
						{
							// Select the relevant option, de-select any others
							IsParticipateSelect.val("true").attr('selected', true).siblings('option').removeAttr('selected');
							// jQM refresh
							IsParticipateSelect.selectmenu("refresh", true);	
						}
						else
						{
							// Select the relevant option, de-select any others
							IsParticipateSelect.val("false").attr('selected', true).siblings('option').removeAttr('selected');
							// jQM refresh
							IsParticipateSelect.selectmenu("refresh", true);	
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
}

// position interger
createGame.isInterger=function(n) {
        return /^[0-9]*[1-9][0-9]*$/.test(n);
    }

//初始化登录信息
$(function(){	
   	// get the pass param
	params=$("#omParams").data("omParams");

    // judge Id is "" 
	if(params.Id=='')
	{
		createGame.initbyCreateGame();
	}
	else
	{
		createGame.initbyUpdateGame(params.Id);
	}
	
	// init common init
	// createGame.initGameCommon();
	
	// search text change
	$('.cg_player').on('input',function(e){ 
		var txt_playid=$(this).attr("id");
		txt_playtypeid=txt_playid;
		var searchText;
		
		// black player
		if(txt_playid=="cg_text_black")
		{
			searchText=$("#cg_text_black").val();
		}
		else
		{
			searchText=$("#cg_text_white").val();
		}
		
		if(searchText.length>1)
		{
			createGame.SearchPlayer(txt_playid);
		}
});	

	// bind the add event
	$("#cg_savegame").unbind();  
	$("#cg_savegame").bind("click",function(e,ui){
		createGame.savegame(params.Id);
	});
});