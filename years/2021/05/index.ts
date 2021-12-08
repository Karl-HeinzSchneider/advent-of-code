import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 5;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\05\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\05\data.txt
// problem url  : https://adventofcode.com/2021/day/5
function convert(input: string, bVertical: boolean) {
	let arr = input.split('\n').map(entry => {
		const split = entry.split(' -> ');
		const part1 = split[0].split(',').map(Number);
		const part2 = split[1].split(',').map(Number);
		return { x1: part1[0], y1: part1[1], x2: part2[0], y2: part2[1] };
	});

	if (bVertical) {
		arr = arr.filter(entry => (entry.x1 === entry.x2) || (entry.y1 === entry.y2))
	}
	console.log(arr[0]);
	console.log(arr[1]);
	console.log(arr[2]);

	return arr;
}

async function p2021day5_part1(input: string, ...params: any[]) {
	const arr = convert(input, true);

	let grid = Array.from('0'.repeat(1000 * 1000)).map(Number);
	//console.log(grid)

	arr.forEach(line => {
		if (line.x1 === line.x2) {
			const x = line.x1;
			if (line.y1 > line.y2) {
				for (let i = line.y1; i >= line.y2; i--) {
					grid[x + 1000 * i] = grid[x + 1000 * i] + 1;
				}
			}
			else if (line.y1 < line.y2) {
				for (let i = line.y1; i <= line.y2; i++) {
					grid[x + 1000 * i] = grid[x + 1000 * i] + 1;
				}
			}
		}

		else if (line.y1 === line.y2) {
			const y = line.y1;
			if (line.x1 > line.x2) {
				for (let i = line.x1; i >= line.x2; i--) {
					grid[i + 1000 * y] = grid[i + 1000 * y] + 1;
				}
			}
			else if (line.x1 < line.x2) {
				for (let i = line.x1; i <= line.x2; i++) {
					grid[i + 1000 * y] = grid[i + 1000 * y] + 1;
				}
			}
		}
	})

	const gridBigger = grid.filter(elem => elem >= 2);
	return gridBigger.length;	
}

async function p2021day5_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day5_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day5_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day5_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day5_part2(input));
	const part2After = performance.now();

	logSolution(5, 2021, part1Solution, part2Solution);

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
