// JavaScript Document

// Add kevin.zhang@serviceindeed.com
// 我要入伙
// 2013-11-21




var joinus={}
joinus.save= function()
{
	try{
		if($("#ju_name").val().length==0)
		{
			om.showloading("姓名",true);
			return;
		}
		if($("#ju_email").val().length==0 && $("#ju_tel").val().length==0)
		{
			om.showloading("手机和邮箱必需输入一个",true);
			return;
		}	
		else
		{
			if($("#ju_tel").val().length>0 && $("#ju_tel").val().length<10)
			{
				om.showloading("手机格式不正确",true);
				return;
			}
			
			  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			   if($("#ju_email").val().length>0&&!myreg.test($("#ju_email").val()))
			   {
					om.showloading("邮箱格式不正确",true);
					return;
			   }
			
		}
		
	
		om.showloading("正在加载，请稍等……");
		//jsonRegister={Name:1,City:2,Phone:13,Email:4,Remark:5}
		var jsurl=om.pubUrl()+"Register?jsonRegister={Name:'"+$("#ju_name").val()+
							"',City:'"+$("#ju_city").val()+
							"',Phone:'"+$("#ju_tel").val()+
							"',Email:'"+$("#ju_email").val()+
							"',Remark:'"+$("#ju_remark").val()+"'}";
	
	
	
		$.ajax({
			type:"get",
			url:jsurl,
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
						// hide
						om.hideloading();
						om.showloading("您的入会要求已经收到，假日棋社会尽快联络您",true);	
						setTimeout("change()" , 2000);
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
						om.hideloading();
						om.showloading("您的入会要求已经收到，假日棋社会尽快联络您",true);
						setTimeout("change()" , 2000);
	
					//om.showloading("远程调用出错"+error,true);
				}
		});
		}
	catch(ex){
		om.clog("我要入会--ajax提交出错："+ex);
	}
}
function change()
{
	om.changeHashPage("#login_page");				 

}
//初始化登录信息
$(function(){
	//绑定登录按钮
	$("#joinus_save").unbind();
	$("#joinus_save").bind("click",function(e,ui){
		//入伙
		joinus.save();
	});
	
	
});