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
		const lineOne = newArr[i * 6 + 1].split(' ').filter(entry => entry != '').map(Number);
		const lineTwo = newArr[i * 6 + 2].split(' ').filter(entry => entry != '').map(Number);
		const lineThree = newArr[i * 6 + 3].split(' ').filter(entry => entry != '').map(Number);
		const lineFour = newArr[i * 6 + 4].split(' ').filter(entry => entry != '').map(Number);
		const lineFive = newArr[i * 6 + 5].split(' ').filter(entry => entry != '').map(Number);

		const board = [...lineOne, ...lineTwo, ...lineThree, ...lineFour, ...lineFive];
		boards.push(board);
	}

	return { numbers: bingoNumbers, boards: boards };
}


class Board {
	public gridNumbers: number[] = [];

	public marked: Set<number> = new Set();

	constructor(numbers: number[]) {
		this.gridNumbers = numbers;
	}

	public mark(number: number): boolean {
		this.marked.add(number);

		if (this.marked.size < 5) {
			//return false;
		}

		const index = this.gridNumbers.findIndex(num => num === number);
		if (index < 0) {
			return false;
		}

		const column = index % 5;
		const row = (index - column) / 5;
		//console.log(number, '->', row, column);
		const rowFinished = this.checkRow(row);
		if (rowFinished) {
			return true;
		}

		const columnFinished = this.checkColumn(column);
		if (columnFinished) {
			return true;
		}

		return false;
	}

	checkRow(row: number): boolean {

		for (let i = 0; i < 5; i++) {
			if (!this.marked.has(this.gridNumbers[i + row * 5])) {
				return false;
			}
		}

		return true;
	}

	checkColumn(column: number): boolean {

		for (let i = 0; i < 5; i++) {
			if (!this.marked.has(this.gridNumbers[i * 5 + column])) {
				return false;
			}
		}

		return true;
	}

	calculateScore(lastNumber: number): number {
		let sum = 0;

		this.gridNumbers.forEach(num => {
			if (!this.marked.has(num)) {
				sum = sum + num;
			}
		})

		return sum * lastNumber;
	}
}


async function p2021day4_part1(input: string, ...params: any[]) {
	const data = convert(input);

	const bingoNumbers = data.numbers;
	const boards = data.boards.map(entry => {
		const board = new Board(entry);
		return board;
	});

	//console.log(bingoNumbers);
	console.log(boards[0].gridNumbers);


	for (let i = 0; i < bingoNumbers.length; i++) {
		const newNumber = bingoNumbers[i];

		for (let j = 0; j < boards.length; j++) {
			const board = boards[j];
			const winning = board.mark(newNumber);

			//console.log(newNumber, board.marked.size)
			if (winning) {
				console.log('WINNING');
				const score = board.calculateScore(newNumber);
				console.log(newNumber)
				console.log(board.gridNumbers);
				console.log(Array.from(board.marked).sort((a, b) => a - b));
				console.log(j)
				return score;
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
