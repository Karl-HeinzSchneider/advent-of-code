import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 17;

// solution path: E:\Projects\advent-of-code\years\2024\17\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\17\data.txt
// problem url  : https://adventofcode.com/2024/day/17

async function p2024day17_part1(input: string, ...params: any[]) {
	const split = input.split('\n');

	let A = Number(split[0].split(':')[1]);
	let B = Number(split[1].split(':')[1]);
	let C = Number(split[2].split(':')[1]);

	const program = split[4].split(': ')[1].split(',').map(x => Number(x));
	const programLen = program.length;

	log('Register A:', A);
	log('Register B:', B);
	log('Register C:', C);
	log('Program:', program);

	let output: number[] = [];

	let instructionPointer = 0;
	let literalOperant = 0;
	let comboOperant = 0;

	// 0 - a division
	function adv(combo: number) {
		// log('..adv', combo)
		let tmp = (A / Math.pow(2, combo));
		tmp = Math.trunc(tmp)
		A = tmp;
		// log('..adv', combo, 'tmp:', tmp)
	}

	// 1 - bitwise XOR
	function bxl(literal: number) {
		// log('..bxl', literal)

		let tmp = B ^ literal;
		B = tmp;
		// log('..bxl', literal, 'tmp:', tmp)
	}

	// 2 - mod 8
	function bst(combo: number) {
		// log('..bst', combo)
		let tmp = combo % 8;
		B = tmp;
		// log('..bst', combo, 'tmp:', tmp)
	}

	// 3 - jump
	function jnz(literal: number) {
		// log('..jnz', literal, 'A:', A)

		if (A === 0) {
			return false;
		}
		else {
			instructionPointer = literal;
			return true;
		}
	}

	// 4 -
	function bxc(operand: number) {
		// log('..bxc', operand)
		let tmp = B ^ C;
		B = tmp;
		// log('..bxc', '(', operand, ')', 'tmp:', tmp)
		// instructionPointer = instructionPointer 
	}

	// 5 - output
	function out(combo: number) {
		// log('..out', combo)
		let tmp = combo % 8;
		output.push(tmp);
		// log('~~>> OUT:', tmp)
	}

	// 6 - b division
	function bdv(combo: number) {
		// log('..bdv', combo)
		let tmp = (A / Math.pow(2, combo));
		tmp = Math.trunc(tmp)
		B = tmp;
		// log('..bdv', combo, 'tmp:', tmp)
	}

	// 7 - c division
	function cdv(combo: number) {
		// log('..cdv', combo)
		let tmp = (A / Math.pow(2, combo));
		tmp = Math.trunc(tmp)
		C = tmp;
		// log('..cdv', combo, 'tmp:', tmp)
	}

	while (instructionPointer < programLen && instructionPointer + 1 < programLen) {
		// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		const opcode = program[instructionPointer];
		const operand = program[instructionPointer + 1];

		literalOperant = operand;

		let isJumping = false;

		if (operand <= 3) {
			comboOperant = operand;
		}
		else if (operand == 4) {
			comboOperant = A
		}
		else if (operand == 5) {
			comboOperant = B
		}
		else if (operand == 6) {
			comboOperant = C
		}
		else if (operand == 7) {
			// log('Register A:', A);
			// log('Register B:', B);
			// log('Register C:', C);
			// log('opcode', opcode, 'operand', operand);
			// log('literal', literalOperant, 'combo', comboOperant)
			// log('~~~~~>>>> SHOULD NOT HAPPEN <<<<~~~~ 7')

			// return;
		}
		else {
			// log('Register A:', A);
			// log('Register B:', B);
			// log('Register C:', C);
			// log('opcode', opcode, 'operand', operand);
			// log('literal', literalOperant, 'combo', comboOperant)
			// log('~~~~~>>>> SHOULD NOT HAPPEN <<<<~~~~ else')
			// return;
		}

		// log('Register A:', A);
		// log('Register B:', B);
		// log('Register C:', C);
		// log('opcode', opcode, 'operand', operand);
		// log('literal', literalOperant, 'combo', comboOperant)

		switch (opcode) {
			case 0:
				adv(comboOperant);
				break;
			case 1:
				bxl(literalOperant);
				break;
			case 2:
				bst(comboOperant);
				break;
			case 3:
				isJumping = jnz(literalOperant);
				break;
			case 4:
				bxc(-1);
				break;
			case 5:
				out(comboOperant);
				break;
			case 6:
				bdv(comboOperant);
				break;
			case 7:
				cdv(comboOperant);
				break;
		}


		if (isJumping) {
			// set inside jnz
		}
		else {
			instructionPointer = instructionPointer + 2
		}
	}

	const outputStr = output.join(',')
	log('====', outputStr)

	// return testBigN(BigInt(A), BigInt(B), BigInt(C), program.map(x => BigInt(x)))

	return outputStr;
}

