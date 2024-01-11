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

//파라미터가 없는 경우 초기화
if(!params.get("m") || !params.get("d")){
  resetPage();
}

//파라미터 세팅
currentDate = new Date();
currentDate.setMonth(params.get("m"));
currentDate.setDate(params.get("d"));

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

fetch('https://justin-dongwook-jung.github.io/words/words.json').then(result => {
  result.json().then(data => {
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
    
    printWord('test1');
  })
})

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
