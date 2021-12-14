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
		const input = split[0].split(' ').filter(line => line != '').map(sortLetters);
		const inputSet = input.map(str => {
			const chars = str.split('');
			return new Set(chars);
		});
		inputs.push(inputSet);

		const output = split[1].split(' ').filter(line => line != '').map(sortLetters);
		const outputSet = output.map(str => {
			const chars = str.split('');
			return new Set(chars);
		});
		outputs.push(outputSet);
	})
	return [inputs, outputs];
}

// A - B
function setDiff(setOne: Set<string>, setTwo: Set<string>): Set<string> {
	return new Set([...setOne].filter(x => !setTwo.has(x)))
}

// A intersect B
function setIntersect(setOne: Set<string>, setTwo: Set<string>): Set<string> {
	return new Set([...setOne].filter(x => setTwo.has(x)))
}

//
function translate(str: Set<string>, dict: Map<string, string>): Set<string> {
	const mapped = [...str].map(char => {
		return dict.get(char)!;
	});
	const sorted = sortLetters(mapped.join('')).split('');

	return new Set(sorted);
}

function translateToString(str: Set<string>, dict: Map<string, string>): string {
	const translated = translate(str, dict);
	let translateStr = [...translated].join('');

	return translateStr;
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
// 9: abcdfg	| 6

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

async function p2021day8_part2OLD(input: string, ...params: any[]) {
	const [inputs, outputs] = convertSet(input);

	let sum = 0;

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const output = outputs[i];

		// unique
		const one = input.find(s => s.size === 2)!;
		const four = input.find(s => s.size === 4)!;
		const seven = input.find(s => s.size === 3)!;
		const eight = input.find(s => s.size === 7)!;

		// length 5: 2,3,5
		const fives = input.filter(x => x.size === 5);

		// length 6: 0,6,9
		const sixes = input.filter(x => x.size === 6);

		let unknowns: Set<string> = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
		let found: Map<string, string> = new Map();

		// a
		const diffSevenOne = setDiff(seven, one); // size 1
		const sectionA = [...diffSevenOne][0];
		unknowns.delete(sectionA);
		found.set('a', sectionA);

		// f = segment of 1 that 0,6,9 share
		const intersectSixes = sixes.reduce((acc, elem) => {
			return setIntersect(acc, elem);
		});
		//const sectionF = [...setIntersect(intersectSixes, one)][0];
		const sectionF = [...intersectSixes].find(x => one.has(x))!;
		unknowns.delete(sectionF);
		found.set('f', sectionF);

		// c = other part of 1
		const sectionC = [...one].find(x => x != sectionF)!; // size 1
		unknowns.delete(sectionC);
		found.set('c', sectionC);

		// d = segment which  2,3,5(l=5) (=> a,d,g) and 4 share
		//     abdce   bdacg  cafgd
		const intersectFives = fives.reduce((acc, elem) => {
			return setIntersect(acc, elem);
		});
		const sectionD = [...intersectFives].find(x => four.has(x))!;
		unknowns.delete(sectionD);
		found.set('d', sectionD);

		// b = segment which 0,6,9 and 4 share (b,f) + still unknown (= not f)
		const sectionB = [...intersectSixes].find(x => x != sectionF)!;
		unknowns.delete(sectionB);
		found.set('b', sectionB);

		// g = segment which 0,6,9 share (a,b,f,g) + still unknown 
		const sectionG = [...intersectSixes].find(x => unknowns.has(x))!;
		unknowns.delete(sectionG);
		found.set('g', sectionG);

		// e = last unknown segment
		const sectionE = [...unknowns][0];

		unknowns.delete(sectionE);
		found.set('e', sectionE);

		//console.log(found);
		//console.log(unknowns);

		const mapper = new Map<string, number>();

		const oneStr = [...one].join('');
		const fourStr = [...four].join('')
		const sevenStr = [...seven].join('');
		const eightStr = [...eight].join('');

		// 5
		const two = translateToString(new Set(['a', 'c', 'd', 'e', 'g']), found);
		const three = translateToString(new Set(['a', 'c', 'd', 'f', 'g']), found);
		const five = translateToString(new Set(['a', 'b', 'd', 'f', 'g']), found);

		// 6
		const zero = translateToString(new Set(['a', 'b', 'c', 'e', 'f', 'g']), found);
		const six = translateToString(new Set(['a', 'b', 'd', 'e', 'f', 'g']), found);
		const nine = translateToString(new Set(['a', 'b', 'c', 'd', 'f', 'g']), found);

		mapper.set(oneStr, 1);
		mapper.set(fourStr, 4);
		mapper.set(sevenStr, 7);
		mapper.set(eightStr, 8);

		mapper.set(two, 2);
		mapper.set(three, 3);
		mapper.set(five, 5);

		mapper.set(zero, 0);
		mapper.set(six, 6);
		mapper.set(nine, 9);

		//console.log(output);
		//console.log(mapper);

		const decode = output.map(item => {
			const itemStr = [...item].join('');
			const mapped = mapper.get(itemStr)!;
			return mapped;
		});

		let decodeSum = 0;

		for (let i = 0; i < decode.length; i++) {
			decodeSum = decodeSum + decode[i] * Math.pow(10, 3 - i);
		}

		console.log(decode, decodeSum);
		sum = sum + decodeSum;
	}

	return sum;
}

async function p2021day8_part2(input: string, ...params: any[]) {
	const [inputs, outputs] = convertSet(input);

	let sum = 0;

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const output = outputs[i];

	}

	return sum;
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
