//iMpotiert die readlin-Schnitstelle & Farben:
import { colors } from "./colors.js";
import { createInterface } from "readline";

//initialisierung der readline-Schnittstelle und globaler Variablen:
const myJourney = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let field; 
let player;

//leere Funktion
function leer() {
  field = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  player = "X";
}

//battlefield Funktion
function battlefield() {
  return `
    ${colorized(field[0])}${colors.blue} |${colors.reset} ${colorized(field[1])}${colors.blue} |${colors.reset} ${colorized(field[2])}
    ${colors.blue}---------${colors.reset}
    ${colorized(field[3])}${colors.blue} |${colors.reset} ${colorized(field[4])}${colors.blue} |${colors.reset} ${colorized(field[5])}
    ${colors.blue}---------${colors.reset}
    ${colorized(field[6])}${colors.blue} |${colors.reset} ${colorized(field[7])}${colors.blue} |${colors.reset} ${colorized(field[8])}
    `;
}
//symbole werden gefärbt
function colorized(gamePice) {
  if (gamePice === "X") {
    return colors.yellow + gamePice + colors.reset;
  } else if (gamePice === "O") {
    return colors.red + gamePice + colors.reset;
  } else {
    return gamePice;
  }
}

//checkTheField Funktion
function checkTheField() {
  if (
    (field[3] !== " " && field[3] === field[4] && field[4] === field[5]) ||
    (field[0] !== " " && field[0] === field[1] && field[1] === field[2]) ||
    (field[6] !== " " && field[6] === field[7] && field[7] === field[8]) ||
    (field[0] !== " " && field[0] === field[3] && field[3] === field[6]) ||
    (field[1] !== " " && field[1] === field[4] && field[4] === field[7]) ||
    (field[2] !== " " && field[2] === field[5] && field[5] === field[8]) ||
    (field[0] !== " " && field[0] === field[4] && field[4] === field[8]) ||
    (field[2] !== " " && field[2] === field[4] && field[4] === field[6])
  ) {
    return true;
  }
  return false;
}

//makeYourMove Funktion
function makeYourMove(position) {
  if (field[position] === " ") {
    field[position] = player;
    player = player === `X` ? "O" : "X";
    return true;
  }
  return false;
}

//prüft ob alle felder belegt sind
function noWin() {
  for (let i = 0; i < field.length; i++) {
    if (field[i] === " ") {
      return false;
    }
  }
  return true;
}

// startGame Funktion
function startGame() {
  leer();
  console.log(
    `\n${colors.white}Welcome and have${colors.reset} ${colors.green}fun!${colors.reset}\n\n|||${colors.brightCyan}Tic${colors.reset} ${colors.brightMagenta}Tac${colors.reset} ${colors.brightYellow}Toe${colors.reset}|||`
  
  );
  console.log(battlefield());

  // tellHim Funktion
  function tellHim() {
    myJourney.question(
      `${colors.brightGreen}Player ${player},${colors.reset} choose a number (1-9) for a field:`,
      (eingabe) => {
        const position = Number(eingabe.trim()) - 1;
          if (!isNaN(position) && position >= 0 && position < 9) {
          if (field[position] !== " ") {
            console.log(
              `${colors.red}This position is already occupied. Please select another position.${colors.reset}\n`
            );
            tellHim();
          } else {
            if (makeYourMove(position)) {
              console.log(battlefield());
              if (checkTheField()) {
                console.log(`${colors.brightYellow}********************${colors.reset}`);
  console.log(`${colors.brightYellow}*${colors.reset}     ${colors.brightBlue}Great${colors.reset} ${colors.brightGreen}Game${colors.reset}   ${colors.brightYellow}*${colors.reset}`);
                console.log(
                  `${colors.brightYellow}*${colors.reset} ${colors.magenta}  Player ${player === "X" ? "O" : "X"} wins! ${colors.brightYellow}*${colors.reset} ${
                    colors.reset
                  }\n${colors.brightYellow}********************${colors.reset}`
                );
                myJourney.question(
                  `${colors.green}Want to play again? (${colors.reset}${colors.cyan}yes${colors.reset}${colors.green}/${colors.reset}${colors.red}no${colors.reset}${colors.green}):${colors.reset} `,
                  (answer) => {
                    if (
                      answer.toLowerCase() === "yes" ||
                      answer.toLowerCase() === "y"
                    ) {
                      startGame();
                    } else {
                      myJourney.close();
                    }
                  }
                );
              } else if (noWin()) {
                //unentschieden
                console.log(`${colors.cyan}It's a draw!${colors.reset}\n`);
                myJourney.question(
                  `${colors.green}Want to play again? (${colors.reset}${colors.cyan}yes${colors.reset}${colors.green}/${colors.reset}${colors.red}no${colors.reset}${colors.green}):${colors.reset} `,
                  (answer) => {
                    if (
                      answer.toLowerCase() === "yes" ||
                      answer.toLowerCase() === "y"
                    ) {
                      startGame();
                    } else {
                      myJourney.close();
                    }
                  }
                );
              } else {
                tellHim();
              }
            }
          }
        } else {
          console.log(
            `${colors.red}False input Mate. Only numbers are allowed between 1 and 9 please.${colors.reset}\n`
          );
          tellHim();
        }
      }
    );
  }

  tellHim();
}
startGame();
