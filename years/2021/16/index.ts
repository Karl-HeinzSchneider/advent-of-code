import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 16;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\16\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\16\data.txt
// problem url  : https://adventofcode.com/2021/day/16

function convert(input: string) {
	/* 
	0 = 0000
	1 = 0001
	2 = 0010
	3 = 0011
	4 = 0100
	5 = 0101
	6 = 0110
	7 = 0111
	8 = 1000
	9 = 1001
	A = 1010
	B = 1011
	C = 1100
	D = 1101
	E = 1110
	F = 1111
	*/
	let hexMap: Map<string, string> = new Map();
	hexMap.set('0', '0000');
	hexMap.set('1', '0001');
	hexMap.set('2', '0010');
	hexMap.set('3', '0011');
	hexMap.set('4', '0100');
	hexMap.set('5', '0101');
	hexMap.set('6', '0110');
	hexMap.set('7', '0111');
	hexMap.set('8', '1000');
	hexMap.set('9', '1001');

	hexMap.set('A', '1010');
	hexMap.set('B', '1011');
	hexMap.set('C', '1100');
	hexMap.set('D', '1101');
	hexMap.set('E', '1110');
	hexMap.set('F', '1111');


	let bitArr: string[] = [];
	for (let i = 0; i < input.length; i++) {
		const hex = input[i];
		const decode = hexMap.get(hex)!;
		bitArr.push(decode);
	}

	return bitArr.join('');
	console.log(bitArr)
}

interface IPackage {
	version: number,
	typeID: number,
	type: 'literal' | 'operator',

	subPackets?: number,
	subPacketsLength?: number
}

function parsePackage(input: string, startIndex: number): IPackage {

	let index = startIndex;

	let pack: Partial<IPackage> = {};

	const version = input.slice(index, index + 3);
	pack.version = parseInt(version, 2);
	index = index + 3;

	const typeID = input.slice(index, index + 3);
	pack.typeID = parseInt(typeID, 2);
	pack.type = pack.typeID === 4 ? 'literal' : 'operator';
	index = index + 3;

	if (pack.type === "operator") {
		const lengthTypeID = input.slice(index, index + 1);
		index++;
		
		if (lengthTypeID === '0') {

		}
		else {
			const l = input.slice(index,index+11);
			pack.subPackets = parseInt(l,2);
		}
	}


	return pack as IPackage;
}

async function p2021day16_part1(input: string, ...params: any[]) {
	const bitString = convert(input);
	console.log(bitString.slice(0, 50));



	const firstPackage = parsePackage(bitString, 0);

	console.log(firstPackage);
	return "Not implemented";
}

async function p2021day16_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day16_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day16_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day16_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day16_part2(input));
	const part2After = performance.now();

	logSolution(16, 2021, part1Solution, part2Solution);

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
