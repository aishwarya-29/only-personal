
$("#delete").click(function(){
    $("#new").val("");
    $("#new2").val("");
});

$(document).ready(function () {
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        //alert('The file "' + fileName + '" has been selected.');
        $("#filename").text(fileName);
    });
    $()
});

function ltrim(str) {
    if (!str) return str;
    return str.replace(/^\s+/g, '');
}