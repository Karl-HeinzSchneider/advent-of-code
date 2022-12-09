import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 6;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\06\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\06\data.txt
// problem url  : https://adventofcode.com/2022/day/6

class Queue {
	public items: string[] = []

	constructor() {

	}

	public enqueue(item: string) {
		this.items.push(item)
	}
	public dequeue() {
		return this.items.shift();
	}

	public check(size: number): boolean {
		let charMap = new Map<string, string>()
		this.items.forEach(i => {
			charMap.set(i, i)
		})
		if (charMap.size === size) {
			console.log(this.items)
			return true
		}
		return false
	}
}

async function p2022day6_part1(input: string, ...params: any[]) {
	const q = new Queue()

	q.enqueue(input[0])
	q.enqueue(input[1])
	q.enqueue(input[2])
	q.enqueue(input[3])

	for (let i = 4; i < input.length; i++) {
		q.enqueue(input[i])
		q.dequeue()
		if (q.check(4)) {
			return i + 1
		}
	}

	return "Not implemented";
}

async function p2022day6_part2(input: string, ...params: any[]) {
	const q = new Queue()

	for (let i = 0; i < 14; i++) {
		q.enqueue(input[i])
	}
	if (q.check(14)) {
		return 14 + 1
	}

	for (let i = 14; i < input.length; i++) {
		q.enqueue(input[i])
		q.dequeue()
		if (q.check(14)) {
			return i + 1
		}
	}

	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day6_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day6_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day6_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day6_part2(input));
	const part2After = performance.now();

	logSolution(6, 2022, part1Solution, part2Solution);

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
