var ap1 = new APlayer({
	    element: document.getElementById('player1'),                       // Optional, player element
	    narrow: false,                                                     // Optional, narrow style
	    autoplay: false,                                                    // Optional, autoplay song(s), not supported by mobile browsers
	    showlrc: 0,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
	    mutex: true,                                                       // Optional, pause other players when this player playing
	    theme: '#8B008B',                                                  // Optional, theme color, default: #b7daff
	    mode: 'random',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
	    preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
	    listmaxheight: '250px',                                             // Optional, max height of play list
			music: [
	    {
	    	title: '廻廻奇譚',                                          // Required, music title
	        author: 'Eve',                          // Required, music author
	        url: 'https://music.163.com/song/media/outer/url?id=1484409732.mp3',  // Required, music url
	        pic: 'http://p1.music.126.net/6fS7bvNGP2Nu2zgyusABZQ==/109951165484066989.jpg?param=130y130'
	    },
	    {
	    	title: '夜に駆ける',
	    	author: 'YOASOBI',
	    	url: 'https://music.163.com/song/media/outer/url?id=1409311773.mp3',
	    	pic: 'http://p1.music.126.net/3xWlqwYmfwRFebeiONUpGg==/109951164546210608.jpg?param=130y130'
	    },
	    {
	    	title: 'SAKURA',
	    	author: '生物股长',
	    	url: 'https://music.163.com/song/media/outer/url?id=407000247.mp3',
	    	pic: 'http://p2.music.126.net/ios-ijIvUbUyLQcSnMRZnA==/109951163938844912.jpg?param=130y130'
	    },
	    {
	    	title: 'ジレンマ',
	    	author: 'YuNi',
	    	url: 'https://music.163.com/song/media/outer/url?id=1360967223.mp3',
	    	pic: 'http://p1.music.126.net/RQ6yBeHPozT73vLLWtcoAw==/109951164021315639.jpg?param=130y130'
	    },
	    {
	    	title: 'flos',
	    	author: 'YuNi',
	    	url: 'https://music.163.com/song/media/outer/url?id=1360967181.mp3',
	    	pic: 'http://p1.music.126.net/GfUCXRWUnGqdM5y0R-JtuQ==/109951164021307387.jpg?param=130y130'
	    },
			{
	    	title: 'はじめましての気持ちを',                                          // Required, music title
	        author: 'DAOKO/神山羊',                          // Required, music author
	        url: 'https://music.163.com/song/media/outer/url?id=1389088985.mp3',  // Required, music url
	        pic: 'http://p2.music.126.net/l0DJ_4TYuxceXzN0ufB42Q==/109951164347030397.jpg?param=130y130'
	    },
			{
				title: 'ぶれないアイで',
				author: 'Mitchie M/初音ミク',
				url: 'https://music.163.com/song/media/outer/url?id=40915595.mp3',
				pic: 'http://p2.music.126.net/moHg5uQnCkmab_VrZlLRSQ==/2538772352604273.jpg?param=130y130'
			}]
});

