import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 6;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\06\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\06\data.txt
// problem url  : https://adventofcode.com/2021/day/6
const example = '3,4,3,1,2';

async function p2021day6_part1(input: string, ...params: any[]) {
	const arr = input.split(',').map(Number);
	console.log(arr)

	let fishMap: Map<number, number> = new Map<number, number>();

	for (let i = 0; i < 9; i++) {
		const num = arr.filter(elem => elem === i).length;
		fishMap.set(i, num);
	}
	console.log(fishMap)

	const days = 80;

	for (let i = 1; i <= days; i++) {
		const oldMap = fishMap;

		let newMap: Map<number, number> = new Map<number, number>();

		for (let j = 0; j < 8; j++) {
			const oldCount = oldMap.get(j + 1)!;
			newMap.set(j, oldCount);
		}

		const oldZeros = oldMap.get(0)!;
		const new6s = newMap.get(6)! + oldZeros;
		newMap.set(6, new6s);

		const new8s = oldZeros;
		newMap.set(8, new8s);

		fishMap = newMap;

		//console.log(fishMap);
	}

	const iter = Array.from(fishMap.values());
	let sum = 0;
	iter.forEach(fish => {
		sum = sum + fish;
	})

	return sum;
}

async function p2021day6_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '5934' }];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day6_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day6_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day6_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day6_part2(input));
	const part2After = performance.now();

	logSolution(6, 2021, part1Solution, part2Solution);

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
