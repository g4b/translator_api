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
}

function translate(){
    var text = $("#textInput").val();
    var lang = $("#source").val() + "-" + $("#target").val();
    $.ajax({
        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190410T205210Z.9361e13ac5785266.c7' +
        '61d9002a2bc9c5fbc3d5849d8b0eda0f5e305e&text=' + text + '&lang=' + lang,
        type: 'POST',
        success: function(result){
            $("#output").html(result);
        }
    });
}