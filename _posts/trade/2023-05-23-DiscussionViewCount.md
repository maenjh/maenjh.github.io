---
title:  "[트레이딩] 토론방 조회수"
excerpt: "trading"
toc : true
toc_sticky: true
categories:
  - trading
tags: [trade, crawling, selenium, bs4]

last_modified_at: 2023-05-23T08:06:00-05:00
classes: wide
---

### 코드
```python
import datetime
import time
import webbrowser
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import keyboard
import urllib.parse

# Selenium 웹 드라이버를 설정하는 함수
def setup_driver():
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    driver.implicitly_wait(3)
    return driver

# 주어진 날짜에 해당하는 주식 게시물 수를 가져오는 함수
def get_stock_post_counts(driver, stock_codes, date):
    pocket = []
    for s in stock_codes:
        검색어 = '리튬'
        encoded_text = urllib.parse.quote(검색어.encode('euc-kr'))
        url = f"https://finance.naver.com/item/board.naver?code={s}&st=title&sw={encoded_text}"
        driver.get(url)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        date_elements = soup.select('span.tah.p10.gray03')

        loop_count = 0
        for j in range(0, len(date_elements)):
            post_date = date_elements[j].text.strip().split()[0]
            if post_date == date:
                loop_count += 1
        if loop_count > 0:
            pocket.append(f"{s}-조회수:{loop_count}")
    return pocket

# 스페이스 키를 누를 때 URL을 열어주는 함수
def open_url_on_space_key(urls):
    print("스페이스 키를 눌러 URL을 열거나 'q'를 눌러 종료하세요.")
    index = 0
    while index < len(urls):
        time.sleep(0.05)
        if keyboard.is_pressed(" "):
            webbrowser.open(urls[index], new=0)
            index += 1
            while keyboard.is_pressed(" "):
                time.sleep(0.05)
        elif keyboard.is_pressed("q"):
            break

def main():
    # 주식 코드 목록
    stock_codes = ['174880', '139050', '068330', ...]  # 주식 코드의 긴 목록

    # 오늘 날짜를 가져옴
    date = datetime.datetime.now().strftime("%Y.%m.%d")

    # Selenium 웹 드라이버 설정
    driver = setup_driver()

    # 오늘 날짜에 해당하는 주식 게시물 수를 가져옴
    stock_post_counts = get_stock_post_counts(driver, stock_codes, date)

    # 주식 코드와 해당 게시물 수를 출력함
    for post_count in stock_post_counts:
        print(post_count)

    # 스페이스 키를 누를 때 URL을 열어줌
    open_url_on_space_key([f"https://finance.naver.com/item/board.naver?code={s}" for s in stock_post_counts])

# 메인 함수 실행
if __name__ == "__main__":
    main
```
### 설명
- **`검색어`** 변수를 설정하고 검색어를 인코딩하여 URL을 생성합니다.
- **`driver.get(url)`**로 해당 URL로 이동합니다.
- BeautifulSoup을 사용하여 HTML을 파싱합니다.
- 날짜 요소를 선택하고 게시물의 날짜를 가져옵니다.
- 게시물의 날짜가 지정한 날짜와 일치하는 경우 조회수를 증가시킵니다.
- 조회수와 주식 코드를 **`pocket`**에 저장합니다.
- **`open_url_on_space_key(urls)`** 함수에 대한 주석을 추가하여 사용자가 스페이스바를 눌러 URL을 열거나 'q'를 눌러 종료할 수 있도록 설명합니다.
- **`main()`** 함수에 대한 주석을 추가하여 주식 코드와 오늘 날짜를 설정하고, WebDriver를 설정하고 종료하는 과정을 설명합니다.
- **`get_loop_count(item)`**와 **`get_stock_code(item)`** 함수에 대한 주석을 추가하여 조회수와 주식 코드를 추출하는 방법을 설명합니다.
- **`pocket`**을 조회수를 기준으로 내림차순으로 정렬합니다.
- URLs를 생성하고 **`open_url_on_space_key(urls)`**를 호출하여 스페이스바를 눌러 URL을 엽니다.