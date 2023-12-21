import * as fs from "fs";

class Game {
  overflow: boolean = false;
  id: number;
  rolls: Roll[];

  constructor(id: number, rolls: Roll[]) {
    this.id = id;
    this.rolls = rolls;

    this.rolls.forEach((roll) => {
      if (roll.overflow) {
        this.overflow = true;
      }
    });
  }

  toString() {
    if (this.overflow) {
      return `Game ${this.id}: OVERFLOW!! ${this.rolls}`;
    } else {
      return `Game ${this.id}: ${this.rolls}`;
    }
  }
}

class Roll {
  overflow: boolean = false;

  red: number = 0;
  green: number = 0;
  blue: number = 0;

  readonly redLimit:number = 12;
  readonly greenLimit:number = 13;
  readonly blueLimit:number = 14;

  constructor() {}

  setRed(red: number) {
    this.red = red;
    this.checkForOverflow();
  }

  setGreen(green: number) { 
    this.green = green;
    this.checkForOverflow();
  }

  setBlue(blue: number) {
    this.blue = blue;
    this.checkForOverflow();
  }

  checkForOverflow() {
    if (this.red > this.redLimit || this.green > this.greenLimit || this.blue > this.blueLimit) {
      this.overflow = true;
    }
  }

  toString() {
    return `\n\tRed: ${this.red}, Green: ${this.green}, Blue: ${this.blue}; Overflow: ${this.overflow}`;
  }
}

solveDayTwoPartOne();

function solveDayTwoPartOne() {
  const wordsList:string[] = getStringListFromFile("./2023/Day2/input.txt");
  let games:Game[] = [];
  let sum:number = 0;

  // PART 1 //
  wordsList.forEach((line, index) => {
    let lineList = line.split(/[;:]/);
    const game:Game = createGameFromLine(lineList);
    games.push(game);
    if (!game.overflow) {
      sum += game.id;
    }

    console.log(game.toString());
    console.log('------------------');
  });
  console.log(`Sum: ${sum}`);

  // PART 2 //
  let sumPart2:number = 0;
  games.forEach((game) => {
    let minRed:number = 0;
    let minGreen:number = 0;
    let minBlue:number = 0;

    game.rolls.forEach((roll) => {
      if (roll.red > minRed) {
        minRed = roll.red;
      }
      if (roll.green > minGreen) {
        minGreen = roll.green;
      }
      if (roll.blue > minBlue) {
        minBlue = roll.blue;
      }
    });

    sumPart2 += minRed * minGreen * minBlue;
  });
  console.log(`Sum Part 2: ${sumPart2}`);
}

function getStringListFromFile(filePath: string):string[] {
  // Read in input.txt
  const words = fs.readFileSync(filePath, "utf-8");
  // Split string on new line char (\n) into list
  return words.split("\n").filter((word) => word.length > 0);
}

function createGameFromLine(line:string[]):Game {
  let gameId:number;
  let rolls:Roll[] = [];

  line.forEach((word, index) => {
    if (index == 0) {
      // Game id
      gameId = parseInt(word.match(/\d+/)[0]);    
    } else {
      // Rolls
      let rollList = word.split(/[,]/);
      let fetch:Roll = new Roll();
      rollList.forEach((roll, index) => {
        let match = roll.match(/((\d+)|(green|red|blue))/g);
        if (match[1] === "red") {
          fetch.setRed(parseInt(match[0]));
        } else if (match[1] === "green") {
          fetch.setGreen(parseInt(match[0]));
        } else if (match[1] === "blue") {
          fetch.setBlue(parseInt(match[0]));
        }
      });
      rolls.push(fetch);
    }
  });

  return new Game(gameId, rolls);
}
