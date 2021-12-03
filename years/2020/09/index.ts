import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 9;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\09\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\09\data.txt
// problem url  : https://adventofcode.com/2020/day/9

async function p2020day9_part1(input: string, ...params: any[]) {

	const arr = input.split('\n').map(entry => Number(entry));
	const inputLength = arr.length;

	const preambleLength = 25;

	let last25 = arr.slice(0, preambleLength);

	console.log(last25.length);

	for (let i = preambleLength; i < inputLength; i++) {
		const newNumber = arr[i];
		// check if Valid
		let isValid = false;

		for (let j = 0; j < preambleLength; j++) {
			const testNumber = last25[j];
			const complement = newNumber - testNumber;

			if (last25.includes(complement)) {
				isValid = true;
				break;
			}
		}

		if (!isValid) {
			console.log('NOT VALID: ' + newNumber + ' | i=' + i);
			return newNumber;
		}

		last25 = last25.slice(1);
		last25.push(newNumber);
	}


	return -1;
}

async function p2020day9_part2(input: string, ...params: any[]) {
	const arr = input.split('\n').map(entry => Number(entry));
	const inputLength = arr.length;

	const preambleLength = 25;

	// from Part 1
	const magicNumber = 400480901;

	for (let i = 0; i < inputLength; i++) {

		let counter = arr[i];
		let counterList: number[] = []
		counterList.push(counter);

		for (let j = i + 1; j < inputLength; j++) {
			const newNumber = arr[j];

			counter = counter + newNumber;
			counterList.push(newNumber);

			if (counter === magicNumber) {
				console.log(counterList);				

				counterList.sort((a, b) => a - b);

				const sum = counterList[0] + counterList[counterList.length - 1];
				return sum;
			}
			else if (counter > magicNumber) {
				break;
			}
		}
	}

	return -1;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day9_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day9_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day9_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day9_part2(input));
	const part2After = performance.now();

	logSolution(9, 2020, part1Solution, part2Solution);

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
