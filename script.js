var FULL_NAME_LANGS;

$(document).ready(function(){
    $.ajax({
        url: "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20190410T205210Z.9361e13ac5785266.c7" +
        "61d9002a2bc9c5fbc3d5849d8b0eda0f5e305e&ui=en",
        type: 'POST',
        success: createSelects
    });
});

function createSelects(result){
    for (var i in result.langs){
        var option = document.createElement("option");
        option.value = i;
        option.innerHTML = result.langs[i];
        $("select").append(option);
    }
    FULL_NAME_LANGS = result.langs;
}

function translateIt(){
    var source = $("#source").val();
    var target = $("#target").val();
    var text = $("#textInput").val();
    var lang = source + "-" + target;
    if (source === null || target === null) {
        alert("You did not enter any languages. Please  try again.");
    } else if (text === "") {
        alert("No text has been inputted. Please enter text into the box and try again.");
    } else {
        $.ajax({
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190410T205210Z.9361e13ac5785266.c7' +
            '61d9002a2bc9c5fbc3d5849d8b0eda0f5e305e&text=' + text + '&lang=' + lang,
            type: 'POST',
            success: function (result) {
                $("#translationOutput").html(result.text);
            }
        });
    }
}

function langDetector(){
    var text = $("#needsDetecting").val();
    if (text === "") {
        $.ajax({
            url: 'https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20190410T205210Z.9361e13ac5785266.c761d' +
            '9002a2bc9c5fbc3d5849d8b0eda0f5e305e&text=' + text,
            type: 'POST',
            success: function (result) {
                $("#langOutput").html("This language is " + FULL_NAME_LANGS[result.lang]);
            },
            error: function () {
                alert("Sorry, we are unable to detect that language.");
            }
        });
    }
}

function swapSelects(){
    $("#textInput").val("");
    var lang1 = $("#source").val();
    var lang2 = $("#target").val();
    $("#source").val(lang2);
    $("#target").val(lang1);
}

function paste(){
    $("#textInput").val($("#translationOutput").html());
}