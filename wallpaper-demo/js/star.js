function init(can,w,h,star_num,stars,starObj,star_max_wh,star_min_wh)//初始化：生成star对象
{
	//初始化
	var i=star_num,temp;
	can['width']=w;
	can['height']=h;
 	while(i--){
 		temp=star_num-i-1;
 		stars.push(new starObj());
 		stars[temp]['wh']=Math.round(Math.random()*(star_max_wh[temp]-star_min_wh[temp])+star_min_wh[temp]);
 		stars[temp]['step']=Math.round(Math.random()*5+5);
 		stars[temp]['step_record']=0;
 		stars[temp]['pic']=new Image();
 		stars[temp]['pic']['src']='img/star_'+(temp+1)+'.png';
 		stars[temp]['add_rand']=1;
 	}
}

function NP_rand3(adj_p)
//随机产生+ - 1或者0,+ - 1概率相同且可调
{
	if((Math.random()-adj_p)<=0){
		return -1;
	}
	else if((Math.random()-adj_p*2)<=0){
		return 1;
	}
	else{
		return 0;
	}
}

function NP_rand2()
{
	//随机产生+ - 1
	return ((Math.random()-0.5)>=0) ? 1:-1;
}

function randvary(stars,star_num,star_max_wh,star_min_wh,adj_p)
{
	//此函数为对各个星星的亮度进行调整
	var i=star_num;
	while(i--)
	{	
		if (stars[i]['step_record']==stars[i]['step'])
		{
			stars[i]['step_record']=0;
			stars[i]['add_rand']=NP_rand3(adj_p);
		} 
	
		if(stars[i]['wh']==star_min_wh[i])
		{
			stars[i]['add_rand']=1;
		}
		else if(stars[i]['wh']==star_max_wh[i])
		{
			stars[i]['add_rand']=-1;
		}
		stars[i]['step_record']++;
		stars[i]['wh']+=stars[i]['add_rand'];
	}
}

function stars_position(pew,peh,flicw,star_mx,star_my,star_wh)
{
	// 1278,798为背景图的宽,高。此函数返回考虑图片拉伸或压缩后的星星位置
	var temp_position=[];
	temp_position[0]=((pew/1278)*star_mx-star_wh/2)+NP_rand2()/flicw;
	temp_position[1]=((peh/798)*star_my-star_wh/2)+NP_rand2()/flicw;
	return temp_position;
}

function draw_stars_contain(ctx,w,h,stars,star_num,flicw,star_mx,star_my)	//拉伸
{
	var i=star_num,
		temp_wh,
		temp_position=[];
	ctx.clearRect(0,0,w,h);
	while(i--)
	{

		temp_wh=stars[i]['wh'];
		temp_position=stars_position(w,h,flicw,star_mx[i],star_my[i],temp_wh);
		ctx.drawImage(stars[i]['pic'],temp_position[0],temp_position[1],temp_wh,temp_wh);
	}
}

function draw_stars_auto1(ctx,w,h,w_h,bgp_w_h,stars,star_num,flicw,star_mx,star_my)		//适应(w>=h)
{
	var i=star_num,
		temp_wh,
		temp_position=[];
	ctx.clearRect(0,0,w,h);
	var pew=bgp_w_h*h,delta_mx=((w-pew)/2)*1278/pew;
	while(i--)
	{
		temp_wh=stars[i]['wh'];
		temp_position=stars_position(pew,h,flicw,star_mx[i],star_my[i],temp_wh);
		ctx.drawImage(stars[i]['pic'],temp_position[0],temp_position[1],temp_wh,temp_wh);
	}
}

function draw_stars_auto2(ctx,w,h,w_h,bgp_w_h,stars,star_num,flicw,star_mx,star_my)		//适应(w<h)
{
	var i=star_num,
		temp_wh,
		temp_position=[];
	ctx.clearRect(0,0,w,h);
	var peh=w/bgp_w_h,delta_my=((h-peh)/2)*798/peh;
	while(i--)
	{
		temp_wh=stars[i]['wh'];
		temp_position=stars_position(w,peh,flicw,star_mx[i],star_my[i],temp_wh);
		ctx.drawImage(stars[i]['pic'],temp_position[0],temp_position[1],temp_wh,temp_wh);
	}
}

