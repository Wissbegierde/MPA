//const 
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

var scoreBoard1 = document.getElementById("hangmanScore");
let contador = 0;

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
  "La Categoría es: Animales",
  "La Categoría es: Peliculas animadas",
  "La Categoría es: Capitales del Mundo"
];

const categories = [
  [
    "flamenco",
    "gato",
    "delfin",
    "chimpance",
    "girafa",
    "ballena-azul",
    "ornitorrinco",
    "tortuga",
    "oso-panda",
    "condor-andino"
  ],
  ["up", "enredados", "encanto", "buscando-a-nemo", "como-entrenar-a-tu-dragon", "los-increibles", "zootopia", "lluvia-de-hamburguesas", "el-viaje-de-chihiro"],
  ["bogota", "washington-d-c", "madrid", "brasilia", "ciudad-de-mexico", "londres", "paris", "roma", "buenos-aires", "nueva-delhi"]
];

const hints = [
  [
    "Ave con una rara coloración en su plumaje",
    "Animal domestico",
    "Mamifero acuatico con una gran inteligencia",
    "Primate que es considerado uno de los animales más cercanos al ser humano",
    "Mamifero mas alto del mundo",
    "Animal mas grande del planeta (vivo)",
    "Mamifero que puede poner huevos",
    "Reptil muy conocido por su lentitud",
    "Animal que estuvo a punto de estinguirse si no fuera por la ayuda humana",
    "Animal representativo de Colombia"
  ],
  [
    "Pelicula de Disney donde un señor de tercera edad y un niño viajan a la selva",
    "Pelicula donde sale una joven con un largo cabello dorado",
    "Pelicula de Disney basada en Colombia",
    "Pelicula donde un padre pierde a su hijo y tiene que cruzar todo el oceano para encontrarlo",
    "Pelicula donde un joven se encuentra con una bestia salvaje lastimada y la doma",
    "Pelicula que trata de una Familia de superheroes",
    "Pelicula que se centra en un mundo futurista con animales antropomorficos",
    "Pelicula donde un cientifico crea una maquina capaz de terminar con el hambre mundial",
    "Pelicula donde una niña tiene que ir a buscar a sus padres que fueron convertidos en cerdos"
  ],
  [
    "Capital de Colombia",
    "Capital de Estados-Unidos",
    "Capital de España",
    "Capital de Brasil",
    "Capital de Mexico",
    "Capital del Reino Unido",
    "Capital de Francia",
    "Capital de Italia",
    "Capital de Argentina",
    "Capital de La India"
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Pista - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Pista -`;
  livesDisplay.innerHTML = `Usted Tiene ${life} Vidas!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `GANASTE!`;

    contador += 1;
    scoreBoard1.value = contador;

    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `Usted Tiene ${life} Vidas!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Usted Tiene ${life} Vidas!`;
      } else {
        livesDisplay.innerHTML = `SE ACABÓ EL JUEGO!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `GANASTE!`;

      contador += 1;
      scoreBoard1.value = contador;

      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];