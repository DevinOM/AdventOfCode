import * as fs from 'fs';

// Read in input.txt
const words = fs.readFileSync('./2023/Day1/input.txt', 'utf-8');

// Split string on new line char (\n) into list
let wordList = words.split('\n');

// Remove empty elements from list
wordList = wordList.filter(word => word.length > 0);

// var that will take sum
let value:number = 0;

// regex pattern to find single digit numbers
const re1:RegExp = /(\d)/g;
const re2:RegExp = /(?=(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine))/g;

wordList.forEach((word, index) => {
    // Match regex
    // let match = word.match(re1);

    // let firstDigit:number = parseInt(match[0]);
    // console.log (`first digit: ${firstDigit}`)

    // let lastDigit:number = parseInt(match[match.length - 1]);
    // console.log (`last digit: ${lastDigit}`)

    // let calibratioValue:number = firstDigit*10 + lastDigit;
    // console.log (`calibration value: ${calibratioValue}`)
    // value += calibratioValue;

    const re2Matches = Array.from(word.matchAll(re2))
    const extractedValues =  re2Matches.map(match => {
        // Filter out undefined values and the first element (full match)
        const values = match.slice(1).filter(value => value !== undefined);
        return values.length === 1 ? values[0] : values; // Return single value or array
    });

    value += combineDigits(getIntegerFrom(extractedValues[0] as string), getIntegerFrom(extractedValues[extractedValues.length - 1] as string));
});

console.log(`Sum: ${value}`)

function combineDigits(firstDigit:number, lastDigit:number):number {
    return firstDigit * 10 + lastDigit;
}

function getIntegerFrom(word:string):number {
    switch(word) {
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