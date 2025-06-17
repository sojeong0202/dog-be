FROM node:18

# 시간대 설정
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 앱 디렉토리 생성
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 포트 열기 (선택적으로 EXPOSE도 추가 가능)
EXPOSE 8443

# 앱 실행
CMD ["npm", "start"]