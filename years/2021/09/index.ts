import _, { map } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 9;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\09\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\09\data.txt
// problem url  : https://adventofcode.com/2021/day/9

function convert(input: string): number[] {
	let grid: number[] = [];
	const arr = input.split('\n');
	arr.forEach(line => {
		const split = line.split('').map(Number);
		split.forEach(nr => {
			grid.push(nr);
		})
	})

	return grid;
}

function getGridCoords(x: number, y: number, grid: number[]) {
	// 100
	const size = Math.sqrt(grid.length);

	if (x < 0 || x > (size - 1) || y < 0 || y > (size - 1)) {
		return 666;
	}

	const index = x + y * size;
	//console.log(x, y, index)
	return grid[index];
}

async function p2021day9_part1(input: string, ...params: any[]) {
	const grid = convert(input);
	const size = Math.sqrt(grid.length);
	
	let sum = 0;

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const point = getGridCoords(i, j, grid);
			//console.log(i,j,point)
			const up = getGridCoords(i, j + 1, grid);
			const down = getGridCoords(i, j - 1, grid);

			const left = getGridCoords(i - 1, j, grid);
			const right = getGridCoords(i + 1, j, grid);

			if (point < up && point < down && point < left && point < right) {
				sum = sum + 1 + point;
				//console.log('low:', i, j, point)
			}
		}
	}

	return sum;
}

async function p2021day9_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day9_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day9_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day9_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day9_part2(input));
	const part2After = performance.now();

	logSolution(9, 2021, part1Solution, part2Solution);

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
