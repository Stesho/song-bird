import { default as birdsDataRU } from '../birdsdata.js'
import { default as birdsDataEN } from '../birdsdataEN.js'

const birdsData = {
  ru : birdsDataRU,
  en : birdsDataEN
}

const langSelector = document.querySelector('.footer__lang-selection');
const headerScore = document.querySelector('.header__score');
const nextLevelBtn = document.querySelector('.game__next-btn');
const mainWinBtn = document.querySelector('.main__win-btn');
const questionTitle = document.querySelector('.question__title');
const gameAnswers = document.querySelector('.game__answers');

let currentLevel = 0;

const dictionary = {
  ru : {
    score: 'Баллы: ',
    headerNav: ['Главная', 'Викторина', 'Галерея'],
    gameTitle: 'Распознавания птиц по их голосам',
    btnStart: 'Начать игру',
    levels: ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'],
    answerPlaceholder: 'Послушайте плеер. Выберите птицу из списка.',
    btnNext: 'Следующий уровень',
    winTitle: 'Поздравляем!',
    winText: 'Вы набрали максимальное количество баллов (30 из 30).<br> По ТЗ кнопки рестарта тут быть не должно, поэтому можете перейти на "главную" страницу )',
    winText2: ['Вы набрали ',' из 30 возможных баллов. Попробуйте ещё раз!'],
    btnRetry: 'Попробовать ещё раз!',
  },
  en : {
    score: 'Score: ',
    headerNav: ['Main', 'Quiz', 'Gallery'],
    gameTitle: 'Recognizing birds by their voices',
    btnStart: 'Start quiz',
    levels: ['Warm-up', 'Passerines', 'Forest Birds', 'Songbirds', 'Birds of Prey', 'Sea Birds'],
    answerPlaceholder: 'Listen to the recording. Select a bird from the list.',
    btnNext: 'Next level',
    winTitle: 'Congratulations!',
    winText: `You've scored the maximum number of points (30 of 30).<br> According to the task, the restart button should not be here, so you can go to the "main" page)`,
    winText2: [`You've scored`,'out of 30 possible points. Try again!'],
    btnRetry: `Let's try one more time!`,
  }
}

let lang;
if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
}
if (!(lang in dictionary)){ lang= 'ru' }
const lang_buttons = Array.from(langSelector.children);
lang_buttons.forEach(element => element.addEventListener('click', (el) => {
  lang = el.target.id;
  setLanguage();
}))

function setLanguage() {
  lang_buttons.forEach(element => element.classList.remove('footer__lang_active'));
  document.getElementById(lang).classList.add('footer__lang_active');
  headerScore.children[0].textContent = dictionary[lang].score;
  document.querySelectorAll('.header__nav-item').forEach((block, index) => {
    block.textContent = dictionary[lang].headerNav[index];
  })
  document.querySelector('.main__welcome-title').textContent = dictionary[lang].gameTitle;
  document.querySelector('.main__welcome-btn').textContent = dictionary[lang].btnStart;
  document.querySelectorAll('.game__level').forEach((block, index) => {
    block.textContent = dictionary[lang].levels[index];
  })
  document.querySelector('.selected-answer__placeholder').textContent = dictionary[lang].answerPlaceholder;
  nextLevelBtn.textContent = dictionary[lang].btnNext;
  document.querySelector('.main__win-title').textContent = dictionary[lang].winTitle;
  document.querySelector('.main__win-text').innerHTML = dictionary[lang].winText;
  document.querySelector('.main__win-text2').textContent = dictionary[lang].winText2[0];
  document.querySelector('.main__win-text4').textContent = dictionary[lang].winText2[1];
  mainWinBtn.textContent = dictionary[lang].btnRetry;
  if (questionTitle.textContent !== '*****') {
    questionTitle.textContent = birdsData[lang][currentLevel][answerCorrect].name
  }
  Array.from(gameAnswers.children).forEach((element, index) => {
    element.textContent =  birdsData[lang][currentLevel][index].name
  })
  updateSelectedAnswer(birdsData[lang][currentLevel][answerSelected]);
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.gallery__level').forEach((block, index) => {
    block.textContent = dictionary[lang].levels[index];
  })
  document.querySelectorAll('.gallery__bird').forEach((block, index) => {
    block.textContent = birdsData[lang][galleryLevelSelected][index].name
  })
  updateGalleryBird()
}

setLanguage()
