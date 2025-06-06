$(function () {
  // 말 img 가져오기
  const myHorse = $("#myHorse");
  const num1Horse = $("#lane1_Horse");
  const num2Horse = $("#lane2_Horse");
  const num3Horse = $("#lane3_Horse");

  // 전체 경기 시작,종료 시점
  let raceStart = false;

  // 중복 종료 방지용 변수
  // 계속 시도해도 내 말이 1위를 했을때만 오류가 나서 gpt한테 물어봤다.내 말이 stopGame() 함수를 실행해도
  // interval() 을 종료하지 못한 부분까지는 생각했는데 그 부분 해결방법을 찾다가 못 찾음
  let isGameOver = false;

  // 랭킹 박스 가져오기 함수
  const rankingCreate = (ranking_1, ranking_2, ranking_3, ranking_4) => {
    $("#rankingBox").children().remove();
    $("#rankingBox").append(`
        <span id="ranking_1">★★★1등 : ${ranking_1}번 레인★★★</span>
        <span id="ranking_2">2등 : ${ranking_2}번 레인</span>
        <span id="ranking_3">3등 : ${ranking_3}번레인</span>
        <span id="ranking_4">4등 : ${ranking_4}번 레인</span>
        `);
  };

  // keypress 이벤트 발생시 내 말을 좌측으로 움직이기 기능 함수
  const myHorseMoveFunc = () => {
    // 게임이 끝났거나 시작 전이면 동작 X 이걸 넣지않으면 계속 움직임
    if (!raceStart || isGameOver) return;

    // 현재 나의 말 위치를 가져오기
    let currentPosition = myHorse.position().left;

    // 한번 keypress 할때마다 움직일 px 값
    const movePx = 20;

    // myHores 움직이기
    myHorse.css("left", `${currentPosition + movePx}px`);

    // 말이 1640px 정도 까지 움직이면 끝까지 가는것 같다 그때 경기 끝
    if (parseInt(currentPosition) > 1640 || !raceStart) {
      stopGame();
    }
  }; // myHorseMoveFunc() 끝 라인

  // 1초마다 1번 레인 말을 움직여 보자 // 변수들을 setInterval 안에 넣어야 잘 움직임

  let interval;
  const moveRaceFunc = (level) => {
    if (isGameOver) return;
    interval = setInterval(() => {
      // 랜덤으로 각각 움직이게 만들 수 생성
      const ranMove1Horse = 50 + Math.floor(Math.random() * 50);
      const ranMove2Horse = 50 + Math.floor(Math.random() * 50);
      const ranMove3Horse = 50 + Math.floor(Math.random() * 50);

      // 말들의 위치 가져오기
      let num1CurrentPosition = num1Horse.position().left;
      let num2CurrentPosition = num2Horse.position().left;
      let num3CurrentPosition = num3Horse.position().left;

      // 모든말 움직이기
      num1Horse.css("left", `${num1CurrentPosition + ranMove1Horse}px`);
      num2Horse.css("left", `${num2CurrentPosition + ranMove2Horse}px`);
      num3Horse.css("left", `${num3CurrentPosition + ranMove3Horse}px`);

      // 경기 종료의 경우
      if (
        parseInt(num1CurrentPosition) > 1640 ||
        parseInt(num2CurrentPosition) > 1640 ||
        parseInt(num3CurrentPosition) > 1640 ||
        !raceStart
      )
        stopGame();
    }, level); // interval 종료 시간을 지정해주는 곳에 level 파라미터에 받아온 인자를 넣을거다.
  }; // moveRaceFunc 끝 라인

  // 게임 시작 함수 // level로 받아온 인자를 moveRaceFunc 말들 움직이는 시간에 그대로 전달
  // switch 를 이용해 각각 난이도에 따라 while(true) 문을 이용하려고 했는데 잘 안되서 게임시작 함수를 따로 만듬
  const gameStart = (level) => {
    // 게임이 진행중이면 게임 실행이 안되게 return
    if (raceStart) return;

    // 게임 시작 변수 true
    raceStart = true;

    // keypress 이벤트가 일어나면 myHorseMoveFunc 함수(내 말을 움직일 함수) 작동
    $("body").on("keyup", myHorseMoveFunc);

    // 나를 제외한 1~3번 레인 말 움직이는 함수
    moveRaceFunc(level);
  };

  // 게임 종료 함수
  const stopGame = () => {
    if (isGameOver) return; // 이미 종료된 경우 함수 종료
    isGameOver = true;

    clearInterval(interval);
    // 게임 시작 변수를 false 로
    raceStart = false;

    $("body").off("keyup", myHorseMoveFunc); // 클릭이벤트 제거

    // 랭킹을 정하기 위해 각 말들의 위치 값을 저장
    // sort() 로 비교하기 위해서 배열에 저장을 했다.
    const rankNum = [
      { line: 1, position: num1Horse.position().left },
      { line: 2, position: num2Horse.position().left },
      { line: 3, position: num3Horse.position().left },
      { line: 4, position: myHorse.position().left },
    ];
    // 내림차순으로 0번~3번 인덱스가 1위~4위
    rankNum.sort((a, b) => {
      return b.position - a.position;
    });

    // 랭킹 박스 생성 인자로 1위인 0번 인덱스 부터의 line을 보내줌
    rankingCreate(
      rankNum[0].line,
      rankNum[1].line,
      rankNum[2].line,
      rankNum[3].line
    );
    alert("경기 끝입니다.");
  };

  // 게임 시작 버튼 클릭
  $("#start").click(() => {
    // gameStart(level)에 보내줄 level 변수를 선언
    let level;

    // 시작 하면 시작 안내글 삭제
    $("#rankingBox").children().remove();
    // 난이도 가져오기
    const gameLevel = $("#gameLevel").val();

    // 난이도 별로 최종적으로 setInterval 함수에 전달될 level 변수에 속도 할당
    switch (gameLevel) {
      case "easy":
        level = 1400;
        break;

      case "normal":
        level = 800;
        break;

      case "hard":
        level = 500;
        break;
    }
    // 게임시작 함수 실행 !
    gameStart(level);
  }); // 게임 시작 버튼 클릭 끝 라인

  // reset 함수 만들기
  const initFunc = () => {
    raceStart = false; // 진행 변수 false
    isGameOver = false; // 진행 변수 false

    clearInterval(interval);
    $("body").off("keyup", myHorseMoveFunc); // 이벤트 제거

    // 말들의 위치 초기화
    myHorse.css("left", "0px");
    num1Horse.css("left", "0px");
    num2Horse.css("left", "0px");
    num3Horse.css("left", "0px");
    // reset 하면 게임 안내문 다시 표기하기
    $("#rankingBox").html(
      "<p>난이도를 선택하고 게임 시작 버튼을 누르세요!</p>"
    );
  };

  // reset 버튼 클릭 이벤트
  $("#reset").click(initFunc); // reset 버튼 클릭 이벤트 라인 끝
}); // function 라인 끝
