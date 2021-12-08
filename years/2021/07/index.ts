import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 7;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\07\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\07\data.txt
// problem url  : https://adventofcode.com/2021/day/7

async function p2021day7_part1(input: string, ...params: any[]) {
	const arr = input.split(',').map(Number);
	const max = _.max(arr)!;
	console.log('crabs: ' + arr.length + ' | max: ' + max);

	let minimum = Infinity;

	for (let i = 1; i < max; i++) {
		let fuel = 0;

		arr.forEach(crab => {
			fuel = fuel + Math.abs(i - crab);
		})

		if (fuel < minimum) {
			minimum = fuel;
		}
	}

	return minimum;
}

function gauss(num: number): number {
	let sum = (num * num + num) / 2;
	return sum
}

async function p2021day7_part2(input: string, ...params: any[]) {
	const arr = input.split(',').map(Number);
	const max = _.max(arr)!;
	console.log('crabs: ' + arr.length + ' | max: ' + max);

	let minimum = Infinity;

	for (let i = 1; i < max; i++) {
		let fuel = 0;

		arr.forEach(crab => {
			const delta = Math.abs(i - crab);
			fuel = fuel + gauss(delta);
		})

		if (fuel < minimum) {
			minimum = fuel;
		}
	}

	return minimum;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day7_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day7_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day7_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day7_part2(input));
	const part2After = performance.now();

	logSolution(7, 2021, part1Solution, part2Solution);

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
