import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 2;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\02\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\02\data.txt
// problem url  : https://adventofcode.com/2022/day/2

// Rock Paper Scissors
// A X
// B Y
// C Z

// loss: 0
// draw: 3
// win: 6

function scoreCombinaton(combination: string): number {
	switch (combination) {
		// outcome + shape

		// Rock + ..
		case "AX": return 3 + 1;
		case "AY": return 6 + 2;
		case "AZ": return 0 + 3;

		// Paper + ..
		case "BX": return 0 + 1;
		case "BY": return 3 + 2;
		case "BZ": return 6 + 3;

		// Scissors + ..
		case "CX": return 6 + 1;
		case "CY": return 0 + 2;
		case "CZ": return 3 + 3;

		default: return 0;
	}
}

async function p2022day2_part1(input: string, ...params: any[]) {
	let score = 0

	input.split('\n').forEach(str => {
		const comb = str.replace(' ', '')
		score = score + scoreCombinaton(comb);
	})

	return score;
}

// Rock Paper Scissors
// A	B	  C
// 1	2	  3
// lose draw win
// X    Y    Z

function scoreGuide(combination: string): number {
	switch (combination) {
		// outcome + shape

		// lose + ..
		case "AX": return 0 + 3;
		case "BX": return 0 + 1;
		case "CX": return 0 + 2;

		// draw + ..
		case "AY": return 3 + 1;
		case "BY": return 3 + 2;
		case "CY": return 3 + 3;

		// win + ..
		case "AZ": return 6 + 2;
		case "BZ": return 6 + 3;
		case "CZ": return 6 + 1;

		default: return 0;
	}
}

async function p2022day2_part2(input: string, ...params: any[]) {
	let score = 0

	input.split('\n').forEach(str => {
		const comb = str.replace(' ', '')
		score = score + scoreGuide(comb);
	})

	return score;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `A Y
			B X
			C Z`,
			expected: "15"
		}
	];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day2_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day2_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day2_part2(input));
	const part2After = performance.now();

	logSolution(2, 2022, part1Solution, part2Solution);

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
