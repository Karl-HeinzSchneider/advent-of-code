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

function getNeighbors(x: number, y: number, grid: number[]) {
	let arr: { x: number, y: number, size: number }[] = [];

	const up = getGridCoords(x, y + 1, grid);
	arr.push({ x: x, y: y + 1, size: up });

	const down = getGridCoords(x, y - 1, grid);
	arr.push({ x: x, y: y - 1, size: down });

	const left = getGridCoords(x - 1, y, grid);
	arr.push({ x: x - 1, y: y, size: left });

	const right = getGridCoords(x + 1, y, grid);
	arr.push({ x: x + 1, y: y, size: right });

	return arr;
}

async function p2021day9_part2(input: string, ...params: any[]) {
	const grid = convert(input);
	const size = Math.sqrt(grid.length);

	let lowPoints: { x: number, y: number, size: number }[] = [];

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const point = getGridCoords(i, j, grid);
			//console.log(i,j,point)
			const up = getGridCoords(i, j + 1, grid);
			const down = getGridCoords(i, j - 1, grid);

			const left = getGridCoords(i - 1, j, grid);
			const right = getGridCoords(i + 1, j, grid);

			if (point < up && point < down && point < left && point < right) {
				lowPoints.push({ x: i, y: j, size: point });
				//console.log('low:', i, j, point)
			}
		}
	}

	let basins: Set<string>[] = [];

	lowPoints.forEach(low => {
		let queue = [low];
		let visited: Set<string> = new Set();

		while (queue.length > 0) {
			const point = queue.shift();
			const neighbors = getNeighbors(point?.x!, point?.y!, grid);

			neighbors.forEach(n => {
				const id = `${n.x}|${n.y}`;
				if (n.size < 9 && !visited.has(id)) {
					queue.push(n);
					visited.add(id);
				}
			})
		}
		basins.push(visited);
	})

	basins.sort((a, b) => b.size - a.size)
	//console.log(basins);

	const biggest = basins.slice(0, 3);
	//console.log(biggest)

	return biggest[0].size * biggest[1].size * biggest[2].size;

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
