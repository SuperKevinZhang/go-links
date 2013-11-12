// JavaScript Document
$(function() {
	$(document).on("pageshow", '[id$="page"]', function () {
		$("#menu").empty();
	   $("#menu").append(" </ul>");
	   
	   $("#menu").append("<li data-role=\"list-divider\" role=\"heading\">菜单</li>");
	   $("#menu").append("<li data-theme=\"a\"><a href=\"#\" onclick=\"om.changeHashPage('dashboard.html')\" data-transition=\"none\" class=\"icon icon-rocket\"> 我的轨迹</a></li>");
	   $("#menu").append("<li data-theme=\"a\"><a href=\"#\" onclick=\"om.changeHashPage('match.html')\" data-transition=\"none\" class=\"icon icon-fire\"> 比赛</a></li>");
	   $("#menu").append("<li data-theme=\"a\"><a href=\"#\" onclick=\"om.changeHashPage('mygame.html')\" data-transition=\"none\" class=\"icon icon-cut\"> 我的对局</a></li>");
	   $("#menu").append("<li data-theme=\"a\"><a href=\"#\" onclick=\"om.changeHashPage('chart.html')\"  data-transition=\"none\" class=\"icon icon-gift\"> 积分动态</a></li>");
	   $("#menu").append("<li data-theme=\"a\"><a href=\"#\" onclick=\"om.changeHashPage('friend.html')\"  data-transition=\"none\" class=\"icon icon-user\"> 棋友</a></li>");
	   $("#menu").append("<li data-theme=\"a\" ><a href=\"#\" onclick=\"om.changeHashPage('messages.html',{type:4})\"  data-transition=\"none\" class=\"icon icon-bell\"> 消息</a></li>");
	   $("#menu").append("<li data-theme=\"a\"><a href=\"#login_page\" data-transition=\"none\" class=\"icon icon-reply\"> 注销</a></li>");
	   
	   $("#menu").listview('refresh');
	
	});
});
