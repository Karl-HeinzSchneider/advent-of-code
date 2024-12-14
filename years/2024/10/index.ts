import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 10;

// solution path: E:\Projects\advent-of-code\years\2024\10\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\10\data.txt
// problem url  : https://adventofcode.com/2024/day/10
interface Vector2D { x: number, y: number };

async function p2024day10_part1(input: string, ...params: any[]) {
	let grid = new Map<Vector2D, string>();
	let towerMap = new Map<string, Vector2D[]>();
	const lines = input.split('\n');

	const heigth = lines.length;
	const width = lines[0].length;

	for (let i = 0; i < heigth; i++) {
		for (let j = 0; j < width; j++) {
			const current = lines[i][j];
			const coords: Vector2D = { x: i, y: j };
			grid.set(coords, current);
			if (current == '.') {
				continue;
			}

			const mapEntry = towerMap.get(current);
			if (mapEntry) {
				towerMap.set(current, [...mapEntry, coords]);
			}
			else {
				towerMap.set(current, [coords]);
			}
		}
	}

	// log(towerMap)
	// log(width, heigth)

	function isInsideGrid(pos: Vector2D): boolean {
		if (pos.x < 0 || pos.x >= heigth || pos.y < 0 || pos.y >= width) {
			return false;
		}
		return true;
	}

	let score = 0;

	return score;
}

async function p2024day10_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`, expected: "36"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day10_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day10_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	// const part1Solution = String(await p2024day10_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day10_part2(input));
	const part2After = performance.now();

	// logSolution(10, 2024, part1Solution, part2Solution);

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
