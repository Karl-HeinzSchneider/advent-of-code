import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 2;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\02\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\02\data.txt
// problem url  : https://adventofcode.com/2020/day/2


// helper
interface pwType {
	min: number,
	max: number,
	char: string,
	pw: string
}

function convert(input: string): pwType[] {
	const arr = input.split('\n');

	return arr.map(entry => {
		// ex: '5-6 s: zssmssbsms'
		const arr = entry.split(' ');

		// min-max  '5-6'
		const arrMinMax = arr[0].split('-');
		const min = arrMinMax[0];
		const max = arrMinMax[1];

		// char 's:'
		const char = arr[1].slice(0, -1);

		const pw = arr[2];

		const typed: pwType = {
			min: Number(min),
			max: Number(max),
			char: char,
			pw: pw
		}

		return typed
	});
}

async function p2020day2_part1(input: string, ...params: any[]) {
	const arr = convert(input);

	let validCount = 0;

	arr.forEach(entry => {
		const chars = entry.pw.split('');

		let count = 0;

		chars.forEach(char => {
			if (char === entry.char) {
				count = count + 1;
			}
		})

		if (count >= entry.min && count <= entry.max) {
			validCount = validCount + 1;
		}

	})

	return validCount;
}

async function p2020day2_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `1-3 a: abcde
		1-3 b: cdefg
		2-9 c: ccccccccc`,
		expected: "2"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day2_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day2_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day2_part2(input));
	const part2After = performance.now();

	logSolution(2, 2020, part1Solution, part2Solution);

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
