import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 4;

// solution path: E:\Projects\advent-of-code\years\2024\04\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\04\data.txt
// problem url  : https://adventofcode.com/2024/day/4

function createGrid(input: string): string[][] {
	let grid: string[][] = [];
	const rows = input.split('\n');

	rows.forEach(row => {
		const split = row.split('')
		grid.push(split)
	})

	return grid;
}

function reverseString(input: string): string {
	return input.split('').reverse().join('');
}

function countMatches(input: string, searchString: RegExp): number {
	let score = 0;

	const matches = [...input.matchAll(searchString)].map(m => m[0])

	score = matches.length

	if (score > 0) {
		// log('Matches:', score, ',str:', input)
	}

	return score;
}

function createDiagonalString(grid: string[][], startX: number, startY: number, rows: number, columns: number, dx: number, dy: number): string {
	let diagonalStr = grid[startX][startY];

	for (let i = 1; i < rows + columns; i++) {
		const newX = startX + i * dx;
		// log(newX)

		if (newX < 0 || newX >= rows) {
			// log('break X', newX)
			break;
		}

		const newY = startY + i * dy;
		if (newY < 0 || newY >= columns) {
			// log('break Y', newY)

			break;
		}
		const nextChar = grid[startX + i * dx][startY + i * dy];
		diagonalStr = diagonalStr + nextChar;
	}

	return diagonalStr;
}

async function p2024day4_part1(input: string, ...params: any[]) {
	const grid = createGrid(input);

	let score = 0;

	const rows = grid.length;
	const columns = grid[0].length
	log('rows:', rows, ',columns:', columns)

	const searchFor = /XMAS/g

	// horizontal + reverse
	for (let i = 0; i < rows; i++) {
		const row = grid[i];
		const rowStr = row.join('');
		const rowStrReverse = reverseString(rowStr);

		// log(rowStr, rowStrReverse)
		score = score + countMatches(rowStr, searchFor) + countMatches(rowStrReverse, searchFor);
	}

	// vertical + reverse
	for (let i = 0; i < columns; i++) {
		let columnStr = '';

		for (let j = 0; j < rows; j++) {
			columnStr = columnStr + grid[j][i]
		}

		const columnStrReverse = reverseString(columnStr);

		// log(columnStr, columnStrReverse)
		score = score + countMatches(columnStr, searchFor) + countMatches(columnStrReverse, searchFor);
	}

	// diagonal topleft -> bottomright  + reverse
	for (let i = 0; i < rows; i++) {
		// log('row:', i)
		const diagonalStr = createDiagonalString(grid, i, 0, rows, columns, 1, 1);
		const diagonalStrReverse = reverseString(diagonalStr);

		// log(diagonalStr)

		score = score + countMatches(diagonalStr, searchFor) + countMatches(diagonalStrReverse, searchFor);
	}
	for (let i = 1; i < columns; i++) {
		const diagonalStr = createDiagonalString(grid, 0, i, rows, columns, 1, 1);
		const diagonalStrReverse = reverseString(diagonalStr);

		// log(diagonalStr)

		score = score + countMatches(diagonalStr, searchFor) + countMatches(diagonalStrReverse, searchFor);
	}

	// diagonal topright -> bottomleft  + reverse
	for (let i = 0; i < columns; i++) {
		// log('row:', i)
		// log(0, i)
		const diagonalStr = createDiagonalString(grid, 0, i, rows, columns, 1, -1);
		const diagonalStrReverse = reverseString(diagonalStr);

		// log(diagonalStr)

		score = score + countMatches(diagonalStr, searchFor) + countMatches(diagonalStrReverse, searchFor);
	}
	for (let i = 1; i < rows; i++) {
		const diagonalStr = createDiagonalString(grid, i, columns - 1, rows, columns, 1, -1);
		const diagonalStrReverse = reverseString(diagonalStr);

		// log(diagonalStr)

		score = score + countMatches(diagonalStr, searchFor) + countMatches(diagonalStrReverse, searchFor);
	}

	return score;
}

async function p2024day4_part2(input: string, ...params: any[]) {
	const grid = createGrid(input);

	let score = 0;

	const rows = grid.length;
	const columns = grid[0].length
	log('rows:', rows, ',columns:', columns)

	for (let i = 1; i < rows - 1; i++) {
		for (let j = 1; j < columns - 1; j++) {
			const gridChar = grid[i][j];

			if (gridChar == 'A') {
				const topleft = grid[i - 1][j - 1];
				const topright = grid[i - 1][j + 1];
				const bottomleft = grid[i + 1][j - 1];
				const bottomright = grid[i + 1][j + 1];

				const firstMes = (topleft == 'M' && bottomright == 'S') || (topleft == 'S' && bottomright == 'M')
				const secondMes = (bottomleft == 'M' && topright == 'S') || (bottomleft == 'S' && topright == 'M')

				if (firstMes && secondMes) {
					score = score + 1;
				}
			}
		}
	}

	return score;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`, expected: "18"
	}];
	const part2tests: TestCase[] = [{
		input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`, expected: "9"
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day4_part2(input));
	const part2After = performance.now();

	logSolution(4, 2024, part1Solution, part2Solution);

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
