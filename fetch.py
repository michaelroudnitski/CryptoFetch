# Michael Roudnitski
# 11-4-2017
# Retrieves values of cryptocurrencies on coinmarketcap.com

import requests
import grequests
from bs4 import BeautifulSoup

urls = ['https://coinmarketcap.com/currencies/bitcoin',
        'https://coinmarketcap.com/currencies/ethereum']

def get_value(urls):
    values = []
    rs = grequests.map([grequests.get(url, timeout=5) for url in urls]) # asynchronously access each page specified by urls[]
    for page in rs: # for each page that we just accessed,
        if page != None: # if we successfully retreived data,
            page_content = page.text
            soup = BeautifulSoup(page_content, 'html.parser')
            values.append(soup.find('span', {'id':'quote_price'}).text) # find what we're looking for in that page
        else: # return a message if we failed to connect to coinmarketcap
            return "Failed to connect to coinmarketcap..."
    return values

def print_values():
    values = get_value(urls)
    return "Bitcoin: %s US\nEthereum: %s US" % (values[0], values[1])

print print_values()
