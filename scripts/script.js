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
let succes = 0;
let mistake = 0;
let selectedLetter = [];

/*Función de administracion del juego*/

function gameManage(event) {
    const inputGame = document.querySelector('#inputAhorcado');
    inputGame.value = '';
    let letter = '';
    
    if (isALetter(event.data.toUpperCase().charCodeAt())) {
        letter = event.data.toUpperCase();
        if(!selectedLetter.includes(letter)){
            if(secretWord.includes(letter)) { 
                succes += letterSucces(secretWord, letter, selectedLetter);
                if(succes == secretWord.length) {
                    switchEvent(false);
                    drawMessage(true);
                }
            } else {
                mistake += letterError(mistake, letter, selectedLetter);
                drawHorca(mistake);
                if(mistake == 9){
                    switchEvent(false);
                    drawMessage(false);
                }
            }
        }
    }
}


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


/* Funcion identificadora de letra*/

function isALetter (codKey){
    console.log(codKey)
    return ((codKey >= 65 && codKey <= 90) || codKey == 209);
}

function letterSucces(word, letter, pressLetter) {
    let newSucces = 0;
    pressLetter.push(letter);
    for(let i = 0; i < word.length; i++) {
        if(word[i] === letter) {
            drawOkLetter(i, letter, word.length);
            newSucces++;
        }
    }
    return newSucces;
}


function letterError(mistake, letter, pressLetter) {
    const newError = 1;
    pressLetter.push(letter);
    drawErrorLetter(mistake, letter);
    return newError;
}

/*Funciones del juego*/

function switchEvent(status) {
    const inputGame = document.querySelector('#inputAhorcado');

    if(status){
        inputGame.removeEventListener('input', gameManage);
        inputGame.addEventListener('input', gameManage);
        inputGame.removeEventListener('blur', keepFocus);
        inputGame.addEventListener('blur', keepFocus);
    } else {
        inputGame.removeEventListener('input', gameManage);
        inputGame.removeEventListener('blur', keepFocus);
    }
}


function keepFocus(){
    const inputGame = document.querySelector('#inputAhorcado');
    inputGame.focus();
}


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


function drawOkLetter(position, letter, lengthSecretWord) {

    const lettersCanvas = document.querySelector('#canvasLetters');
    const context = lettersCanvas.getContext('2d');

    if(context) {
        const widthLettersCanvas = lettersCanvas.width;
        const heightLettersCanvas = lettersCanvas.height;

        const percentFont = 0.0862;
        const heightPercent = 0.375;

        const positionY = heightLettersCanvas * heightPercent;

        let startDraw = 0;
        let endDraw = 0;
        let widthUnderscore = 0;
        let widthSpace = 0;
        let centerX = 0;

        context.font = Math.round(widthLettersCanvas * percentFont) + 'px Inter';

        context.strokeStyle = '#0A3871';
        context.fillStyle = '#0A3871';
        context.textAlign = 'center'; 
        [startDraw, widthUnderscore, widthSpace] = initialPosition(lettersCanvas, lengthSecretWord);
        centerX = widthUnderscore / 2;

        for(let i = 1; i <= position; i++) {
            endDraw = startDraw + widthUnderscore;
            startDraw = endDraw + widthSpace;
        }
        context.fillText(letter, startDraw + centerX, positionY);
    } 
};


function drawErrorLetter(position, letter, lengthSecretWord) {

    const lettersCanvas = document.querySelector('.letters');
    const context = lettersCanvas.getContext('2d');

    if(context) {
        const widthLettersCanvas = lettersCanvas.width;
        const heightLettersCanvas = lettersCanvas.height;

        const percentFont = 0.0517;
        const heightPercent = 0.7894;
        const widthFont = Math.round(widthLettersCanvas * percentFont);
        const centerX = Math.round((widthLettersCanvas * percentFont) / 2);
        const positionY = heightLettersCanvas * heightPercent;
        const startDraw = Math.round(widthLettersCanvas * 0.2694);

        context.font = Math.round(widthLettersCanvas * percentFont) + 'px Inter';
        context.strokeStyle = '#495057';
        context.fillStyle = '#495057';
        context.textAlign = 'center'; 
        
        context.fillText(letter, startDraw + (widthFont * position) + centerX, positionY);
    } 
};