function draw_stars_cover1(ctx,w,h,w_h,bgp_w_h,stars,star_num,flicw,star_mx,star_my)	//填充(w>=h)
{
	var i=star_num,
		temp_wh,
		temp_position=[];
	ctx.clearRect(0,0,w,h);
	var sh=1278/w_h,
		peh=w/bgp_w_h;
	while(i--)
	{
		temp_wh=stars[i]['wh'];
		temp_position=stars_position(w,peh,flicw,star_mx[i],star_my[i],temp_wh);
		ctx.drawImage(stars[i]['pic'],temp_position[0],temp_position[1],temp_wh,temp_wh);
	}
}

function draw_stars_cover2(ctx,w,h,w_h,bgp_w_h,stars,star_num,flicw,star_mx,star_my)	//填充(w<h)
{
	var i=star_num,
		temp_wh,
		temp_position=[];
	ctx.clearRect(0,0,w,h);
	var sw=w_h*798,
		pew=bgp_w_h*h;
	while(i--)
	{
		temp_wh=stars[i]['wh'];
		temp_position=stars_position(pew,h,flicw,star_mx[i],star_my[i],temp_wh);
		ctx.drawImage(stars[i]['pic'],temp_position[0],temp_position[1],temp_wh,temp_wh);
	}
}


function earth_position(pew,peh,earthx,earthy)
{
	var temp_position=[];
	temp_position[0]=(pew/1278)*earthx;
	temp_position[1]=(peh/798)*earthy;
	return temp_position;
}

function earth_contain(flash_div,bgp_div,w,h,earthx,earthy,earthw,earthh)
{
	flash_div['style']['left']=earthx*w/1278+'px';
	flash_div['style']['top']=earthy*h/798+'px';
	flash_div['style']['width']=earthw*w/1278+'px';
	flash_div['style']['height']=earthh*h/798+'px';
	bgp_div['style']['left']=0+'px';
	bgp_div['style']['top']=0+'px';
	bgp_div['style']['width']=w+'px';
	bgp_div['style']['height']=h+'px';
}

function earth_auto(flash_div,bgp_div,w,h,w_h,bgp_w_h,earthx,earthy,earthw,earthh,flag_wh)
{
	
	if(flag_wh)
	{
		var pew=bgp_w_h*h,
			delta_x=((w-pew)/2)*1278/pew,
			temp_position=earth_position(pew,h,earthx+delta_x,earthy);
		flash_div['style']['left']=temp_position[0]+'px';
		flash_div['style']['top']=temp_position[1]+'px';
		flash_div['style']['width']=earthw*pew/1278+'px';
		flash_div['style']['height']=earthh*h/798+'px';
		bgp_div['style']['left']=(w-pew)/2+'px';
		bgp_div['style']['top']=0+'px';
		bgp_div['style']['width']=pew+'px';
		bgp_div['style']['height']=h+'px';
	}
	else
	{
		var peh=w/bgp_w_h,
			delta_y=((h-peh)/2)*798/peh,
			temp_position=earth_position(w,peh,earthx,earthy+delta_y);
		flash_div['style']['left']=temp_position[0]+'px';
		flash_div['style']['top']=temp_position[1]+'px';
		flash_div['style']['width']=earthw*w/1278+'px';
		flash_div['style']['height']=earthh*peh/798+'px';
		bgp_div['style']['left']=0+'px';
		bgp_div['style']['top']=(h-peh)/2+'px';
		bgp_div['style']['width']=w+'px';
		bgp_div['style']['height']=peh+'px';
	}
}

function earth_cover(flash_div,bgp_div,w,h,w_h,bgp_w_h,earthx,earthy,earthw,earthh,flag_wh)
{
	if(flag_wh)
	{
		var sh=1278/w_h,
			peh=w/bgp_w_h,
			delta_y=-(798-sh)/2,
		temp_position=earth_position(w,peh,earthx,earthy+delta_y);
		flash_div['style']['left']=temp_position[0]+'px';
		flash_div['style']['top']=temp_position[1]+'px';
		flash_div['style']['width']=earthw*w/1278+'px';
		flash_div['style']['height']=earthh*peh/798+'px';
		bgp_div['style']['left']=0+'px';
		bgp_div['style']['top']=(h-peh)/2+'px';
		bgp_div['style']['width']=w+'px';
		bgp_div['style']['height']=peh+'px';
	}
	else
	{
		var sw=w_h*798,
			pew=bgp_w_h*h,
			delta_x=-(1278-sw)/2,
		temp_position=earth_position(pew,h,earthx+delta_x,earthy);
		flash_div['style']['left']=temp_position[0]+'px';
		flash_div['style']['top']=temp_position[1]+'px';
		flash_div['style']['width']=earthw*pew/1278+'px';
		flash_div['style']['height']=earthh*h/798+'px';
		bgp_div['style']['left']=(w-pew)/2+'px';
		bgp_div['style']['top']=0+'px';
		bgp_div['style']['width']=pew+'px';
		bgp_div['style']['height']=h+'px';
	}
}

