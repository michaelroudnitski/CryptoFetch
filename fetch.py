# Michael Roudnitski
# 11-4-2017
# Retrieves values of cryptocurrencies on coinmarketcap.com

import requests
import grequests
from bs4 import BeautifulSoup

urls = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/', 'https://api.coinmarketcap.com/v1/ticker/ethereum']

def get_value(url):
    """ Retrieves cryptocurrency data from coinmarketcap.com
    
    Args:
        url: string directing to api.coinmarketcap.com/v1/ticker/'
        >>> get_value('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
    Returns:
        tuple (coin symbol, coin value, 24h percent change)
        >>> (u'BTC', u'6263.89', u'-6.02')
    Raises:
        ConnectionError: if connection could not be established with coinmarketcap
    """
    try:
        rs = requests.get(url, timeout=5) # access page
    except requests.ConnectionError:
        return "Failed to connect to coinmarketcap..."

    if rs != None: # if we successfully retreived data,
        data = rs.json()[0]
        return data["symbol"], data["price_usd"], data["percent_change_24h"]
    else: # return a message if we failed to connect to coinmarketcap
        return "Failed to retrieve data"

if __name__ == '__main__':
    print get_value(urls[0]) # placeholder url
    print get_value(urls[1])
