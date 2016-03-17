//加入收藏夹  
function addFav() {
	 if(document.all){
		window.external.addFavorite('http://www.phpvar.com/', "Phpvar's Blog");
	}
	 else if(window.sidebar){
	window.sidebar.addPanel("Phpvar's Blog", 'http://www.phpvar.com/',  "" );
	}
}
// 评论贴图
function embedImage(){
  var URL = prompt('请输入图片 URL 地址:', 'http://');
  if (URL) {
		document.getElementById('comment').value = document.getElementById('comment').value + '<img src="' + URL + '" class="insertImg"/>';
  }
}
// 链接复制
function copy_code(text) {
  if (window.clipboardData) {
    window.clipboardData.setData("Text", text)
	alert("已经成功将原文链接复制到剪贴板！");
  } else {
	var x=prompt('你的浏览器可能不能正常复制\n请您手动进行：',text);
  }
}
//返回顶部
function topControl(obj){
	var _this=$(obj);
	_this.click(function(){
		$("html,body").animate({scrollTop: 0}, 500);
		})
	$(window).scroll(function(){
		if($(this).scrollTop()!=0){
			 _this.addClass("showThis");
			//判断是否是IE6
			if($.browser.msie && $.browser.version==6.0){
			  _this.css({
				  bottom:'auto',
				  top:$(window).height()-$(_this).height()+$(window).scrollTop()
				  })
			}
		}else{
			_this.removeClass("showThis");
			}
		})
	}

function tabs(arg1,arg2,flag,times){
	var tabs=$("."+arg1+" ul >li");
	var len=tabs.length;
	var tabcnt=$("."+arg2+" >ul");
	tabs.eq(flag).addClass('on');
	tabcnt.eq(flag).show().siblings().hide();
	//定时切换显示
	function setint(){
	  flag++;
	  flag=flag<len?flag:0;//定时切换，若已切换到最后一项则返回第一项重新开始
	  tabs.eq(flag).addClass('on').siblings().removeClass('on');
	  tabcnt.eq(flag).fadeIn().siblings().hide();
	  }
	var actions=setInterval(setint,times);
	tabs.hover(function(){ // tab标题鼠标移入、移出事件
	clearInterval(actions);
	var index=tabs.index($(this));//获得鼠标焦点的对象在jq对象数组的位置，供后面的tabcnt使用
	$(this).addClass('on').siblings().removeClass('on');
	tabcnt.eq(index).stop(true,true).fadeIn().siblings().hide();
	},function(){
	  actions=setInterval(setint,times);
	  var index=tabs.index($(this));
	  flag=index; //将鼠标移出时对应的index值传给flag，使定时切换能从鼠标所在位置重新开始
		})
	tabcnt.hover(function(){clearInterval(actions);},function(){actions=setInterval(setint,times);})//tab内容鼠标移入、移出事件
}

//单行滚动js
function scrollInit(obj,num,time,direction){
	  var c=0,
		  o=document.getElementById(obj),//alert(o.childNodes.length);
		  h=getFirstChild(o).scrollHeight;
	  o.num=num;
	  o.time=time;
	  o.direction=direction?direction:"up";
	  o.auto=setTimeout(function(){scrollup();},o.time);//经过time 秒后执行函数，即每一行停顿时间为time秒
	  o.onmouseover=function(){clearTimeout(this.auto);};
	  o.onmouseout=function(){this.auto=setTimeout(function(){scrollup();},this.time);};
	  function scrollup(){
		if(c>=o.num*h){
			for(var i=0; i<o.num;i++){
				if(o.direction=="up"){	
				  var t=getFirstChild(o).cloneNode(true);
				  o.removeChild(getFirstChild(o));
				  o.appendChild(t);
				}else{	
				  var t=getLastChild(o).cloneNode(true);
				  o.removeChild(getLastChild(o));
				  o.insertBefore(t,getFirstChild(o));
				}
			}
			c=0;
			o.style.marginTop="0px";
			o.auto=setTimeout(function(){scrollup();},o.time);
		}else{
			c+=2;
			if(o.direction=="up"){
				o.style.marginTop=-c+"px";
			}else{	
				o.style.marginTop=c+"px";
			}
			o.auto=setTimeout(function(){scrollup();},10);//box的第一个ELEMENT节点margin-top的增加速度,即该节点往上滚动的速度。值越小滚动越快！可用firefox的firebug查看该节点margin-top属性的增加状态及行滚动速度
		}
	  }
	  //获取第1个非文本节点
	  function getFirstChild(node){
		//console.log(node.length);
		var node=node.firstChild;
		while (node.nodeType!=1)//排除行之间的空白节点（firefox、chrome认为标签间的空白也算一个TEXT文本节点）
		{
			node=node.nextSibling;
		}
		return node;
	  }
	  //获取最后1个非文本节点
	  function getLastChild(node){
		var node=node.lastChild;
		while (node.nodeType!=1)
		{
			node=node.previousSibling;
		}
		return node;
	  }
	}
