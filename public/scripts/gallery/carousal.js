$(document).ready(function () {
    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000 // 2 seconds

    $('.edit').click(function(e){
        if ($(this).parent().find('.title').css('display') == 'none') {
            $(this).parent().find('.title').css('display', 'block');
            $(this).parent().find('.desc').css('display', 'block');
            $(this).parent().find('input').css('display', 'none');
            $(this).parent().find('textarea').css('display', 'none');
            $(this).parent().find('.done').css('display', 'none');

        } else {
            $(this).parent().find('.title').css('display', 'none');
            $(this).parent().find('.desc').css('display', 'none');
            $(this).parent().find('input').css('display', 'block');
            $(this).parent().find('textarea').css('display', 'block');
            $(this).parent().find('.done').css('display', 'block');
        }
    });

    // $('.delete').click(function (e) {
    //     $("#frm").submit();
    // });

    $('.done').click(function(){
        var formData = {
            title: $(this).parent().find('input').val(),
            desc: $(this).parent().find('textarea').val()
        }
        var id = $(this).parent().find('#id').text();
        var th = $(this);
        function print(title,description) {
             th.parent().find('.title').text(title);
             th.parent().find('.desc').text(description);
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/gallery/" + id,
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                 $('.title').css('display', 'block');
                 $('.desc').css('display', 'block');
                 $('input').css('display', 'none');
                 $('textarea').css('display', 'none');
                 $('.done').css('display', 'none');
                 print(data.title, data.description);
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    });
});

