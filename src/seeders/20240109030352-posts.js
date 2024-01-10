'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Post", [
      {
        id: "b03444bf-75ab-4da0-9da4-de585ebf28e1",
        title: "[object object]",
        body: "# [object object]\n\n### [object object]????\n\n회사 프로젝트 중 서버에서 받은 중첩 배열 객체를 \n\nejs템플릿에서 사용하려는 와중에 생긴문제\n\n[object object] 가 콘솔에 찍히며 for문 등으로 접근시 \n\n[ o b j e c t  o b j e c t ] 이런 식으로 스트링으로 출력 되었다\n\n### * 해결 방법\n```js\n//* 1. input type hidden 값에 stringify화 해서 저장한 뒤\n<input type=\"hidden\" value=\"JSON.stringify(서버에서 받은 데이터 변수명)\"  name=\"serverData\" />\n//* 2. 자바스크립트로 값을 가져올 떄 parse 해서 가져옴\nconst data = JSON.parse(document.querySelector(\"input[name='serverData']\").value);\n```\n\n\n\n\n\n\n\n",
        createdAt: "2023-05-21",
        updatedAt: "2023-05-21"
      },
      {
        id: "312940b6-33ae-4aca-88df-defbe0c9c73e",
        title: "Intl Api",
        body: "# Intl Api\n\n### 다국어 지원 Api\n\n\n### * 동기\n전 회사에서 글로벌한 서비스를 위해 다양한 언어 및 날짜 숫자 등에 대해\n\n번환이 필요 하였다. 기본은 node 환경에서 i18next모듈로 번역 및 변환을 할 수 있었다.\n\n하지만 i18next 모듈은 한글.json파일을 기준으로 번역된 json파일이 있어야 매칭 번역이 가능하였다.\n\n개발 환경에서는 번역된 다른나라 언어 json 파일을 받기까지 시간이 꾀 걸려 불편하기에 \n\n간단하게 변환할 수 있는 방법을 찾게 된 것이 Intl Api 이다.\n\n### * 기본 사용방법\n```js\n//* Datetime format\nnew Intl.DateTimeFormat().format();\n//* Number format\nnew Intl.NumberFormat().format();\n//* RelativeTime Format\nnew Intl.RelativeTimeFormat().format();\n```\n### * DateTimeFormat\n```js\nnew Intl.DateTimeFormat(\"ko\", { dateStyle: 'full' }).format(new Date());\n//* 2023년 1월 19일 목요일\nnew Intl.DateTimeFormat(\"ko\", { dateStyle: 'long' }).format(new Date());\n//* 2023년 1월 19일\nnew Intl.DateTimeFormat(\"ko\", { dateStyle: 'medium' }).format(new Date());\n//* 2023.01.19.\nnew Intl.DateTimeFormat(\"ko\", { dateStyle: 'short' }).format(new Date());\n//* 23.01.19.\nnew Intl.DateTimeFormat(\"ko\", { timeStyle: 'full' }).format(new Date());\n//* 오전 12시 4분 54초 대한민국 표준시 \nnew Intl.DateTimeFormat(\"ko\", { timeStyle: 'long' }).format(new Date());\n//* 오전 12시 5분 39초 GMT+9\nnew Intl.DateTimeFormat(\"ko\", { timeStyle: 'medium' }).format(new Date());\n//* 오전 12:06:02\nnew Intl.DateTimeFormat(\"ko\", { timeStyle: 'short' }).format(new Date());\n//* 오전 12:06\n```\n\n### * NumberFormat\n```js\nnew Intl.NumberFormat('ko', { style: 'percent' }).format(0.5);\n//*  50%\nnew Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' }).format(1238214);\n//* ₩1,238,214\nnew Intl.NumberFormat('ko', { style: 'currency', currency: 'EUR' }).format(32.12);\n//* €32.12\nnew Intl.NumberFormat('ko', { style: 'unit', unit: 'kilogram' }).format(53);\n//* '53kg'\n```\n\n### * RelativeTimeFormat\n```js\nconst rTf = new Intl.RelativeTimeFormat(\"ko\");\nrtf.format(1, \"day\");\n//* 1일 후\nrTf.format(-1, \"quarter\");\n//* 1분기 전\n//* 시간은 직접 계산해 줘야 함.\n```",
        createdAt: "2023-11-29",
        updatedAt: "2023-11-29"
      },
      {
        id: "abed2d5b-b74d-4bb8-8402-c41ffd9c4d2b",
        title: "React select library",
        body: "# React-select library\n\n### 설치 방법\n```js\nnpm i  react-select\n```\n\n\n### 사용방법\n```js\n//* 사용자가 옵션을 추가 해야 하는 경우\nimport CreatableSelect from \"react-select/creatable\";\n\n<>\n    <CreatableSelect\n        //* 다중 셀렉트 옵션\n        isMulti\n        //* 옵션을 새로 추가 할때 입력한 value값이 들어온다\n        //* 여기서 서버에 맞게 상태 업데이트 해줌\n        onCreatebleOption={(value) => setState(value)}\n        value={state => state.map(value => ({label: option 이름으로 사용될 state의 값, value: input value 속정으로 사용될 값}))}\n        //* 옵션을 삭제 하거나 변경할때 객체 값이 들어온다\n        onChange={(obj) => 여기서 state 값 업데이트 해준다} \n    />\n</>\n\n//* 옵션을 선택만 해야 하는 경우\nimport ReactSelect from \"react-select\";\n<>\n  <ReactSelect\n    isMulti\n    onCreateOption\n    value\n    //* 사용자들이 선택할 수 있는 옵션\n    options={(state) => state.map(option => ({label: option.label, value: option.value}))}\n    onChange\n  />\n</>\n```\n\n###  연구 필요⚠️\n- 타입스크립트 스타일 오버라이트시 onChange 값으로 들어오는 타입에 문제 생김.\n- Type Assertion으로 어찌어찌 동작은 하나 연구가 필요함.\n\n\n<a href=\"https://react-select.com/home\" target=\"_blank\">[참조]</a>",
        createdAt: "2023-11-20",
        updatedAt: "2023-11-20"
      },
      {
        id: "8423bc2a-efa9-438b-b721-88ba843c01bb",
        title: "Typescript와 객체",
        body: "# Typescript와 객체\n\n타입스크립트에서 보통 객체의 타입을\n```js\ntype SomeObjType = {\n  name: string;\n  age: number;\n  gender: \"male\" | \"female\";\n  hobby: Array<string>;\n};\n```\n보통 이런 식으로 정의한다. \n\n하지만 위와 같은 방법으로 타입을 정의하게 된다면 \n\n항상 객체 안에는 name, age, gender, hobby 라는 프로퍼티는 꼭 존재해야 한다.\n\n물론 프로퍼티를 옵셔널(?)로 설정하면 괜찮다. \n\n자바스크립트 프로그래밍을 하다 보면 정의하지 않은 프로퍼티가 필요한 경우가 있을 것이다..\n\n필요할때 마다 기존 타입을 상속받아 사용할 수 있지만...\n\n### 이렇게 객체에 어떤 프로퍼티가 있을지 명확하게 모르는 경우 사용한다.\n\n\n```\ntype Obj = {\n    [key: string]: string | number;\n};\n```\n\n이런 식으로 사용하면 OK!(프로퍼티에는 리터럴타입만 허용된다고 함)\n\n[주절주절]\n\n\n동적 타입이 단점이라고 이야기 하지만 \n\n그로 인해 유연한 프로그래밍과 재미가 더해 지는 것이라 생각\n\n타입스크립트로 인해 얻는 장점이 많긴 하지만 \n\n객체를 다루며 놀이 하는 소소한 재미가 감소\n\n아직 부족한 내가 타입스크립트를 사용하면서도  객체를 \n\n결론은 다루는 재미를 느낄 수 있도록 노력해야 겠음",
        createdAt: "2023-10-21",
        updatedAt: "2023-10-21"
      },
      {
        id: "693a8221-7634-4d67-a258-9b028a353f0e",
        title: "Vite 환경변수",
        body: "# Vite 환경변수\n\n###  기존의 React 환경변수\n\n```js\n//* .env\nREACT_APP_ENVNAME=value\n\n//* 사용처\nconst env1 = process.env.REACT_APP_ENVNAME;\n```\n### * Vite 에서는\n```js\n//* .env\n네이밍은 딱히 관계 없는듯하다 \n\n//* 사용처\nconst env1 = import.meta.env.VITE_ENVNAME;\n```\n",
        createdAt: "2023-11-10",
        updatedAt: "2023-11-10"
      },
      {
        id: "aff8fb7e-7dae-4101-8129-bdc5fb6156c8",
        title: "which is not functionally dependent on columns in group by clause",
        body: "# SQL ONLY_FULL_GROUP_BY\n\n### * 상황\n\n회사에서는 Sequelize ORM 환경에서 로우쿼리와 Op, 프로시져를 통해 \n\n쿼리를 날리며 group을 할때는 전혀 발생하지 않았는데 쿼리를 알맞게 작성\n\n하였음에도 오류가 발생 하였다.\n\n> which is not functionally dependent on columns in group by clause...\n>\n>오류내용\n\n\n### * 원인\nmysql 5.7 버전 이후 sql_mode에 추가된 설정으로 바른 쿼리를 작성할 수 있도록 \n\n추가 된 것 같다. group_by에 명시되지 않은 컬럼을 선택하는 것이 의미적으로 \n\n정확하지 않고 표준 쿼리 작성에 어긋난다는 것이다. 여태 바르지 못한 쿼리를 작성\n\n하고 학습해 왔던 것이다...\n\n### * 해결 방법 \n구글링으로 많은 해결 방안이 나와 따로 적지는 않겠다.\n\n1. 그룹바이에 명시하지 않은 컬럼을 명시한다.\n2. sql_mode를 수정한다.\n3. 서브쿼리에서 그루핑한 컬럼을 선택한다.\n4. 그룹바이에 명시되지 않은 컬럼에 집계함수를 사용한다.\n\n이 정도의 해결 방법이 있는것 같다.",
        createdAt: "2023-10-15",
        updatedAt: "2023-10-15"
      },
      {
        id: "a6cda2cc-51c0-40e1-8825-a65666ab2e33",
        title: "clientWidth & offsetWidth & scrollWidth",
        body: "# 너비에 대하여...\n\n블로그 페이지를 수정하며 태그에 대한 슬라이드 기능을 개발하며\n\n궁금증이 생겼다. \n\n사용할 때 마다 까먹어 이번 기회에 짧게나마 정리를 해 두려도 한다.\n\n### clientWidth\n>  clientWidth란?\n>\n> 쉽게 target box의 내부 길이라고 보면 좋을것 같다.\n>\n> border를 포함하지 않은 너비 \n>\n> contents + padding \n\n### offsetWidth\n> offsetWidth란?\n>\n> 쉽게 target box의 내외부 길이라고 보면 좋을 겉 같다.\n>\n> border를 포함한 너비\n>\n> contents + padding + border\n\n### scrollWidth\n> scrollWidth란?\n> \n> 쉽게 스크롤 할 수 있는 영역 까지의 총 너비\n>\n> 부모 박스 overflow: hidden으로 숨겨진 자식 박스의 총 너비\n\n<a href=\"https://jsfiddle.net/y8Y32/25/\" target=\"_blank\">[참조]</a>\n\n",
        createdAt: "2023-12-09",
        updatedAt: "2023-12-09"
      },
      {
        id: "e7369275-5235-4665-91bd-b3bc65277557",
        title: "React-Select onChange option(isMulti)",
        body: "# React select\n\n### React-select isMulti onChange 옵션에 대하여...\n\n발단은 onChange옵션으로 들어오는 타입이 정확함에도\n\n> property label does not exist on type MultiValue<>...\n\n라는 오류가 계속 발생 하였다.\n\nIDE에 타입 유추로 들어오는 개별 타입도 정확한데 오류가 계속 발생함.\n\n구글링과 래퍼런스가 없어서 고민을 하다 문뜻 떠오른 생각에 해결 하였다, \n\n```js\nargs: MultiValue<{ label: string; value: string}>\n```\n\n위에 MultiValue<{}>가 해결의 열쇠가 되었다. \n\n그렇다 들어오는 값은 개별 객체가 아닌 배열 이었던 것이다....\n\nMultiValue라는 단어에 알아 차렸어야 했는데....\n\n계속 배열에 속한 객체의 개별 속성에 접근해 오류를 뿜었는데...\n\n차라리 타입[] 형식으로 알려 줬다면 알았을 것을...\n\n탓해 뭐하니...이제라도 알아 다행...\n",
        createdAt: "2023-12-11",
        updatedAt: "2023-12-11"
      },
      {
        id: "8f9ddf54-3a16-4a4c-9638-c2473ee1c496",
        title: "Web Server vs WAS",
        body: "# Web Server vs WAS\n\n### Web Server\n> client web으로 부터 http 요청을 받아들이고\n> html 같은 웹페이지를 반환하는 프로그램\n>\n> ex) Aphache, Nginx...\n>\n> ### 역할\n> 보통 client와 WAS 사이에 위치함.\n> client에 정적 파일을 제공(html, image, css, js ...)\n> client로 부터 들어온 동적 요청을 WAS로 전달.\n> WAS에서 처리한 부분을 다시 client에 전달.\n\n### WAS(Web Application Server)\n> WAS는 동적 서버 콘텐츠를 수행하는 것으로 일반적인 웹 서버와 구별이 되며,\n> 주로 데이터베이스 서버와 같이 수행이 된다.\n> 웹서버와 웹컨테이너가 합쳐진 형태,\n>\n> 웹컨테이너: 웹서버에서 요청한 파일들의 수행 결과물을 다시 웹서버로 보내줌.\n>\n> ex) Tomcat, Jboss...\n> \n> ### 역할\n> 다양한 비지니스 로직의 처리가 가능하기 때문에 DB와 연동해\n> 동적 컨텐츠를 제공할 수 있다.\n> 단순한 정적 컨텐츠도 제공 가능함.\n>   \n\n\nWAS는 웹서버의 기능까지 할 수 있는데 왜??\n- WAS는 DB조회, 각종 비지니스 로직 처리 등에 집중 하는게 좋다.\n- WAS가 정적 컨텐츠 요청까지 처리 하면 효율성이 떨어짐.(동적 컨텐츠 처리 지연)\n\n* 단순한 정적 컨텐츠 제공은 웹서버에 기능 분리시켜 서버 부하를 방지한다.\n\n\n<a href=\"https://story.pxd.co.kr/1647\" target=\"_blank\">[참고]</a>",
        createdAt: "2023-12-14",
        updatedAt: "2023-12-14"
      },
      {
        id: "c38d9441-bdc1-44ad-ae00-772b09c30c85",
        title: "우분투 웹서버 만들기 1",
        body:"# 우분투 웹서버 만들기 1\n\n남는 컴퓨터를 활용해 개인 서버를 만들고 싶어 시작.\n\n집에 남는 컴퓨터를 활용해 외부에서 접속할 수 있는 서버를 만들고 싶은 분들\n\n참고: 공인ip(isp) => 벽장(H614G) 사설 ip 배분 >> sk 공유기 >> 사설 ip 분배\n\n이런 구조이고 서버를 만든 데스크탑은 벽에서 나온 랜선에 연결되어 있음.\n\n공인 ip - 사설ip(벽) - 사설ip(벽) - 사설ip(데스크탑 웹서버) - 사설 ip(벽)  - 사설ip(벽 > 랜 sk 공유기 wifi, iptv...)\n\n사설ip(벽 > 랜 sk 공유기)\n    ㄴ사설ip(macbook wifi)  - 기타 사설ip(와파이)\n\n쉽게 이해 될 수 있도록 사진은 나중에 서버 세팅 후 첨부할 수 있도록 할 예정.\n\n### 1. 우분투 설치\n우분투 서버를 설치 하고 싶었으나, 설치 과정에 문제가 있고 시간이 오래 걸릴것 같아 데스크탑으로 설치 하였음.(20.0.4)\n\n윈도우 환경에서 우분투 데스크탑 듀얼부팅 등 검색하면 많은 자료를 찾을 수 있기에 생략하겠음.\n<a href=\"https://palpit.tistory.com/entry/Ubuntu-%EC%9C%88%EB%8F%84%EC%9A%B0-10%EC%97%90%EC%84%9C-%EC%9A%B0%EB%B6%84%ED%88%AC-%EB%93%80%EC%96%BC%EB%B6%80%ED%8C%85-%ED%95%98%EA%B8%B0%EB%A9%80%ED%8B%B0%EB%B6%80%ED%8C%85-1\" target=\"_blank\">참고</a>\n\n### 2. 한글 설정(20.0.4)\n우분투 설치시 한글 설정 한 분은 패스.\n\n#### 1. Settings > Regions & Language > Input Sources 밑의 + 버튼 클릭\n#### 2. Korean 선택 후 add\n#### 3. 추가 후 English 삭제 후 밑의 Manage installed Languages 버튼 클릭해 설치\n#### 4. 터미널에 reboot 명령어로 다시시작(로그오프만 해도 된다고 함)\n#### 5. 다시 Settings > Regions & Language > Input Sources 밑 + 버튼 클릭\n#### 6. Korean(Hangul)선택 후 add\n#### 7. 기존의 Korean 삭제\n#### 8. 키 매핑<a href=\"https://shanepark.tistory.com/231\" target=\"_blank\"> [참조]</a>\n\n### 3.  ssh\n서버로 원격 접속해 작업 할 수 있도록 ssh 설정\n\n```bash\n$ sudo apt-get update\n\n# openssh-server 설치\n$ sudo apt-get install openssh-server\n    설치 할래? y\n\n# net-tools 설치\n$ sudo apt-get install net-tools\n$ ifconfig\n- en0 또는 비슷한 키를 가진곳에 \n- inet 뒷부분에 사설ip주소 나옴(192.168.ㅇㅇ, ㅇㅇ , 127.0.0.1 아님 주의!)\n- ether 뒷 부분은 기기 mac addr(그렇다고요...)\n\n# vim 설치\n$ sudo apt-get install vim\n\n# ssh 접속 port 설정\n$ sudo vim /etc/ssh/sshd_config\n- Port 22 << 모든 ssh기본 포트는 22이기 때문에 보안을 위해 나만의 port 번호로 수정\n- 다른 사람이 접속할 수 없도록(바꿔도 완벽한건 아님)\n# 변경한 설정 적용\n$ sudo systemctl restart sshd\n\n# 원격 접속\n$ ssh (우분투 설치시 입력한 사용자아이디)@192.168.ㅇㅇ.ㅇㅇ -p (위에서 설정한 포트 번호)\n- 우분투 설치시 설정한 비밀번호 입력\n```\n\n다음번에는 nginx 설치 후 본격적으로 서버를 연결해 봅시다.",
        createdAt: "2023-12-18",
        updatedAt: "2023-12-18"
      },
      {
        id: "a5ea3e0a-c001-405e-add8-5dced745afc5",
        title: "우분투 웹서버 만들기 2",
        body: "# 우분투 웹서버 만들기\n\n저번 시간에는 ssh 설정 까지 완료 하였습니다 \n\n오늘은 nginx 설치 부터 차근 차근 하겠습니다. \n\n### 1. nginx 설치\n```bash\n$ sudo apt-get update\n$ sudo apt-get upgrade\n//*  포트 확인용\n$ sudo apt-get install net-tools\n$ sudo apt-get install nginx\n```\n\n### 2.  nginx 실행\n```bash\n$ service nginx start\n$ service nginx status\n\n//\nnginx.service - A high performance web server and a reverse proxy server\n     Loaded: loded\n     Active: active (runnng) \nActive(running) 이라고 나온다면 실행중.\n//* 이후 사설ip로 접속시 nginx 기본 페이지가 나온다면 성공!\n```\n\n### 3. nginx 설정\nnginx 기본 설정 파일 위치는 /etc/nginx/nginx.conf\n\n기본 설정은 놔두고 다른 방법으로 서버 연결\n```bash\n$ sudo vim /etc/nginx/sites-available/파일이름\n//* 설정할 서버 이름 혹은 구분할 수 있도록 파일 이름을 적어 새로운 파일 작성\nserver {\n\n    listen 80;\n    listen[::80];\n\n    server_name 도메인 주소(있다면) or ubuntu server 사설ip;\n    access_log /var/log/nginx/이름.access.log;\n    error_log /var/log/nginx/이름.error.log;\n\n    location / {\n        proxy_pass http://192.168.xx.xx:설정한포트(우분투에서 실행되고 있는 서버)\n        //* 위에 설정한 server_name:port로 접속하면 proxy_pass의 주소로 연결\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \"upgrade\";\n        proxy_set_header Host $http_host;\n        proxy_cache_bypass $http_upgrade;  \n    }\n}\n\n저장하면 /etc/nginx/sites-enabled/설정한 파일명으로  자동저장됨\n//* 확인 후 적용되어 있지 않으면 아래 명령어\n$ ln -s /etc/nginx/sites-available/파일이름 /etc/nginx/sites-enable/파일명\n\n$ sudo nginx -t\n명령어를 통해 설정 파일의 오류 여부 확인\n\n$ nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\n$ nginx: configuration file /etc/nginx/nginx.conf test is successful\n이런 메시지 표시되면 ok\n\n//*\n실패했다면 위의 설정에 브라켓이 짝이 맞는지, 스펠링 틀린게 없는지 확인하고\n구글링을 추천\n\n$ sudo nginx -s reload\n```\n추후 설정한 사설ip:port로 접속시 개인이 설정한 서버가 작동되면 ok!\n\n⚠️ 페이지가 뜨지 않는 issue ⚠️\n\n필자는 sk류 인터넷 사용 중이고. 위의 설정 까지 마친 후 로컬 컴퓨터에서 페이지가 \n\n접속되지 않는 이슈가 있었다. \n\n여ㄱ이 부분 때문에 한 이틀은 고생한 것 같다. \n\n다양한 원인이 있겠지만은 검색 결과 ISP 측에서 할당받은 공인 ip로의 접속을 \n\n사설ip로 접근시 차단 하는 경우도 있다고 한다.(데이터 환경의 휴대폰에서는 접속되며, 로컬 컴퓨터로는 접속 x)\n\n* 해결 방법 *\n\n필자 같은 경우 맥북을 사용 중이며 hosts 파일 설정의 변경으로 해결\n\n윈도우는 검색.....\n\n```bash\n$ sudo vim /etc/hosts \n\n/etc/hosts\n... 생략\n127.0.0.1       localhost\n255.255.255.255 broadcasthost\n::1             localhost\n//* 중간 아무 곳이나\n192.168.xx.xxx  공인ip 혹은 도메인\n... 생략\n\n:wq\n```\n이렇게 해결 할 수 있었다.\n\n글이 길어져 다음 편에서.....\n\n<a href=\"https://m.blog.naver.com/pjt3591oo/222242046633\" target=\"_blank\">[참고: nginx설정]</a>\n\n\n<a href=\"https://velog.io/@yomi/Mac-%ED%98%B8%EC%8A%A4%ED%8A%B8hosts-%ED%8C%8C%EC%9D%BC-%ED%84%B0%EB%AF%B8%EB%84%90%EB%A1%9C-%EC%88%98%EC%A0%95-%EB%B0%8F-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0\" target=\"_blank\">[참고: hosts파일 설정]</a>",
        createdAt: "2023-12-28 14:50:56",
        updatedAt: "2023-12-28 14:50:56"
      },
      {
        id: "281af4ae-a091-4e02-9d5e-0a5f47612a9e",
        title: "우분투 웹서버 만들기 3",
        body: "# 우분투 웹서버 만들기\n이제 우분투 웹서버 만들기 세번째...⚙️\n\n오늘은 Let's Encrypt를 활용해 인증서를 발급 받은 뒤 https를 적용해 보자.\n\nLet's Encrypt는 https 보급을 위해 무료로 ssl인증서를 발급해 주는 비영리 프로젝트라고 한다.\n\n> Let's Encrypt의 인증서 발급 방식은 3가지가 있다.\n> \n> 1 Webroot: 배포한 웹서버 내에 인증서를 위치 시키고 nginx에서 읽어오게 하는 방식인듯 하다.\n>\n> 2 webserver: Nginx 나 Apach 와 같은 웹서버의 옵션을 설정해 SSL 인증을 실시\n>\n> 3 StandAlone: 가장 간편, 빠르고 안전하지만 서비스를 중단해야 함.\n>\n> 4 DNS: DNS의 TXT레코드를 이용해 인증받는 방식\n>\n> 필자는 3번 standalone의 방식을 택했다. \n>\n> 서비스를 중단해야 하지만, 서비스의 중단에 별다른 타격이 없고 간편하게 적용 가능해서 선택 하였음.\n>\n> ```\n> version\n> ubuntu 20.04.6 LTS\n> nginx 1.18.0\n> certbot 0.40.0\n>``` \n\n\n### 1. certbot && Let's Encrypt 설치\n\n```bash\n$ sudo apt-get update\n$ sudo apt-get install letsencrypt -y\n//* certbot이 같이 설치 됨\n```   \n\n### 2. 인증서 생성\n```bash\n//* nginx 서비스 중지\n//* service 명령 혹은 systemctl(필자는 service)\n$ sudo service nginx stop\n$ sudo service nginx status\n   \n//* 권한 변경\n$ sudo su\n//* 여러개 도메인 등록 가능 하며 실제 도메인이 존재 해야 한다.(가비아, iteasy 등등에서 구매)\n$  certbot certonly --standalone -d 도메인주소 -d www.example.me -d dev.example.me -d test.example.me \n//* 이메일 주소 입력하라면 하고 동의 하라면 한다\n\n//* 이런 문구 나오면 성공\nIMPORTANT NOTES:\n- Congratulations! Your certificate and chain have been saved at:\n   /etc/letsencrypt/live/example.com/fullchain.pem\n   Your key file has been saved at:\n   /etc/letsencrypt/live/example.com/privkey.pem\n//* 밑에는 기부 어쩌고 \n\n//* nginx 재시작\n$ sudo service nginx restart\n```\n### 3. nginx 설정\n```bash\n$ sudo vim /etc/nginx/sites-available/default\n//* 80 port를 https로 redirect\nserver {\n    listen 80;\n    listen [::]:80;\n    server_name _;\n\n    return 301 https://$host$request_uri;\n}\n\n//* 프로젝트 파일 설정\n$ sudo vim /etc/nginx/sites-available/본인서버이름 혹은 프로젝트이름\nserver {\n    listen 443 ssl;\n    listen [::]:443 ssl;\n    server_name 도메인주소;\n    \n    ssl_certificate \"/etc/letsencrypt/live/도메인주소/fullchain.pem\";\n    ssl_certificate_key \"/etc/letsencrypt/live/도메인주소/privkey.pem\";\n    ssl_prefer_server_ciphers on;\n\n    location / {\n                proxy_set_header Host $host;\n                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n                proxy_set_header X-Forwarded-Proto $scheme;\n                proxy_set_header Upgrade $http_upgrade;\n                proxy_set_header Connection \"upgrade\";\n                proxy_set_header X-Real-IP $remote_addr;\n                proxy_pass http://127.0.0.1:설정한포트;\n        }\n}\n\n//* 링크\n$ sudo ln -s /etc/nginx/sites-available/프로젝트파일명 /etc/nginx/sites-enabled/프로젝트파일명\n\n//* nginx 설정 오류 검사\n$ sudo nginx -t\n\n//* nginx 재시작\n$ sudo nginx -s reload\n```\n\n필자는 https 적용이 안되어서...\n\n아니 적용은 되었는데 사설 ip 안에서 접속이 되어\n\n외부에서도 접속이 되는 줄 알았는데 접속이 되지 않았다...\n\n정확한 이유는 모르나 허망할 정도로 가까운 곳에 있었다...\n\n필자와 같이 개인 서버 만들때 isp에서 접속을 차단하는 경우도 있다고 한다.\n\n예전에 공인ip 분배기함에서 80 포트는 내부로 포트포워딩 해 놓았는데 \n\n443은 안해 놓은 것이 문제였다.....\n\n개인 서버 운영하는 분들은 분배기 포트포워딩 ...신경 써야 한다...\n",
        createdAt: "2024-01-03 11:14:36",
        updatedAt: "2024-01-03 11:14:36"
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Post");
  }
};
