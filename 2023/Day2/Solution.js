"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Game = /** @class */ (function () {
    function Game(id, rolls) {
        var _this = this;
        this.overflow = false;
        this.id = id;
        this.rolls = rolls;
        this.rolls.forEach(function (roll) {
            if (roll.overflow) {
                _this.overflow = true;
            }
        });
    }
    Game.prototype.toString = function () {
        if (this.overflow) {
            return "Game ".concat(this.id, ": OVERFLOW!! ").concat(this.rolls);
        }
        else {
            return "Game ".concat(this.id, ": ").concat(this.rolls);
        }
    };
    return Game;
}());
var Roll = /** @class */ (function () {
    function Roll() {
        this.overflow = false;
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.redLimit = 12;
        this.greenLimit = 13;
        this.blueLimit = 14;
    }
    Roll.prototype.setRed = function (red) {
        this.red = red;
        this.checkForOverflow();
    };
    Roll.prototype.setGreen = function (green) {
        this.green = green;
        this.checkForOverflow();
    };
    Roll.prototype.setBlue = function (blue) {
        this.blue = blue;
        this.checkForOverflow();
    };
    Roll.prototype.checkForOverflow = function () {
        if (this.red > this.redLimit || this.green > this.greenLimit || this.blue > this.blueLimit) {
            this.overflow = true;
        }
    };
    Roll.prototype.toString = function () {
        return "\n\tRed: ".concat(this.red, ", Green: ").concat(this.green, ", Blue: ").concat(this.blue, "; Overflow: ").concat(this.overflow);
    };
    return Roll;
}());
solveDayTwoPartOne();
function solveDayTwoPartOne() {
    var wordsList = getStringListFromFile("./2023/Day2/input.txt");
    var games = [];
    var sum = 0;
    // PART 1 //
    wordsList.forEach(function (line, index) {
        var lineList = line.split(/[;:]/);
        var game = createGameFromLine(lineList);
        games.push(game);
        if (!game.overflow) {
            sum += game.id;
        }
        console.log(game.toString());
        console.log('------------------');
    });
    console.log("Sum: ".concat(sum));
    // PART 2 //
    var sumPart2 = 0;
    games.forEach(function (game) {
        var minRed = 0;
        var minGreen = 0;
        var minBlue = 0;
        game.rolls.forEach(function (roll) {
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
    console.log("Sum Part 2: ".concat(sumPart2));
}
function getStringListFromFile(filePath) {
    // Read in input.txt
    var words = fs.readFileSync(filePath, "utf-8");
    // Split string on new line char (\n) into list
    return words.split("\n").filter(function (word) { return word.length > 0; });
}
function createGameFromLine(line) {
    var gameId;
    var rolls = [];
    line.forEach(function (word, index) {
        if (index == 0) {
            // Game id
            gameId = parseInt(word.match(/\d+/)[0]);
        }
        else {
            // Rolls
            var rollList = word.split(/[,]/);
            var fetch_1 = new Roll();
            rollList.forEach(function (roll, index) {
                var match = roll.match(/((\d+)|(green|red|blue))/g);
                if (match[1] === "red") {
                    fetch_1.setRed(parseInt(match[0]));
                }
                else if (match[1] === "green") {
                    fetch_1.setGreen(parseInt(match[0]));
                }
                else if (match[1] === "blue") {
                    fetch_1.setBlue(parseInt(match[0]));
                }
            });
            rolls.push(fetch_1);
        }
    });
    return new Game(gameId, rolls);
}
