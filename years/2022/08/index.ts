import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 8;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\08\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\08\data.txt
// problem url  : https://adventofcode.com/2022/day/8

class Grid {
	data: number[][] = []
	size: number = 0;

	constructor(input: string) {
		const lines = input.split('\n')
		this.data = input.split('\n').map(x => {
			return x.split('').map(y => Number(y))
		})
		this.size = this.data.length
	}

	getXY(x: number, y: number): number {
		if (x < 0 || x > this.size - 1) {
			return -1
		}
		return this.data[x][y]
	}
}

async function p2022day8_part1(input: string, ...params: any[]) {

	const grid = new Grid(input)
	console.log('Gridsize', grid.size)

	console.log(grid.getXY(2, 0))
	let visible = 0

	for (let x = 0; x < grid.size; x++) {
		for (let y = 0; y < grid.size; y++) {
			const h = grid.getXY(x, y)
			//console.log(h)
		}
	}

	return visible;
}

async function p2022day8_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day8_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day8_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day8_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day8_part2(input));
	const part2After = performance.now();

	logSolution(8, 2022, part1Solution, part2Solution);

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
