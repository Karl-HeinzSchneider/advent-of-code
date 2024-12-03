import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 2;

// solution path: E:\Projects\advent-of-code\years\2024\02\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\02\data.txt
// problem url  : https://adventofcode.com/2024/day/2

function isReportSafe(input: string): boolean {
	const levels = input.split(' ').map(x => Number(x))
	const length = levels.length

	let sgn = Math.sign(levels[1] - levels[0])

	for (let i = 0; i < levels.length - 1; i++) {
		const element = levels[i];
		const delta = levels[i + 1] - levels[i];
		if (Math.sign(delta) != sgn) {
			return false;
		}
		const abs = Math.abs(delta)
		if (abs < 1 || abs > 3) {
			return false;
		}
	}

	return true;
}

async function p2024day2_part1(input: string, ...params: any[]) {
	const reports = input.split('\n')
	// log(reports)

	let score = 0
	reports.forEach(rep => {
		if (isReportSafe(rep)) {
			score = score + 1
		}
	})
	return score;
}

async function p2024day2_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
		expected: "2"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day2_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day2_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day2_part2(input));
	const part2After = performance.now();

	logSolution(2, 2024, part1Solution, part2Solution);

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
