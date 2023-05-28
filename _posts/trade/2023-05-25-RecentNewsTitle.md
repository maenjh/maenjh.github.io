---
title:  "[트레이딩] 최근뉴스제목"
excerpt: "trading"
toc : true
toc_sticky: true
categories:
  - trading
tags: [trade, crawling, selenium, bs4]

last_modified_at: 2023-05-23T08:06:00-05:00
classes: wide
---

## 코드

```python
import os
import re
import time
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from docx import Document
from pykrx import stock

# 콘솔 화면을 지우는 명령어 실행
os.system('cls||clear')

# 네이버 뉴스에서 주어진 키워드에 대한 뉴스 기사를 수집하는 함수
def get_news(url: str, keyword: str):
    list_keyword_news = list()
    list_news_area = list()
    try:
        # 주어진 URL에서 HTML 가져오기
        html = requests.get(url).text
        soup = BeautifulSoup(html, 'html.parser')

        # 뉴스 기사가 포함된 영역 찾기
        list_news = soup.find('ul', {'class': 'list_news'})
        if list_news is not None and len(list_news) > 0:
            # 뉴스 기사 영역에서 제목과 링크 추출
            list_news_area = soup.find_all('div', {'class': 'news_area'})
            for news_area in list_news_area:
                news_tit = news_area.find('a', {'class': 'news_tit'})
                title = news_tit.attrs['title']
                if keyword in title:
                    href = news_tit.attrs['href']
                    list_keyword_news.append([title, href])
    except:
        return None, 0

    # 추출된 뉴스 기사와 기사 수 반환
    return list_keyword_news, len(list_news_area)

if __name__ == '__main__':
    try:
        print()

        # 코스피 종목 코드 가져오기
        kospi_tickers = stock.get_market_ticker_list(market="KOSPI")

        # 코스닥 종목 코드 가져오기
        kosdaq_tickers = stock.get_market_ticker_list(market="KOSDAQ")

        # 코스피와 코스닥 종목 코드 합치기
        ticker_list = kospi_tickers + kosdaq_tickers

        # 종목 코드를 종목명으로 변환
        a = [stock.get_market_ticker_name(ticker) for ticker in ticker_list]

        # 워드 문서 객체 생성
        document = Document()

        # 각 종목명을 검색 키워드로 사용하여 뉴스 검색 및 결과 저장
        for i in a:
            search_keyword = i
            quote_keyword = requests.utils.quote(search_keyword)
            search_url = f"https://search.naver.com/search.naver?where=news&sm=tab_pge&query={quote_keyword}&sort=1&photo=0&field=0&pd=4&ds=&de=&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:dd,p:all,a:all&start="

            stopped = True
            start_num = 1
            news_num_per_page = 1
            list_found_news = list()
            results = list()
            print('', end='')

            # 페이지 단위로 뉴스 검색 수행
            while True:
                print('', end='')
                target_url = search_url + str(start_num)
                r, items_num = get_news(target_url, search_keyword)
                if r is None or items_num == 0:
                    print()
                    break

                list_found_news.extend(r)
                if len(list_found_news) >= news_num_per_page:
                    print()
                    for count in range(news_num_per_page):
                        title, href = list_found_news.pop(0)
                        results.append(title)
                        print(title)

                    stopped = True
                    break

                print(' ', end='')
                start_num += items_num

            # 검색 중단 및 결과 저장
            if stopped is not True and r is not None and len(r) > 0:
                title, href = list_found_news.pop(0)
                results.append(title + ' ' + href)
                print(title + href)

            combined_results = '\n'.join(results)
            cleaned_results = re.sub(r'\n{2,}', '\n', combined_results)

            # 결과를 워드 문서에 추가
            for result in results:
                if result.strip():
                    document.add_paragraph(result.strip())

            # 다음 검색을 위한 딜레이
            time.sleep(1)
            print(i)

        # 현재 날짜를 파일 이름으로 하는 워드 문서 저장
        filename = datetime.now().strftime("%Y-%m-%d")
        document.save(filename + '.docx')

    except Exception as e:
        print("Error: ", e)
```
### 코드 설명
이 코드는 주어진 종목명을 검색 키워드로 사용하여 네이버 뉴스에서 관련 뉴스 기사를 검색하고, 검색된 기사를 워드 문서로 저장하는 역할을 수행합니다. 코드의 주요 부분은 다음과 같습니다:

1. 뉴스 기사 검색 함수 (**`get_news`**):
    - 주어진 URL과 키워드를 사용하여 네이버 뉴스 검색을 수행합니다.
    - 검색 결과에서 키워드가 포함된 기사의 제목과 링크를 추출합니다.
    - 추출된 결과를 리스트로 반환합니다.
2. 주요 코드 실행:
    - 코스피와 코스닥 종목 코드를 가져와서 종목명으로 변환합니다.
    - 워드 문서 객체를 생성합니다.
    - 각 종목명을 검색 키워드로 사용하여 뉴스 검색을 수행하고 결과를 워드 문서에 추가합니다.
    - 결과를 현재 날짜를 파일 이름으로 하는 워드 문서로 저장합니다.
3. 예외 처리:
    - 코드 실행 중에 발생할 수 있는 예외를 처리하고 에러 메시지를 출력합니다.

종목별로 관련 뉴스를 검색하여 워드 문서로 저장하는 기능을 가지고 있습니다.