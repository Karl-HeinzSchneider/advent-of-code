import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 1;

// solution path: E:\Projects\advent-of-code\years\2024\01\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\01\data.txt
// problem url  : https://adventofcode.com/2024/day/1

async function p2024day1_part1(input: string, ...params: any[]) {
	let left: number[] = [];
	let right: number[] = [];

	input.split('\n').forEach(str => {
		const arr = str.split('   ');
		left.push(Number(arr[0]));
		right.push(Number(arr[1]));
	})

	left.sort((a, b) => a - b);
	right.sort((a, b) => a - b);

	const length = left.length;
	let distance = 0;

	for (let i = 0; i < length; i++) {
		distance = distance + Math.abs(left[i] - right[i]);
	}

	// log(left, right);

	return distance;
}

async function p2024day1_part2(input: string, ...params: any[]) {
	let left = new Map<number, number>();
	let right = new Map<number, number>();

	input.split('\n').forEach(str => {
		const arr = str.split('   ');
		const newLeft = Number(arr[0]);
		const newRight = Number(arr[1]);


		const currentLeft = left.get(newLeft)
		left.set(newLeft, currentLeft ? currentLeft + 1 : 1)

		const currentRight = right.get(newRight)
		right.set(newRight, currentRight ? currentRight + 1 : 1)
	})

	// log(left, right)
	let distance = 0;

	for (let [key, value] of left) {

		const rightValue = right.get(key);

		if (rightValue) {
			distance = distance + value * key * rightValue
		}
	}

	return distance;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `3   4
					4   3
					2   5
					1   3
					3   9
					3   3`,
			expected: "11"
		}
	];
	const part2tests: TestCase[] = [{
		input: `3   4
				4   3
				2   5
				1   3
				3   9
				3   3`,
		expected: "31"
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day1_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day1_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day1_part2(input));
	const part2After = performance.now();

	logSolution(1, 2024, part1Solution, part2Solution);

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
