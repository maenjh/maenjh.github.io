---
title:  "[파이썬 모듈 설치오류] VSCode에서 Python에서 모듈설치를 받았는데 코드가 실행이 안될때"
excerpt: "파이썬 모듈 설치오류"
toc : true
toc_sticky: true
categories:
  - errorcorrection
tags: [VSCode, setting, python]

last_modified_at: 2023-02-14T08:06:00-05:00
classes: wide
---


#### 코드에 문제가 없을 경우 아래 처럼 코드에 밑줄이 없다.

![1](https://github.com/MoonJaehyun/MoonJaehyun.github.io/assets/86664178/97c7ce7c-77db-42ee-927c-2ea4332b8d3f)


#### python 모듈이 없어서 코드에 밑줄이 뜬다.

![2](https://github.com/MoonJaehyun/MoonJaehyun.github.io/assets/86664178/b5dd578c-4219-461a-af41-bc77440ae814)


#### 코드를 실행해보면 아래와 같이 에러가 나온다.

![3](https://github.com/MoonJaehyun/MoonJaehyun.github.io/assets/86664178/9825cf83-208f-4d68-8545-6a25d0c8d064)

#### 보통 기본으로 켜지는게 본인 같은 겨우에는 powershell로 되어 있었다. cmd에서 설치 했을 때는 오류가 없었기에 기본 터미널창을 powershell에서 cmd로 변경 할 것 이다.

#### 설정법
##### 1. 좌측 하단의 톱날바퀴 모양 버튼을 누르고 설정을 들어간다.
![Untitled](https://github.com/MoonJaehyun/MoonJaehyun.github.io/assets/86664178/f8a5ff17-0d12-4515-a0c2-4e8734e7062e)


##### 2. 설정에서 shell window라 친다.

![Untitled 1](https://github.com/MoonJaehyun/MoonJaehyun.github.io/assets/86664178/019bbf72-8409-4da4-9184-38d81fcf96a1)


##### 3.**Terminal › Integrated › Default Profile: Windows 설정 값을 변경해준다.**

기존 null에서 command prompt로 변경

변경 한 뒤에 모듈을 설치하니 밑줄이 없어지게 되었다!

추가로 터미널 cmd 창에서 anaconda 가상환경명이 좌측 괄호에 나오게 된다. 본인의 경우에는 (trading)이라 되어있다.


![Untitled 2](https://github.com/MoonJaehyun/MoonJaehyun.github.io/assets/86664178/9cc59874-964a-40be-8e0b-703dd2fb644f)