$("#edit").click(function () {
    var content = $("#content p");
    var edit = $("textarea");
    var submit = $("#btn1");
    if(content.css("display")=="block") {
        content.css("display", "none");
        edit.css("display","block");
        submit.css("display", "block");
    } else {
        content.css("display", "block");
        edit.css("display", "none");
        submit.css("display", "none");
    }
});

$("#btn1").click(function(){
    var id = $("#id").text();
    var formData = {
        entry: $("textarea").val(),
        key: "Aishu"
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/journal/"+ id + "/update",
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            // $("#listul2").append("<li><span><i class='fa fa-trash'></i></span> " + data.done + "</li>")
            $("textarea").css("display", "none");
            $("#btn1").css("display", "none");
            $("#content p").text(data.data);
            $("#content p").css("display", "block");
            
        },
        error: function (e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
});

$("#delete").click(function(){
    $("#deleteForm").submit();
});

