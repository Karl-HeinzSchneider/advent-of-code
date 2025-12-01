import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2025;
const DAY = 1;

// solution path: E:\Projects\advent-of-code\years\2025\01\index.ts
// data path    : E:\Projects\advent-of-code\years\2025\01\data.txt
// problem url  : https://adventofcode.com/2025/day/1

async function p2025day1_part1(input: string, ...params: any[]) {
	const split = input.split('\n')

	// console.log(split)

	let dial = 50; // start at 50
	let zeros = 0;

	split.forEach(s => {
		let sgn: number = 1;
		if (s.startsWith('L')) {
			sgn = -1;
		}

		let delta: number = Number(s.replace('L', '').replace('R', ''))
		// console.log(s, sgn, delta)

		dial = dial + sgn * delta;
		dial = (dial + 100) % 100;
		// console.log(s, sgn, delta, '==>>', dial)

		if (dial == 0) {
			zeros = zeros + 1;
		}
	})

	return zeros;
}

async function p2025day1_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`, expected: "3"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2025day1_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2025day1_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2025day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2025day1_part2(input));
	const part2After = performance.now();

	logSolution(1, 2025, part1Solution, part2Solution);

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
