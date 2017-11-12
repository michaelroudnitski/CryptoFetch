// fetch.js

$(function () {
    var cmcAPI = "https://api.coinmarketcap.com/v1/ticker";
    var selectedCoins = {"bitcoin":0, "ethereum":1, "dash":2, "ripple":3};

    function appendText(symbol, value, change) {
        $( "#container" ).append(
            "<div class=\"card bg-light mb-3\">\
                <div class=\"card-header\">\
                    <h3>"+symbol+"\
                    <button type=\"button\" class=\"close\" aria-label=\"Close\">\
                        <span aria-hidden=\"true\">&times;</span>\
                    </button></h3>\
                </div>\
                <div class=\"card-body\">\
                    <h4 class=\"card-title\">$"+value+"</h4>\
                    <p class=\"card-text\">"+change+"%</p>\
                </div>\
            </div>"
        );
    }

    function getData(url) {
        $.getJSON( url, function(data) {    // get json from cmc api
            $.each( data, function( i, coin ) {
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

    getData(cmcAPI);
});
