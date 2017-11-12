// fetch.js

$(function () {
    class Coin {
        constructor(symbol, price, change){
            this.symbol = symbol;
            this.price = price;
            this.change = change;
        }
    }
    // $.ajax({
    //     method: "GET",
    //     dataType: "JSON",
    //     url: "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
    //     success: function(data) {
    //         var data = data[0];
    //         var btc = new Coin(data[0].symbol, data[0].price_usd, data[0].percent_change_24h);
    //     }
    // });
    $.getJSON( "https://api.coinmarketcap.com/v1/ticker/bitcoin/", function(data) {
        var data = data[0];
        var btc = new Coin(data.symbol, data.price_usd, data.percent_change_24h);
    });
});
