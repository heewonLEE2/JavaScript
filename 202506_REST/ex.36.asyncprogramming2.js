// JSON서버를 활용한 REST 실습 (jQuery로 구현)

// 파일
// 1. ex.36.asyncprogramming2.html
// 2. ex.36.asyncprogramming2.js
// 3. todos.json
//     [
//         {"id":1, "todo":"할일1", "completed":true},
//         {"id":2, "todo":"할일2", "completed":false}
//     ]

// 구현 기능
// 1. 목록버튼 클릭시 할일 목록을 테이블에 표시
// 2. 번호를 입력하고 보기버튼 클릭시 번호에 해당하는 할일을 테이블에 표시
// 3. 할일과 완료여부를 등록하고 등록버튼 클릭시 목록에 할일을 등록
// 4. 할일과 완료여부를 수정하고 수정버튼 클릭시 할일정보를 수정
// 5. 삭제버튼 클릭시 할일정보를 삭제
// 선택구현)
// 1. localStorage 활용
// 2. 할일 검색
// 3. 완료/미완료 검색
$(function () {
  const todoid = $("#todoid");
  const todoInput = $("#todo");
  const compleSelec = $("#sel");
  let responseArr;

  // tr 생성 함수 파라미터에 데이터배열를 받아서 forEach
  const datarow = (responseArr) => {
    $("tbody").children().remove();
    for (const data of responseArr) {
      $("tbody").append(`
        <tr>
        <td>${data.id}</td>
        <td><input type="text" id="input_${data.id}" value = ${data.todo} /></td>
        <td>
        <select id="selec_${data.id}">
        <option value="${data.completed}" selected disabled hidden>${data.completed}</option>
        <option value="false">false</option>
        <option value="true">true</option>
        </select>
        </td>
        <td><button class=modifyBtn data-todo=${data.id}>수정하기</button>
        <button class=deleteBtn data-todo=${data.id}>삭제하기</button>
        </td>
        </tr>
        `);
    }
    // responseArr.forEach((data) => {});

    // 삭제 버튼 클릭시 삭제 이벤트 추가
    $(".deleteBtn").click((e) => {
      const deleteId = e.target.dataset.todo;
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `http://localhost:7777/todos/${deleteId}`);
      xhr.send();
      xhr.onload = () => {
        alert("삭제가 완료되었습니다..");
        $("tbody").children().remove();
      };
    });

    // 수정 버튼 클릭시 수정 이벤트 추가
    $(".modifyBtn").click((e) => {
      const modBtnVal = e.target.dataset.todo;
      const inputVal = $(`#input_${modBtnVal}`).val();
      const seleVal = $(`#selec_${modBtnVal}`).val();
      const changeObj = {
        id: modBtnVal,
        todo: inputVal,
        completed: seleVal,
      };
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `http://localhost:7777/todos/${modBtnVal}`);
      xhr.send(JSON.stringify(changeObj));
      xhr.onload = () => {
        alert("수정이 완료되었습니다.");
        $("tbody").children().remove();
      };
    });
  }; // 생성 함수 라인 끝 **

  // todo 데이터 목록 가져오기 버튼
  $("#listBtn").click((e) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:7777/todos");
    xhr.send();
    xhr.onload = () => {
      responseArr = JSON.parse(xhr.response);
      // 데이터 생성 함수;
      datarow(responseArr);
      console.log(responseArr);
    };
  }); // 테이블 가져오기 버튼 라인 끝 **

  // todo 등록 버튼
  $("#regiBtn").click((e) => {
    if (!$("#todoid").val() || !$("#todo").val() || !$("#sel").val()) {
      alert("빈 부분을 꼭 채워주세요");
      return;
    }

    // 중복된 아이디면  리턴하기위해
    let duplication = false;
    responseArr.forEach((ele) => {
      if (ele.id == $("#todoid").val()) {
        duplication = true;
        alert("이미 등록된 아이디 입니다.");
        return;
      }
    });
    // 위에 함수에서만 return을 하면 내부함수만 return 아니면 아래가 실행된다.
    if (duplication) return;

    const regiObj = {
      id: todoid.val(),
      todo: todoInput.val(),
      completed: compleSelec.val(),
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:7777/todos");
    xhr.send(JSON.stringify(regiObj));
    xhr.onload = () => {
      alert("todo List에 등록 되었습니다.");
      $("tbody").children().remove();
    };
  }); // todo 등록 버튼 라인 끝 **

  // 원하는 목록 보기 버튼
  $("#numberBtn").click(() => {
    const numberVal = $("#numberInput").val();

    // 원하는 아이디가 데이터 목록에 존재하지 않으면 return
    let trueCount = 0;
    responseArr.forEach((ele) => {
      // Object.values로 해야 ele.id.value들이 배열로 나오고 배열에 includes를 사용함
      if (Object.values(ele.id).includes(numberVal)) {
        trueCount++;
      }
    });
    // id가 있어서 count가 올라가면 정상 0이면 찾을 아이디가 없는거
    if (trueCount == 0) {
      alert("존재하지 않는 아이디 입니다.");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:7777/todos/${numberVal}`);
    xhr.send();
    xhr.onload = () => {
      responseArr = JSON.parse(xhr.response);
      const arr = [responseArr];
      // 원하는 목록 데이터만으로 테이블 생성(생성 함수를 사용하려고 하니 1개
      // 데이터를 객체로 받아와서 forEach 를 못쓴다. 다른 방법 생각해보기)
      // => url 뒤에 아이디로 직접 요청하니 객체로 요청이 온다.(배열x) 위처럼 배열로
      // 만들어버렸다.
      console.log(arr);
      datarow(arr);
    };
  }); // 원하는 목록 보기 라인 끝 **

  // 미완료 목록만 보기 버튼
  $("#falseComBtn").click(() => {
    const xhr = new XMLHttpRequest();
    // 쿼리 형식으로 원하는 데이터 가져오기
    xhr.open("GET", `http://localhost:7777/todos/?completed=false`);
    xhr.send();
    xhr.onload = () => {
      responseArr = JSON.parse(xhr.response);
      console.log(responseArr);

      datarow(responseArr);
    };
  });
  // 완료 목록만 보기 버튼
  $("#trueComBtn").click(() => {
    const xhr = new XMLHttpRequest();
    // 쿼리 형식으로 원하는 데이터 가져오기
    xhr.open("GET", `http://localhost:7777/todos/?completed=true`);
    xhr.send();
    xhr.onload = () => {
      responseArr = JSON.parse(xhr.response);
      console.log(responseArr);

      datarow(responseArr);
    };
  });
}); // ** $(function) 라인 끝 **
