# Michael Roudnitski
# 11-4-2017
# Retrieves values of cryptocurrencies on coinmarketcap.com

import requests
import grequests
from bs4 import BeautifulSoup

urls = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/',
        'https://api.coinmarketcap.com/v1/ticker/ethereum']

def get_value(url):
    rs = requests.get(url, timeout=5) # access page
    if rs != None: # if we successfully retreived data,
        data = rs.json()[0]
        return data["symbol"], data["price_usd"], data["percent_change_24h"]
    else: # return a message if we failed to connect to coinmarketcap
        return "Failed to connect to coinmarketcap..."

print get_value(urls[1])
