import _, { filter } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 3;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\03\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\03\data.txt
// problem url  : https://adventofcode.com/2021/day/3

async function p2021day3_part1(input: string, ...params: any[]) {
	const arr = input.split('\n');

	let gamma = '------------';
	let gammaSplit = gamma.split('');

	for (let i = 0; i < 12; i++) {
		let one = 0;
		let zero = 0;

		arr.forEach(entry => {
			if (entry.charAt(i) === '1') {
				one = one + 1;
			}
			else {
				zero = zero + 1;
			}
		})

		if (one >= zero) {
			gammaSplit[i] = '1';
		}
		else {
			gammaSplit[i] = '0';
		}
	}
	const epsilonSplit = gammaSplit.map(entry => {
		if (entry === '1') {
			return '0'
		}
		else {
			return '1';
		}
	})
	//console.log(gammaSplit);
	//console.log(epsilonSplit);

	const epsilonString = epsilonSplit.join('');
	const gammaString = gammaSplit.join('');

	//console.log(epsilonString);
	//console.log(gammaString);

	const epsilonNr = parseInt(epsilonString, 2);
	const gammaNr = parseInt(gammaString, 2);

	return epsilonNr * gammaNr;
}

function mostCommonBitAtIndex(input: string[], index: number): '0' | '1' {

	let one = 0;
	let zero = 0;

	input.forEach(entry => {
		if (entry.charAt(index) === '1') {
			one = one + 1;
		}
		else {
			zero = zero + 1;
		}
	})


	if (one >= zero) {
		return '1';
	}
	else {
		return '0';
	}
}

function leastCommonBitAtIndex(input: string[], index: number): '0' | '1' {

	let one = 0;
	let zero = 0;

	input.forEach(entry => {
		if (entry.charAt(index) === '1') {
			one = one + 1;
		}
		else {
			zero = zero + 1;
		}
	})


	if (zero <= one) {
		return '0';
	}
	else {
		return '1';
	}
}

async function p2021day3_part2(input: string, ...params: any[]) {
	const arr = input.split('\n');

	let oxygen = '';
	let co2 = '';
	// oxygen
	let commonInit = mostCommonBitAtIndex(arr, 0);
	let filtered = arr.filter(entry => entry.charAt(0) === commonInit);

	//console.log('common: ' + commonInit + ' l: ' + filtered.length);

	for (let i = 1; i < 12; i++) {

		const common = mostCommonBitAtIndex(filtered, i);
		filtered = filtered.filter(entry => entry.charAt(i) === common);

		//console.log('common: ' + common + ' l: ' + filtered.length);


		if (filtered.length === 1) {
			console.log('finished Oxy: ' + filtered[0])
			oxygen = filtered[0];
			break;
		}
	}

	// co2

	commonInit = leastCommonBitAtIndex(arr, 0);
	filtered = arr.filter(entry => entry.charAt(0) === commonInit);

	for (let i = 1; i < 12; i++) {

		const common = leastCommonBitAtIndex(filtered, i);
		filtered = filtered.filter(entry => entry.charAt(i) === common);

		//console.log('common: ' + common + ' l: ' + filtered.length);


		if (filtered.length === 1) {
			console.log('finished CO2: ' + filtered[0])
			co2 = filtered[0];
			break;
		}
	}


	const oxygenNumber = parseInt(oxygen, 2);
	const co2Number = parseInt(co2, 2);

	return oxygenNumber * co2Number;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day3_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day3_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day3_part2(input));
	const part2After = performance.now();

	logSolution(3, 2021, part1Solution, part2Solution);

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
