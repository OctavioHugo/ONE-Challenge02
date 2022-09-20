const startGameButton = document.querySelector('.startGame');
startGameButton.addEventListener('click', startGame);

const addWordButton = document.querySelector('.addWord');
addWordButton.addEventListener('click', addWord);

const saveAndStartButton = document.querySelector('.saveAndStart');
saveAndStartButton.addEventListener('click', saveAndStar);

const cancelButton = document.querySelector('.cancel');
cancelButton.addEventListener('click', cancel);

const newGameButton = document.querySelector('.newGame');
newGameButton.addEventListener('click', newGame);

const desistButton = document.querySelector('.desist');
desistButton.addEventListener('click', desist);

function settings() {
    const horcaCanvas = document.querySelector('#canvasDraw');
    const horcaStyle = getComputedStyle(canvasDraw);
    horcaCanvas.width = (horcaStyle.width).split('px')[0];
    horcaCanvas.height = (horcaStyle.height).split('px')[0];

    const lettersCanvas = document.querySelector('#canvasLetters');
    const lettersStyle = getComputedStyle(canvasLetters);
    lettersCanvas.width = (lettersStyle.width).split('px')[0];
    lettersCanvas.height = (lettersStyle.height).split('px')[0];
}

window.onload = settings;

/*Variables*/

var words = ['SPRING', 'DOS', 'ORACLE', 'DAME', 'TRABAJO', 'POR', 'FAVOR'];
var secretWord = '';


/*Funciones de botones*/

function startGame(){
    changePage('none','none','flex');
    secretWord = selectWord();
}


function addWord(){
    changePage('none','flex','none');
}


function saveAndStar(){
    const inputText = document.querySelector('.inputText')
    let newWord = inputText.value; 
    if(isValid(newWord)){
        changePage('none','none','flex');
        words.push(newWord);
        console.log(newWord);
        console.log(words);
        inputText.value = '';
        secretWord = newWord;
    }
}


function cancel(){
    changePage('flex','none','none');
}


function newGame(){
    secretWord = selectWord()
    console.log(secretWord);
}


function desist(){
    changePage('flex','none','none');
}


/*Funcion palabra secreta*/

function selectWord(){
    let randomWord = words[Math.floor(Math.random()*(words.length))];
    return randomWord;
}


/*Navegacion de paginas*/

function changePage (home, dictionary, game) {
    var homePage = document.querySelector('.home');
    var dictionaryPage = document.querySelector('.dictionary');
    var gamePage = document.querySelector('.game');
    homePage.style.display = home;
    dictionaryPage.style.display = dictionary;
    gamePage.style.display = game;
}

/*Validador*/

function isValid(text) {
    var isValid = false;
    if (/^[A-Z]+$/.test(text)) {
        isValid = true;
    }
    if(!isValid){
        alert("Por favor ingrese una palabra utilizando solo letras sin acento");
    }
    return isValid;
}; 


function initialPosition(lettersCanvas, lengthSecretWord) {
    const percentUnderscore = 0.07543;
    const percentSpace = 0.0431;

    const widthCanvas = lettersCanvas.width;
    const widthUnderscore = Math.round(widthCanvas * percentUnderscore);
    const widthSpace = Math.round(widthCanvas * percentSpace);

    const startUndercore = Math.round(widthCanvas / 2) - Math.round((lengthSecretWord * widthUnderscore + (lengthSecretWord - 1) * widthSpace) / 2);

    return [startUndercore, widthUnderscore, widthSpace]
};


function drawUnderscore(lengthSecretWord) {

    const lettersCanvas = document.querySelector('.letters');
    const context = lettersCanvas.getContext('2d');

    if(context) {
        const heightLettersCanvas = lettersCanvas.height;
        const heightPercent = 0.4276;
        const positionY = heightPercent * heightLettersCanvas;
        let startDraw = 0;
        let endDraw = 0;
        let widthUnderscore = 0;
        let widthSpace = 0;

        lettersCanvas.width = lettersCanvas.width;
        [startDraw, widthUnderscore, widthSpace] = initialPosition(lettersCanvas, lengthSecretWord);

        context.lineWidth = 3;
        context.strokeStyle = '#0A3871';
        context.fillStyle = '#0A3871';
        for (let i = 1; i <= lengthSecretWord; i++) {
            endDraw = startDraw + widthUnderscore;
            context.moveTo(startDraw, positionY);
            context.lineTo(endDraw, positionY);
            startDraw = endDraw + widthSpace;
        }
        context.stroke();
    }
};