let randomNumber=Math.floor(Math.random()*100)+1;

const guesses=doucument.querySelector('.guesses');
const lastResult=doucument.querySelector('.lastResult');
const lowOrHi=doucument.querySelector('.lowOrHi');

const guessSubmit=doucument.querySelector('.guessSubmit');
const guessField=doucument.querySelector('.guessField');

let guessCount=1;
let resetButton;

