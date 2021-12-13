import _, { uniq } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 8;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\08\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\08\data.txt
// problem url  : https://adventofcode.com/2021/day/8

function sortLetters(input: string): string {
	const arr = input.split('');
	return arr.sort((a, b) => a.localeCompare(b)).join('');
}

function convert(input: string) {
	const lines = input.split('\n');

	let inputs: string[][] = [];
	let outputs: string[][] = [];

	lines.forEach(line => {
		const split = line.split('|')
		const input = split[0].split(' ').filter(line => line != '').map(sortLetters);
		inputs.push(input);

		const output = split[1].split(' ').filter(line => line != '').map(sortLetters);
		outputs.push(output);
	})

	return [inputs, outputs];
}

function convertSet(input: string) {
	const lines = input.split('\n');

	let inputs: Set<string>[][] = [];
	let outputs: Set<string>[][] = [];

	lines.forEach(line => {
		const split = line.split('|')
		const input = split[0].split(' ').filter(line => line != '');
		const inputSet = input.map(str => {
			const chars = str.split('');
			return new Set(chars);
		});
		inputs.push(inputSet);

		const output = split[1].split(' ').filter(line => line != '');
		const outputSet = output.map(str => {
			const chars = str.split('');
			return new Set(chars);
		});
		outputs.push(outputSet);
	})
	return [inputs, outputs];
}

// 0: abcefg  | 6
// 1: cf	| 2
// 2: acdeg | 5
// 3: acdfg | 5
// 4: bcdf	| 4
// 5: abdfg	 | 5
// 6: abdefg	| 6
// 7: acf	| 3
// 8: abcdefg | 7
// 9: abcdfg	| 5

async function p2021day8_part1(input: string, ...params: any[]) {
	const arr = convert(input);
	const inputs = arr[0];
	const outputs = arr[1];
	/* 
	console.log(inputs[0])
	console.log(outputs[0])
	console.log(outputs[1])
	console.log(outputs[2]) */

	let sum = 0;
	const unique = new Set([2, 3, 4, 7]);
	outputs.forEach(put => {

		put.forEach(segment => {
			if (unique.has(segment.length)) {
				sum = sum + 1;
			}
		})
	})


	return sum;
}

async function p2021day8_part2(input: string, ...params: any[]) {
	const [inputs, outputs] = convertSet(input);

	for (let i = 0; i < 1; i++) {
		const input = inputs[i];
		const output = outputs[i];

		console.log(input, output);

	}

	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day8_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day8_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day8_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day8_part2(input));
	const part2After = performance.now();

	logSolution(8, 2021, part1Solution, part2Solution);

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
