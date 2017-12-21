// fetch.js

$(document).ready(function() {
    var cmcAPI = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
    getData(cmcAPI);
});

function appendText(symbol, value, change) {
    if (change < 0){
        var clr = "red";
    } else {
        var clr = "green";
    }
    $("#content").append(
        "<div class=\"card bg-light mb-3\">\
            <div class=\"card-header\">\
                <h3>"+symbol+"\
                <button type=\"button\" class=\"close\" aria-label=\"Close\">\
                    <span aria-hidden=\"true\">&times;</span>\
                </button></h3>\
            </div>\
            <div class=\"card-body\">\
                <h4 class=\"card-title\">$"+value+"</h4>\
                <p class=\"card-text\" style=\"color:"+clr+"\";>"+change+"%</p>\
            </div>\
        </div>"
    );
}

function getData(url) {
    var selectedCoins = {"bitcoin":0, "ethereum":1, "bitcoin-cash":2, "litecoin":3};
    $.getJSON(url, function(data) {    // get json from cmc api
        $.each(data, function(i, coin ) {
            if (coin.id in selectedCoins){  // if the coin we are checking is one of our coins of interest
                appendText(                 // create a card with the following data
                    coin.symbol,
                    parseFloat(coin.price_usd).toFixed(2),
                    parseFloat(coin.percent_change_24h).toFixed(2)
                );
            }
        });
    });
}
