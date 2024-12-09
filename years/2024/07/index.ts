import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 7;

// solution path: E:\Projects\advent-of-code\years\2024\07\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\07\data.txt
// problem url  : https://adventofcode.com/2024/day/7

// 0 when its not possible to combine
function getLineValue(str: string): number {
	const split = str.split(': ')

	const targetValue = Number(split[0])
	const numArr: number[] = split[1].split(' ').map(x => Number(x));

	// log(targetValue, numArr)

	const power = numArr.length - 1;

	for (let i = 0; i < Math.pow(2, power); i++) {
		const inputStr = i.toString(2).padStart(power, '0')
		// log(i, ':', inputStr)
		const testValue = calcWithInputStringBetter(numArr, inputStr);
		if (testValue == targetValue) {
			// log('ADD VALUE', targetValue)
			return targetValue;
		}
	}

	return 0;
}

function calcWithInputString(numArr: number[], inputstr: string): number {
	let score = 0;

	let str = '' + numArr[0]

	for (let i = 1; i < numArr.length; i++) {
		if (inputstr.charAt(i - 1) == '0') {
			str = '(' + str + '+' + numArr[i] + ')';
		}
		else {
			str = '(' + str + '*' + numArr[i] + ')';
		}
	}
	score = eval(str)

	// log(str, ' = ', score)

	return score;
}

function calcWithInputStringBetter(numArr: number[], inputstr: string): number {
	let score = numArr[0];

	for (let i = 1; i < numArr.length; i++) {
		if (inputstr.charAt(i - 1) == '0') {
			// str = '(' + str + '+' + numArr[i] + ')';
			score = score + numArr[i];
		}
		else {
			// str = '(' + str + '*' + numArr[i] + ')';
			score = score * numArr[i];
		}
	}
	// score = eval(str)

	// log(str, ' = ', score)

	return score;
}

async function p2024day7_part1(input: string, ...params: any[]) {
	const lines = input.split('\n');

	let score = 0;
	lines.forEach(l => {
		score = score + getLineValue(l);
		// log('~~~~')
	})

	return score;
}

// 0 when its not possible to combine
function getLineValueConcat(str: string): number {
	const split = str.split(': ')

	const targetValue = Number(split[0])
	const numArr: number[] = split[1].split(' ').map(x => Number(x));

	// log(targetValue, numArr)

	const power = numArr.length - 1;

	for (let i = 0; i < Math.pow(3, power); i++) {
		const inputStr = i.toString(3).padStart(power, '0')
		// log(i, ':', inputStr)
		const testValue = calcWithInputStringConcatBetter(numArr, inputStr);
		if (testValue == targetValue) {
			// log('ADD VALUE', targetValue)
			return targetValue;
		}
	}

	return 0;
}

function calcWithInputStringConcat(numArr: number[], inputstr: string): number {
	let score = 0;

	let str = '' + numArr[0]

	for (let i = 1; i < numArr.length; i++) {
		const operatorChar = inputstr.charAt(i - 1)
		if (operatorChar == '0') {
			// +
			str = '(' + str + '+' + numArr[i] + ')';
		}
		else if (operatorChar == '1') {
			// *
			str = '(' + str + '*' + numArr[i] + ')';
		}
		else {
			// ||
			str = '(' + eval(str).toString() + numArr[i] + ')'
		}
	}
	score = eval(str)

	// log(str, ' = ', score)

	return score;
}

function calcWithInputStringConcatBetter(numArr: number[], inputstr: string): number {
	let score = numArr[0];

	for (let i = 1; i < numArr.length; i++) {
		const operatorChar = inputstr.charAt(i - 1)
		if (operatorChar == '0') {
			// +
			// str = '(' + str + '+' + numArr[i] + ')';
			score = score + numArr[i];
		}
		else if (operatorChar == '1') {
			// *
			// str = '(' + str + '*' + numArr[i] + ')';
			score = score * numArr[i];
		}
		else {
			// ||
			// str = '(' + eval(str).toString() + numArr[i] + ')'
			const concatStr = score.toString() + numArr[i];
			score = Number(concatStr);
		}
	}
	// score = eval(str)

	// log(str, ' = ', score)

	return score;
}

async function p2024day7_part2(input: string, ...params: any[]) {
	const lines = input.split('\n');

	let score = 0;
	lines.forEach(l => {
		score = score + getLineValueConcat(l);
		// log('~~~~')
	})

	return score;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`, expected: '3749'
	}];
	const part2tests: TestCase[] = [{
		input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`, expected: '11387'
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day7_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day7_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// if (true) return;

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day7_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day7_part2(input));
	const part2After = performance.now();

	logSolution(7, 2024, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});
