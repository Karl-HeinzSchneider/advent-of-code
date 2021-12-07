import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 4;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\04\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\04\data.txt
// problem url  : https://adventofcode.com/2021/day/4

function convert(input: string) {
	const arr = input.split('\n');

	const bingoNumbers = arr[0].split(',').map(Number);

	const newArr = arr.splice(1);
	const length = newArr.length

	let boards: number[][] = [];

	for (let i = 0; i < length / 6; i++) {
		const lineOne = newArr[i * 6 + 1].split(' ').map(Number);
		const lineTwo = newArr[i * 6 + 2].split(' ').map(Number);
		const lineThree = newArr[i * 6 + 3].split(' ').map(Number);
		const lineFour = newArr[i * 6 + 4].split(' ').map(Number);
		const lineFive = newArr[i * 6 + 5].split(' ').map(Number);

		const board = [...lineOne, ...lineTwo, ...lineThree, ...lineFour, ...lineFive];
		boards.push(board);
	}

	return { numbers: bingoNumbers, boards: boards };
}

function checkBoard(numbers: number[], board: number[]): boolean {

	const sorted = numbers.sort((a, b) => a - b);


	for (let i = 0; i < 5; i++) {
		const lineSorted = board.slice(i, i + 5).sort((a, b) => a - b);
		if (lineSorted === sorted) {
			return true;
		}

		const columnSorted = [board[i], board[i + 5], board[i + 10], board[i + 15], board[i + 20]].sort((a, b) => a - b);

		if (columnSorted === sorted) {
			return true;
		}
		//console.log(sorted, lineSorted, columnSorted);

	}

	return false;
}


async function p2021day4_part1(input: string, ...params: any[]) {
	const data = convert(input);

	const bingoNumbers = data.numbers;
	const boards = data.boards;

	//console.log(bingoNumbers);
	//console.log(boards[0]);

	for (let i = 4; i < bingoNumbers.length; i++) {
		const draw = bingoNumbers.slice(0, i + 1);

		for (let j = 0; j < 1; j++) {
			const board = boards[j];
			const winning = checkBoard(draw, board);
			if (winning) {
				console.log(draw, j, board);
			}
		}


	}

	return "Not implemented";
}

async function p2021day4_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day4_part2(input));
	const part2After = performance.now();

	logSolution(4, 2021, part1Solution, part2Solution);

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
