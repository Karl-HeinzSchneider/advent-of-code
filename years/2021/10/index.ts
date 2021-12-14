import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 10;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\10\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\10\data.txt
// problem url  : https://adventofcode.com/2021/day/10

const example =
	`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

function isLineCorrupt(input: string) {
	const openSet = new Set(['(', '[', '{', '<']);
	const closeSet = new Set([')', ']', '}', '>']);

	const mapper: Map<string, string> = new Map();

	for (let i = 0; i < openSet.size; i++) {
		const open = [...openSet];
		const close = [...closeSet];
		mapper.set(close[i], open[i]);
	}

	const split = input.split('');

	let charsToParse: string[] = split;
	let stack: string[] = [];

	while (charsToParse.length > 0) {
		//console.log(stack.join(''), ' --- ', charsToParse.join(''));

		const currentChar = charsToParse.shift()!;

		// open Char => new Chunk
		if (openSet.has(currentChar)) {
			stack.push(currentChar);
		}
		// close Char
		else if (closeSet.has(currentChar)) {

			const lastStack = stack.pop();

			// stack empty and close Char => invalid
			if (!lastStack) {
				return { corrupt: true, firstIncorrect: currentChar };
			}

			const matching = mapper.get(currentChar)!;
			if (lastStack === matching) {

			}
			// ex: ( + ]
			else {
				return { corrupt: true, firstIncorrect: currentChar };
			}

		}
	}

	return { corrupt: false, firstIncorrect: '', stack: stack };
}

function calcCompleteString(input: string[]): string[] {
	let arr = [...input];
	let complete: string[] = [];

	const openSet = new Set(['(', '[', '{', '<']);
	const closeSet = new Set([')', ']', '}', '>']);

	const mapper: Map<string, string> = new Map();

	for (let i = 0; i < openSet.size; i++) {
		const open = [...openSet];
		const close = [...closeSet];
		mapper.set(open[i], close[i]);
	}

	while (arr.length > 0) {
		const last = arr.pop()!;
		const complement = mapper.get(last)!;
		complete.push(complement);
	}

	return complete;
}

async function p2021day10_part1(input: string, ...params: any[]) {
	const arr = input.split('\n');

	const scoreMap: Map<string, number> = new Map();
	scoreMap.set(')', 3);
	scoreMap.set(']', 57);
	scoreMap.set('}', 1197);
	scoreMap.set('>', 25137);


	let score = 0;

	for (let i = 0; i < arr.length; i++) {
		const line = arr[i];
		const isCorrupt = isLineCorrupt(line);

		const mapped = scoreMap.get(isCorrupt.firstIncorrect);
		const lineScore = mapped ? mapped : 0;
		//console.log(isCorrupt, lineScore)

		score = score + lineScore;
	}

	return score;
}

async function p2021day10_part2(input: string, ...params: any[]) {
	const arr = input.split('\n');

	const scoreMap: Map<string, number> = new Map();
	scoreMap.set(')', 1);
	scoreMap.set(']', 2);
	scoreMap.set('}', 3);
	scoreMap.set('>', 4);

	let scoreArray: number[] = [];

	for (let i = 0; i < arr.length; i++) {
		const line = arr[i];
		const lineParse = isLineCorrupt(line);

		if (!lineParse.corrupt) {
			const lineStack = lineParse.stack!;
			const complement = calcCompleteString(lineStack);

			//console.log(lineStack, complement);
			let lineScore = 0;
			for (let j = 0; j < complement.length; j++) {
				const charScore = scoreMap.get(complement[j])!;

				lineScore = (lineScore * 5) + charScore;
			}
			scoreArray.push(lineScore);
		}
	}
	
	scoreArray.sort((a, b) => a - b);	

	const index = Math.floor(scoreArray.length / 2);
	const score = scoreArray[index];

	return score;
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '26397' }];
	const part2tests: TestCase[] = [{ input: example, expected: '288957' }];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day10_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day10_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day10_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day10_part2(input));
	const part2After = performance.now();

	logSolution(10, 2021, part1Solution, part2Solution);

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
