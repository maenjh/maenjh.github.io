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

![1]({{site.baseurl}}/assets/images/posts/errorcorrection/vscodeterminal/1.png)


#### python 모듈이 없어서 코드에 밑줄이 뜬다.

![2]({{site.baseurl}}/assets/images/posts/errorcorrection/vscodeterminal/2.png)


#### 코드를 실행해보면 아래와 같이 에러가 나온다.

![3]({{site.baseurl}}/assets/images/posts/errorcorrection/vscodeterminal/3.png)


#### 보통 기본으로 켜지는게 본인 같은 겨우에는 powershell로 되어 있었다. cmd에서 설치 했을 때는 오류가 없었기에 기본 터미널창을 powershell에서 cmd로 변경 할 것 이다.

#### 설정법
##### 1. 좌측 하단의 톱날바퀴 모양 버튼을 누르고 설정을 들어간다.
![Untitled]({{site.baseurl}}/assets/images/posts/errorcorrection/vscodeterminal/Untitled.png)

##### 2. 설정에서 shell window라 친다.

![Untitled 1]({{site.baseurl}}/assets/images/posts/errorcorrection/vscodeterminal/Untitled1.png)


##### 3.**Terminal › Integrated › Default Profile: Windows 설정 값을 변경해준다.**

기존 null에서 command prompt로 변경

변경 한 뒤에 모듈을 설치하니 밑줄이 없어지게 되었다!

추가로 터미널 cmd 창에서 anaconda 가상환경명이 좌측 괄호에 나오게 된다. 본인의 경우에는 (trading)이라 되어있다.

![Untitled 2]({{site.baseurl}}/assets/images/posts/errorcorrection/vscodeterminal/Untitled2.png)
