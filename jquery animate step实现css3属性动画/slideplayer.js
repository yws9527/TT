/*
==slideplayer({对象属性: 值})==

对象属性清单：对象名|宽度|高度|自动切换时间|是否显示箭头控制|滑动类型('left' or 'top' or 'opacity')|切换事件('click' or 'mouseover'...)|是否自动播放}
(对象名|宽度|高度 3项必须定义，默认：每5秒切换焦点图；切换形式：随机动画切换；)

调用示例：
new slideplayer("#adbar",{width:"320px",height:"170px",time:"3000",scrollType:'top',acitonType:"click"})
*/
(function($){
    slideplayer = function(config){
        var defaults = {object:"#adbar",width:300,height:200,time:5000,fontSize:12,right:5,bottom:3,showTitle:false,arrow:'hidden',scrollType:'',acitonType:"click",autoShow:true};
        this.config = $.extend(defaults,config);
        this.obj = this.config.object;
		//随机应用3种动画切换效果,非规则焦点图不能应用该功能：动画所需结构限制，不要随机动画，调用时加参数：scrollType
		if(typeof(this.config.scrollType)=="undefined"||this.config.scrollType==""){
			scrollTypeArr=["left","top","opacity"];
			Math.randomAt=function(floorNum,ceilNum){
			 //alert(arguments.length);
			 if(arguments.length==1){//判断参数的长度
				 num=parseInt(Math.random()*floorNum+1);
				 }else{
					num=parseInt(Math.random()*(ceilNum-floorNum+1)+floorNum);	 
					 }
			return num;
		   };
		   this.config.scrollType=scrollTypeArr[Math.randomAt(0,2)];
		   //console.log(this.config.scrollType);
			}
        this.j =0;
        var _this = this;//jq插件内部this指向(包含)该插件选择器所选对象的所有内部函数 & 插件内 定义的所有变量,返回的是函数体&变量/变量值对;jq内定的一般方法如：click(),triggerHandler()，方法内的this指向该方法前面的DOM元素;在此将插件的this赋值给变量_this，只为方便在jq内定的这些方法[click(),triggle()]中调用
        var t;
        this.count = $(this.obj + " li").size();//size() 同length属性一样获取匹配元素的数量
        this.factory = function(){
			this.initialize();
            this.slide();
			this.config.arrow=="show"?this.arrowAction():"";
            this.config.autoShow==true?(t = setInterval(this.autoplay,this.config.time),this.addhover()):"";//三元运算符，多语句之间用逗号,隔开
        }
		//初始化焦点图
		this.initialize=function(){
            //焦点图外层元素定位
            $(this.obj).css({
				width:this.config.width,
				height:this.config.height //IE7 最后一个css属性不能带逗号,否则会报错
		   }).addClass("slideplayer");
	   if(this.config.scrollType=="left"){
		$(this.obj + " ul").width(this.config.width*this.count)
			.children('li').css({
				float:'left'
			});
	   }
		$(this.obj + " li img").css({
			width:this.config.width,
			height:this.config.height
		})
		if(this.config.fontSize ==14){
			this.size =14;this.height =23;//this.size供初始化描述文字大小时调用
		}else{
			this.size =12;this.height =21;
		}
		//标题栏数字层spNum
		if(this.count>1){ //若当前只有一张图片，不显示切换数字栏
			$(this.obj).append("<div class='spNum'></div>");
			if(this.config.scrollType=="opacity"){$(this.obj + " li:not(:eq(0))").css('display','none');}//除第一张图片，其它隐藏
			$(this.obj + " li").each(function(i){
				$(_this.obj + " .spNum").append("<a href='javascript:;'>"+(i+1)+"</a>");
			 }); 
		}
		this.pageclass(this.obj + " .spNum a",0);//调用翻页函数
		if(this.config.showTitle==true){
			$(this.obj).append("<div class='spTitle'></div>");
			$(this.obj + " .spTitle").css({
					height:_this.height,
					lineHeight:_this.height+'px',//line-height不单独加单位px,会被解析成“字体”的倍数值.
					fontSize:_this.size
				})
			$(this.obj + " li img").each(function(i){
				if(typeof($(this).attr('alt'))=='undefined' || $(this).attr('alt')==""){
					$(this).attr('alt','&nbsp;')
				}
			this.myTit=this.alt;
			spTitleLink="<a href="+$(this).parent("a").attr("href")+">"+this.myTit+"</a>";
			$(spTitleLink).appendTo($(_this.obj + " .spTitle"));
			$(_this.obj + " .spTitle a:not(:eq(0))").hide();
			});
			$("<div class='grayLayer'></div>").appendTo($(_this.obj + " .spTitle"));
			}
		//生成箭头控制，默认不显示，若要显示，传入参数加arrow:'show'
		if(this.config.arrow=="show"){
			$('<div class="arrow"><a href="javascript:;" class="prev">‹</a><a href="javascript:;" class="next">›</a></div>').appendTo(this.obj);
			$(this.obj+" .arrow >a").css({
				marginTop:-this.config.height/6
				});
			$(this.obj).hover(function(){
					$(_this.obj+" .arrow >a").stop(true,true).fadeIn();
				},function(){
					$(_this.obj+" .arrow >a").stop(true,true).fadeOut();
				})		
			}
		}
        //幻灯片切换动作
        this.slide = function(){ 
			$(this.obj + " .spNum a").bind(this.config.acitonType,function(){
				_this.j = $(_this.obj + " .spNum a").index($(this));
				if(!$(_this.obj +"  ul,"+_this.obj + " li:eq(" + _this.j + ")").is(':animated')){ //判断ul(左右/上下滑动) 或li(渐变)是否正在执行动画，防止用户动作同动画不同步导致的动画错乱
					if (_this.j >= _this.count){return;};
					if(_this.config.scrollType=="left"){
							$(_this.obj + " ul").animate({
								marginLeft:-_this.config.width*_this.j
								},200)
						}else if(_this.config.scrollType=="top"){
							$(_this.obj + " ul").animate({
								marginTop:-_this.config.height*_this.j
								},200)
							}else{
								$(_this.obj + " li:eq(" + _this.j + ")").fadeIn().siblings("li").hide();
								}
					$(_this.obj + " .spTitle a:eq(" + _this.j + ")").fadeIn(400).siblings("a").hide();
					_this.pageclass(_this.obj + " .spNum a",_this.j);
				}
            });
        }
        //滑过停止
        this.addhover = function(){
            $(this.obj).hover(function(){clearInterval(t);}, function(){t = setInterval(_this.autoplay,_this.config.time)});
        }
        //自动播放 
        this.autoplay = function(){ 
            _this.j = _this.j >= (_this.count - 1) ? 0 : ++_this.j;
            $(_this.obj + " .spNum a").eq(_this.j).triggerHandler(_this.config.acitonType);
        }
		//翻页箭头点击
		this.arrowAction = function(){
			$(".arrow >a").click(function(){
				if(!$(_this.obj +"  ul"+_this.obj + " li:eq(" + _this.j + ")").is(':animated')){
					if($(this).filter('.prev').length!=0){ //判断被点击的是向左or右箭头
						_this.j = _this.j <=0 ? _this.count - 1 : --_this.j;
						}else{
						_this.j = _this.j >= (_this.count - 1) ? 0 : ++_this.j;
							}
					$(_this.obj + " .spNum a").eq(_this.j).triggerHandler(_this.config.acitonType);
				}
				});
			//键盘左右箭头点击翻页(显示箭头 && 非自动播放 满足2条件才能使用键盘控制)
			if(this.config.autoShow==false){
			   $(document).keydown(function(event){
				   switch (event.keyCode){
					   case 37:
						   $(_this.obj+" .arrow .prev").triggerHandler("click");
					   break;
					   case 39:
						   $(_this.obj+" .arrow .next").triggerHandler("click");
					   break;
				   }
			  })
			}
		}
        //翻页切换样式
        this.pageclass =function(obj,i){
            $(obj).css({
				fontWeight:"normal",
				backgroundColor:"#DEDEDE"
			}).eq(i).css({
				fontWeight:"bold",
				backgroundColor:"#E63003"
			});
        }
        this.factory();
    }
})(jQuery)