function testBigN(a: bigint, b: bigint, c: bigint, program: bigint[]) {
	let outputArr: bigint[] = [];

	const programLen = program.length;

	let pointer = 0;

	while (pointer < programLen && pointer + 1 < programLen) {
		log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		const opcode = program[pointer];
		const opcodeNumber = Number(opcode);
		const operand = program[pointer + 1];
		const operandNumber = Number(operand);
		const combos = [BigInt(0), BigInt(1), BigInt(2), BigInt(3), a, b, c]

		log('opcode', opcodeNumber, ' | operant', operandNumber, ' | combo', combos[operandNumber])
		log('combos', combos)
		log('output', outputArr)

		let tmp: bigint;
		switch (opcodeNumber) {
			case 0:
				tmp = a >> combos[opcodeNumber]
				a = tmp
				// log('aaaaaa', a)
				break;
			case 1:
				b = b ^ BigInt(operand);
				break;
			case 2:
				b = combos[operandNumber] % BigInt(8);
				break;
			case 3:
				if (a === BigInt(0)) {
					// do nothing
				}
				else {
					pointer = operandNumber - 2
				}
				break;
			case 4:
				b = b ^ c;
				break;
			case 5:
				tmp = combos[operandNumber] % BigInt(8)
				// outputArr.push(tmp);
				break;
			case 6:
				b = a >> combos[opcodeNumber]
				break;
			case 7:
				c = a >> combos[opcodeNumber]
				break;
		}

		pointer = pointer + 2;

		log('...')
		log('combos', [BigInt(0), BigInt(1), BigInt(2), BigInt(3), a, b, c])
		log('output', outputArr)
		log('~~~~~~~~~~~')
	}

	log('~~~>>> FINISHED? <<<~~~')

	return outputArr.join(',')
}

