import _, { head } from "lodash";
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

function coordString(x: number, y: number) {
	return `${x}-${y}`
}

async function p2024day10_part1(input: string, ...params: any[]) {
	// square
	// const n = input.indexOf('\n')
	// log(params)
	if (params && params[0]) {
		log('~> skip test case')
		return "Not implemented / SKIPPED";
	}

	const gridMap = new Map<string, number>();
	const rows = input.split('\n');

	const headArr = []

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < row.length; j++) {
			const current = row[j]
			gridMap.set(coordString(i, j), Number(current))
			if (current == '0') {
				headArr.push([i, j])
			}
		}
	}
	// log(gridMap)
	// log(headArr)

	function areCoordsValid(x: number, y: number) {
		return gridMap.has(coordString(x, y,))
	}

	function getCoord(x: number, y: number) {
		return gridMap.get(coordString(x, y))
	}

	function setCoord(x: number, y: number, value: number) {
		return gridMap.set(coordString(x, y), value)
	}

	const targetValue = 9;
	const dxdy: number[][] = [[-1, 0], [1, 0], [0, 1], [0, -1]]

	function search(i: number, j: number) {
		const targetArr: string[] = [];

		function searchTrails(i: number, j: number, currentValue: number) {
			// log('searchTrails', i, j, currentValue)
			if (!areCoordsValid(i, j)) {
				// log('SearchTrails', '(', i, ',', j, ')', 'type:', 'INVALID COORDS')
				return 0;
			}
			const value = getCoord(i, j)!; // must exist because valid coords
			// log('SearchTrails', '(', i, ',', j, ')', 'value:', value)

			if (value == targetValue) {
				// target reached
				targetArr.push(coordString(i, j));
				return 1;
			}

			let trails = 0;
			dxdy.forEach(([dx, dy]) => {
				const newX = i + dx;
				const newY = j + dy;
				// log('dxdy', newX, newY)
				if (areCoordsValid(newX, newY) && getCoord(newX, newY) === currentValue + 1) {
					trails = trails + searchTrails(newX, newY, currentValue + 1);
				}
			})

			return trails;
		}

		searchTrails(i, j, 0);

		const targetSet = new Set(targetArr);

		return targetSet;
	}



	// const tmp = search(headArr[0][0], headArr[0][1])
	// log(tmp)

	let score = 0;
	headArr.forEach(h => {
		const searchSet = search(h[0], h[1]);

		score = score + searchSet.size
	})


	return score;
}

async function p2024day10_part2(input: string, ...params: any[]) {
	// square
	// const n = input.indexOf('\n')
	// log(params)
	if (params && params[0]) {
		log('~> skip test case')
		return "Not implemented / SKIPPED";
	}

	const gridMap = new Map<string, number>();
	const rows = input.split('\n');

	const headArr = []

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < row.length; j++) {
			const current = row[j]
			gridMap.set(coordString(i, j), Number(current))
			if (current == '0') {
				headArr.push([i, j])
			}
		}
	}
	// log(gridMap)
	// log(headArr)

	function areCoordsValid(x: number, y: number) {
		return gridMap.has(coordString(x, y,))
	}

	function getCoord(x: number, y: number) {
		return gridMap.get(coordString(x, y))
	}

	function setCoord(x: number, y: number, value: number) {
		return gridMap.set(coordString(x, y), value)
	}

	const targetValue = 9;
	const dxdy: number[][] = [[-1, 0], [1, 0], [0, 1], [0, -1]]

	function search(i: number, j: number) {
		const targetArr: string[] = [];

		function searchTrails(i: number, j: number, currentValue: number) {
			// log('searchTrails', i, j, currentValue)
			if (!areCoordsValid(i, j)) {
				// log('SearchTrails', '(', i, ',', j, ')', 'type:', 'INVALID COORDS')
				return 0;
			}
			const value = getCoord(i, j)!; // must exist because valid coords
			// log('SearchTrails', '(', i, ',', j, ')', 'value:', value)

			if (value == targetValue) {
				// target reached
				targetArr.push(coordString(i, j));
				return 1;
			}

			let trails = 0;
			dxdy.forEach(([dx, dy]) => {
				const newX = i + dx;
				const newY = j + dy;
				// log('dxdy', newX, newY)
				if (areCoordsValid(newX, newY) && getCoord(newX, newY) === currentValue + 1) {
					trails = trails + searchTrails(newX, newY, currentValue + 1);
				}
			})

			return trails;
		}

		searchTrails(i, j, 0);

		const targetSet = new Set(targetArr);

		return targetArr.length;
	}



	// const tmp = search(headArr[0][0], headArr[0][1])
	// log(tmp)

	let score = 0;
	headArr.forEach(h => {
		const searchSet = search(h[0], h[1]);

		score = score + searchSet
	})


	return score;
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
10456732`, expected: "36", extraArgs: [false]
	},
	{
		input: `0123
2234
8765
9876`, expected: "1", extraArgs: [false]
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
	const part1Solution = String(await p2024day10_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day10_part2(input));
	const part2After = performance.now();

	logSolution(10, 2024, part1Solution, part2Solution);

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
