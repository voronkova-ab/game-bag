const slideMenu = document.querySelector('.slide_menu');
const slide = document.querySelectorAll('.slide')[1];
const container = document.querySelector('.container');
const btnStart = document.querySelector('.start-btn');
const rectangleAll = document.querySelectorAll('.rectangle');
const radio = document.querySelectorAll('.list-level__radio');
let cards;

function assignHendlerRadio() {
  Array.from(radio).forEach(radio => radio.addEventListener('click', showRectangle));
}

assignHendlerRadio();

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

  if (level.length === 0) return;

  level[0].nextElementSibling.firstElementChild.style.opacity = '0';

  createCardTable(level[0].value);
  insertWinCard(level[0].value);

  slideMenu.classList.remove('active');
  slide.classList.add('active');
});

function createCardTable(level) {
  let numberCard;
  if (level === 'easy') {
    numberCard = 3;
    slide.classList.add('slide_easy');
  }
  if (level === 'middle') {
    numberCard = 6;
    slide.classList.add('slide_middle');
  }
  if (level === 'hard') {
    numberCard = 10;
    slide.classList.add('slide_hard');
  }

  for (let i = 0; i < numberCard; i++) {
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    slide.append(flipCard);

    const flipCardFace = document.createElement('img');
    flipCardFace.src = 'img/card-face.png';
    flipCardFace.className = 'flip-card__face';
    flipCard.append(flipCardFace);

    const flipCardBack = document.createElement('img');
    flipCardBack.src = 'img/card-back.png';
    flipCardBack.className = 'flip-card__back';
    flipCard.append(flipCardBack);
  }

  cards = document.querySelectorAll('.flip-card');
  Array.from(cards).forEach(card => card.addEventListener('click', flipCard));
}

function insertWinCard(level) {
  const cards = slide.querySelectorAll('.flip-card__back');
  if (level === 'easy') cards[getNumberCard(3, 0)].src = 'img/card-win.png';
  if (level === 'middle') cards[getNumberCard(6, 0)].src = 'img/card-win.png';
  if (level === 'hard') cards[getNumberCard(10, 0)].src = 'img/card-win.png';
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
  slideMenu.classList.add('active');
  this.parentElement.className = 'slide';

  cards.forEach(card => card.remove());

  assignHendlerRadio();

  Array.from(cards).forEach(card => card.removeEventListener('click', makeRestart));
}
