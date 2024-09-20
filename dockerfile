# Node.js 16 버전을 베이스 이미지로 사용
FROM node:16

# 컨테이너 내에서 작업할 디렉토리를 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 컨테이너로 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install --legacy-peer-deps

# 모든 소스 코드를 컨테이너로 복사
COPY . ./

# npm run dev 명령어로 개발 서버 실행
CMD ["npm", "run", "dev"]

# 개발 서버에서 사용할 포트 3000을 컨테이너 외부로 열기
EXPOSE 3000