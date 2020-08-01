$("#add button").click(function(){
    window.location.href = "/gallery/new";
});

$("#old").click(function(){
    $('#dropdown > button').text('Oldest First');
    var from = $('#fromm').text();
    var to = $('#too').text();
    if(from) {
        window.location.replace("/gallery?sortBy=Oldest First"+"&from="+from+"&to="+to);
    } else 
    window.location.replace("/gallery" + "?sortBy=Oldest First");
});

$("#new").click(function () {
    $('#dropdown > button').text('Latest First');
    var from = $('#fromm').text();
    var to = $('#too').text();
    if (from) {
        window.location.replace("/gallery?sortBy=Latest First" + "&from=" + from + "&to=" + to);
    } else
        window.location.replace("/gallery" + "?sortBy=Latest First");
});

$('#ft').click(function () {
    var text = $('#sortt').text();
    var from = $('#from').val();
    var to = $('#to').val();
    if(text) 
        window.location.replace("/gallery?sortBy="+text+"&from="+from+"&to="+to);
    else
        window.location.replace("/gallery?from=" + from + "&to=" + to)
});