async function p2024day17_part2(input: string, ...params: any[]) {
	const split = input.split('\n');

	let A = BigInt(split[0].split(':')[1]);
	let B = BigInt(split[1].split(':')[1]);
	let C = BigInt(split[2].split(':')[1]);

	const program = split[4].split(': ')[1].split(',').map(x => BigInt(x));
	const programLen = program.length;

	log('Register A:', A);
	log('Register B:', B);
	log('Register C:', C);
	log('Program:', program);

	let output: bigint[] = [];

	let instructionPointer = 0;
	let literalOperant = BigInt(0);
	let comboOperant = BigInt(0);

	// 0 - a division
	function adv(combo: bigint) {
		// log('..adv', combo)
		// let tmp = (A / Math.pow(BigInt(2), BigInt(combo)));
		let tmp = A >> combo;
		// tmp = Math.trunc(tmp)
		A = tmp;
		// log('..adv', combo, 'tmp:', tmp)
	}

	// 1 - bitwise XOR
	function bxl(literal: bigint) {
		// log('..bxl', literal)

		let tmp = B ^ literal;
		B = tmp;
		// log('..bxl', literal, 'tmp:', tmp)
	}

	// 2 - mod 8
	function bst(combo: bigint) {
		// log('..bst', combo)
		let tmp = combo % BigInt(8);
		B = tmp;
		// log('..bst', combo, 'tmp:', tmp)
	}

	// 3 - jump
	function jnz(literal: bigint) {
		// log('..jnz', literal, 'A:', A)

		if (A === BigInt(0)) {
			return false;
		}
		else {
			instructionPointer = Number(literal);
			return true;
		}
	}

	// 4 -
	function bxc(operand: bigint) {
		// log('..bxc', operand)
		let tmp = B ^ C;
		B = tmp;
		// log('..bxc', '(', operand, ')', 'tmp:', tmp)
		// instructionPointer = instructionPointer 
	}

	// 5 - output
	function out(combo: bigint) {
		// log('..out', combo)
		let tmp = combo % BigInt(8);
		output.push(tmp);
		// log('~~>> OUT:', tmp)
	}

	// 6 - b division
	function bdv(combo: bigint) {
		// log('..bdv', combo)
		// let tmp = (A / Math.pow(2, combo));
		// tmp = Math.trunc(tmp)
		let tmp = A >> combo;
		B = tmp;
		// log('..bdv', combo, 'tmp:', tmp)
	}

	// 7 - c division
	function cdv(combo: bigint) {
		// log('..cdv', combo)
		// let tmp = (A / Math.pow(2, combo));
		// tmp = Math.trunc(tmp)
		let tmp = A >> combo;
		C = tmp;
		// log('..cdv', combo, 'tmp:', tmp)
	}

	while (instructionPointer < programLen && instructionPointer + 1 < programLen) {
		// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		const opcode = program[instructionPointer];
		const operand = program[instructionPointer + 1];
		const operandNumber = Number(operand);

		literalOperant = operand;

		let isJumping = false;

		if (operandNumber <= 3) {
			comboOperant = operand;
		}
		else if (operandNumber == 4) {
			comboOperant = A
		}
		else if (operandNumber == 5) {
			comboOperant = B
		}
		else if (operandNumber == 6) {
			comboOperant = C
		}
		else if (operandNumber == 7) {
			// log('Register A:', A);
			// log('Register B:', B);
			// log('Register C:', C);
			// log('opcode', opcode, 'operand', operand);
			// log('literal', literalOperant, 'combo', comboOperant)
			// log('~~~~~>>>> SHOULD NOT HAPPEN <<<<~~~~ 7')

			// return;
		}
		else {
			// log('Register A:', A);
			// log('Register B:', B);
			// log('Register C:', C);
			// log('opcode', opcode, 'operand', operand);
			// log('literal', literalOperant, 'combo', comboOperant)
			// log('~~~~~>>>> SHOULD NOT HAPPEN <<<<~~~~ else')
			// return;
		}

		log('Register A:', A);
		log('Register B:', B);
		log('Register C:', C);
		log('opcode', opcode, 'operand', operandNumber);
		log('literal', literalOperant, 'combo', comboOperant)

		switch (operandNumber) {
			case 0:
				adv(comboOperant);
				break;
			case 1:
				bxl(literalOperant);
				break;
			case 2:
				bst(comboOperant);
				break;
			case 3:
				isJumping = jnz(literalOperant);
				break;
			case 4:
				bxc(BigInt(-1));
				break;
			case 5:
				out(comboOperant);
				break;
			case 6:
				bdv(comboOperant);
				break;
			case 7:
				cdv(comboOperant);
				break;
		}


		if (isJumping) {
			// set inside jnz
		}
		else {
			instructionPointer = instructionPointer + 2
		}
	}

	const outputStr = output.join(',')
	log('====', outputStr)

	// return testBigN(BigInt(A), BigInt(B), BigInt(C), program.map(x => BigInt(x)))

	return outputStr;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
		expected: "4,6,3,5,6,3,5,2,1,0"
	},
	{
		input: `Register A: 0
Register B: 0
Register C: 9

Program: 2,6`,
		expected: ''
	},
	{
		input: `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`,
		expected: '0,1,2'
	},
	{
		input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
		expected: '4,2,5,6,7,7,7,7,3,1,0'
	},
	{
		input: `Register A: 0
Register B: 29
Register C: 0

Program: 1,7`,
		expected: ''
	}];
	const part2tests: TestCase[] = [
		// 		{
		// 			input: `Register A: 2024
		// Register B: 0
		// Register C: 0

		// Program: 0,3,5,4,3,0`, expected: "117440"
		// 		}
	];

	// Run tests
	test.beginTests();
	// await test.section(async () => {
	// 	for (const testCase of part1tests) {
	// 		test.logTestResult(testCase, String(await p2024day17_part1(testCase.input, ...(testCase.extraArgs || []))));
	// 	}
	// });
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day17_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	// const part1Solution = String(await p2024day17_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day17_part2(input));
	const part2After = performance.now();

	// logSolution(17, 2024, part1Solution , part2Solution);

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
