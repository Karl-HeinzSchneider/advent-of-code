import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 20;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\20\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\20\data.txt
// problem url  : https://adventofcode.com/2021/day/20

class Grid {

	gridMap: Map<string, string> = new Map();

	constructor() {
	}

	public setGridPoint(x: number, y: number, char: string) {
		this.gridMap.set(`${x}|${y}`, char);
	}

	public getGridPoint(x: number, y: number): string {
		const id = `${x}|${y}`;

		const char = this.gridMap.get(id);

		return char ? char : '.';
	}
}

function convert(input: string) {
	const arr = input.split('\n');
	const algo = arr[0];

	const grid = new Grid();


	for (let i = 2; i < arr.length; i++) {
		const elem = arr[i];

		const line = elem.split('');

		for (let j = 0; j < line.length; j++) {
			const char = line[j];
			grid.setGridPoint(j, i - 2, char);
		}
	}

	return grid;
}

async function p2021day20_part1(input: string, ...params: any[]) {

	const grid = convert(input);

	[0,1,2,3,4,5,6,7,8].forEach(muh => {
		console.log(grid.getGridPoint(muh,0));
	})

	return "Not implemented";
}

async function p2021day20_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day20_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day20_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day20_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day20_part2(input));
	const part2After = performance.now();

	logSolution(20, 2021, part1Solution, part2Solution);

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
