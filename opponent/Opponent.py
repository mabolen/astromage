
from time import sleep
import selenium
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.relative_locator import locate_with
from bs4 import BeautifulSoup as bs
import pandas as pd
import re
import random

from selenium import webdriver
#Firefox
options = webdriver.FirefoxOptions()
options.headless = False
options.add_argument("--disable-extensions")
options.add_argument('--disable-application-cache')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--ignore-certificate-errors')

class Opponent:
    def __init__(self):

   
        self.driver = webdriver.Firefox(options=options)
        url = 'http://localhost:3000/'
        self.driver.get(url)


        WebDriverWait(self.driver, 60).until(ec.presence_of_element_located((By.CLASS_NAME, "Home_button__Zs7A2")))
        btn = self.driver.find_element(By.CLASS_NAME,'Home_button__Zs7A2')
        self.driver.execute_script("arguments[0].click();", btn)




    def get_hand(self):
        player_hand = self.driver.find_element(By.CLASS_NAME,'Home_playerHandDiv__s90S4').find_elements(By.CLASS_NAME,'card_cardBody__viR6D')

        hand = []
        for i in player_hand:
            card = {}
            card['loc'] = i
            card['Title'] = i.find_element(By.CLASS_NAME, 'card_titleSpan__w8DMD').text
            card['Cost'] = i.find_element(By.CLASS_NAME, 'card_cardCost__GeaUG').text
            card['Type'] = i.get_attribute('class').split(' ')[0].split('__')[0]
            card['Disabled'] = i.find_element(By.CLASS_NAME,'card_disabled__8JYLf').is_displayed()

            hand.append(card)

        return(hand)

    def random(self,hand):
        import random
        return random.choice([i for i in hand if i['Disabled'] == False])

    def click(self,card):
        loc = card['loc']
        self.driver.execute_script("arguments[0].click();",loc)

    def main(self):
        print('Here')

        
        while True == True:
            sleep(2)
            player_turn = re.sub("\D", "", self.driver.find_element(By.CLASS_NAME,'Home_playedCardsDiv__f3_y7').text)
            print(f'Player: {player_turn}')
            hand = self.get_hand()
            choice = self.random(hand)
            print(choice['Title'])
            self.click(choice)



play = Opponent()
play.main()


