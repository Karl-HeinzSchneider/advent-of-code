import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 3;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\03\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\03\data.txt
// problem url  : https://adventofcode.com/2022/day/3

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"


async function p2022day3_part1(input: string, ...params: any[]) {
	const priority = new Map<string, number>()
	alphabet.split('').forEach((val, index) => {
		priority.set(val, index + 1)
	})
	let score = 0

	input.split('\n').forEach(line => {
		const arr = line.split('')
		const half = arr.length / 2
		const first = arr.slice(0, half)
		const second = arr.slice(half, arr.length)
		const intersection = first.filter(x => second.includes(x))

		const dup = intersection[0]
		const prio = priority.get(dup)!
		//console.log(intersection, prio)
		score = score + prio
	})

	return score;
}

async function p2022day3_part2(input: string, ...params: any[]) {
	const priority = new Map<string, number>()
	alphabet.split('').forEach((val, index) => {
		priority.set(val, index + 1)
	})
	let score = 0

	const lines = input.split('\n')
	const groups = lines.length / 3

	for (let i = 0; i < lines.length; i = i + 3) {
		const first = lines[i].split('')
		const second = lines[i + 1].split('')
		const third = lines[i + 2].split('')

		const intersection = first.filter(x => second.includes(x)).filter(x => third.includes(x))

		const dup = intersection[0]
		const prio = priority.get(dup)!
		//console.log(intersection, prio)
		score = score + prio
	}

	return score;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day3_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day3_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day3_part2(input));
	const part2After = performance.now();

	logSolution(3, 2022, part1Solution, part2Solution);

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
