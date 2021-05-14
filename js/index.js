function scroll_check() {
    var sct = $(this).scrollTop();
    if ( sct>=1 && !$('#header').hasClass('sticky') ) {
        $('#header').addClass('sticky')
    } else if ( sct< 1 && $('#header').hasClass('sticky') ) {
        $('#header').removeClass('sticky')
        $('.toggle').removeClass('active')
        $('.toggle').find('i').removeClass('fa-times').addClass('fa-bars')
        $('nav').removeClass('active')
    }
}

// 글자 날리기
const textsmoke = document.querySelector('section .bg h2');
textsmoke.innerHTML = textsmoke.textContent.replace(/\S/g,"<span>$&</span>");
const lettersmoke = document.querySelectorAll('section .bg h2 span');
for ( let i=0; i<lettersmoke.length; i++ ) {
    lettersmoke[i].addEventListener("mouseover", function(){
        lettersmoke[i].classList.add('active');
    })
}

// 파도 좌우
var wave1 = document.getElementById('wave1');
var wave2 = document.getElementById('wave2');
var wave3 = document.getElementById('wave3');
var wave4 = document.getElementById('wave4');

$(window).on('scroll', function(){
    scroll_check()
    var scy = window.scrollY;
    wave1.style.backgroundPositionX = 600 + scy + 8 + 'px';
    wave2.style.backgroundPositionX = 300 + scy - 8 + 'px';
    wave3.style.backgroundPositionX = 450 + scy + 4 + 'px';
    wave4.style.backgroundPositionX = 150 + scy - 4 + 'px';
})
$(window).on('load', function(){
    scroll_check()
})

const elToggle = document.querySelector('.toggle');
const navigation = document.querySelector('nav');
elToggle.onclick = function(){
    this.classList.toggle('active');
    navigation.classList.toggle('active');

    if( $(this).hasClass('active') ) {
        $(this).find('i').removeClass('fa-bars').addClass('fa-times');
    } else {
        $(this).find('i').removeClass('fa-times').addClass('fa-bars');
    }

    if( navigation.classList.contains('active') ) {
        $(this).find('ul').slideUp(500);
    } else { $(this).find('ul').slideDown(500); }
}

$('nav .depth1 > li').on('click', function(){
    $(this).addClass('on')
    .siblings().removeClass('on')
})

var aboutTop = $('#aboutme').offset().top - 100;
var educationTop = $('#education').offset().top - 100;
var skillsTop = $('#skills').offset().top - 100;
var pfTop = $('#pf').offset().top - 100;
var lastTop = $('body').height() - $(window).height()
$('nav .depth1 > li').on('click', function(e){
    e.preventDefault();
    var num = $(this).index()
    switch(num) {
        case 0 : $('html').stop().animate({ scrollTop:1 },500); break;
        case 1 : $('html').stop().animate({ scrollTop:aboutTop },500); break;
        case 2 : $('html').stop().animate({ scrollTop:educationTop },500); break;
        case 3 : $('html').stop().animate({ scrollTop:skillsTop },500); break;
        case 4 : $('html').stop().animate({ scrollTop:pfTop },500); break;
        case 5 : $('html').stop().animate({ scrollTop:lastTop },500); break;
    }
})

// 새로고침시 맨위로 이동
// window.onload = function() {
//     setTimeout (function () {
//     scrollTo(0,0);
//     }, 10);
// }


// 막대 그래프 그리기
function draw(point,clname) {
    var cnt=0;
    var stop = setInterval(function(){
        cnt++;
        if (cnt<=point) {
            $(clname).find('.percentage_num').text(cnt+'%');
            $(clname).find('.bar_content').css({
                width:cnt+'%'
            })            
        } else {
            clearInterval(stop);
            return false
        }
    },10)
}

// 도넛 그래프 그리기
function circleGraph(point, circleid) {
    $(circleid).circleProgress({
        value: point/100,
        startAngle: -Math.PI/2,
        size: 150,
        fill: {
          gradient: ["#0bceaf", "orange"],
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(point * progress) + '<i>%</i>');
    });
}

$(window).on('scroll', function(){
    var sct = $(this).scrollTop() + 200;
    if( sct >= 1 && sct < aboutTop ) {
        $('.depth1 > li').eq(0).addClass('on').siblings().removeClass('on')
    } else if( sct >= aboutTop && sct < educationTop ) {
        $('.depth1 > li').eq(1).addClass('on').siblings().removeClass('on')
    } else if ( sct >= educationTop && sct < skillsTop ) {
        $('.depth1 > li').eq(2).addClass('on').siblings().removeClass('on')
        $('.tskill_content').removeClass('on').find('.bar_content').css({
            width:"0%"
        })
        $('.tskillname').find('.percentage_num').text('0%');
        $('.circle_bar').addClass('.active');
        circleGraph(0, '.circle_bar');
    } else if ( sct >= skillsTop && sct < pfTop ) {
        $('.depth1 > li').eq(3).addClass('on').siblings().removeClass('on')
        if ( !$('.tskill_content').hasClass('on') ) {
            $('.tskill_content').addClass('on');
            draw(92, '.html5');
            draw(86, '.css3');
            draw(82, '.javascript');
            draw(80, '.jquery');
            draw(76, '.react');
            draw(72, '.php');
            circleGraph(88, '#cr1');
            circleGraph(93, '#cr2');
            circleGraph(90, '#cr3');
            circleGraph(85, '#cr4');
        }
        circleGraph()
    } else if ( sct >= pfTop && sct < lastTop ) {
        $('.depth1 > li').eq(4).addClass('on').siblings().removeClass('on')
        $('.tskill_content').removeClass('on').find('.bar_content').css({
            width:"0%"
        })
        $('.tskillname').find('.percentage_num').text('0%');
        circleGraph(0, '.circle_bar');
    } else if ( sct >= lastTop ) {
        $('.depth1 > li').eq(5).addClass('on').siblings().removeClass('on')
    }
})



// 화면 가로크기 조정에 따른 반응형
var deviceSize = 900;
function scrollOX(status) {
    $('html').css({ overflowY:status })
    var htmlWidth = $('html').width();
    return htmlWidth
}
var swh = scrollOX('hidden');
var sws = scrollOX('scroll');
var swd = swh - sws;
if ( swd > 0 ) {
    deviceSize = deviceSize - swd;
}

function calc_width(){
    var ww = $(window).width();
    if ( ww > deviceSize ) {
        $('html').addClass('pc').removeClass('mobile')
        $('.toggle').removeClass('active')
        $('.toggle').find('i').removeClass('fa-times').addClass('fa-bars')
        $('nav').removeClass('active')
    } else if ( ww <= deviceSize && !$('html').hasClass('mobile') ){
        $('html').addClass('mobile').removeClass('pc')
    }
}
calc_width();
$(window).on('resize', function(){ calc_width(); })

