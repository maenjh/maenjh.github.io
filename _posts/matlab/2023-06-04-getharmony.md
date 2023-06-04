---
title:  "[Matlab] Get harmony from audio file"
excerpt: "matlab"
toc : true
toc_sticky: true
categories:
  - matlab
tags: [matlab, music]

last_modified_at: 2023-06-04T08:06:00-05:00
classes: wide
---
### 코드
```matlab
% 음원 파일 경로 설정
audioFile = '음원경로.wav';

% 음원 파일 읽기
[y, fs] = audioread(audioFile);

% FFT를 위한 파라미터 설정
frameSize = 1024;     % 프레임 크기
hopSize = frameSize/2;% 프레임 간격 (Overlap-Add 처리를 위해 절반으로 설정)
nFrames = floor(length(y) / hopSize); % 프레임 수

% 주파수 스펙트럼 분석을 위한 초기화
spectrogram = zeros(frameSize, nFrames);
frequencies = linspace(0, fs/2, frameSize/2+1);

% 주파수 스펙트럼 계산
for i = 1:nFrames
    % 프레임 추출
    frame = y((i-1)*hopSize+1 : (i-1)*hopSize+frameSize);
    
    % FFT 계산
    frameFFT = abs(fft(frame));
    
    % 스펙트럼 저장
    spectrogram(:, i) = frameFFT;
end

% 주요 주파수 성분 추출
threshold = 0.1; % 주요 주파수 성분을 정의하기 위한 임계값
harmonics = cell(1, nFrames);
for i = 1:nFrames
    frameSpectrum = spectrogram(:, i);
    frameThreshold = max(frameSpectrum) * threshold;
    validIndices = find(frameSpectrum >= frameThreshold);
    frameHarmonics = frequencies(validIndices);
    harmonics{i} = frameHarmonics;
end

% 하모니 출력
for i = 1:nFrames
    frameTime = i * hopSize / fs;
    frameHarmonics = harmonics{i};
    
    fprintf('Frame %d - Time: %.3f seconds\n', i, frameTime);
    fprintf('Harmonics: ');
    fprintf('%.2f Hz ', frameHarmonics);
    fprintf('\n');
end
```
#### 설명
이 코드는 주어진 음원 파일에서 주파수 스펙트럼을 분석하여 주요 주파수 성분을 추출하는 MATLAB 코드입니다. 코드의 각 부분을 설명하겠습니다:

1. `audioFile` 변수에는 음원 파일의 경로가 설정됩니다.
2. `audioread` 함수를 사용하여 음원 파일을 읽고, 신호 데이터를 `y`에 저장하고 샘플링 주파수를 `fs`에 저장합니다.
3. FFT를 위한 파라미터인 `frameSize`는 프레임의 크기를 설정합니다. `hopSize`는 프레임 간격을 설정하며, Overlap-Add 처리를 위해 절반으로 설정됩니다. `nFrames`는 총 프레임의 수를 계산합니다.
4. 주파수 스펙트럼 분석을 위한 초기화를 수행합니다. `spectrogram` 변수는 주파수 스펙트럼을 저장하기 위한 2차원 배열로, 크기는 `frameSize` x `nFrames`입니다. `frequencies` 변수는 주파수 벡터로, 0부터 fs/2까지의 값을 가집니다.
5. `for` 루프를 사용하여 각 프레임에 대해 주파수 스펙트럼을 계산합니다.
    - `frame` 변수에는 현재 프레임의 신호 데이터가 저장됩니다.
    - FFT를 계산하여 `frameFFT` 변수에 저장합니다.
    - `spectrogram`에 현재 프레임의 주파수 스펙트럼을 저장합니다.
6. 주요 주파수 성분을 추출하는 부분입니다. `threshold` 변수는 주요 주파수 성분을 정의하기 위한 임계값으로 설정됩니다.
7. `for` 루프를 사용하여 각 프레임에 대해 주요 주파수 성분을 계산합니다.
    - `frameSpectrum` 변수에는 현재 프레임의 주파수 스펙트럼이 저장됩니다.
    - `frameThreshold` 변수에는 현재 프레임에서의 주요 주파수 성분을 결정하기 위한 임계값이 저장됩니다.
    - `validIndices` 변수에는 임계값을 초과하는 주파수 성분의 인덱스가 저장됩니다.
    - `frameHarmonics`에는 현재 프레임에서 추출된 주요 주파수 성분이 저장됩니다.
8. 마지막 부분에서는 각 프레임의 시간과 추출된 주요 주파수 성분을 출력합니다. `fprintf` 함수를 사용하여 결과를 출력합니다.

이 코드는 주파수 스펙트럼 분석을 수행하여 음원 파일에서 주요 주파수 성분을 추출하는 기능을 제공합니다.