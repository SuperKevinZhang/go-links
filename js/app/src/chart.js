// JavaScript Document
//Add yang.liu@serviceindeed.com
//会员积分图页面
var chart={}

//报表加载
chart.plotLoad=function(){
	
	//生成报表的数组
		var prevYear=new Array();
		//$("#chart_page").on("pageshow", '[id$="page"]', function () {
		userName = window.localStorage.getItem("name");
		$.jqplot._noToImageButton = true;
		//加载网络数据
		om.showloading("正在加载，请稍等……");
		$.ajax({
                type: "get",
                url: om.pubUrl()+"ScoreChartByUsername/"+userName,
                dataType: "jsonp",
                jsonpCallback: "call",
				timeout:10000,
                success: function (data) {
					//data解析为JSON数据
					 data=eval(data);
					 //访问成功
					 if(data.Status=="OK"){
						 //访问成功，得到用户的基础信息
						  var info=data.returnValue;
						  //为报表数据设值
						  for(var i=0;i<info.length;i++){
							  
							  prevYear[i]=new Array(info[i].UpdateTime,info[i].CurScore);
							}	
							//生成报表数据
							var plot1 = $.jqplot("jqplot", [prevYear], {
								seriesColors: ["#eb6100"],
								//网格的设置
								grid: {
									background: 'rgba(57,57,57,0.0)',
									drawBorder: false,
									shadow: false,
									gridLineColor: '#2aade4',
									gridLineWidth: 1
								},
								//坐标轴的设置
							  axes:{
								xaxis:{
								  renderer:$.jqplot.DateAxisRenderer,
								  tickRenderer: $.jqplot.CanvasAxisTickRenderer,
								  tickOptions:{
									formatString:'%y/%m/%#d',
                    				textColor: '#57d7f3',
									angle: -30,
									fontSize:'9px',    //刻度值的字体大小 
									fontFamily:'Arial, Helvetica, sans-serif', //刻度值上字体 
								  },
								  numberTicks:10
								},
								yaxis:{
								  tickRenderer: $.jqplot.CanvasAxisTickRenderer,
								  tickOptions:{
									formatString:'%.2f',
                    				textColor: '#57d7f3',
									angle: -30,
									fontSize:'9px',    //刻度值的字体大小 
									fontFamily:'Arial, Helvetica, sans-serif', //刻度值上字体 
									}
								}
							  },
							  //显示区域的控制
							  seriesDefaults: {
									pointLabels: { show:true,location:"ws"} 
						            
								},
								//鼠标停止处理
							  highlighter: {
								show: true,
								sizeAdjust: 7.5
							  },
							  //设置CSS样式，鼠标停止
							  cursor: {
								show: false
							  }
						  });	
						plot1.replot({clear: true});
						$('.jqplot-highlighter-tooltip').addClass('ui-corner-all')
								//$("jqplote").tigger("create");
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
		//});	
	});
}

$(function(){
	  //om.memu("chart_menu");
	/*//打开面板
	$("#chart_menu_a").bind("click", function () {
			$( "#chart_panel" ).panel( "open" );
		});*/
	/*//右滑动，打开菜单
	 $("#chart_page").bind("swiperight", function () {
			$( "#chart_panel" ).panel( "open" );
		});*/
	/* //菜单按钮
	 $("#chart_menu").find("#dashboard").on("vclick" ,function(){om.changeHashPage('dashboard.html')});
	 $("#chart_menu").find("#match").on("vclick" ,function(){om.changeHashPage('match.html')});
	 $("#chart_menu").find("#mygame").on("vclick" ,function(){om.changeHashPage('mygame.html')});
	 $("#chart_menu").find("#chart").on("vclick" ,function(){om.changeHashPage('chart.html')});
	 $("#chart_menu").find("#friend").on("vclick" ,function(){om.changeHashPage('friend.html')});
	 $("#chart_menu").find("#messages").on("vclick" ,function(){om.changeHashPage('messages.html')});*/
	 
	 
	//页面初始化
	chart.plotLoad();
	
});