function main()
{	alert('按F11可全屏预览！\n进入全屏后按F11可退出全屏！');
	var can=document.getElementById('mycanvas'),
    	ctx=can.getContext('2d'),
    	w=screen['width'],
    	h=screen['height'],
    	w_h=w/h,
		ftime=15,	//刷新间隔时间
		flicw=13,	//闪动范围_越小闪动越明显
		adj_p=0.3,		//
		stars=[];	//保存starObj()的数组
		temp_stars=[];	//保存随机生成的stars数组的子数组
		var bgp_style='cover';	//壁纸填充样式
 	// const bgp_w=1278,bgp_h=798;//背景图的宽,高
 	const bgp_w_h=1278/798;
 	var flag_wh=(w_h>=bgp_w_h) ? 1:0;	//宽>=高返回1

 {
	//新增星星的信息更新处(----------------------------------------------------------)

	var star_num=21,	//星星总数
	//星星的中央位置
	star_mx=[542,112,334,102,586,912,215,794,884,251,1193,549,941,656,413,296,318,361,244,587,414],
	star_my=[231,56,461,501,585,471,345,356,298,265,357,426,267,630,374,726,458,556,518,129,157],
 	//星星的最大最小亮度,用wh表示
 	star_min_wh=[10,20,7,11,12,11,16,16,11,35,20,15,20,20,11,13,10,11,14,14,12],
 	star_max_wh=[35,46,30,31,40,34,35,30,30,70,60,40,45,50,36,34,28,30,34,37,35];
 }
 	var temp_star_mx=[],
 		temp_star_my=[],
 		temp_star_min_wh=[],
 		temp_star_max_wh=[];
 	temp_star_mx=star_mx.slice(0);
 	temp_star_my=star_my.slice(0);
 	temp_star_min_wh=star_min_wh.slice(0);
 	temp_star_max_wh=star_max_wh.slice(0);
 	const earthx=46,earthy=522,earthw=240,earthh=238;
 	var starObj = function()
	{
		//创建自定义对象
		this['wh'];
		this['step'];
		this['step_record'];
		this['pic'];
		this['add_rand'];
	};
	var flash_div=document.getElementById('my_flash_div');
	var bgp_div=document.getElementById('my_bgp_div');
	var v=document.getElementById('video1');
	var temp_str;
	var earth_speed=0.5,earth_show=true;//星球变量

	$('#mylang').change(function(){
		if(this.value=='cn'){
			$('.sp_myvisible font')[0].innerHTML='显示选项';
			$('#myvisible')[0].options.length=0;
			$('#myvisible')[0].options.add(new Option('隐藏','hide'));
			$('#myvisible')[0].options.add(new Option('显示','show'));

			$('.sp_mystyle font')[0].innerHTML='壁纸样式';
			$('#mystyle')[0].options.length=0;
			$('#mystyle')[0].options.add(new Option('拉伸','contain'));
			$('#mystyle')[0].options.add(new Option('适应','auto'));
			$('#mystyle')[0].options.add(new Option('填充','cover'));

			$('.sp_myearth_show font')[0].innerHTML='显示星球';
			$('#my_earth_show')[0].options.length=0;
			$('#my_earth_show')[0].options.add(new Option('显示',1));
			$('#my_earth_show')[0].options.add(new Option('隐藏',0));

			$('.sp_mynum font')[0].innerHTML='星星个数：'+$('#mynum')[0].value;

			$('.sp_myp font')[0].innerHTML='闪动概率：' + $('#myp')[0].value;

			$('.sp_myftime font')[0].innerHTML='闪动速度：' + $('#myftime')[0].value;

			$('.sp_myflicw font')[0].innerHTML='闪动位移范围：' + $('#myflicw')[0].value;

			$('.sp_myearth_speed font')[0].innerHTML='星球转动速度：' + $('#myearth_speed')[0].value;
		}

		else{
			$('.sp_myvisible font')[0].innerHTML='Show Options';
			$('#myvisible')[0].options.length=0;
			$('#myvisible')[0].options.add(new Option("hide","hide"));
			$('#myvisible')[0].options.add(new Option("show","show"));

			$('.sp_mystyle font')[0].innerHTML='Image Position';
			$('#mystyle')[0].options.length=0;
			$('#mystyle')[0].options.add(new Option("Stretch","contain"));
			$('#mystyle')[0].options.add(new Option("Adaptation","auto"));
			$('#mystyle')[0].options.add(new Option("Fill","cover"));

			$('.sp_myearth_show font')[0].innerHTML='Show Planet';
			$('#my_earth_show')[0].options.length=0;
			$('#my_earth_show')[0].options.add(new Option('show',1));
			$('#my_earth_show')[0].options.add(new Option('hide',0));

			$('.sp_mynum font')[0].innerHTML='Stars\' number: ' + $('#mynum')[0].value;

			$('.sp_myp font')[0].innerHTML='Flicker probability: ' + $('#myp')[0].value;

			$('.sp_myftime font')[0].innerHTML='Twinkle speed: ' + $('#myftime')[0].value;

			$('.sp_myflicw font')[0].innerHTML='Twinkle range: ' + $('#myflicw')[0].value;

			$('.sp_myearth_speed font')[0].innerHTML='Rotational speed: ' + $('#myearth_speed')[0].value;
		}
	});

	$('#myvisible').change(function(){
		if(this.value=='show')
			$('.myinputs').css("display","block");
		else
			$('.myinputs').css("display","none");
	});

	$('#mystyle').change(function(){
		bgp_style=this.value;
			{  
				ctx.clearRect(0,0,w,h);
				w_h=screen['width']/screen['height'];
				flag_wh=(w_h>=bgp_w_h) ? 1:0;
				clearInterval(int);
				switch(bgp_style)
				{
					case 'contain':
						temp_str=bgp_style+'()';
						earth_contain(flash_div,bgp_div,w,h,earthx,earthy,earthw,earthh);
						break;
					case 'cover':
						temp_str=bgp_style+(2-flag_wh)+'()';
						earth_cover(flash_div,bgp_div,w,h,w_h,bgp_w_h,earthx,earthy,earthw,earthh,flag_wh);
						break;
					default:
						temp_str=bgp_style+(2-flag_wh)+'()';
						earth_auto(flash_div,bgp_div,w,h,w_h,bgp_w_h,earthx,earthy,earthw,earthh,flag_wh);
				}
				int=setInterval(function(){eval(temp_str);},ftime);
			}
	});

	$('#mynum').change(function(){
		if($('#mylang')[0].value=='cn')
			$('.sp_mynum font')[0].innerHTML='星星个数：' + this.value;
		else
			$('.sp_mynum font')[0].innerHTML='Stars\' number: ' + this.value;
        star_num=this.value;
        getRandomArray();
	});

	$('#myp').change(function(){
		if($('#mylang')[0].value=='cn')
			$('.sp_myp font')[0].innerHTML='闪动概率：' + this.value;
		else
			$('.sp_myp font')[0].innerHTML='Flicker probability: ' + this.value;
		adj_p=this.value/100;
	});

	$('#myftime').change(function(){
		if($('#mylang')[0].value=='cn')
			$('.sp_myftime font')[0].innerHTML='闪动速度：' + this.value;
		else
			$('.sp_myftime font')[0].innerHTML='Twinkle speed: ' + this.value;
		ftime=400-this.value;
            {
	            clearInterval(int);
				switch(bgp_style)
				{
					case 'contain':
						temp_str=bgp_style+'()';
						break;
					default:
						temp_str=bgp_style+(2-flag_wh)+'()';
				}
				int=setInterval(function(){eval(temp_str);},ftime);
			}
	});

	$('#myflicw').change(function(){
		if($('#mylang')[0].value=='cn')
			$('.sp_myflicw font')[0].innerHTML='闪动位移范围：' + this.value;
		else
			$('.sp_myflicw font')[0].innerHTML='Twinkle range: ' + this.value;
		flicw=103-this.value;
	});

	$('#myearth_speed').change(function(){
		if($('#mylang')[0].value=='cn')
			$('.sp_myearth_speed font')[0].innerHTML='星球转动速度：' + this.value;
		else
			$('.sp_myearth_speed font')[0].innerHTML='Rotational speed: ' + this.value;
		v.playbackRate=this.value/10;
	});

	$('#my_earth_show').change(function(){
		earth_show=this.value==0 ? false : true;
        {
        	if(!earth_show)
			{
				v.style.display="none";
				v.pause();
			}
			else
			{
				if(v['paused'] && (v['style']['display']=='none')){
		        	v.play();
		    	}
		    	v.style.display="inherit";
			}
	    }
	});

	//****************************监听wallpaper***************************
	window.wallpaperPropertyListener = {
    	applyUserProperties: function(properties) {
        if(properties['C2_ftime_opt']){
            ftime=400-properties['C2_ftime_opt']['value'];
            {
	            clearInterval(int);
				switch(bgp_style)
				{
					case 'contain':
						temp_str=bgp_style+'()';
						break;
					default:
						temp_str=bgp_style+(2-flag_wh)+'()';
				}
				int=setInterval(function(){eval(temp_str);},ftime);
			}
        }
        if(properties['C3_flicw_opt']){
        	flicw=103-properties['C3_flicw_opt']['value'];
        }
        if(properties['C5_star_num_opt']){
        	star_num=properties['C5_star_num_opt']['value'];
        	getRandomArray();
        }
        if(properties['C1_bgp_style_opt']){
        	bgp_style=properties['C1_bgp_style_opt']['value'];
        	
        }
        if(properties['C4_adj_p_opt']){
        	adj_p=properties['C4_adj_p_opt']['value']/100;
        }
        if(properties['C7_earth_speed_opt']){
        	earth_speed=properties['C7_earth_speed_opt']['value']/10;
        	v.playbackRate=earth_speed;
        }
        if(properties['C6_earth_show_opt']){
        	earth_show=properties['C6_earth_show_opt']['value'];
        	{
        		if(!earth_show)
				{
					v.style.display="none";
					v.pause();
				}
				else
				{
					if(v['paused'] && (v['style']['display']=='none')){
			        	v.play();
			    	}
			    	v.style.display="inherit";
				}
		    }
        }
    }
};
//**********************************************************************************
	v.playbackRate=earth_speed;	//播放速度
	init(can,w,h,star_num,stars,starObj,star_max_wh,star_min_wh,flag_wh);
	temp_stars=stars.slice(0);
	switch(bgp_style)
	{
		case 'contain':
			temp_str=bgp_style+'()';
			earth_contain(flash_div,bgp_div,w,h,earthx,earthy,earthw,earthh);
			break;
		case 'cover':
			temp_str=bgp_style+(2-flag_wh)+'()';
			earth_cover(flash_div,bgp_div,w,h,w_h,bgp_w_h,earthx,earthy,earthw,earthh,flag_wh);
			break;
		default:
			temp_str=bgp_style+(2-flag_wh)+'()';
			earth_auto(flash_div,bgp_div,w,h,w_h,bgp_w_h,earthx,earthy,earthw,earthh,flag_wh);
	}		
	var int=setInterval(function(){eval(temp_str);},ftime);

	function contain()
	{
		draw_stars_contain(ctx,w,h,temp_stars,star_num,flicw,temp_star_mx,temp_star_my);
		randvary(temp_stars,star_num,temp_star_max_wh,temp_star_min_wh,adj_p);
	}

	function auto1()
	{
		draw_stars_auto1(ctx,w,h,w_h,bgp_w_h,temp_stars,star_num,flicw,temp_star_mx,temp_star_my);
		randvary(temp_stars,star_num,temp_star_max_wh,temp_star_min_wh,adj_p);
	}

	function auto2()
	{
		draw_stars_auto2(ctx,w,h,w_h,bgp_w_h,temp_stars,star_num,flicw,temp_star_mx,temp_star_my);
		randvary(temp_stars,star_num,temp_star_max_wh,temp_star_min_wh,adj_p);
	}

	function cover1()
	{
		draw_stars_cover1(ctx,w,h,w_h,bgp_w_h,temp_stars,star_num,flicw,temp_star_mx,temp_star_my);
		randvary(temp_stars,star_num,temp_star_max_wh,temp_star_min_wh,adj_p);
	}

	function cover2()
	{
		draw_stars_cover2(ctx,w,h,w_h,bgp_w_h,temp_stars,star_num,flicw,temp_star_mx,temp_star_my);
		randvary(temp_stars,star_num,temp_star_max_wh,temp_star_min_wh,adj_p);
	}

	v.onclick=function()
	{
	    if(v.paused){
	        v.play();
	    }else{
	        v.pause();
	    }
	}

	//删除数组元素
	Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
};
	
	//从原始数组获得随机子数组
	function getRandomArray()
	{
		temp_stars=stars.slice(0);
		temp_star_mx=star_mx.slice(0);
		temp_star_my=star_my.slice(0);
		temp_star_min_wh=star_min_wh.slice(0);
		temp_star_max_wh=star_max_wh.slice(0);
		for(var i=0;i<(21-star_num);i++)
		{
			var temp=Math.round(Math.random()*(21-i));
			temp_stars.remove(temp);
			temp_star_mx.remove(temp);
			temp_star_my.remove(temp);
			temp_star_min_wh.remove(temp);
			temp_star_max_wh.remove(temp);
		}
	}
}

