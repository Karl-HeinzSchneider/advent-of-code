import _, { replace } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 14;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\14\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\14\data.txt
// problem url  : https://adventofcode.com/2021/day/14
const example = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

function convert(input: string) {
	const arr = input.split('\n');

	const template = arr[0];

	const replaceMap: Map<string, string> = new Map();

	arr.slice(2).forEach(line => {
		const split = line.split(' -> ');
		const first = split[0];
		const second = split[1];

		replaceMap.set(first, second);
	})

	return { template: template, map: replaceMap };
}

function poly(input: string, mapper: Map<string, string>): string {

	let substrArr: string[] = [];

	for (let i = 0; i < input.length - 1; i++) {
		substrArr.push(input[i] + input[i + 1]);
	}
	const newPolyString = substrArr.map(str => {
		const newElem = mapper.get(str)!;
		return str[0] + newElem;
	}).join('') + input[input.length - 1];

	return newPolyString;
}

function polyImproved(input: string, mapper: Map<string, string>, maxIterations: number): Map<string, number> {
	let charMap: Map<string, number> = new Map();

	const increaseElementCount = function (element: string) {
		if (!charMap.has(element)) {
			charMap.set(element, 1);
		}
		else {
			const old = charMap.get(element)!;
			charMap.set(element, old + 1);
		}
	}

	// count starting Elements
	input.split('').forEach(char => {
		increaseElementCount(char);
	})


	const DFS = function (current: string, iteration: number) {

		const newElem = mapper.get(current)!;

		increaseElementCount(newElem);

		const newIteration = iteration + 1;

		if (newIteration > maxIterations) {
			return;
		}

		DFS(current[0] + newElem, newIteration);
		DFS(newElem + current[1], newIteration);
	}

	// create substrings of 2 Chars and do DSF for each
	let substrArr: string[] = [];

	for (let i = 0; i < input.length - 1; i++) {
		substrArr.push(input[i] + input[i + 1]);
	}

	substrArr.forEach(sub => {
		DFS(sub, 1);
	})

	return charMap;
}

async function p2021day14_part1(input: string, ...params: any[]) {
	const conv = convert(input);

	const template = conv.template;
	const replaceMap = conv.map;

	//console.log(replaceMap)

	const steps = 10;
	let polyString = template;
	//console.log(0, polyString.length, polyString);

	for (let i = 1; i <= steps; i++) {
		polyString = poly(polyString, replaceMap);
		//console.log(i, polyString.length, polyString);
	}

	let charMap: Map<string, number> = new Map();
	polyString.split('').forEach(char => {
		if (!charMap.has(char)) {
			charMap.set(char, 1);
		}
		else {
			const old = charMap.get(char)!;
			charMap.set(char, old + 1);
		}
	})
	//console.log(charMap)

	const max = [...charMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a);

	const min = [...charMap.entries()].reduce((a, e) => e[1] < a[1] ? e : a);

	const diff = max[1] - min[1];
	//console.log(min, max, diff);

	return diff;
}

async function p2021day14_part2(input: string, ...params: any[]) {
	const conv = convert(input);

	const template = conv.template;
	const replaceMap = conv.map;

	//console.log(replaceMap)

	let charMap: Map<string, number> = new Map();
	charMap = polyImproved(template, replaceMap, 10);

	const max = [...charMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a);

	const min = [...charMap.entries()].reduce((a, e) => e[1] < a[1] ? e : a);

	const diff = max[1] - min[1];
	//console.log(min, max, diff);

	return diff;
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '1588' }];
	const part2tests: TestCase[] = [{ input: example, expected: '1588' }];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day14_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day14_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day14_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day14_part2(input));
	const part2After = performance.now();

	logSolution(14, 2021, part1Solution, part2Solution);

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
