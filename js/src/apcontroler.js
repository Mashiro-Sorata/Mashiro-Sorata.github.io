  //侧栏跟随浏览器
  $(function () {
      if ($(".fixed_side").length > 0) {
          var offset = $(".fixed_side").offset();
          $(window).scroll(function () {
              var scrollTop = $(window).scrollTop();
              //如果距离顶部的距离小于浏览器滚动的距离，则添加fixed属性。
              if (offset.top < scrollTop) $(".fixed_side").addClass("fixed");
              //否则清除fixed属性
              else $(".fixed_side").removeClass("fixed");
          });
      }
  });

  var canplaysong=false;
  var myaperror=false;
  $('.mybtn').click(function(){
		if(!$('.mybtn').is(":animated") && !$('.mysidebar.velocity-animating').length){
	  	if(canplaysong  && $('.mybtn').css('right')=='0px'){
	  		$('.mybtn').animate({right: 30},200);
				$('.mysidebar').delay(200).velocity({right: 0,opacity: 1});
	  	}
	  	else if(canplaysong && $('.mybtn').css('right')=='30px' && !$('.mybtn').is(":animated")){
			$('.mysidebar').velocity({right: -30,opacity: 0});
	  		$('.mybtn').delay(200).animate({right: 0},200);
	  	}
	    else if(!canplaysong){
	      if (!$('.waitingwordtop.velocity-animating').length && $('.waitingwordtop').css('opacity')==0){
	        $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
	        $('.waitingwordbuttom').delay(600).velocity({right: 0,opacity: 1},1000);
	        $('.waitingwordtop').delay(3000).velocity("reverse");
	        $('.waitingwordbuttom').delay(3000).velocity("reverse");
	      }
	    }
		}
  });
  //第一次时当资源加载完成时才能点击mybtn
  ap.audio.oncanplay=function(){
    if(!canplaysong){
      $('.waitingwordtop').html('音乐加载完成');
      $('.waitingwordtop').css('text-align','center');
      $('.waitingwordbuttom').html('请继续看我卖萌');
      $('.waitingwordbuttom').css('text-align','center');
      $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
      $('.waitingwordbuttom').delay(300).velocity({right: 0,opacity: 1},1000);
      $('.waitingwordtop').delay(3000).velocity("reverse");
      $('.waitingwordbuttom').delay(3000).velocity("reverse");
    }
    canplaysong=true;
  };

  //第一次加载资源失败时提示
  function myloadcheck(){
    if(!canplaysong && !myaperror){
      $('.waitingwordtop').html('播放器暂无响应');
      $('.waitingwordtop').css('text-align','center');
      $('.waitingwordbuttom').html('那就看我卖萌');
      $('.waitingwordbuttom').css('text-align','center');
      $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
      $('.waitingwordbuttom').delay(300).velocity({right: 0,opacity: 1},1000);
      $('.waitingwordtop').delay(5000).velocity("reverse");
      $('.waitingwordbuttom').delay(5000).velocity("reverse");
			canplaysong=true;
    }
  }
  var myto=setTimeout(myloadcheck,30000);

  ap.on('error',function(){
    myaperror=true;
    $('.waitingwordtop').html('音乐播放出错');
    $('.waitingwordtop').css('text-align','center');
    $('.waitingwordbuttom').html('那就看我卖萌');
    $('.waitingwordbuttom').css('text-align','center');
    $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
    $('.waitingwordbuttom').delay(300).velocity({right: 0,opacity: 1},1000);
    $('.waitingwordtop').delay(5000).velocity("reverse");
    $('.waitingwordbuttom').delay(5000).velocity("reverse");
    clearTimeout(myto);
  });

  $('.apmode-random').click(function(){
  	if (!$('.apmode-random.velocity-animating').length){
  		$('.apmode-random').velocity({right: -30,opacity: 0},200);
  		$('.apmode-single').velocity({right: 0,opacity: 1},200);
  		$('.aplayer-icon.aplayer-icon-mode')[0].click();
  		//console.log('single');
  	}
  });

  $('.apmode-single').click(function(){
  	if (!$('.apmode-single.velocity-animating').length){
  		$('.apmode-single').velocity({right: -30,opacity: 0},200);
  		$('.apmode-order').velocity({right: 0,opacity: 1},200);
      $('.aplayer-icon.aplayer-icon-mode')[0].click();
  		//console.log('order');
  	}
  });

  $('.apmode-order').click(function(){
  	if (!$('.apmode-order.velocity-animating').length){
  		$('.apmode-order').velocity({right: -30,opacity: 0},200);
  		$('.apmode-loop').velocity({right: 0,opacity: 1},200);
      $('.aplayer-icon.aplayer-icon-mode')[0].click();
  		//console.log('loop');
  	}
  });

  $('.apmode-loop').click(function(){
  	if (!$('.apmode-loop.velocity-animating').length){
  		$('.apmode-loop').velocity({right: -30,opacity: 0},200);
  		$('.apmode-random').velocity({right: 0,opacity: 1},200);
      $('.aplayer-icon.aplayer-icon-mode')[0].click();
  		//console.log('random');
  	}
  });

  $('.playsong').click(function(){
  	if (!$('.playsong.velocity-animating').length){
  		$('.playsong').velocity({right: -30,opacity: 0},200);
  		$('.pause').velocity({right: 0,opacity: 1},200);
      ap.play();
  		//console.log('play');
  	}
  });
  $('.pause').click(function(){
  	if (!$('.pause.velocity-animating').length){
  		$('.pause').velocity({right: -30,opacity: 0},200);
  		$('.playsong').velocity({right: 0,opacity: 1},200);
      ap.pause();
			pauseflag=true;
  		//console.log('pause');
  	}
  });

  $('.nextsong').click(function(){
    var tempflag=true;
  	if (!$('.nextsong.velocity-animating').length && !nowp_song){
  		$('.nextsong').velocity({rotateY: "90deg"},200);
  		$('.nextsong').velocity("reverse");
  		if(ap.mode=='random'){
        ap.setMusic(ap.nextRandomNum());
				if(pauseflag){
					cus_lastsong.push(ap.playIndex);
				}
      }
      else if(ap.mode=='single'){
        ap.setMusic(ap.playIndex);
      }
      else if(ap.mode=='order'){
        if(ap.playIndex==$('.aplayer-list ol li').length-1){
          tempflag=false;
          $('.waitingwordtop').html('歌单已到底部');
          $('.waitingwordtop').css('text-align','center');
          $('.waitingwordbuttom').html('接着看我卖萌');
          $('.waitingwordbuttom').css('text-align','center');
          $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
          $('.waitingwordbuttom').delay(300).velocity({right: 0,opacity: 1},1000);
          $('.waitingwordtop').delay(2000).velocity("reverse");
          $('.waitingwordbuttom').delay(2000).velocity("reverse");
        }
        else{
          ap.setMusic(ap.playIndex+1);
					if(pauseflag){
						cus_lastsong.push(ap.playIndex);
					}
        }
      }
      else{
        if(ap.playIndex==$('.aplayer-list ol li').length-1){
          ap.setMusic(0);
					if(pauseflag){
						cus_lastsong.push(ap.playIndex);
					}
        }
        else{
          ap.setMusic(ap.playIndex+1);
					if(pauseflag){
						cus_lastsong.push(ap.playIndex);
					}
        }
      }
      if($('.pause').css('right')=='-30px' && tempflag){
        $('.playsong').velocity({right: -30,opacity: 0},200);
        $('.pause').velocity({right: 0,opacity: 1},200);
      }
  	}
    else if(!$('.nextsong.velocity-animating').length && $('.waitingwordtop').css('opacity') ==0 && nowp_song){
      var lisd_song=cus_lastsong.length;
      nowp_song--;
      ap.setMusic(cus_lastsong[lisd_song-nowp_song-1]);
      $('.playsong').velocity({right: -30,opacity: 0},200);
      $('.pause').velocity({right: 0,opacity: 1},200);
      histy_to_now=true;
    }
  });

  var cus_lastsong=new Array();
  var nowp_song=0;
  var histy_to_now=false;
	var pauseflag=false;
  ap.on('play',function(){
		//console.log(ap.playIndex);
	  if(!nowp_song && ap.mode!='single' && !histy_to_now){
			if(!pauseflag)
	    	cus_lastsong.push(ap.playIndex);
			pauseflag=false;
	  }
	  else{
	    histy_to_now=false;
	  }
    //console.log(cus_lastsong);
  });


  $('.lastsong').click(function(){
  	if (!$('.lastsong.velocity-animating').length){
      var lisd_song=cus_lastsong.length;
  		$('.lastsong').velocity({rotateY: "-90deg"},200);
  		$('.lastsong').velocity("reverse");
      if(nowp_song!=lisd_song-1){
        if(lisd_song){
          nowp_song++;
          ap.setMusic(cus_lastsong[lisd_song-nowp_song-1]);
          $('.playsong').velocity({right: -30,opacity: 0},200);
          $('.pause').velocity({right: 0,opacity: 1},200);
        }
        else{
          $('.waitingwordtop').html('没有历史纪录');
          $('.waitingwordtop').css('text-align','center');
          $('.waitingwordbuttom').html('快去听歌吧！');
          $('.waitingwordbuttom').css('text-align','center');
          $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
          $('.waitingwordbuttom').delay(300).velocity({right: 0,opacity: 1},1000);
          $('.waitingwordtop').delay(2000).velocity("reverse");
          $('.waitingwordbuttom').delay(2000).velocity("reverse");
        }
      }
      else{
        $('.waitingwordtop').html('历史纪录已到头');
        $('.waitingwordtop').css('text-align','center');
        $('.waitingwordbuttom').html('快去听新歌吧！');
        $('.waitingwordbuttom').css('text-align','center');
        $('.waitingwordtop').velocity({right: 0,opacity: 1},1000);
        $('.waitingwordbuttom').delay(300).velocity({right: 0,opacity: 1},1000);
        $('.waitingwordtop').delay(2000).velocity("reverse");
        $('.waitingwordbuttom').delay(2000).velocity("reverse");
      }

  		//console.log('last');
  	}
  });

  $('.aplayer-pic div').click(function(){
      if(ap.button.className=='aplayer-button aplayer-play'){
        $('.playsong').velocity({right: -30,opacity: 0},200);
        $('.pause').velocity({right: 0,opacity: 1},200);
      }
      else{
        $('.pause').velocity({right: -30,opacity: 0},200);
        $('.playsong').velocity({right: 0,opacity: 1},200);
      }
  });

  $('.aplayer-list ol li').click(function(){
    if($(this).index()==ap.playIndex){
      if(ap.button.className=='aplayer-button aplayer-play'){
        $('.playsong').velocity({right: -30,opacity: 0},200);
        $('.pause').velocity({right: 0,opacity: 1},200);
				pauseflag=true;
      }
      else{
        $('.pause').velocity({right: -30,opacity: 0},200);
        $('.playsong').velocity({right: 0,opacity: 1},200);
      }
    }
    else{
      $('.playsong').velocity({right: -30,opacity: 0},200);
      $('.pause').velocity({right: 0,opacity: 1},200);
			pauseflag=false;
    }
  });

  $('.aplayer-icon.aplayer-icon-mode').click(function(){
      //console.log('click');
      if(ap.mode=='single'){
        $('.apmode-random').velocity({right: -30,opacity: 0},100);
        $('.apmode-single').velocity({right: 0,opacity: 1},100);
      }
      else if(ap.mode=='order'){
        $('.apmode-single').velocity({right: -30,opacity: 0},100);
        $('.apmode-order').velocity({right: 0,opacity: 1},100);
      }
      else if(ap.mode=='circulation'){
        $('.apmode-order').velocity({right: -30,opacity: 0},100);
    		$('.apmode-loop').velocity({right: 0,opacity: 1},100);
      }
      else{
        $('.apmode-loop').velocity({right: -30,opacity: 0},100);
        $('.apmode-random').velocity({right: 0,opacity: 1},100);
      }
  });
