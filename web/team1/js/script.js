let scrollval;     // スクロール量
let windowHeight;  // ウィンドウの高さ
let windowWidth;   // ウィンドウの幅

let headerH = 30;  // 初期ヘッダーの高さ

function FixedAnime() {
	if (windowWidth <= 640) {
		$('.openbtn').addClass('fadeDown'); // ボタンは常時表示
		$('#header').addClass('done');      // #header を常にドロワー化
		return;                             // スクロール判定は行わない
	  }

	if (scrollval >= headerH) {  //ヘッダーの高さ以上までスクロールしたら
			$('.openbtn').addClass('fadeDown');  // .openbtnにfadeDownというクラス名を付与して
			$('#header').addClass('done');       // #headerにdoneというクラス名を付与
		} else {
			$('.openbtn').removeClass('fadeDown');  // fadeDownというクラス名を除き
			$('#header').removeClass('done');       // doneというクラス名を除く
		}
}

// 画像を論理回路の形にするための関数
function ResizeImgBR() {
	let imgL = $('.pages_list.left img');
	let h = imgL.height();
	imgL.css("border-top-right-radius", h / 2 + "px");
	imgL.css("border-bottom-right-radius", h / 2 + "px");
	$('.pages_list.left .pages_img').css("border-top-right-radius", h / 2 + "px");
	$('.pages_list.left .pages_img').css("border-bottom-right-radius", h / 2 + "px");

	let imgR = $('.pages_list.right img');
	imgR.css("border-top-left-radius", h / 2 + "px");
	imgR.css("border-bottom-left-radius", h / 2 + "px");
	$('.pages_list.right .pages_img').css("border-top-left-radius", h / 2 + "px");
	$('.pages_list.right .pages_img').css("border-bottom-left-radius", h / 2 + "px");
}

// 読み込んだ時に実行する
$(window).on('load', function () {
	scrollval = $(window).scrollTop();
	windowHeight = $(window).height();
	windowWidth = $(window).width();

	if (windowWidth <= 640) {
		headerH = 0;
	} else {
		headerH = 60;
	}
	FixedAnime();
	ResizeImgBR();
});

// 画面をスクロールをしたら動かす
$(window).scroll(function () {
	scrollval = $(window).scrollTop();

	FixedAnime();
});

// 画面をリサイズしたら動かす
$(window).on('resize', function() {
	windowHeight = $(window).height();
	windowWidth = $(window).width();

	if (windowWidth <= 640) {
		headerH = 0;
	} else {
		headerH = 60;
	}
	FixedAnime();
	ResizeImgBR();
});

$(".openbtn").click(function () {             // ボタンがクリックされたら
	$(this).toggleClass('active');            // ボタン自身に activeクラスを付与し
    $("#header").toggleClass('panelactive');  // ヘッダーにpanelactiveクラスを付与
});
$("#g-navi li a").click(function () {         // ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');      // ボタンの activeクラスを除去し
    $("#header").removeClass('panelactive');  // ヘッダーのpanelactiveクラスも除去
});


// 背景のパーティクル
particlesJS(
	"particles-js",{
		"particles":{
			"number":{
				"value":60,
				"density":{
					"enable":true,
					"value_area":800
				}
			},
			"color":{
				"value":"#9ac10c"
			},
			"shape":{
				"type":"circle",
				"stroke":{
					"width":0,
					"color":"#000000"
				},
				"polygon":{
					"nb_sides":5
				},
				"image":{
					"src":"img/github.svg",
					"width":100,
					"height":100
				}
			},
			"opacity":{
				"value":0.8,
				"random":true,
				"anim":{
					"enable":false,
					"speed":1,
					"opacity_min":0.1,
					"sync":false
				}
			},
			"size":{
				"value":4,
				"random":true,
				"anim":{
					"enable":false,
					"speed":40,
					"size_min":0.1,
					"sync":false
				}
			},
			"line_linked":{
				"enable":true,
				"distance":200,
				"color":"#eace49",
				"opacity":0.4,
				"width":1
			},
			"move":{
				"enable":true,
				"speed":3,
				"direction":"none",
				"random":false,
				"straight":false,
				"out_mode":"out",
				"bounce":false,
				"attract":{
					"enable":false,
					"rotateX":600,
					"rotateY":1200
				}
			}
		},
		"interactivity":{
			"detect_on":"window",
			"events":{
				"onhover":{
					"enable":true,
					"mode":"repulse"
				},
				"onclick":{
					"enable":false,
					"mode":"repulse"
				},
				"resize":true
			},
			"modes":{
				"grab":{
					"distance":400,
					"line_linked":{
						"opacity":1
					}
				},
				"bubble":{
					"distance":400,
					"size":40,
					"duration":2,
					"opacity":8,
					"speed":3
				},
				"repulse":{
					"distance":200,
					"duration":0.4
				},
				"push":{
					"particles_nb":4
				},
				"remove":{
					"particles_nb":2
				}
			}
		},
		"retina_detect":true
	}
);
