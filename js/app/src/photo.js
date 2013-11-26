var globle_e;

var pageIndex=0;

var photo={};

// get my round
photo.getimage=function(imagelocation){
	try{
		if(imagelocation=="location")
		{
			getPhoto(pictureSource.SAVEDPHOTOALBUM,"photo");
	
		}
		else if(imagelocation=="camera")
		{
			capturePhoto("photo");
		}
	}catch(ex){
		om.clog("照片墙-打开照片:"+ex);
	}
}

function loadimages(searchtype){
	try{
       om.showloading("正在加载，请稍等⋯⋯"); 
	   params=$("#omParams").data("omParams");
	   window.localStorage.setItem("photo_touramentId", params.touramentId);
		// hide the showmore button
       $("#photo_showmore").hide();
	   	 // value="search" reload listview，otherwise  append listview item
		 if(searchtype=="search"){
			  pageIndex=0;
		 }
	    var id=params.touramentId;
		console.log("照片墙赛事id"+params.touramentId);
          $.ajax({
                type: "get",
                //url: om.pubUrl()+"ImageLoad/"+id,//?GameId=&Id=
				url: om.pubUrl()+"ImageLoadByTourament/"+id+"?PageIndex="+pageIndex,//?GameId=&Id=
                dataType: "jsonp",
                jsonpCallback: "call",
                timeout:200000,
                success: function (imgData)
				 {
					//debugger;
					//data解析为JSON数据
					 var returnImage=eval(imgData);
					 //访问成功
					 if(returnImage.Status=="OK"){
						 //访问成功，加载图片
						var output='';
						var listcount=0;

						$.each(returnImage.returnValue,function(index,value){
					  //*******
						var data = 'data:image/jpg;base64,'+value.pic;	
						var url = value.UrlFilePath;//.replace("\","");
						output+="<li><a href=\""+url+"\" rel=\"external\" class=\"ui-link\"><img src=\""+data+"\" alt=\""+value.FileDesc+"\"></a></li>";
						// count ++
						listcount++; 
						});
						
						// set imagecount
						$("#photo_imageCount").text(listcount);

						if(searchtype=="search"){
							$('#imaggList').empty();
						}
						$('#imaggList').append(output);
						console.log("照片加载成功**********************");						
						//chanage value
						 pageIndex++;
						//alert(listcount);	
						//debugger;	
						if(returnImage.returnValue.length>0)
						{
							//imageRef( );
							setTimeout("imageRef()" , 500);
						}
						else
						{
							om.hideloading();
						} 
						 // judge the list count
						 if(listcount>9)
						 {	
							  $("#photo_showmore").show();
						 }	

					 }else{

						   om.hideloading(); 
						  //得到错误提示信息
						  var msg=imgData.Message;
						  om.showloading(msg,true);
					 }
                    }
   		 });
	}catch(ex){
		om.clog("照片墙--照片加载出错:"+ex);
	}

};	

//生成图片列表
function ImageBuilder(imageList)
{
	var output='';
	var listcount=0;
	 $.each(imageList,function(index,value){
	  //*******
	  var data = 'data:image/jpg;base64,'+value.pic;	
	  var url = value.UrlFilePath;//.replace("\","");
	  output+="<li><a href=\""+url+"\" rel=\"external\" class=\"ui-link\"><img src=\""+data+"\" alt=\""+value.FileDesc+"\"></a></li>";
	  listcount++; 							
     });
	 $("#imaggList").append(output);
	 return listcount;
}

function imageRef( )
{	
	om.hideloading();
	PhotoSwipe = window.Code.PhotoSwipe
	//debugger;		
	try
	{		
		var currentPage = $(globle_e.target),
		photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
		if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
			PhotoSwipe.detatch(photoSwipeInstance);
		}
					
					
		var currentPage = $(globle_e.target),
		options = {},
		
		photoSwipeInstance = $("ul.gallery a", globle_e.target).photoSwipe(options,  currentPage.attr('id'));
		return;	
		$('div.gallery-page').on('pageshow', function(e){
						/*console.log("pageshow的刷新");
						var 
							currentPage = $(e.target),
							options = {},
							photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
						return true;*/
					})
					.on('pagehide', function(e){
						var 
							currentPage = $(e.target),
							photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
						debugger;
						if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {

							PhotoSwipe.detatch(photoSwipeInstance);

						}
						return true;

					});
	}catch(err)
	{
		console.log(err);
	}

}
/*
	 * IMPORTANT!!!
	 * REMEMBER TO ADD  rel="external"  to your anchor tags. 
	 * If you don't this will mess with how jQuery Mobile works
*/
(function(window, PhotoSwipe){
	$(document).ready(function(){
		
		 console.log('照片加载:---------------------- ' );
		 //照片按钮隐藏
		 $("#photo_selectPic").hide();
		 //拍照
		 $("#photo_pic").unbind();
		 $("#photo_pic").bind("click",function(){
			  console.log('赛事拍照: ' );
			  capturePhoto("photo");
		 });
		 //本地选择
		 $("#photo_file").unbind();
		 $("#photo_file").bind("click",function(){
			  console.log('选择照片: ' +pictureSource.SAVEDPHOTOALBUM);
			  getPhoto(pictureSource.SAVEDPHOTOALBUM,"photo");
		 });
		 //bind showmore button click enent
		 $("#photo_showmore").unbind();
		 $("#photo_showmore").bind("click",function(e,ui){
			  loadimages("showmore");
		 }); 

		$('div.gallery-page').on('pageshow', function(e){
				globle_e=e;
		});
		
		$('div.gallery-page').on('pagehide', function(e){
			   
					/*var 
					currentPage = $(e.target),
					photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
				if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
					PhotoSwipe.detatch(photoSwipeInstance);

				}
				return true;*/
		});
		
		
		 params=$("#omParams").data("omParams");
		// debugger;
		//params.pics
		if(typeof(params.touramentId)=="undefined" && params.pics.length>0)
		 {
			 $("#photo_graph").hide();
			 $('#imaggList').empty();
			 ImageBuilder(params.pics);
			 setTimeout("imageRef()" , 500);
			 
			 //imageRef();
			 om.hideloading(); 
			 return;
		 }
		 else
		 {
		    $("#photo_graph").show();

			loadimages("search");
		 }
  });

}(window, window.Code.PhotoSwipe));