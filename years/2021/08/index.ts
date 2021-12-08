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

	console.log(inputs[0])
	console.log(outputs[0])
	console.log(outputs[1])
	console.log(outputs[2])


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

// default decode
const defaultDecoder = new Map<string, number>();
defaultDecoder.set('abcefg', 0)
defaultDecoder.set('cf', 1)
defaultDecoder.set('acdeg', 2)
defaultDecoder.set('acdfg', 3)
defaultDecoder.set('bcdf', 4)
defaultDecoder.set('abdfg', 5)
defaultDecoder.set('abdefg', 6)
defaultDecoder.set('acf', 7)
defaultDecoder.set('abcdefg', 8)
defaultDecoder.set('abcdfg', 9)


function decode(str: string): number {
	const nr = defaultDecoder.get(str);
	if (!nr) {
		return -1
	}
	return nr;
}

interface charPermut {
	a: string,
	b: string,
	c: string,
	d: string,
	e: string,
	f: string,
	g: string
}

function translate(str: string, lang: charPermut): string {
	let permutMap: Map<string, string> = new Map();
	permutMap.set('a', lang.a);
	permutMap.set('b', lang.b);
	permutMap.set('c', lang.c);
	permutMap.set('d', lang.d);
	permutMap.set('e', lang.e);
	permutMap.set('f', lang.f);
	permutMap.set('g', lang.g);

	const split = str.split('');
	let newString = '';
	split.forEach(part => {
		const splitString = part.split('');

		const newChar = permutMap.get(part);
		newString = newString + newChar;
	})

	return newString;
}

async function p2021day8_part2(input: string, ...params: any[]) {
	console.log(decode('abcdfg'));
	console.log(decode('abcdfgss'));

	const str = 'abcdfg';

	const lang: charPermut = {
		a: 'a',
		b: 'b',
		c: 'c',
		d: 'd',
		e: 'e',
		f: 'f',
		g: 'g'
	}

	//const trns = translate(str,lang);
	console.log(decode(translate(str, lang)));

	console.log(decode(translate('acedgfb', {
		a: 'd',
		b: 'e',
		c: 'a',
		d: 'f',
		e: 'g',
		f: 'b',
		g: 'c'
	})));



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
