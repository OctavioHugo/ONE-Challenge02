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
    console.log(secretWord);
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
        console.log("paso")
    }
    if(!isValid){
        alert("Por favor ingrese una palabra utilizando solo letras sin acento");
    }
    return isValid;
}; 