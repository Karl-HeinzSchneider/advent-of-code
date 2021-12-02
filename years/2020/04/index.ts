import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 4;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\04\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\04\data.txt
// problem url  : https://adventofcode.com/2020/day/4

const example = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

function convert(input: string) {
	const arr = input.split('\n');

	let newArr: string[][] = [];
	//console.log(arr)

	let start = 0;

	arr.forEach((value, index, array) => {
		if (value === '') {
			const ppRaw = arr.slice(start, index);

			let pp: string[] = [];

			ppRaw.forEach(entry => {
				const splits = entry.split(' ');
				pp = [...pp, ...splits];
			})
			newArr.push(pp);

			start = index + 1;
		}
		else if (index === arr.length - 1) {
			const ppRaw = arr.slice(start);

			let pp: string[] = [];

			ppRaw.forEach(entry => {
				const splits = entry.split(' ');
				pp = [...pp, ...splits];
			})
			newArr.push(pp);
		}
	})

	return newArr;
}

function checkPassport(pp: string[]): boolean {

	const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
	const optionalFields = ['cid'];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!pp.some(entry => entry.startsWith(field))) {
			//console.log('INVALID -> ' + field);
			return false;
		}
	}

	return true;
}

async function p2020day4_part1(input: string, ...params: any[]) {
	const ppArr = convert(input);
	//console.log(ppArr)

	let counter = 0;

	ppArr.forEach(pp => {
		if (checkPassport(pp)) {
			counter = counter + 1;
		}
	})


	return counter;
}

async function p2020day4_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: example,
			expected: '2'
		}
	];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day4_part2(input));
	const part2After = performance.now();

	logSolution(4, 2020, part1Solution, part2Solution);

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
