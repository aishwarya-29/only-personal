$('#clicklogin').click(function(){
    $('.right').removeClass('move-right2');
    $('.left').removeClass('move-left2');
    $('.left').addClass('move-right');
    $('.right').addClass('move-left');
    setTimeout(() => {
        $('#div1').css('display','none');   
        $('#div2').fadeIn('4000');
    }, 500);
    
});

$('#clicksignup').click(function () {
    $('.left').removeClass('move-right');
    $('.right').removeClass('move-left');
    $('.right').addClass('move-right2');
    $('.left').addClass('move-left2');
    setTimeout(() => {
        $('#div2').css('display', 'none');
        $('#div1').fadeIn('4000');
    }, 500);

});
