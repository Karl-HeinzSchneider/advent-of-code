import _, { split } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 3;

// solution path: E:\Projects\advent-of-code\years\2024\03\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\03\data.txt
// problem url  : https://adventofcode.com/2024/day/3

function multiplyMatch(input: string): number {
	const split = input.split(',');

	const firstNumberStr = split[0].replace('mul(', '');
	const secondNumberStr = split[1].replace(')', '');

	return Number(firstNumberStr) * Number(secondNumberStr);
}

async function p2024day3_part1(input: string, ...params: any[]) {
	const mulRegex = /mul\(\d*,\d*\)/g

	const matches = [...input.matchAll(mulRegex)].map(m => m[0]);

	let score = 0;
	matches.forEach(m => {
		score = score + multiplyMatch(m)
	})

	// log(matches)

	return score;
}

function multiplyMatchesInString(input: string): number {
	const mulRegex = /mul\(\d*,\d*\)/g
	const matches = [...input.matchAll(mulRegex)].map(m => m[0]);

	let score = 0;
	matches.forEach(m => {
		score = score + multiplyMatch(m)
	})

	return score
}

async function p2024day3_part2(input: string, ...params: any[]) {
	let score = 0;
	const splitDont = input.split(`don't()`);

	// start is always enabled
	score = score + multiplyMatchesInString(splitDont[0]);

	// check each section after a `don't()`
	for (let i = 1; i < splitDont.length; i++) {
		const splits = splitDont[i].split(`do()`)
		// discard the first one, as it's after a `don't()` and before a `do()`
		for (let j = 1; j < splits.length; j++) {
			score = score + multiplyMatchesInString(splits[j])
		}
	}

	return score;
}

async function run() {
	const part1tests: TestCase[] = [{ input: 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))', expected: "161" }];
	const part2tests: TestCase[] = [{ input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`, expected: "48" }];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day3_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day3_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day3_part2(input));
	const part2After = performance.now();

	logSolution(3, 2024, part1Solution, part2Solution);

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
