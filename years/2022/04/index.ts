import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 4;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\04\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\04\data.txt
// problem url  : https://adventofcode.com/2022/day/4

interface assignment {
	first: {
		from: number,
		to: number
	},
	second: {
		from: number,
		to: number
	}
}

function readAssignments(input: string): assignment[] {
	return input.split('\n').map(str => {
		const split = str.split(',')
		const one = split[0].split('-').map(Number)
		const two = split[1].split('-').map(Number)

		return {
			first: {
				from: one[0],
				to: one[1]
			},
			second: {
				from: two[0],
				to: two[1]
			}
		}
	})
}

async function p2022day4_part1(input: string, ...params: any[]) {
	const assigments = readAssignments(input)

	let count = 0

	assigments.forEach(a => {
		if ((a.first.from >= a.second.from && a.first.to <= a.second.to) || (a.second.from >= a.first.from && a.second.to <= a.first.to)) {
			count = count + 1
		}
	})

	//console.log(assigments.slice(0, 5))

	return count;
}

async function p2022day4_part2(input: string, ...params: any[]) {
	const assigments = readAssignments(input)

	let count = 0

	assigments.forEach(a => {
		const firstFrom = a.first.from
		const firstTo = a.first.to
		const secondFrom = a.second.from
		const secondTo = a.second.to
		if ((firstFrom >= secondFrom && firstFrom <= secondTo) ||
			(firstTo >= secondFrom && firstTo <= secondTo) ||
			(secondFrom >= firstFrom && secondFrom <= firstTo) ||
			(secondTo >= firstFrom && secondTo <= firstTo)) {
			count = count + 1
		}
	})

	//console.log(assigments.slice(0, 5))

	return count;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day4_part2(input));
	const part2After = performance.now();

	logSolution(4, 2022, part1Solution, part2Solution);

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
