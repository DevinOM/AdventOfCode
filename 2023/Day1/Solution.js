"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Read in input.txt
var words = fs.readFileSync('./2023/Day1/input.txt', 'utf-8');
// Split string on new line char (\n) into list
var wordList = words.split('\n');
// Remove empty elements from list
wordList = wordList.filter(function (word) { return word.length > 0; });
// var that will take sum
var value = 0;
// regex pattern to find single digit numbers
var re1 = /(\d)/g;
var re2 = /(?=(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine))/g;
wordList.forEach(function (word, index) {
    // Match regex
    // let match = word.match(re1);
    // let firstDigit:number = parseInt(match[0]);
    // console.log (`first digit: ${firstDigit}`)
    // let lastDigit:number = parseInt(match[match.length - 1]);
    // console.log (`last digit: ${lastDigit}`)
    // let calibratioValue:number = firstDigit*10 + lastDigit;
    // console.log (`calibration value: ${calibratioValue}`)
    // value += calibratioValue;
    var re2Matches = Array.from(word.matchAll(re2));
    var extractedValues = re2Matches.map(function (match) {
        // Filter out undefined values and the first element (full match)
        var values = match.slice(1).filter(function (value) { return value !== undefined; });
        return values.length === 1 ? values[0] : values; // Return single value or array
    });
    value += combineDigits(getIntegerFrom(extractedValues[0]), getIntegerFrom(extractedValues[extractedValues.length - 1]));
});
console.log("Sum: ".concat(value));
function combineDigits(firstDigit, lastDigit) {
    return firstDigit * 10 + lastDigit;
}
function getIntegerFrom(word) {
    switch (word) {
        case '1':
        case 'one':
            return 1;
        case '2':
        case 'two':
            return 2;
        case '3':
        case 'three':
            return 3;
        case '4':
        case 'four':
            return 4;
        case '5':
        case 'five':
            return 5;
        case '6':
        case 'six':
            return 6;
        case '7':
        case 'seven':
            return 7;
        case '8':
        case 'eight':
            return 8;
        case '9':
        case 'nine':
            return 9;
    }
}
