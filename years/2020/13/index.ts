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

	console.log(timestamp, busArray, maxValue);

	console.log(timestampLoop - 1, busNr, wait);


	return wait * busNr;
}

async function p2020day13_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

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
