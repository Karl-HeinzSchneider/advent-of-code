import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 2;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\02\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\02\data.txt
// problem url  : https://adventofcode.com/2021/day/2
const example =
	`forward 5
down 5
forward 8
up 3
down 8
forward 2`;

type instructionType = 'forward' | 'down' | 'up';

interface instruction {
	type: instructionType,
	value: number
}

function convert(input: string): instruction[] {
	const arr = input.split('\n');

	const mapped: instruction[] = arr.map(entry => {
		const split = entry.split(' ');
		const value = Number(split[1]);

		if (entry.startsWith('forward')) {
			return {
				type: 'forward',
				value: value
			}
		}
		else if (entry.startsWith('down')) {
			return {
				type: 'down',
				value: value
			}
		}
		else if (entry.startsWith('up')) {
			return {
				type: 'up',
				value: value
			}
		}

		return {
			type: 'forward',
			value: 0
		}
	})

	return mapped;
}

async function p2021day2_part1(input: string, ...params: any[]) {
	const arr = convert(input);
	//console.log(arr);

	let horizontal = 0;
	let depth = 0;

	arr.forEach(entry => {
		if (entry.type === 'forward') {
			horizontal = horizontal + entry.value;
		}
		else if (entry.type === 'up') {
			depth = depth - entry.value;
		}
		else if (entry.type === 'down') {
			depth = depth + entry.value;
		}
	})

	return horizontal * depth;
}

async function p2021day2_part2(input: string, ...params: any[]) {
	const arr = convert(input);
	//console.log(arr);

	let horizontal = 0;
	let depth = 0;
	let aim = 0;

	arr.forEach(entry => {
		if (entry.type === 'forward') {
			horizontal = horizontal + entry.value;
			depth = depth + aim * entry.value;
		}
		else if (entry.type === 'up') {
			aim = aim - entry.value;
		}
		else if (entry.type === 'down') {
			aim = aim + entry.value;
		}
	})

	return horizontal * depth;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: example,
			expected: "150"
		}
	];
	const part2tests: TestCase[] = [
		{
			input: example,
			expected: "900"
		}
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day2_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day2_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day2_part2(input));
	const part2After = performance.now();

	logSolution(2, 2021, part1Solution, part2Solution);

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
