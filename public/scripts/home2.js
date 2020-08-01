var i = 0;
var name = $('#username').text();
var txt = '\nHola, ' + name +'!\n Welcome to Only Personal. \n What would you like to do today?'; /* The text */
var speed = 70; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("letter-content").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    else 
     {
         $('html,body').animate({
                 scrollTop: $("#date").offset().top
             },
             'slow');
     }
}   

$(document).ready(function () {
    for(var i =0; i<1000000;i++);
    typeWriter();
});
$('#q1').click(function(){
    $('#q1').addClass("animate__animated animate__backOutDown");
    $('#a1').css('display', 'block');
    $('#a1').addClass("animate__animated animate__bounceInDown");
    $('#q1').delay(200).fadeOut();
});

$('#q2').click(function () {
    $('#q2').addClass("animate__animated animate__backOutDown");
    $('#a2').css('display', 'block');
    $('#a2').addClass("animate__animated animate__bounceInDown");
    $('#q2').delay(200).fadeOut();
});

$('#b1').click(function(){
    $('#a1').addClass("animate__animated animate__backOutDown");
    $('#q1').css('display', 'block');
    $('#q1').addClass("animate__animated animate__bounceInDown");
    $('#a1').delay(100).fadeOut();
});

$('#b2').click(function () {
    $('#a2').addClass("animate__animated animate__backOutDown");
    $('#q2').css('display', 'block');
    $('#q2').addClass("animate__animated animate__bounceInDown");
    $('#a2').delay(100).fadeOut();
});