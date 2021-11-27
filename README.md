<div align="center">

  # 원티드 백엔드 프리온보딩 6차 과제 - 디어코퍼레이션
  <img height="400" width="700" src="https://user-images.githubusercontent.com/59385491/139865333-05dabf0a-e283-4e51-94d9-8a42e6acbb7b.jpeg">


  <h2> 👨‍💻 원티드 프리온보딩 어나더글라스 팀의 '최준호'입니다. </h2>

<p>이번 과제는 개인 과제입니다.</p>
<p>무던히 포기하지 않고 견디고 견뎠던 그 시간들이 변함없는 단 하나의 해답임을 믿습니다.</p>

</div>


<div align=center>

<img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
<img alt="Hits" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FAnother-Glass%2FAssignment1_Team1%2Fblob%2Fdevelop%2FREADME.md&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" />
<img alt="issues" src="https://img.shields.io/github/issues/Another-Glass/Assignment1_Team1" />


</div>

</br>
</br>
</br>
</br>
</br>
</br>

## 🎤 소개

이 레포지토리는 [원티드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 7차 과제를 위해 만들어졌습니다. 

-   일정 : 2021년 11월 22일(월) 오후 6시 ~ 11월 29일(월) 오후 2시

<br>
<br>

<div align='center'>

## 🧑🏻‍💻 내 소개

| **최준호** |
|:-----:|
<img src="https://avatars.githubusercontent.com/u/67402180?v=4" height=200 width=200> 
**blog**: [raejun92.log](https://velog.io/@raejun92) </br> **github**: [raejun92](https://github.com/raejun92)
| ![sprint7](https://img.shields.io/badge/wanted-sprint7-purple)
| [프로젝트 회고](https://velog.io/@raejun92/Assignment7-%EC%B9%B4%EB%8B%A5)

<br>
<br>



</div>

<br>
<br>
<br>

## 📕 과제 내용

### [필수 포함 사항]

- READ.ME 작성
    - 프로젝트 빌드, 자세한 실행 방법 명시
    - 구현 방법과 이유에 대한 간략한 설명
    - **서버 구조 및 디자인 패턴에 대한 개략적인 설명**
    - 완료된 시스템이 배포된 서버의 주소
    - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

</br>


### [개발 요구사항]

**✔️ API 목록**
- 사용자 생성 API
- 사용자가 소유한 타이어 정보를 저장하는 API
- 사용자가 소유한 타이어 정보 조회 API



<details><summary>[고려 사항 및 상세설명]</summary>

### 배경 및 공통 요구사항

> 😁  카닥에서 실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.

- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

|Response Code|Description|
|:---:|:---:|
|200 OK|성공|
|400 Bad Request|Parameter가 잘못된 (범위, 값 등)|
|401 Unauthorized|인증을 위한 Header가 잘못됨|
|500 Internal Server Error|기타 서버 에러|

<br>

### 1. 사용자 생성 API
🎁 **요구사항**

- ID/Password로 사용자를 생성하는 API.
- 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.

```jsx
/* Request Body 예제 */

 { "id": "candycandy", "password": "ASdfdsf3232@" }
```

<br>

### 2. 사용자가 소유한 타이어 정보를 저장하는 API
🎁 **요구사항**

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.

```jsx
/* Request Body 예제 */
[
  {
    "id": "candycandy",
    "trimId": 5000
  },
  {
    "id": "mylovewolkswagen",
    "trimId": 9000
  },
  {
    "id": "bmwwow",
    "trimId": 11000
  },
  {
    "id": "dreamcar",
    "trimId": 15000
  }
]
```

🔍 **상세구현 가이드**

- 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다.
 **자동차 정보 조회 API 사용 예제 → 
📄** [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000)
**📄** [https://dev.mycar.cardoc.co.kr/v1/trim/9000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/9000) [https://dev.mycar.cardoc.co.kr/v1/trim/11000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/11000) [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000)
- 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다.
- 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다.
 위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다.


<br>


### 3. 사용자가 소유한 타이어 정보 조회 API
🎁 **요구사항**

- 사용자 ID를 통해서 2번 API에서 저장한 타이어 정보를 조회할 수 있어야 한다.



</div>
</details>
</br>
</br>

## 📕 모델링

</br>

![ERD](https://user-images.githubusercontent.com/67402180/143683983-bdced692-1670-4d19-b19a-896ca67c942a.png)


</br>
</br>




</br>
</br>

## 💡 구현 방법과 이유

### [ 사용자 생성 API ]

- bcrypt를 사용하여 사용자 비밀번호를 암호화해서 저장했습니다.
- 로그인 시 JWT 토큰을 발행하고 Auth 미들웨어를 만들어 인증, 인가한 사용자만 다른 API를 사용할 수 있도록 했습니다.
- 요청 해더에 JWT 인증 타입인 Authorization: Bearer 사용하여 보안을 강화했습니다.

<br>

### [ 사용자가 소유한 타이어 정보를 저장 API ]

- 요청 정보들 중 중복 데이터가 있거나, 가입유저가 아닌 경우 예외처리 하였습니다. 
![스크린샷 2021-11-28 오전 1 30 44](https://user-images.githubusercontent.com/67402180/143689299-5f3c7a8c-9488-48b5-882b-5a77753f361e.png)

- 카닥에서 제공한 API에서 trimId에 해당하는 타이어 정보를 추출했습니다.
![타이어 정보 추출](https://user-images.githubusercontent.com/67402180/143688563-39c97cc3-4e12-4b13-b4a5-fc10d16d996e.png)

- 추출한 타이어 정보를 토큰화 작업을 통해 {폭}/{편평비}R{18}과 같은 구조일 경우만 DB에 저장했습니다.
![토큰화](https://user-images.githubusercontent.com/67402180/143688973-33458525-8ffa-4dc4-a22e-5a2279df55d5.png)


<br>


### [ 사용자가 소유한 타이어 정보 조회 API ]

- 가입한 유저에 대해서만 조회가 가능 하도록 했습니다.
- Tire정보를 저장하는 db테이블에 userId를 foreign key로 저장하여 해당 요청 유저아이디로 조회합니다.


<br>
<br>

## 📕 서버 구조 및 디자인 패턴





</br>
</br>



## 🛠 실행 방법

- 레포지토리 다운로드 및 압축 해제
- src폴더에서 npm start
- src폴더에 .env 파일을 추가하여 아래 링크를 통해 환경변수 설정
- npm start 서버 동작
- [.env설정 노션 링크](https://right-rainstorm-3d0.notion.site/env-2c0b50df8838466ba79511ad9d1e31fa)
  - <details><summary><b>링크 접속불가 시 .env 파일 설정 방법</b></summary>

    ```
	DB_HOST=DB 주소
	DB_USER=DB유저 이름
	DB_PASSWORD=DB 유저 비밀번호
	DB_DATABASE=DB 스키마 이름
	PORT=서버 포트
	BCRYPT_SALT_ROUND=비밀번호 암호화 길이
	JWT_SECRETKEY=JWT 비밀키
	JWT_EXPIRESIN=JWT 만기일
    ```


</details>


</br>
</br>


## 🗂 과제 확인 및 평가 API 명세서

- Postman을 활용하여 API 작동 테스트를 진행했습니다. 
- __배포된 서버 주소__ 및 자세한 API 명세는 아래에서 확인 가능합니다.
- [🗂 API Description Link](https://documenter.getpostman.com/view/18068137/UVJWpzT4)
- [![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/18068137/UVJWpzT4) 을 클릭하여 웹브라우저 혹은 Postman 클라이언트에 콜렉션이 로드되면
   1. Variables 탭에서 서버 Host와 Port를 지정합니다. (기본값이 지정되어 있습니다.)
   2. 그후 우측 상단의 Run 버튼을 눌러 RUN ORDER 화면에 진입한 뒤 Run \[Collection Name\]을 클릭하면, 이상적인 상황에서의 테스트가 진행됩니다.
       
   3. 요청마다 여러 이상적이지 않은 상황의 테스트에 대한 예시가 있습니다.</br>
 
</br>
</br>

## 🛠 Dependencies

</br>

<div align=center>
<img src="https://user-images.githubusercontent.com/67402180/143684776-daccdadf-25cd-4b55-8070-d67ffff522a1.png" height=850>
</div>


</br>
</br>


## 🌲 File Tree

</br>


```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜authController.js
 ┃ ┗ 📜infoController.js
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ 📜index.js
 ┃ ┣ 📜tire.js
 ┃ ┗ 📜user.js
 ┣ 📂routes 
 ┃ ┣ 📜authRouter.js
 ┃ ┗ 📜infoRouter.js
 ┣ 📂services
 ┃ ┣ 📜authService.js
 ┃ ┗ 📜infoService.js
 ┣ 📂utils
 ┃ ┣ 📜responseMessage.js
 ┃ ┣ 📜statusCode.js
 ┃ ┗ 📜statusMessage.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜config.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
 
```