function drawCanvasReset() {

    const horcaCanvas = document.querySelector('.horca');
    const context = horcaCanvas.getContext('2d');
    horcaCanvas.width = horcaCanvas.width;

    if(context) {
        const heightHorcaCanvas = horcaCanvas.height;
        const widthHoraCanvas = horcaCanvas.width;
        const percentLine = 0.0172;

        context.lineWidth = Math.round(percentLine * widthHoraCanvas);
        const margin = context.lineWidth / 2;

        context.strokeStyle = '#0A3871';
        context.fillStyle = '#0A3871';
        context.lineCap = 'round';

        context.beginPath();
        context.moveTo(0 + margin, heightHorcaCanvas - margin);
        context.lineTo(widthHoraCanvas - margin, heightHorcaCanvas - margin);
        context.stroke();
        context.closePath();
    }
};


function drawHorca(mistake) {
    const horcaCanvas = document.querySelector('.horca');
    const context = horcaCanvas.getContext('2d');

    if(context) {
        percentLine = 0.0129;
        const heightHorcaCanvas = horcaCanvas.height;
        const widthHoraCanvas = horcaCanvas.width;

        context.lineWidth = Math.round(percentLine * widthHoraCanvas);
        const margin = context.lineWidth / 2;
        const axisFirst = widthHoraCanvas * 0.2743;
        const axisSecond = widthHoraCanvas * 0.833;
        const longCord = heightHorcaCanvas * 0.125;
        const longBody = heightHorcaCanvas * 0.375;
        const radius = widthHoraCanvas * 0.1071;
        const longLimbs = heightHorcaCanvas * 0.2;
        const angleLimbs = heightHorcaCanvas * 0.0975;

        context.strokeStyle = '#0A3871';
        context.fillStyle = '#0A3871';
        context.lineCap = 'round';

        switch(mistake) {
            case 1:
                drawHorcaLine(context, axisFirst, margin, axisFirst, heightHorcaCanvas);
            break;
            case 2:
                drawHorcaLine(context, axisFirst, margin, axisSecond, margin);
            break;
            case 3:
                drawHorcaLine(context, axisSecond, margin, axisSecond, longCord);
            break;
            case 4:
                drawHorcaHead(context, radius, axisSecond, longCord);
            break;
            case 5:
                drawHorcaLine(context, axisSecond, longCord + (radius*2) , axisSecond, longCord + (radius*2) + longBody);
            break;
            case 6:
                drawHorcaLine(context, axisSecond, longCord + (radius*2) , axisSecond - angleLimbs, longCord + (radius*2) + longLimbs);
            break;
            case 7:
                drawHorcaLine(context, axisSecond, longCord + (radius*2) , axisSecond + angleLimbs, longCord + (radius*2) + longLimbs);
            break;
            case 8:
                drawHorcaLine(context, axisSecond, longCord + (radius*2) + longBody , axisSecond - angleLimbs, longCord + (radius*2) + longLimbs + longBody);
            break;
            case 9:
                drawHorcaLine(context, axisSecond, longCord + (radius*2) + longBody , axisSecond + angleLimbs, longCord + (radius*2) + longLimbs + longBody);
            break;
        }
    }
};


function drawHorcaLine(context, xOrigin, yOrigin, xEnd, yEnd) {
    context.beginPath();
    context.moveTo(xOrigin, yOrigin);
    context.lineTo(xEnd, yEnd);
    context.stroke();
    context.closePath();
}

function drawHorcaHead(context, radius, centerX, longCord) {
    let centerY = longCord + radius;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
    context.stroke();
    context.closePath();
}