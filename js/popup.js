// popup.js
// Michael Roudnitski 12/21/2017

$(document).ready(function() {
    if (localStorage.getItem("currency") == null) {
        localStorage.setItem("currency", "USD");
    }
    var currentCurrency = localStorage.getItem("currency");
    var cmcAPI = "https://api.coinmarketcap.com/v1/ticker/?limit=0&convert="+currentCurrency;
    $('#spinner').addClass('spinner');
    getData(cmcAPI);
});

function appendCard(symbol, value, change, time) {
    if (change < 0) {
        var clr = "badge-danger";
    } else {
        var clr = "badge-success";
    }
    var currencySymbol = {"USD": '$',
                        "CAD": "CA$",
                        "AUD": "AU$",
                        "EUR": "€",
                        "GBP": "£",
                        "CNY": "¥",};
    $("#popup-content").append(
        "<div class=\"card border-light mb-3\">\
            <div class=\"card-body\">\
                <span id=\"change\" class=\"badge "+clr+"\">"+change+"</span>\
                <h4>"+symbol+"</h4>\
                <h4 class=\"card-title\">"+currencySymbol[localStorage.getItem("currency")]+value+"</h4>\
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
    var currentCurrency = localStorage.getItem("currency");

    $.getJSON(url, function(data) {
        $.each(data, function(i, coin ) {
            if (jQuery.inArray(coin.name, selectedCoins) != -1){
                appendCard(
                    coin.symbol,
                    parseFloat(coin[`price_${currentCurrency.toLowerCase()}`]).toPrecision(5),
                    parseFloat(coin.percent_change_24h).toFixed(2),
                    timeSince(coin.last_updated)
                );
            }
        });
        $('#popup-content').animate({'margin-top': '0px'}, 175)
        $('#spinner').removeClass('spinner');
    });
}

function timeSince(lastUpdated) {
    var now = Math.floor(new Date().getTime()/1000);
    var delta = now-lastUpdated;

    if (delta > 2*24*3600) return "a few days ago";
    if (delta > 24*3600) return "yesterday";
    if (delta > 3600) return "a few hours ago";
    if (delta > 1800) return "half an hour ago";
    if (delta > 60) {
       return Math.floor(delta/60) + " minute(s) ago";
    }
}
