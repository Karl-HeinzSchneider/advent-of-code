import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 11;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\11\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\11\data.txt
// problem url  : https://adventofcode.com/2020/day/11

function getTile(arr: string[], x: number, y: number): string {

	const yMin = 0
	const yMax = arr.length - 1;

	const xMin = 0;
	const xMax = arr[0].length - 1;

	const lookupX = _.clamp(x, xMin, xMax);
	const lookupY = _.clamp(y, yMin, yMax);

	return arr[y].charAt(x) ? arr[y].charAt(x) : '.';

}

function getNumberOfNeighbourSeatsOccupied(arr: string[], x: number, y: number): number {
	let counter = 0;

	// upper
	if (getTile(arr, x - 1, y - 1) === '#') {
		counter = counter + 1;
	}
	if (getTile(arr, x, y - 1) === '#') {
		counter = counter + 1;
	}
	if (getTile(arr, x + 1, y - 1) === '#') {
		counter = counter + 1;
	}

	// mid
	if (getTile(arr, x - 1, y) === '#') {
		counter = counter + 1;
	}
	if (getTile(arr, x + 1, y) === '#') {
		counter = counter + 1;
	}

	// lower
	if (getTile(arr, x - 1, y + 1) === '#') {
		counter = counter + 1;
	}
	if (getTile(arr, x - 1, y + 1) === '#') {
		counter = counter + 1;
	}
	if (getTile(arr, x - 1, y + 1) === '#') {
		counter = counter + 1;
	}

	return counter;
}
function computeNewGeneration(arr: string[]): [generation: string[], changes: number] {

	let newGeneration: string[] = arr;
	const xMax = arr[0].length;
	const yMax = arr.length;

	let changeCounter = 0;

	for (let i = 0; i < xMax; i++) {
		for (let j = 0; j < yMax; j++) {
			const tile = getTile(arr, i, j);
			// floor -> do nothing
			if (tile === '.') {

			}
			// empty
			else if (tile === 'L') {
				const occupiedNeighbors = getNumberOfNeighbourSeatsOccupied(arr, i, j);
				if(occupiedNeighbors === 0){
					
				}
			}
			// occupied
			else if (tile === '#') {

			}
		}
	}

	return [newGeneration, changeCounter];
}

async function p2020day11_part1(input: string, ...params: any[]) {
	const arr = input.split('\n');

	for (let i = 0; i < 10; i++) {
		//console.log(getTile(arr,i,8));
	}


	let generation: string[] = arr;
	let changes = -1;

	while (changes != 0) {
		[generation, changes] = computeNewGeneration(generation);
	}

	return -1;
}

async function p2020day11_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day11_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day11_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day11_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day11_part2(input));
	const part2After = performance.now();

	logSolution(11, 2020, part1Solution, part2Solution);

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
