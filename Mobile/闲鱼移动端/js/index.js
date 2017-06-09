//入口函数
$(function(){
	var deviceWidth = $(document).width();
	var index = 1; 
	var $nav = $(".main>.navBox .nav");
	var len = $(".main .nav .item").length;
	var $indexs = $(".main .index .item");
	
	//==============广告轮播====START===================
 	//添加过渡动画结束事件 transitionend
   	$nav.on("transitionend", function() {
   		if(index >= len-1){ //最后一张，需立刻向前拽回
   			index = 1;
   			$nav.css("transition", "none");
   			$nav.css("transform", "translateX(-"+ index*deviceWidth + "px)");
   		}
   		if(index <= 0){ 
   			index = len-2;
   			$nav.css("transition", "none");
   			$nav.css("transform", "translateX(-"+ index*deviceWidth + "px)");
   		}
   	});
 
	//定时轮播
	var timer = navTimer();
	function navTimer(){
		return setInterval(function(){  
	        index++;  
	        navTranX();
	    },1500);
	}
	function navTranX(){
		$nav.css("transition", ".3s");
        $nav.css("transform", "translateX(-"+ index*deviceWidth + "px)");
		$indexs.removeClass("cur").eq(index==len-1?0:index-1).addClass("cur"); 
	}
	//==============广告轮播====END===================
	
	//==============广告手滑====START===================
	//添加touch事件
	var startX = 0;
	var moveX = 0;
	var isMove = false;
	
	$nav.on("touchstart", function(ev){
		isMove = false;
  		clearInterval(timer);
  		startX = ev.touches[0].clientX;
  		ev.preventDefault();
	});
	$nav.on("touchmove", function(ev){
		isMove = true;
		moveX = ev.touches[0].clientX - startX;
		$nav.css("transform", "translateX(" + (index*deviceWidth*-1+moveX) + "px)");
		ev.preventDefault();
	});
	$nav.on("touchend", function(ev){
		if(isMove){
			if(Math.abs(moveX)>=deviceWidth/3){
				if(moveX<0){ //向左
					index++;
				}else{
					index--;
				}
				navTranX(); //先回归正位置，再开定时器
			}else{
				$nav.css("transform", "translateX(" + (index*deviceWidth*-1) + "px)");
			}
		}
		timer = navTimer();
	});
	//==============广告手滑====END===================
	
	//==============列表切换====START===================
	//“新鲜事”、“附近的”  切换
	$(".main .show .tags .item").on("touchend", function(){
		$(".main .show .tags .item").toggleClass("cur");
	});
	//==============列表切换====END===================
});
