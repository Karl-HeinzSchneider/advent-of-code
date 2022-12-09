import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 5;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\05\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\05\data.txt
// problem url  : https://adventofcode.com/2022/day/5

interface crateStack {
	number: number,
	crates: string[]
}

interface instruction {
	amount: number,
	from: number,
	to: number
}

function readCratesObj(input: string): { stack: crateStack[], emptyIndex: number, instructions: instruction[] } {
	const arr = input.split('\n')
	const emptyIndex = arr.findIndex(x => x == '')

	const numberLine = arr[emptyIndex - 1]
	console.log(emptyIndex, numberLine)

	let crates: crateStack[] = []
	crates.push({ number: 0, crates: [] })
	for (let i = 0; i < numberLine.length; i++) {
		const str = numberLine[i]
		if (str != ' ') {
			let crate: crateStack = {
				number: Number(str),
				crates: []
			}

			for (let j = emptyIndex - 2; j >= 0; j--) {
				const cr: string = arr[j][i]
				if (cr != ' ') {
					crate.crates.push(cr)
				}
			}
			crates.push(crate)
		}
	}

	return { stack: crates, emptyIndex: emptyIndex, instructions: readInstructions(arr.slice(emptyIndex + 1)) }
}

function readInstructions(input: string[]): instruction[] {
	let arr: instruction[] = []

	input.forEach(str => {
		const split = str.replace('move', '').replace('from', '').replace('to', '').split(' ').filter(x => x != '').map(x => Number(x))
		arr.push({
			amount: split[0],
			from: split[1],
			to: split[2]
		})
	})

	return arr;
}

function getCratesOntop(state: crateStack[]): string {
	let str: string = ''

	state.forEach(s => {
		str = str + s.crates[s.crates.length - 1]
	})

	return str;
}

async function p2022day5_part1(input: string, ...params: any[]) {
	const crateObj = readCratesObj(input)
	//console.log(crateObj.emptyIndex)
	//console.log(crateObj.stack)
	console.log(crateObj.instructions)


	let state = crateObj.stack
	let intructions = crateObj.instructions

	intructions.forEach(instr => {
		for (let i = 1; i <= instr.amount; i++) {
			const crate = state[instr.from].crates.pop()
			if (crate) {
				state[instr.to].crates.push(crate!)
			}
		}
	})

	//console.log(state)

	const crateString = getCratesOntop(state.slice(1))
	//console.log(crateString)


	return crateString;
}

async function p2022day5_part2(input: string, ...params: any[]) {
	const crateObj = readCratesObj(input)
	//console.log(crateObj.emptyIndex)
	//console.log(crateObj.stack)
	console.log(crateObj.instructions)


	let state = crateObj.stack
	let intructions = crateObj.instructions

	intructions.forEach(instr => {
		const crates: string[] = []
		for (let i = 1; i <= instr.amount; i++) {
			const crate = state[instr.from].crates.pop()
			if (crate) {
				crates.push(crate)
			}
		}
		crates.reverse()
		crates.forEach(c => {
			state[instr.to].crates.push(c)
		})

	})

	//console.log(state)

	const crateString = getCratesOntop(state.slice(1))
	//console.log(crateString)


	return crateString;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day5_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day5_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day5_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day5_part2(input));
	const part2After = performance.now();

	logSolution(5, 2022, part1Solution, part2Solution);

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
