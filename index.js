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

//기준 날짜
let currentDate = new Date();
let prevDate;
let nextDate;

let verses = [];

const setDateVariable = () => {
  prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate()-1);
  nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate()+1);
  
  //navigator 세팅
  dateDisplay.innerText = `${currentDate.getMonth()+1}월${currentDate.getDate()}일`;
  prevBtn.innerText = `${prevDate.getMonth()+1}월${prevDate.getDate()}일`;
  nextBtn.innerText = `${nextDate.getMonth()+1}월${nextDate.getDate()}일`;
}

currentDate.setDate(currentDate.getDate()-8);
setDateVariable();

//기준이 1월1일인 경우 
if(currentDate.getMonth() == 0 && currentDate.getDate() == 1) prevBtn.hidden = true;
//기준이 12월 31일인 경우
if(currentDate.getMonth() == 11 && currentDate.getDate() == 31) nextBtn.hidden = true;


const getVerses = () => {
  let currentMonth = currentDate.getMonth()+1;
  let currentDay = currentDate.getDate();

  fetch('words.json').then(result => {
    result.json().then(data => {
      verses = data[currentMonth][currentDay];
      console.log(verses);
    })
  })
}

getVerses();
