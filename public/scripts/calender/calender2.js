var day = $('.weeks span:not(.last-month)');

day.click(function(event){
    $('#addEvent').css('display','block');
    $('#addEvent input').val('');
    $('.weeks span:not(.last-month)').removeClass('active');
    $(this).addClass('active');
    $('#selected-date').text($(this).text());
    $('#addEvent').addClass("animate__animated animate__zoomIn");
    setTimeout(function(){
        $('#addEvent').removeClass("animate__animated animate__zoomIn")
    },1000);
    $('#curr-date span').text($(this).text());
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var datee = $('#curr-date').text();
    var date = new Date(datee);
    $('#current-day').text(dayNames[date.getDay()]);
});

$('#save').click(function() {
        var xx = $('#select-month').text() + $('#selected-date').text() + " " + $('#select-year').text();
        var formData = {
            date: new Date(xx),
            content: $('#addEvent input').val()
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/calender/addEvent",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                $('#event-details').append("<li>" + data.content + "</li>")
                $('#addEvent input').val('');
                
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
});

$('#cancel').click(function(){
    $('#addEvent input').val('');
});
