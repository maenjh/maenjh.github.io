---
title:  "[트레이딩] 주식가격예측모델"
excerpt: "trading"
toc : true
toc_sticky: true
categories:
  - trading
tags: [trade, cv2, opencv, pandas, pykrx, keras]

last_modified_at: 2023-05-28T08:06:00-05:00
classes: wide
---

### 코드
```python
import os
import cv2
import numpy as np
import pandas as pd
import mplfinance as mpf
from pykrx import stock
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Activation, Dropout, Flatten, Dense

# 데이터 분할 함수 정의
def split_data(data, train_ratio=0.8):
    train_idx = int(len(data) * train_ratio)
    train_data = data[:train_idx]
    test_data = data[train_idx:]
    return train_data, test_data

# 주식 정보 가져오기
f = stock.get_stock_major_changes("005930")
row_titles = f.index
r = row_titles[0]
date = r.strftime('%Y%m%d')

# 시가총액 데이터 가져오기
df_cap = stock.get_market_cap("20200101", "20230519", "005930", "m")
min_cap = df_cap['시가총액'].min()
listed_shares = df_cap['상장주식수'][0] 
min_value = min_cap / listed_shares

# OHLCV 데이터 가져오기
df = stock.get_market_ohlcv(date, "20230519", "005930")
df_selected = df[['시가', '고가', '종가', '저가']]

# 최소 시가총액 기준으로 데이터 필터링
df_selected = df_selected[df_selected >= min_value].dropna()

# 가격 데이터 분할
high_prices = df_selected['고가']
low_prices = df_selected['저가']
open_prices = df_selected['시가']
close_prices = df_selected['종가']

# 훈련 데이터와 테스트 데이터로 분할
train_open, test_open = split_data(open_prices)
train_high, test_high = split_data(high_prices)
train_low, test_low = split_data(low_prices)
train_close, test_close = split_data(close_prices)

# 훈련 데이터와 테스트 데이터 프레임 생성
train_data = {'Open': train_open,
              'High': train_high,
              'Low': train_low,
              'Close': train_close}
test_data = {'Open': test_open,
             'High': test_high,
             'Low': test_low,
             'Close': test_close}
df_train = pd.DataFrame(train_data)
df_test = pd.DataFrame(test_data)

# 훈련 데이터 캔들 차트 생성
mc = mpf.make_marketcolors(up='r', down='b', edge='inherit', wick='inherit', volume='inherit', ohlc='i')
s = mpf.make_mpf_style(marketcolors=mc)
fig, axes = mpf.plot(df_train, type='candle', style=s, title='Samsung 주식 가격 훈련 데이터', returnfig=True)

# 훈련 데이터 캔들 차트 저장
train_image_path = 'samsung_train.png'
fig.savefig(train_image_path)

# 이미지 로드 및 전처리
img = cv2.imread(train_image_path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img = cv2.resize(img, (150, 150))
img = img.reshape((1,) + img.shape)
img = img / 255.0

# CNN 모델 생성
model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=(150, 150, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(32, (3, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, (3, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(64))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(1))
model.add(Activation('sigmoid'))

model.compile(loss='binary_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])

# 모델 학습
model.fit(img, np.array([0]), batch_size=1, epochs=50)

# 테스트 데이터 캔들 차트 생성
fig, axes = mpf.plot(df_test, type='candle', style=s, title='Samsung 주식 가격 테스트 데이터', returnfig=True)

# 테스트 데이터 캔들 차트 저장
test_image_path = 'samsung_test.png'
fig.savefig(test_image_path)

# 테스트 이미지 로드 및 전처리
new_img = cv2.imread(test_image_path)
new_img = cv2.cvtColor(new_img, cv2.COLOR_BGR2RGB)
new_img = cv2.resize(new_img, (150, 150))
new_img = new_img.reshape((1,) + new_img.shape)
new_img = new_img / 255.0

# 모델을 사용하여 예측 수행
prediction = model.predict(new_img)

# 예측 결과 출력
if prediction > 0.5:
    print("모델은 20230518의 주식 가격이 상승할 것으로 예측합니다.")
else:
    print("모델은 20230518의 주식 가격이 하락할 것으로 예측합니다.")

# 실제 변동과 예측 결과 비교
actual_change = test_close[-1] - test_open[-1]
if actual_change > 0 and prediction > 0.5:
    print("모델이 주식 가격이 상승할 것으로 정확히 예측했습니다.")
elif actual_change <= 0 and prediction <= 0.5:
    print("모델이 주식 가격이 하락할 것으로 정확히 예측했습니다.")
else:
    print("모델이 주식 가격의 방향을 정확히 예측하지 못했습니다.")
```

이 코드는 주식 데이터를 활용하여 CNN(Convolutional Neural Network) 모델을 훈련하고, 주식 가격의 상승 또는 하락을 예측하는 예제입니다. 주요 코드 라인을 설명하겠습니다:
### 코드 설명
#### 1. 필요한 라이브러리 및 모듈을 가져옵니다.
    - **`os`**, **`cv2`**, **`numpy`**, **`pandas`**: 파일 및 이미지 처리, 데이터 조작에 필요한 라이브러리입니다.
    - **`mplfinance`**: 주식 가격 차트를 그리기 위한 라이브러리입니다.
    - **`pykrx`**: 한국 주식 데이터를 가져오기 위한 라이브러리입니다.
    - **`keras`**: 딥러닝 모델 구축을 위한 라이브러리입니다.
#### 2. 데이터를 분할하는 함수 **`split_data`**를 정의합니다.
    - **`train_ratio`**를 기준으로 데이터를 훈련 데이터와 테스트 데이터로 분할하는 함수입니다.
#### 3. 주식 관련 정보를 가져옵니다.
    - **`stock.get_stock_major_changes("005930")`**를 통해 삼성전자의 주식 관련 정보를 가져옵니다.
    - **`stock.get_market_cap`**을 사용하여 시가총액 데이터를 가져옵니다.
    - **`stock.get_market_ohlcv`**를 사용하여 OHLCV(시가, 고가, 종가, 저가) 데이터를 가져옵니다.
#### 4. 데이터 전처리 및 필터링을 수행합니다.
    - 가져온 데이터 중에서 시가총액에 기준을 적용하여 필요한 데이터를 추출합니다.
    - 추출한 데이터를 훈련 데이터와 테스트 데이터로 분할합니다.
#### 5. 주식 가격 데이터를 시각화합니다.
    - **`mplfinance`**를 사용하여 훈련 데이터와 테스트 데이터의 주식 가격을 캔들 차트로 시각화합니다.
    - 캔들 차트를 이미지로 저장합니다.
#### 6. 이미지 데이터를 전처리하고 모델을 훈련합니다.
    - 저장한 이미지를 불러와서 전처리합니다.
    - CNN 모델을 구성하고, 전처리된 이미지를 사용하여 모델을 훈련합니다.
#### 7. 테스트 데이터를 사용하여 예측을 수행합니다.
    - 캔들 차트를 생성하고 이미지로 저장합니다.
    - 저장한 이미지를 불러와서 전처리합니다.
    - 모델을 사용하여 예측을 수행합니다.
#### 8. 예측 결과를 출력합니다.
    - 예측 결과에 따라 주식 가격의 상승 또는 하락을 예측합니다.
    - 실제 변동과 예측 결과를 비교하여 모델의 정확성을 평가합니다.

이 코드는 간단한 주식 가격 예측 모델의 예시입니다. 실제로는 데이터의 특성과 모델의 구조를 조정하여 더 정확한 예측을 수행하는 모델을 구축할 수 있습니다.