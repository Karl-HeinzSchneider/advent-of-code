import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 13;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\13\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\13\data.txt
// problem url  : https://adventofcode.com/2020/day/13

async function p2020day13_part1(input: string, ...params: any[]) {
	const arr = input.split('\n');
	const timestamp = Number(arr[0]);

	const busArray = arr[1].split(',').filter(bus => bus != 'x').map(Number).sort((a, b) => a - b);

	const maxValue = _.max(busArray);

	let busNr = 0;
	let timestampLoop = timestamp;
	let wait = 0;

	while (busNr === 0) {
		busArray.forEach(bus => {
			if (timestampLoop % bus === 0) {
				busNr = bus;
				wait = timestampLoop - timestamp;
			}
		})

		timestampLoop = timestampLoop + 1;
	}

	//console.log(timestamp, busArray, maxValue);

	//console.log(timestampLoop - 1, busNr, wait);


	return wait * busNr;
}

const p2ex1 = `asfa
67,7,59,61`;
const p2ex2 = `asfa
67,x,7,59,61`;
const p2ex3 = `asfa
67,7,x,59,61`;

async function p2020day13_part2(input: string, ...params: any[]) {
	const arr = input.split('\n');
	const timestamp = Number(arr[0]);

	const busArray = arr[1].split(',');

	console.log(busArray);
	let time = 0;

	const maxTime = 100000000000000 * 100;
	

	// @TODO:
	// Brutforce too slow -> Chinese Remainder Theorem, solution: 800177252346225
	let magicNumber = 0;
	while (magicNumber === 0) {

		let guard = true;


		for (let i = 0; i < busArray.length; i++) {
			const item = busArray[i];
			if (item === 'x') {

			}
			else {
				const itemNumber = Number(item);

				if ((time + i) % itemNumber === 0) {
					// -> fine
				}
				else {
					guard = false;
				}
			}
		}


		if (guard) {
			console.log('FOUND')
			magicNumber = time;
		}

		if (time > maxTime) {
			magicNumber = 1;
			console.log('FAILED')
		}

		time = time + 1;
	}

	console.log(magicNumber)
	return magicNumber;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [
		{
			input: p2ex1,
			expected: "754018"
		},
		{
			input:
				`as
13,14`,
			expected: '13'
		}
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day13_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day13_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day13_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day13_part2(input));
	const part2After = performance.now();

	logSolution(13, 2020, part1Solution, part2Solution);

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
