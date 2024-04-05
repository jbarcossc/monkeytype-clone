const $time = document.querySelector('time'),
  $paragraph = document.querySelector('p'),
  $input = document.querySelector('input'),
  INITIAL_TIME = 30,
  TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

let words = [],
  currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = TEXT.split(' ').slice(0, 32);
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime;

  $paragraph.innerHTML = words
    .map((word, index) => {
      const letters = word.split('');
      return `
      <m-word>${letters.map((letter) => `<m-letter>${letter}</m-letter>`).join('')}
      </m-word>
    `;
    })
    .join('');

  const $firstWord = $paragraph.querySelector('m-word');
  $firstWord.classList.add('active');
  $firstWord.querySelector('m-letter').classList.add('active');

  const intervalId = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;
    if (currentTime === 0) {
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
}

function initEvents() {
  document.addEventListener('keydown', () => {
    $input.focus();
  });
  $input.addEventListener('keydown', onKeyDown);
  $input.addEventListener('keyup', onKeyUp);
}

function gameOver() {}

function onKeyDown() {}

function onKeyUp() {
  const $currentWord = $paragraph.querySelector('m-word.active');
  const $currentLetter = $currentWord.querySelector('m-letter.active');
  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;
  const $allLetters = $currentWord.querySelectorAll('m-letter');
  $allLetters.forEach(($letter) => $letter.classList.remove('correct', 'incorrect'));
  $input.value.split('').forEach((char, index) => {
    const $letter = $allLetters[index],
      $nextLetter = $allLetters[index + 1],
      letterToCheck = currentWord[index],
      isCorrect = char === letterToCheck,
      letterClass = isCorrect ? 'correct' : 'incorrect';
    $letter.classList.remove('active');
    $nextLetter?.classList.add('active');
    $letter.classList.add(letterClass);
  });
}