//生成随机数
//扩展Math自定义方法randonAt()，生成[a,b]区间的随机整数，包含上下限a,b
 Math.randomAt=function(floorNum,ceilNum){
	 //alert(arguments.length);
	 if(arguments.length==1){
		 num=parseInt(Math.random()*floorNum+1);
		 }else{
			num=parseInt(Math.random()*(ceilNum-floorNum+1)+floorNum);	 
			 }
	return num;
	 };
//评论自动定位
function commnetPos(){
		var urls=window.location.href;
		var commentObj=$("span[title='"+urls+"']",$(".comment-meta"));
		if(commentObj.length!=0){	
			tempPos=commentObj.offset().top;
			$("html,body").animate({	
				scrollTop:tempPos-80
			},500,function(){
				commentObj.parent().parent().addClass('on');
			});
		}
	}
//背景图片随机展示
var tempNum;
function randomBg(){
	tempNum=Math.randomAt(1,6);
	$("body").attr("class","bg"+tempNum);
}
// 调用迅雷看看，播放视频，调用方法 kankan.start(url);
var kankan = {
  kkDapCtrl: null,
  kkGetDapCtrl: function() {
    if (null == this.kkDapCtrl) {
      try {
        if (window.ActiveXObject) {
          //if (navigator.userAgent.indexOf('MSIE') != -1) {
          this.kkDapCtrl = new ActiveXObject("DapCtrl.DapCtrl");
        } else {
          var browserPlugins = navigator.plugins;
          for (var bpi = 0; bpi < browserPlugins.length; bpi++) {
            try {
              if (browserPlugins[bpi].name.indexOf('Thunder DapCtrl') != -1) {
                var e = document.createElement("object");
                e.id = "dapctrl_history";
                e.type = "application/x-thunder-dapctrl";
                e.width = 0;
                e.height = 0;
                document.body.appendChild(e);
                break;
              }
            } catch (e) {}
          }
          this.kkDapCtrl = document.getElementById('dapctrl_history');
        }
      } catch (e) {}
    }
    return this.kkDapCtrl;
  },
  start: function(url) {
    var dapCtrl = this.kkGetDapCtrl();
    try {
      var ver = dapCtrl.GetThunderVer("KANKAN", "INSTALL");
      var type = dapCtrl.Get("IXMPPACKAGETYPE");
      if (ver && type && ver >= 672 && type >= 2401) {
        dapCtrl.Put("sXmp4Arg", '"' + url + '"' + ' /sstartfrom _web_xunbo /sopenfrom web_xunbo');
      } else {
        alert('请先更新迅雷看看播放器,然后刷新本页面！');
      }
    } catch (e) {
      alert('请先安装迅雷看看播放器,然后刷新本页面！');
    }
  }
};
$(function(){
	$(".ht-tab .tab-tit span").on('click', function(event) {
		event.preventDefault();
		alert("囧rz..  这个小东西真的什么功能都没有的，别再点啦……");
	});
	tabs(".ht-tab .tab-tit",".ht-tab .tab-cnt",0,10000);
	//侧边栏tabs自动切换
	tabs("tabs","tabscontent",0,10000);	
	// 控制贴图大小
	var maxwidth=650;
    $(".comment-body img").each(function(){
        if (this.width>maxwidth)
         this.width = maxwidth;
    });
	/* @reply js by zwwooooo */
	$('.reply').click(function() {
	var atid = '"#' + $(this).parent().attr("id") + '"';
	var atname = $(this).prevAll().find('cite:first').text();
	$("#comment").attr("value","@" + atname + "：").focus();
});
	$('.cancel-comment-reply a').click(function() {	//点击取消回复评论清空评论框的内容
	$("#comment").attr("value",'');
});
	//点击文章标题加载中提示
	$('.post_meta h2').find(' a').click(function(){
	$(this).html('<div class="ajaxloading">稍等片刻，快速加载中...  ^_^ </div>');
	window.location = $(this).attr('href');
	}).end().mouseenter(function(){
			$(this).siblings(".post_date").find(".day").css({
						fontWeight:"bold",
						color:"green"})
			}).mouseleave(function(){
				$(this).siblings(".post_date").find(".day").css({
						fontWeight:"normal",
						color:"#0088DD"})
				});
	$('.post_meta .entry-more').click(function(){
	$('h2 >a',$(this).parent('.post_meta')).html('<div class="ajaxloading">稍等片刻，快速加载中...  ^_^ </div>');
	window.location = $(this).attr('href');
	})
	// 字体调整
	$(".text_small").css("color","#A40000");
	$(".text_small,.text_middle,.text_large").click(function(){
		$(this).css("color","#A40000").siblings().css("color","#bbb");
		if($(this).hasClass("text_small")){
			$(".post_content").css({
				fontSize:"12px",
				lineHeight:"22px"
				})
			}else if($(this).hasClass("text_middle")){
				$(".post_content").css({
					fontSize:"14px",
					lineHeight:"22px"
					})
				}else{
					$(".post_content").css({
						fontSize:"16px",
						lineHeight:"26px"
						})
					}
	});
	//导航二级菜单
	$("#topnav ul,#topnav2 ul").css({display: "none"});
	if($(window).width()<=1024){
		$("#topnav >li >a,#topnav2 >li >a").toggle(function() {
			if($(this).siblings("ul").length==0){
				location.href=this.href;
				return;
			}
			$(this).siblings("ul:first").show();
		}, function() {
			$(this).siblings("ul:first").hide();
		});
	}else{
		var tnTimer=null;
		var _this=null;
		$("#topnav >li,#topnav2 >li").hover(function() {
			_this=this;
			$(".sub-menu").hide();
			tnTimer && clearTimeout(tnTimer);
			tnTimer=setTimeout(function(){
					$(_this).find("ul:first").stop(true,true).slideDown(500, "easeOutBounce");
			},150)
		}, function() {
			$(this).find("ul:first").hide();
		})
	}
	// 手机站二级菜单显/隐
	if($(".btn-navbar").length!=0){
		$(".btn-navbar").toggle(function() {
			$("#navigation2").show();
		}, function() {
			$("#navigation2").hide();
		});
	}
	//阅读全文
//	$(".read-more a").hide();
//	$(".post_meta").hover(function(){
//	  $(".read-more a",$(this)).addClass('css3link').fadeIn(50)
//	  },function(){
//		$(".read-more a",$(this)).hide()
//		}
//	)
	//调用返回顶部
	topControl('.toTop');
	//页面加载指示条
	$(".blog_loading").animate({width:"100%"},2500,function(){
		$(this).fadeOut();
		$("#navigation2").css("border-bottom-color","#e00")
	}); 
	//插入admin留言标识(根据多说留言插件结构)
	$(".ds-comment-header").find("a[href*='http://www.phpvar.com']").each(function(index, element) {
		$(this).parents(".ds-comment-body").append("<div class='comment_admin_img'></div>");
	});
	//友荐相关文章位置移动
	$(".simple_tags").prependTo(".author_text");
	//侧栏滚动搜索模块展示效果
	//var sbTop=$("#php_widget-11").offset().top;
	var sbTop=$("#sidebar").offset().top+$("#sidebar").outerHeight(true);
	var sbLeft=$("#sidebar").offset().left;
	var fTop=$("#footer").offset().top-43;//43分页栏目高度
	$(window).scroll(sbEvent=function(){
	var wTop=$(window).scrollTop();
	var wLeft=$(window).scrollLeft();
	var php_widget_11=$("#php_widget-11");
	var dValue=wTop+php_widget_11.outerHeight(true)-fTop;//差值
	if(wTop>sbTop-$("#wpadminbar").height()&&dValue<0){//当.sideBar底部接触到浏览器顶部，并且其底部 未接触到.footer时
		$(".ggsearch_ad").show();
		php_widget_11.css({
			display:"block",
			position:"fixed",
			left:sbLeft-wLeft,
			top:10+$("#wpadminbar").height()
		});
		if($.browser.msie && parseInt($.browser.version)<7){
			php_widget_11.css({
				position:"absolute",
				top:wTop+10+$("#wpadminbar").height()
			})
		}
	}else if(dValue>=0){//当.sideBar底部接触到.footer是边沿时
		php_widget_11.css({	
			position:"absolute",
			left:sbLeft-wLeft,
			top:fTop-php_widget_11.outerHeight(true)	
		});
	  }else{
	  	  if($(".hot-top").length!=0){php_widget_11.hide()}
		  php_widget_11.css("position","static");
		  $(".ggsearch_ad").hide();
		  }
});
	//pre标签鼠标响应
	var preOriginalWidth=$(".post_content pre").width();
	$("<div class='pre_tips'>单击展开代码,方便阅读</div>").appendTo(".post_content pre");
	$("pre .pre_tips").live("click",function(){
		var preWidth=$(this).parent().width();
		if(preWidth!=960){
			$(this).parent().animate({
			width:960,
			left:-12
			},{queue:false,duration:500,complete:function(){
				$(this).css({
				  borderLeft:"1px solid #303030"
				})
			  }
		})
		$(this).text("单击收缩代码,方便浏览其它内容");
		}else{
			$(this).parent().animate({
			width:preOriginalWidth,
			left:0
			},{queue:false,duration:500,complete:function(){
				$(this).css({
					borderLeft:"5px solid #1684C8"
				})
				}
			})
			$(this).text("单击展开代码,方便阅读");
			}
		})

	//runcode textarea标签鼠标响应
	//将运行等按钮提出到.runcode标签显示（直接改runcode.php实现）
	//	$(".runcode p:nth-child(3)").each(function(index, element) {
	//		$(this).insertAfter($(this).parent())
	//	});
	//runcode 提示文字标红色
	$(".runcode").next("p").each(function(index, element) {
		var $old=$(this).html();
		var $new=$old.replace(/(提示：)/,'<span style="color:#f00;">$1</span>');
		$(this).html($new);
	});
	var rcOriginalWidth=$(".post_content .runcode").width();
	var taOriginalWidth=$(".post_content .runcode textarea").width();
	$("<div class='pre_tips'>单击展开,方便编辑代码</div>").appendTo(".runcode");
	$(".runcode .pre_tips").live("click",function(){
		var taWidth=$(this).parent().width();
		if(taWidth!=960){
			$(this).html("单击收缩代码,方便浏览其它内容");
			$(this).parent().animate({
			width:960,
			left:-12
			},{queue:false,duration:500,complete:function(){
				$(this).css({
				  borderLeft:"1px solid #303030"
				})
			  }
		})
		.find("textarea").width("100%").focus();
		}else{
			$(this).html("单击展开,方便编辑代码");
			$(this).parent().animate({
			width:rcOriginalWidth,
			left:0
			},{queue:false,duration:500,complete:function(){
				$(this).css({
					borderLeft:"5px solid #1684C8"
				})
				}
			})
			.find("textarea").width(taOriginalWidth);
			}
		});
	//runcode编辑状态
	$(".runcode textarea").focus(function(){
		var $old=$(this).parents(".runcode").find(".pre_tips").html();
		$(this).parents(".runcode").find(".pre_tips").html("正在编辑代码...").css("color","#f00");
		$(this).bind("blur",function(){
			$(this).parents(".runcode").find(".pre_tips").html($old).removeAttr("style");
			})
		});
	// 控制runcode编辑文字提示显隐藏
	$("pre,.runcode").each(function(index, el) {
		var pre_tips=$(this).find('.pre_tips');
		var timer=setTimeout(function() {
			pre_tips.fadeOut();
		}, 5000);
		$(this).hover(function() {
			clearTimeout(timer);
			pre_tips.fadeIn();
		}, function() {
			pre_tips.fadeOut();
		});
	})
	//侧栏评论控制
	//$(".unfold").next(".comment_info").show();
	var timer=null;
	$(".comment_tit").hover(function() {
		var _this=this;
		timer && clearTimeout(timer);
		timer=setTimeout(function(){
			$(_this).addClass("unfold").siblings(".comment_tit").removeClass("unfold");
			$(_this).next(".comment_info").css({
				borderBottom:"2px green solid"
				}).show()
				   .siblings(".comment_info").css({
						borderBottom:"none"
						}).hide();
		},100);
		
	}, function() {
		
	});
	// $(".comment_tit a:nth-child(2)").click(function(){
	// 	$(this).parent().addClass("unfold").siblings(".comment_tit").removeClass("unfold");
	// 	$(this).parent().next(".comment_info").css({
	// 		borderBottom:"2px green solid"
	// 		}).slideDown()
	// 		   .siblings(".comment_info").css({
	// 				borderBottom:"none"
	// 				}).hide();
	// 	return false;
	// 	})
	//背景图片随机展示
	if(!favSkin){
		// console.log("有执行随机！");
		// randomBg();
	}
	//替换错误标签
	$("#ds-recent-visitors-4 >h3").html('最近访客{评论来源...}');
	$("#php_widget-9 >h3").html('男人袜{让生活简单一点...}');
	//相关文章随机百分数
	var relateArr=['65%','70%','77%','75%','80%','85%','88%','89%','90%','94%','95%','96%','97%','98%'];
	var relateNum=Math.randomAt(0,relateArr.length-1);
	$("#related_post h3 >b").text(relateArr[relateNum]);
	
	//评论自动滚动定位
	commnetPos();	
	/*快速评论*/
	$(".comment_pic a").click(function() {
		$(".ds-textarea-wrapper textarea").val(this.innerHTML);
		$(".ds-hidden-text").text(this.innerHTML);
		$("html,body").animate({
			scrollTop: $("#ds-thread").offset().top - 250
		}, 300);
		$(".ds-post-button").click();
		return false;
	});
})