const slides = document.querySelectorAll('.slide');
const slideMenu = slides[0];
const slideEasy = slides[1];
const slideMiddle = slides[2];
const slideHard = slides[3];
const btnStart = document.querySelector('.start-btn');
const radio = document.querySelectorAll('.list-level__radio');
const rectangleAll = document.querySelectorAll('.rectangle');
const cards = document.querySelectorAll('.flip-card');

function assignHendler() {
  Array.from(radio).forEach(radio => radio.addEventListener('click', showRectangle));
  Array.from(cards).forEach(card => card.addEventListener('click', flipCard));
}

assignHendler();

function showRectangle(event) {
  const rectangleActive = event.target.nextElementSibling.firstElementChild;
  rectangleActive.style.opacity = '1';

  switch (event.target.value) {
     case 'easy':
       rectangleAll[1].style.opacity = '0';
       rectangleAll[2].style.opacity = '0';
       break;
     case 'middle':
       rectangleAll[0].style.opacity = '0';
       rectangleAll[2].style.opacity = '0';
       break;
     case 'hard':
       rectangleAll[0].style.opacity = '0';
       rectangleAll[1].style.opacity = '0';
       break;
     default:
       console.log('Ошибка');
   }
}

btnStart.addEventListener('click', () => {
  let level = Array.from(radio).filter(item => item.checked);
  level[0].nextElementSibling.firstElementChild.style.opacity = '0';
  slideMenu.classList.remove('active');
  insertWinCard(level[0].value);

  switch (level[0].value) {
    case 'easy':
      slideEasy.classList.add('active');
      break;
    case 'middle':
      slideMiddle.classList.add('active');
      break;
    case 'hard':
      slideHard.classList.add('active');
      break;
    default:
    console.log('Ошибка в значении');
  }
});

function insertWinCard(level) {
  if (level === 'easy') {
    const easyCard = slideEasy.querySelectorAll('.flip-card__back');
    easyCard[getNumberCard(3, 0)].style.backgroundImage = 'url(img/card-win.svg)';
  }
  if (level === 'middle') {
    const middleCard = slideMiddle.querySelectorAll('.flip-card__back');
    middleCard[getNumberCard(6, 0)].style.backgroundImage = 'url(img/card-win.svg)';
  }
  if (level === 'hard') {
    const hardCard = slideHard.querySelectorAll('.flip-card__back');
    hardCard[getNumberCard(10, 0)].style.backgroundImage = 'url(img/card-win.svg)';
  }
}

function getNumberCard(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function flipCard() {
  this.classList.add('flip');

  Array.from(cards).forEach(card => card.removeEventListener('click', flipCard));
  Array.from(this.parentElement.querySelectorAll('.flip-card'))
    .forEach(card => card.addEventListener('click', makeRestart));
}

function makeRestart() {
  this.parentElement.classList.remove('active');
  slideMenu.classList.add('active');

  assignHendler();
  Array.from(cards).forEach(card => card.removeEventListener('click', makeRestart));
  unFlipCard();
}

function unFlipCard() {
  document.querySelector('.flip').classList.remove('flip');
}