var ap2 = new APlayer({
	    element: document.getElementById('player2'),                       // Optional, player element
	    narrow: true,                                                     // Optional, narrow style
	    autoplay: false,                                                    // Optional, autoplay song(s), not supported by mobile browsers
	    showlrc: 0,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
	    mutex: true,                                                       // Optional, pause other players when this player playing
	    theme: '#8B008B',                                                  // Optional, theme color, default: #b7daff
	    mode: 'order',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
	    preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
	    listmaxheight: '250px',                                             // Optional, max height of play list
	    music: [
		    {
		    	title: '大江戸ジュリアナイト',
		    	author: 'Mitchie M/初音ミク',
		    	url: 'https://music.163.com/song/media/outer/url?id=502455385.mp3',
		    	pic: 'http://p1.music.126.net/Wgi0eBdLS0m5910SuAeqkg==/109951163014923061.jpg?param=130y130'
		    },
		    {
		    	title: 'ヒバナ',
		    	author: 'DECO*27/初音ミク',
		    	url: 'https://music.163.com/song/media/outer/url?id=502455382.mp3',
		    	pic: 'http://p2.music.126.net/Wgi0eBdLS0m5910SuAeqkg==/109951163014923061.jpg?param=130y130'
		    },
		    {
		    	title: '劣等上等',
		    	author: '鏡音リン/レン/ギガP',
		    	url: 'https://music.163.com/song/media/outer/url?id=1294899572.mp3',
		    	pic: 'http://p1.music.126.net/wOkN2jRerB5de-DPpSu3jg==/109951163423380232.jpg?param=130y130'
		    },
				{
					title: '初梦',
					author: '初音ミク/MusikM',
					url: 'https://music.163.com/song/media/outer/url?id=515452689.mp3',
					pic: 'http://p1.music.126.net/JwNOB4fOcpaJGPMChNVvXg==/109951163051193713.jpg?param=130y130'
				},
				{
					title: '病名は愛だった',
					author: 'Neru/鏡音リン/レン',
					url: 'https://music.163.com/song/media/outer/url?id=505474379.mp3',
					pic: 'http://p2.music.126.net/0r3rPTmSp_qGMqR31PvXyg==/109951163023679798.jpg?param=130y130'
				},
				{
					title: '39みゅーじっく!',
					author: '初音ミク/みきとP',
					url: 'https://music.163.com/song/media/outer/url?id=1333336766.mp3',
					pic: 'http://p1.music.126.net/MqQyhohd7n0shK-3PaTavQ==/109951163724940250.jpg?param=130y130'
				},
				{
					title: 'Wah Wah World',
					author: 'ギガP/Mitchie M',
					url: 'https://music.163.com/song/media/outer/url?id=1479972357.mp3',
					pic: 'http://p2.music.126.net/nVsgraaZQIXl88NSgC6Zcg==/109951165323140567.jpg?param=130y130'
				}]
});

var myapc1=new APlayer_Controler({
		APC_dom:$('#apc1'),
		aplayer:ap1,
		attach_right:true,
		position:{top:'300px',bottom:''},
		fixed:false,
		btn_width:170,
		btn_height:200,
		img_src:['https://t1.picb.cc/uploads/2019/02/18/VhzVBs.gif',
				'https://t1.picb.cc/uploads/2019/02/18/VhzJAe.gif',
				'https://t1.picb.cc/uploads/2019/02/18/VhsfTw.gif'],
		img_style:{repeat:'no-repeat',position:'center',size:'contain'},
		ctrls_color:'rgba(173,255,47,0.7)',
		ctrls_hover_color:'rgba(255,140,0,0.8)',
		tips_on:true,
		tips_width:140,
		tips_height:25,
		tips_color:'rgba(255,255,255,0.8)',
		tips_content:{on_loading:{top:'音乐加载中',bottom:'自定义提示1'},
					  on_welcome:{top:'音乐加载完成',bottom:'自定义提示2'},
					  on_timeout:{top:'播放器暂无响应',bottom:'自定义提示3'}},
		timeout:30,
		songrecord_log:true
	});

var myapc2=new APlayer_Controler({
		APC_dom:$('#apc2'),
		aplayer:ap2,
		attach_right:false,
		position:{top:'300px',bottom:''},
		fixed:true,
		btn_width:170,
		btn_height:200,
		img_src:['https://t1.picb.cc/uploads/2019/02/18/VhzVBs.gif',
				'https://t1.picb.cc/uploads/2019/02/18/VhzJAe.gif',
				'https://t1.picb.cc/uploads/2019/02/18/VhsfTw.gif'],
		img_style:{repeat:'no-repeat',position:'center',size:'contain'},
		ctrls_color:'rgba(255,140,0,0.7)',
		ctrls_hover_color:'rgba(173,255,47,0.8)',
		tips_on:true,
		tips_width:140,
		tips_height:25,
		tips_color:'rgba(255,255,255,0.8)',
		tips_content:{},
		timeout:30
	});
