$('#change-admin-pwd').click(function () {
    $('#adminpwd').toggle(500);
});

$('#change-journal-pwd').click(function () {
    $('#journalpwd').toggle(500);
});

$('#change-username').click(function () {
    $('#username').toggle(500);
});

$("input:file").change(function () {
    var fileName = $(this).val();
    $('#frm').submit();
});

$('#image').hover(function () {
    $('#edit').toggle();
});
