# Michael Roudnitski
# 11-4-2017
# Retrieves values of cryptocurrencies on coinmarketcap.com

import requests
import grequests
from bs4 import BeautifulSoup

urls = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/',
        'https://api.coinmarketcap.com/v1/ticker/ethereum']

def get_value(url):
    try:
        rs = requests.get(url, timeout=5) # access page
    except requests.ConnectionError:
        return "Failed to connect to coinmarketcap..."

    if rs != None: # if we successfully retreived data,
        data = rs.json()[0]
        return data["symbol"], data["price_usd"], data["percent_change_24h"]
    else: # return a message if we failed to connect to coinmarketcap
        return "Failed to retrieve data"

print get_value(urls[1])
