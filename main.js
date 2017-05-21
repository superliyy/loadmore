$(document).ready(function(){
	//创建滚动视图
	var myScroll = new IScroll('.wrapper', {
		probeType: 3
	})
	//修改初始位置
	myScroll.scrollTo(0, -50);
	
	
	
	myScroll.on('scrollStart', function(){
//		console.log(myScroll.y);
//		console.log('scrollStart。。。。。')
	})
	
	myScroll.on('scroll', function(){
		if(myScroll.y >= 0 && !$('.head img').hasClass('up')){
			$('.head img').addClass('up');
		}
		
		var disY = myScroll.maxScrollY - myScroll.y;
		if(disY >= 0){
			$('.foot img').addClass('down');
		}
		
	})
	
	myScroll.on('scrollEnd', function(){
		//处理下拉刷新的逻辑
		//1.如果下拉位置 >=-50px,<0时回到原来的位置
		if(myScroll.y >= -50 && myScroll.y < 0){
			myScroll.scrollTo(0, -50);
		}
		//2.如果下拉位置>=0时，执行刷新
		else if(myScroll.y >= 0){
			//改变图片
			$('.head img').attr('src', 'img/ajax-loader.gif');
			console.log('刷新....');
			
			//todo 
			setTimeout(function(){
				console.log('请求完成');
				
				closeRefresh();
				
			}, 2000);
			
			
		}
		
		//处理上拉加载更多的逻辑
		//得到距离最底部的距离
		var disY = myScroll.maxScrollY - myScroll.y;
		//1.如果距离底部的位置>=-50px <0 回到 -50的位置
		if(disY >= -50 && disY < 0){
			var offsetY = myScroll.maxScrollY + 50;
			myScroll.scrollTo(0, offsetY);
		}
		//2.如果距离底部的位置>=0 执行加载更多
		else if( disY >= 0 ){
			//改变图片
			$('.foot img').attr('src', 'img/ajax-loader.gif');
			
			console.log('上拉加载更多....');
			
			setTimeout(function(){
				console.log('加载更多完毕....');
				
				closeLoadmore();
				
			}, 2000);
			
			
		}
		
		
	})
	
	
	function closeRefresh(){
		//将加载的图片更换箭头图片
		$('.head img').attr('src', 'img/arrow.png');
		//将箭头图片还原
		$('.head img').removeClass('up');
		//回到初始位置
		myScroll.scrollTo(0, -50, 1000);
		//刷新视图
		myScroll.refresh();
	}
	
	function closeLoadmore(){
		//将加载的图片更换箭头图片 
		$('.foot img').attr('src', 'img/arrow.png');
		//将箭头图片还原
		$('.foot img').removeClass('down');
		//回到初始位置
		var offsetY = myScroll.maxScrollY + 50;
		myScroll.scrollTo(0, offsetY, 1000);
		//刷新视图
		myScroll.refresh();
	}
	
	
})



