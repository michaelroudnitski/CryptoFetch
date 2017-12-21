// addCoin.js

$(document).ready(function() {
    var coinsJSON = {};
    $('#search').click(function(){  // when the user clicks on the text field
        if (jQuery.isEmptyObject(coinsJSON)) {
            $.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=0").done(function(json) {
                coinsJSON = json;
            });
        }
    });

    $('#search').keyup(function() {
        search(coinsJSON);
    });
});

function search(data) {
    $('#results').html(''); // remove all previous results
    var expression = new RegExp($('#search').val(), "i");   // create our regular expression
    $.each(data, function(i, coin ) {   // for each item(coin) in our json data
        if ($('#results').children().length < 4) {  // if we have not yet found 4 matches
            if(coin.name.search(expression) != -1) {    // find a match with our regexp
                $('#results').append('<li class="list-group-item">'+coin.name+'</li>'); // append each matching result as a list item
                // no sorting necessary as cmc already provides JSON sorted by most popular
            }
        }
    });
}
