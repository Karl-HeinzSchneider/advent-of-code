import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 6;

// solution path: E:\Projects\advent-of-code\years\2024\06\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\06\data.txt
// problem url  : https://adventofcode.com/2024/day/6

function createGrid(input: string): { grid: string[][], start: { x: number, y: number } } {
	let grid: string[][] = [];
	const rows = input.split('\n');
	let start: { x: number, y: number } = { x: -1, y: -1 };

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		const indexOfStart = row.indexOf('^')
		if (indexOfStart > 0) {
			// log('index:', i, indexOfStart)
			start = { x: i, y: indexOfStart }
		}

		const split = row.split('')
		grid.push(split)
	}

	return { grid: grid, start: start };
}

function isInsideGrid(pos: { x: number, y: number }, width: number, height: number): boolean {
	if (pos.x < 0 || pos.x >= width) {
		return false;
	}
	if (pos.y < 0 || pos.y >= height) {
		return false;
	}

	return true;
}

async function p2024day6_part1(input: string, ...params: any[]) {
	const { grid, start } = createGrid(input);
	log('Found start at: ', start)

	const width = grid[0].length;
	const height = grid.length;
	log('w:', width, ', h:', height)

	type GuardDirections = '^' | '>' | 'v' | '<'
	const guardDict = {
		'^': { x: -1, y: 0 },
		'>': { x: 0, y: 1 },
		'v': { x: 1, y: 0 },
		'<': { x: 0, y: -1 },
	}
	const guardDictNextMove = {
		'^': '>',
		'>': 'v',
		'v': '<',
		'<': '^'
	}

	let guardDir: GuardDirections = '^'
	let guard = start;
	let score = 1;

	grid[guard.x][guard.y] = 'X'

	if (!isInsideGrid(guard, width, height)) {
		return 0;
	}
	// if (true) return 0;

	while (true) {
		const guardDeltaPos = guardDict[guardDir]
		const nextPosition = { x: guard.x + guardDeltaPos.x, y: guard.y + guardDeltaPos.y }
		// log('current:', guard, 'next:', nextPosition)

		if (!isInsideGrid(nextPosition, width, height)) {
			return score;
		}

		const nextStr = grid[nextPosition.x][nextPosition.y];

		if (nextStr == '.') {
			// normal field
			// log('-> normal field')
			guard = nextPosition;
			grid[guard.x][guard.y] = 'X'
			score = score + 1;
		}
		else if (nextStr == 'X') {
			// normal field but already visited
			// log('-> visited field')
			guard = nextPosition;
		}
		else if (nextStr == '#') {
			// obstacle
			// log('-> BLOCKED')
			guardDir = guardDictNextMove[guardDir] as GuardDirections;
		}
		else {
			// log('fail??');
			return score;
		}
		// log('~~~~~~~~~~~~~')
	}
}

async function p2024day6_part2(input: string, ...params: any[]) {
	const { grid, start } = createGrid(input);
	log('Found start at: ', start)

	const width = grid[0].length;
	const height = grid.length;
	log('w:', width, ', h:', height)

	type GuardDirections = '^' | '>' | 'v' | '<'
	const guardDict = {
		'^': { x: -1, y: 0 },
		'>': { x: 0, y: 1 },
		'v': { x: 1, y: 0 },
		'<': { x: 0, y: -1 },
	}
	const guardDictNextMove = {
		'^': '>',
		'>': 'v',
		'v': '<',
		'<': '^'
	}

	grid[start.x][start.y] = 'X'

	if (!isInsideGrid(start, width, height)) {
		return 0;
	}
	// if (true) return 0;

	function isInLoop(newObstacle: { x: number, y: number }): boolean {
		// TODO: couldn't pass the grid as copy => slow ~13s
		const { grid, start } = createGrid(input);
		grid[start.x][start.y] = 'X'

		let guardDir: GuardDirections = '^'
		let guard = start;
		let score = 1;

		grid[newObstacle.x][newObstacle.y] = '#'

		const loopMap = new Map<string, boolean>();
		loopMap.set(`${guard.x}-${guard.y}-${guardDir}`, true);

		while (true) {
			const guardDeltaPos = guardDict[guardDir]
			const nextPosition = { x: guard.x + guardDeltaPos.x, y: guard.y + guardDeltaPos.y }
			// log('current:', guard, 'next:', nextPosition)

			if (!isInsideGrid(nextPosition, width, height)) {
				// log('--> no loop:', score)
				return false;
			}

			const nextStr = grid[nextPosition.x][nextPosition.y];

			if (nextStr == '.') {
				// normal field
				// log('-> normal field')
				guard = nextPosition;
				grid[guard.x][guard.y] = 'X'
				score = score + 1;
			}
			else if (nextStr == 'X') {
				// normal field but already visited
				// log('-> visited field')
				guard = nextPosition;
			}
			else if (nextStr == '#') {
				// obstacle
				// log('-> BLOCKED')
				guardDir = guardDictNextMove[guardDir] as GuardDirections;
			}
			else {
				// log('fail??');
				// return score;
			}
			// log('~~~~~~~~~~~~~')

			// check loop
			if (loopMap.has(`${guard.x}-${guard.y}-${guardDir}`)) {
				return true;
			}
			loopMap.set(`${guard.x}-${guard.y}-${guardDir}`, true);
		}
		return true;
	}

	let score = 0;
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (i == start.x && j == start.y) {
				// start => skip
				// log(i, j, '-> skip start')
			}
			else if (grid[i][j] == '#') {
				// already blocked => skip
				// log(i, j, '-> skip blocked')
			}
			else {
				// log(i, j, '')
				const looping = isInLoop({ x: i, y: j });
				if (looping) {
					// log('----> looping')
					score = score + 1
				}
			}
		}
	}
	return score;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input:
				`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`, expected: "41"
		}
	];
	const part2tests: TestCase[] = [{
		input:
			`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`, expected: "6"
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day6_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day6_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	// if (true) return;

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day6_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day6_part2(input));
	const part2After = performance.now();

	logSolution(6, 2024, part1Solution, part2Solution);

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
