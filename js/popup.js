// popup.js
// Michael Roudnitski 12/21/2017

$(document).ready(function() {
    var cmcAPI = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
    $('#spinner').addClass('spinner');
    getData(cmcAPI);
});

function appendText(symbol, value, change, time) {
    if (change < 0){
        var clr = "#dc3545";
    } else {
        var clr = "#28a745";
    }
    $("#popup-content").append(
        "<div class=\"card border-light mb-3\">\
            <div class=\"card-body\">\
                <h5 class=\"card-text\" id=\"change\" style=\"color:"+clr+"\";>("+change+")</h5>\
                <h3>"+symbol+"</h3>\
                <h4 class=\"card-title\">$"+value+"</h4>\
                <p class=\"card-text\"><small class=\"text-muted\">Last Updated: "+time+"</small></p>\
            </div>\
        </div>"
    );
}

function getData(url) {
    if (localStorage.getItem("coins") == null) {
        localStorage.setItem("coins", ["Bitcoin", "Ethereum"]);
    }
    var selectedCoins = localStorage.getItem("coins").split(',');
    $.getJSON(url, function(data) {
        $.each(data, function(i, coin ) {
            if (jQuery.inArray(coin.name, selectedCoins) != -1){
                appendText(
                    coin.symbol,
                    parseFloat(coin.price_usd).toPrecision(5),
                    parseFloat(coin.percent_change_24h).toFixed(2),
                    timeSince(coin.last_updated)
                );
            $('#popup-content').animate({'margin-top': '0px'}, 175)
            $('#spinner').removeClass('spinner');
            }
        });
    });
}

function timeSince(ts) {
    var nowTs = Math.floor(new Date().getTime()/1000);
    var delta = nowTs-ts;

    if (delta > 2*24*3600) return "a few days ago";
    if (delta > 24*3600) return "yesterday";
    if (delta > 3600) return "a few hours ago";
    if (delta > 1800) return "half an hour ago";
    if (delta > 60) {
       return Math.floor(delta/60) + " minute(s) ago";
    }
}
