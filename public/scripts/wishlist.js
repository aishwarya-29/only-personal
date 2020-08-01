$("#listul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

//Click on X to delete Todo
$("#listul").on("click", "span", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
        var formData = {
            name: $("#identifier").text(),
            todo: $(this).text()
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/deleteTodo",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                 $("#listul2").append("<li><span><i class='fa fa-trash'></i></span> " + data.done  + "</li>")
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    });
    event.stopPropagation();
});

$("#listul2").on("click", "span", function (event) {
     $(this).parent().fadeOut(500, function () {
        $(this).remove();
        var formData = {
            name: $("#identifier").text(),
            todo: $(this).text()
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/deleteDone",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
     });
     event.stopPropagation();
    });


$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        //grabbing new todo text from input
        var todoText = $(this).val();
        $(this).val("");
        var formData = {
            name: $("#identifier").text(),
            todo: todoText
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/addTodo",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                //create a new li and add to ul
                $("#listul").append("<li><span><i class='fas fa-check'></i></span> " + todoText + "</li>")
            },
            error: function (e) {
                alert("Error!")
                alert(e);
            }
        });
        
    }
});

$("#toggle-form").click(function () {
    $("input[type='text']").fadeToggle();
});

$(document).ready(function(){
    if ($('#container li span').length) {
    } else {
        $('#container li').css('padding-left','5%');
    }
});