import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 3;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\03\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\03\data.txt
// problem url  : https://adventofcode.com/2020/day/3

const testString1 =
	`..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#`;

// Schema:
// (0,0) (1,0) (2,0)... 
// (0,1)
// (0,2)
// ...

function hasTreeAtCoords(x: number, y: number, arr: string[], sizeX: number, sizeY: number): boolean {
	if (y > sizeY) {
		return false;
	}

	const newX = x % sizeX;
	const line = arr[y];
	//console.log(line)

	if (line.charAt(newX) == '#') {
		return true;
	}

	return false;
}

async function p2020day3_part1(input: string, ...params: any[]) {
	const arr = input.split('\n');

	const sizeX = arr[0].length;
	const sizeY = arr.length;

	//console.log(`Input ${sizeX}x${sizeY}`)

	const deltaX = 3;
	const deltaY = 1;

	// start
	let x = 0;
	let y = 0;

	let treeCounter = 0;

	while (y < sizeY) {
		if (hasTreeAtCoords(x, y, arr, sizeX, sizeY)) {
			treeCounter = treeCounter + 1;
		}

		x = x + deltaX;
		y = y + deltaY;
	}

	return treeCounter;
}

async function p2020day3_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: testString1,
			expected: '7'
		}
	];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day3_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day3_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day3_part2(input));
	const part2After = performance.now();

	logSolution(3, 2020, part1Solution, part2Solution);

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
