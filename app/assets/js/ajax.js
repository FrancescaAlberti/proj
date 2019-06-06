
let ajaxCall = function (url, callback) {


    $.getJSON(url, {
        format: "json"
    })
        .done(function (data) {
            if (callback)
                callback(data);
                
        });
}