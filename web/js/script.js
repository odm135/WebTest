let scrollval;     // スクロール量
let windowHeight;  // ウィンドウの高さ
let windowWidth;   // ウィンドウの幅

// ------------------------------
// ヒーローセクション
// ------------------------------

// 情報分野の言葉
const info_words = [
	'<span class="info_words">cout << "Hello World" << endl;</span>',
	'<span class="info_words">cin >> n;</span>',
	'<span class="info_words">printf("Test\\n");</span>',
	'<span class="info_words">scanf("%d", n);</span>',
	'<span class="info_words">print("Welcome!")</span>',
	'<span class="info_words">n = input()</span>',
	'<span class="info_words">System.out.println("OK");</span>',
	'<span class="info_words">console.log("Yes")</span>;'
];

// 物理分野の言葉
const phys_words = [
	'<span class="phys_words">E = mc²</span>',
	'<span class="phys_words">F = ma</span>',
	'<span class="phys_words">v = at</span>',
	'<span class="phys_words">p = mv</span>',
	'<span class="phys_words">W = Fd</span>',
	'<span class="phys_words">V = IR</span>',
	'<span class="phys_words">Q = mcΔT</span>',
	'<span class="phys_words">λ = h/p</span>',
	'<span class="phys_words">F = G(m₁m₂)/r²</span>',
	'<span class="phys_words">v = fλ</span>',
	'<span class="phys_words">q = It</span>',
	'<span class="phys_words">R = ρL/S</span>',
];


const count = Math.floor($(window).width() / 10);
const container = $("#bg-word_container");
const wordDataList = [];

for (var i = 0; i < count; i++) {
	const wordElement = document.createElement("div");  // 新しいdivを作成
	wordElement.className = "bg-word";  // 共通クラス名を設定

	// 表示テキストの決定
	let text = '';
	if (Math.random() < 0.5) text = info_words[Math.floor(Math.random() * info_words.length)];
	else text = phys_words[Math.floor(Math.random() * phys_words.length)];
	wordElement.innerHTML = text;

	// 表示場所の決定
	const x = Math.random() * $(window).width();
	const y = Math.random() * $(window).height();
	wordElement.style.left = x + "px";
	wordElement.style.top = y + "px";

	container.append(wordElement);  // HTMLに追加
	wordDataList.push({el: $(wordElement), left: x, top: y});  // リストに追加
}

// マウスの近くの文字だけ白くする
$(window).mousemove(function (event) {
	const mx = event.clientX;
	const my = event.clientY;

	for (let i = 0; i < count; i++) {
		const word = wordDataList[i];

		const dx = word.left - mx;
		const dy = word.top - my;
		const dist = Math.sqrt(dx * dx + dy * dy);

		if (dist < 80) word.el.css("color", "#ffffffa6");
		else if (dist < 150) word.el.css("color", "#ffffff33");
		else word.el.css("color", "#ffffff00");
	}
});


function setHeroBottomPos() {
	if (windowWidth <= 640) {
		const heroHeight = document.querySelector('.hero').offsetHeight;
		$('.hero-bottom').css('top', heroHeight - 120 + 'px');
	}
}


// ヒーローセクションの文字を非表示にする
// (iPhoneの下見え防止)
let heroTextHidden = false;

function hideHeroChar() {
	const heroHeight = $('.hero').outerHeight(true);

	if (scrollval >= heroHeight) {
		$('.hero-top').addClass('hide');
		$('.hero-bottom').addClass('hide');
	} else {
		$('.hero-top').removeClass('hide');
		$('.hero-bottom').removeClass('hide');
	}
}



// ------------------------------
// ハンバーガーメニュー
// ------------------------------

$(".menu").click(function () {
    $(this).toggleClass('active');
	$("nav").toggleClass('n-active');
    $("header, main, footer").toggleClass('blur');
});

$("nav a").click(function () {
    $(".menu").removeClass('active');
    $("nav").removeClass('n-active');
    $("header, main, footer").removeClass('blur');
});

// ページ内リンクをクリックした際のスムーススクロール
$('.inPage').click(function () {
	const link = $(this).attr('href');

	const subHeight = $('.sub').outerHeight(true);
	const pos = Math.round($(link).offset().top - subHeight);

	$('body, html').animate({scrollTop: pos}, 500);
	return false;
});


// ------------------------------
// サブヘッダーの表示・非表示
// ------------------------------

function showSubHeader() {
	const heroHeight = $('.hero').outerHeight(true);

	if (scrollval >= heroHeight) {
		$('.sub').addClass('show');
		$('.sub').removeClass('fade-out');
	} else {
		if ($('.sub').hasClass('show')) {
			$('.sub').addClass('fade-out');
		}
		$('.sub').removeClass('show');
	}
}

// サブヘッダーのタイトルをクリックした際のスムーススクロール
$('.sub .title').click(function () {
	const link = $(this).attr('href');

	const subHeight = $('.sub').outerHeight(true);
	const pos = Math.round($(link).offset().top - subHeight);

	$('body, html').animate({scrollTop: pos}, 500);
	return false;
});


// ------------------------------
// メイン
// ------------------------------

function zoomInAnime() {
	$('.introduction').each(function () {
		const elemPos = $(this).offset().top + 200;

		if (scrollval >= elemPos - windowHeight) {
			$(this).addClass('zoomIn');
		}
	});

	$('.contents h2').each(function () {
		const elemPos = $(this).offset().top + 150;

		if (scrollval >= elemPos - windowHeight) {
			$(this).addClass('zoomIn');
		}
	});
}


function delayScrollAnime() {
	const time = 0.2;  // 遅延時間を増やす秒数の値
	let value = time;

	$('.contents .links').each(function () {
		const parent = this;                      // 親要素を取得
		const elemPos = $(this).offset().top;     // 要素の位置まで来たら
		const childs = $(this).children();        // 子要素を取得
		
		// 指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
		if (scrollval >= elemPos - windowHeight && !$(parent).hasClass("play")) {
			$(childs).each(function () {
				
				// アニメーションのクラス名が指定されているかどうかをチェック
				if (!$(this).hasClass("flip")) {
					
					$(parent).addClass("play");                   // 親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");  // アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("flip");                     // アニメーションのクラス名を追加
					value = value + time;                         // delay時間を増加させる
					
					// 全ての処理を終わったらplayを外す
					const index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}
	})
}


// ==================================================

// 読み込んだ時に実行する
$(window).on('load', function () {
	scrollval = $(window).scrollTop();
	windowHeight = $(window).height();
	windowWidth = $(window).width();

	showSubHeader();     // スクロール量によってサブヘッダーにclass="show"の付与・消去を行う
	zoomInAnime();       // 紹介文表示
	delayScrollAnime();  // 画面に入ったらカードを表示する
	hideHeroChar();      // ヒーローセクションの文字を非表示にする
	setHeroBottomPos();  // ヒーローセクションの文字(下)の配置
});

// 画面をスクロールをしたら動かす
$(window).scroll(function () {
	scrollval = $(window).scrollTop();

	showSubHeader();     // スクロール量によってサブヘッダーにclass="show"の付与・消去を行う
	zoomInAnime();       // 紹介文表示
	delayScrollAnime();  // 画面に入ったらカードを表示する
	hideHeroChar();      // ヒーローセクションの文字を非表示にする
});