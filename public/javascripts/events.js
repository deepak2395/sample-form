function dblclick() {
    $("Sel_Fund").contents().unwrap()
    var selection = window.getSelection().getRangeAt(0);
    var selectedText = selection.extractContents();
    var span = document.createElement("Sel_Fund");
    span.appendChild(selectedText);
    selection.insertNode(span);

    var settings = {
        "async": false,
        "url": "/library/getval",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
        },
        "data": {
            "word": "anarchic"
        }
    }
    $.ajax(settings).done(function (response) {
        result = response;
    });
    $("Sel_Fund").attr({ 'title': result.data.meaning, "data-toggle": "tooltip", "data-placement": "top" })
    $('[data-toggle="tooltip"]').tooltip();
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});