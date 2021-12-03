import _, { map } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 6;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\06\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\06\data.txt
// problem url  : https://adventofcode.com/2020/day/6

const testInput = `fbqjswm
qmbjwfs
fmsbjwq
smjbqwf
hwsqmbfj

sxpoqbueg
fbhxqzjrtdkgwaepos
qbepgsxo
pbxvosegq
giqepcobsxl

gd
pfdy

yijwkdzvoub
cifujkyvbwz`

function convert(input: string): string[][] {
	const arr = input.split('\n\n').map(grp => grp.split('\n'));
	return arr;
}

async function p2020day6_part1(input: string, ...params: any[]) {
	const arr = convert(input);
	//console.log(arr)

	let count = 0;

	arr.forEach(grp => {
		let answers = new Set<string>();

		grp.forEach(member => {
			for (let i = 0; i < member.length; i++) {
				answers.add(member.charAt(i));
			}

		})

		count = count + answers.size;
		//console.log(answers);
	})

	return count;
}

async function p2020day6_part2(input: string, ...params: any[]) {
	const arr = convert(input);
	//console.log(arr)

	let count = 0;

	arr.forEach(grp => {
		let answers = new Map<string, number>();

		grp.forEach(member => {
			for (let i = 0; i < member.length; i++) {
				const char = member.charAt(i);

				const charMap = answers.get(char);

				if (charMap) {
					const newCount = charMap + 1;

					answers.set(char, newCount);
				}
				else {
					answers.set(char, 1);
				}
			}

		})

		const memberCount = grp.length;
		let memberAgree = 0;

		for (let value of answers.values()) {
			if (value === memberCount) {
				memberAgree = memberAgree + 1;
			}
		}
		count = count + memberAgree;

		console.log(answers);


		//console.log(answers);
	})

	return count;
}

async function run() {
	const part1tests: TestCase[] = [
		{

			input: testInput,
			expected: "49"
		}
	];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day6_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day6_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day6_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day6_part2(input));
	const part2After = performance.now();

	logSolution(6, 2020, part1Solution, part2Solution);

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
