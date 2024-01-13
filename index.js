let navigator = document.getElementById('navigator');
let prevBtn = document.getElementById('prevBtn');
let dateDisplay = document.getElementById('dateDisplay');
let nextBtn = document.getElementById('nextBtn');
let wordsBox = document.getElementById('wordsBox');
let testBox = document.getElementById('testBox');
let test1Btn = document.getElementById('test1Btn');
let test2Btn = document.getElementById('test2Btn');
let test3Btn = document.getElementById('test3Btn');
let doneCheck = document.getElementById('doneCheck');

let url = new URL(location.href)
let params = (url.searchParams)
let currentDate;
let prevDate;
let nextDate;
let verses = [];
let book;
let chapter;

//새로고침
let resetPage = () => {
  params.set('m', new Date().getMonth());
  params.set('d', new Date().getDate());
  window.location.href = url;
}

//파라미터 세팅
currentDate = new Date();
if(params.get("m")) currentDate.setMonth(params.get("m"));
if(params.get("d")) currentDate.setDate(params.get("d"));

prevDate = new Date(currentDate);
prevDate.setDate(prevDate.getDate()-1);
nextDate = new Date(currentDate);
nextDate.setDate(nextDate.getDate()+1);

//navigator 세팅
dateDisplay.innerText = `${currentDate.getMonth()+1}월${currentDate.getDate()}일`;
prevBtn.innerText = `${prevDate.getMonth()+1}월${prevDate.getDate()}일`;
nextBtn.innerText = `${nextDate.getMonth()+1}월${nextDate.getDate()}일`;

//기준이 1월1일인 경우 
if(currentDate.getMonth() == 0 && currentDate.getDate() == 1) prevBtn.hidden = true;
//기준이 12월 31일인 경우
if(currentDate.getMonth() == 11 && currentDate.getDate() == 31) nextBtn.hidden = true;

let currentMonth = currentDate.getMonth()+1;
let currentDay = currentDate.getDate();

//암기 체크
let lsId = ('00' + currentMonth).slice(-2)+('00' + currentDay).slice(-2);
let isDone = localStorage.getItem(lsId);
if(isDone) doneCheck.checked = true;

const getBook = async () => {
  let wordsData = await fetch('words.json');
  let data = await wordsData.json();
  
  //아직 구절이 추가 안된 경우
  if(!data[currentMonth] || !data[currentMonth][currentDay]){
    alert('Not yet!!!');
    resetPage();
  } 

  while(wordsBox.firstChild){
    wordsBox.removeChild(wordsBox.firstChild)
  }
  book = data[currentMonth][currentDay].book;
  chapter = data[currentMonth][currentDay].chapter;
  verses = data[currentMonth][currentDay].verses;

  printWord();

  let tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate()+1);
  if(!data[tomorrow.getMonth()+1] || !data[tomorrow.getMonth()+1][tomorrow.getDate()])  nextBtn.hidden = true;
}

const printWord = (flag='word') => {
  while(wordsBox.firstChild){
    wordsBox.removeChild(wordsBox.firstChild)
  }

  for(let verse of verses){
    let verseP = document.createElement('p');
    let verseSpan = document.createElement('span');
    let verNum = verse.verse;
    if(flag == 'word')  verseSpan.innerHTML = verNum + ". " + verse.word;
    else if(flag == 'test1')  verseSpan.innerHTML = verNum + ". " + verse.test1;
    else if(flag == 'test2')  verseSpan.innerHTML = verNum + ". " + verse.test2;
    else if(flag == 'test3')  verseSpan.innerHTML = verNum + ". ";
    verseP.appendChild(verseSpan);
    wordsBox.appendChild(verseP);
  }
  let bookP = document.createElement('p');
  let bookSpan = document.createElement('span');
  bookSpan.innerHTML = `${book} ${chapter}장`
  bookP.appendChild(bookSpan);
  wordsBox.appendChild(bookP);
}

//실행
getBook()

prevBtn.onclick = () => {
  currentDate.setDate(currentDate.getDate()-1);
  params.set('m', currentDate.getMonth());
  params.set('d', currentDate.getDate());
  window.location.href = url;
}

nextBtn.onclick = () => {
  currentDate.setDate(currentDate.getDate()+1);
  params.set('m', currentDate.getMonth());
  params.set('d', currentDate.getDate());
  window.location.href = url;
}

//암기 완료 체크
doneCheck.onchange = () => {
  if(doneCheck.checked){
    localStorage.setItem(lsId, true);
    alert('완료');
  }
  else {
    localStorage.removeItem(lsId);
    alert('취소');
  }
}

//버튼 이벤트
test1Btn.onmousedown = () => printWord('test1');
test1Btn.ontouchstart = () => printWord('test1');
test1Btn.onmouseup = () => printWord();
test1Btn.ontouchend = () => printWord();
test1Btn.onmouseleave = () => printWord();
test1Btn.ontouchcancel = () => printWord();

test2Btn.onmousedown = () => printWord('test2');
test2Btn.ontouchstart = () => printWord('test2');
test2Btn.onmouseup = () => printWord();
test2Btn.ontouchend = () => printWord();
test2Btn.onmouseleave = () => printWord();
test2Btn.ontouchcancel = () => printWord();

test3Btn.onmousedown = () => printWord('test3');
test3Btn.ontouchstart = () => printWord('test3');
test3Btn.onmouseup = () => printWord();
test3Btn.ontouchend = () => printWord();
test3Btn.onmouseleave = () => printWord();
test3Btn.ontouchcancel = () => printWord();

