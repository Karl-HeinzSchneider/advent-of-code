import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 10;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\10\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\10\data.txt
// problem url  : https://adventofcode.com/2022/day/10

async function p2022day10_part1(input: string, ...params: any[]) {
	const arr = input.split('\n')

	let cycles: number[] = []
	let cycleIndex = 1;
	let x = 1;
	cycles.push(x)

	for (let index = 0; index < arr.length; index++) {
		const str = arr[index];
		if (str === 'noop') {
			cycles.push(x)
		}
		else {
			const value = Number(str.replace('addx ', ''))
			//console.log(value)
			cycles.push(x)
			x = x + value
			cycles.push(x)
		}
	}

	let sum = 0;

	for (let i = 0; i < cycles.length; i++) {
		if (i === 20 || (i - 20) % 40 === 0) {
			const strength = i * cycles[i - 1]
			sum = sum + strength
			//console.log(i, strength)
		}
	}

	console.log('cycles', cycles.length)
	return sum;
}

async function p2022day10_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day10_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day10_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day10_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day10_part2(input));
	const part2After = performance.now();

	logSolution(10, 2022, part1Solution, part2Solution);

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
