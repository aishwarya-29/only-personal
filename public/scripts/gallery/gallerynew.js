function readURL(files) {
    for (var i = 0; i < files.length; i++) { //for multiple files          
        (function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var text = e.target.result;
                $('#preview').css('display','block');
                $('#preview').append("<img src = '" + text + "' alt = 'image'>");
            }
            reader.readAsDataURL(file);
        })(files[i]);
    }
}

$('input[type="file"]').change(function () {
    readURL(this.files);
});

