// window.addEventListener("scroll", function(){
//     const header = document.querySelector('#header');
//     const sct = window.scroll();
//     header.classList.toggle('sticky', window.scrollY >= 1);
// })
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





// 화면 조정에 따른 반응형
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

