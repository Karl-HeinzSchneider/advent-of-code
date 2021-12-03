import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 5;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\05\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\05\data.txt
// problem url  : https://adventofcode.com/2020/day/5

const testCodes = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`

interface seat {
	row: number,
	column: number,
	id: number
}

function decode(code: string): seat {

	let charArray = code.split('');

	let row = '';
	for (let i = 0; i < 7; i++) {
		const char = charArray[i];

		if (char === 'F') {
			row = row + '0';
		}
		else if (char === 'B') {
			row = row + '1';
		}
	}

	let column = '';
	for (let i = 7; i < 11; i++) {
		const char = charArray[i];

		if (char === 'L') {
			column = column + '0';
		}
		else if (char === 'R') {
			column = column + '1';
		}
	}

	const rowNumber = parseInt(row, 2);
	const columnNumber = parseInt(column, 2);

	const id = rowNumber * 8 + columnNumber;

	//console.log('decode: ' + code);
	//console.log('=  row: ' + row + ' column: ' + column);
	//console.log('=  row: ' + rowNumber + ' column: ' + columnNumber);

	return {
		row: rowNumber,
		column: columnNumber,
		id: id
	}
}



async function p2020day5_part1(input: string, ...params: any[]) {
	const arr = input.split('\n');

	let highest = 0;

	arr.forEach(code => {
		let tmp = decode(code);

		if (tmp.id > highest) {
			highest = tmp.id;
		}
		//console.log(tmp)
	})

	return highest;
}

async function p2020day5_part2(input: string, ...params: any[]) {

	const arr = input.split('\n');

	let seatSet = new Set<number>();

	arr.forEach(code => {
		let tmp = decode(code);
		seatSet.add(tmp.id);
		//console.log(tmp)
	})

	for (let i = 0; i < 848; i++) {
		if (!seatSet.has(i)) {
			if (seatSet.has(i - 1) && seatSet.has(i + 1)) {
				return i;
			}
		}
	}

	return -1;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: testCodes,
			expected: "820"
		}
	];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day5_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day5_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day5_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day5_part2(input));
	const part2After = performance.now();

	logSolution(5, 2020, part1Solution, part2Solution);

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
