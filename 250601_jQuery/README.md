# 📘 jQuery DOM 조작 실습 모음

> 이 폴더는 jQuery를 활용한 DOM 조작 실습 예제들을 모아둔 공간입니다.  
각 실습은 동적인 요소 생성, 삭제, 스타일 변경, 정렬 등 jQuery의 핵심 기능을 학습하는 데 초점을 두고 있습니다.

---

## 📁 파일 목록 및 설명

### 1️⃣ `ex1.32.domjQuery.html`
- `ul` 태그와 `li` 항목을 JavaScript 배열을 기반으로 **동적으로 생성**.
- 두 가지 방식으로 리스트를 생성하는 방법 비교.
- 핵심 기능: `.append()`, `for...of`, 배열 순회 및 동적 DOM 삽입.

### 2️⃣ `ex2.32.domjQuery.html`
- **숫자 리스트 동적 추가/삭제/초기화/선택 삭제** 구현.
- `li` 항목을 버튼으로 제어하며 리스트 조작 학습.
- 핵심 기능: `.click()`, `.append()`, `.remove()`, `.val()` 활용.

### 3️⃣ `ex3.32.domjQuery.html`
- 버튼 클릭 시 `div` 요소의 **스타일 변경 및 클래스 토글**.
- 배경색 변경, 크기 조절, 클래스 추가/삭제 등 실시간 UI 제어 구현.
- 핵심 기능: `.css()`, `.addClass()`, `.removeClass()`, `.width()`, `.height()`.

### 4️⃣ `ex4.32.domjQuery.html`
- **학생 성적표** 구현: 데이터 불러오기, 등록, 삭제, 정렬, 총점 계산 등 포함.
- 테이블 기반 데이터 관리 및 합계 출력 등 복합 기능 연습.
- 핵심 기능: `.append()`, `.children().remove()`, `.click()`, `addEventListener()`, `.map()`, `Math.max()`, `.val()`, `Array.push()` 등.
- 실습 난이도가 높아 jQuery 및 DOM 조작의 통합 복습에 적합.

---

## 🧠 학습 포인트
- jQuery의 기초 사용법: `$()`, `.val()`, `.css()`, `.append()`, `.remove()`
- 이벤트 기반 DOM 조작
- 동적 HTML 요소 추가 및 제어
- 배열 및 객체 기반 동적 UI 생성
- 사용자 입력에 따른 조건 처리 로직 구성

---

## 🚀 실행 방법
브라우저에서 각 `.html` 파일을 더블 클릭하거나 VS Code 등에서 Live Server로 실행하세요.

---

## 📌 참고
- jQuery CDN 버전: 3.7.1 사용  
- 각 예제는 독립적으로 실행되며, JSON 서버 등 백엔드는 필요하지 않습니다.

---

## 📁 폴더 예시 구조
📂 250601_jQuery
├── ex1.32.domjQuery.html
├── ex2.32.domjQuery.html
├── ex3.32.domjQuery.html
├── ex4.32.domjQuery.html
└── README.md