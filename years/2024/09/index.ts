import _, { first } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 9;

// solution path: E:\Projects\advent-of-code\years\2024\09\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\09\data.txt
// problem url  : https://adventofcode.com/2024/day/9

// first try, returns checksum
function defrag(input: string): number {
	let score = 0;

	const inputLength = input.length

	let blockArr: number[] = []
	let visibleString = ''

	let id = 0;
	for (let i = 0; i < inputLength; i++) {
		const currentBlock = Number(input.charAt(i));
		// log(currentChar) 
		if (i % 2 == 0) {
			// file
			for (let k = 0; k < currentBlock; k++) {
				blockArr.push(id);
				visibleString = visibleString + id
			}
			id = id + 1;
		}
		else {
			// space
			for (let k = 0; k < currentBlock; k++) {
				blockArr.push(-1);
				visibleString = visibleString + '.'
			}
		}
	}

	// log(blockArr)
	// log(visibleString)

	// let firstPointer = 0;
	// let secondPointer = blockArr.length - 1;

	// while (true) {
	// 	while (blockArr[firstPointer] != -1) {
	// 		firstPointer = firstPointer + 1;
	// 	}
	// }

	function printBlockArrAsString(arr: number[]) {
		log(arr.join('').replaceAll('-1', '.'));
	}

	const blockArrLen = blockArr.length
	// printBlockArrAsString(blockArr)
	for (let i = blockArrLen - 1; i > 0; i--) {
		const currentBlock = blockArr[i];
		const firstIndex = blockArr.indexOf(-1);
		if (firstIndex < i) {
			blockArr[firstIndex] = currentBlock;
			blockArr[i] = -1
			// printBlockArrAsString(blockArr)
		}
		else {
			break;
		}
	}

	for (let i = 0; i < blockArrLen; i++) {
		const currentBlock = blockArr[i];
		if (currentBlock < 0) {
			return score;
		}
		else {
			score = score + i * currentBlock
		}
	}

	return score;
}

async function p2024day9_part1(input: string, ...params: any[]) {
	const score = defrag(input);

	return score;
}

function defragPartTwo(input: string): number {
	const inputLength = input.length;

	interface block {
		size: number,
		fileID: number
	}

	let blockArr: block[] = [];
	let fileID = 0;

	for (let i = 0; i < inputLength; i++) {
		const currentBlock = Number(input.charAt(i));
		// log(currentChar) 
		if (i % 2 == 0) {
			// file
			blockArr.push({ size: currentBlock, fileID: fileID });
			fileID = fileID + 1;
		}
		else {
			// space
			blockArr.push({ size: currentBlock, fileID: -1 });
		}
	}
	// log(blockArr)

	function printBlockArrAsString(arr: block[]) {
		let str = ''
		arr.forEach(block => {
			for (let i = 0; i < block.size; i++) {
				str = str + block.fileID.toString().replace('-1', '.');
			}
		})
		log(str)
	}
	// printBlockArrAsString(blockArr);

	const blockArrLen = blockArr.length
	// printBlockArrAsString(blockArr)
	// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
	for (let i = blockArrLen - 1; i > 0; i--) {
		const currentBlock: block = { ...blockArr[i] };
		if (currentBlock.fileID < 0) {
			continue;
		}
		// log('block:', currentBlock)
		const firstIndex = blockArr.findIndex(b => b.fileID == -1 && b.size >= currentBlock.size);
		if (firstIndex < 0) {
			// log('-> NO SPACE -> dont move')
			// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
			// return -1;
			continue;
		}
		// log('i', i, ', firstIndex:', firstIndex)
		if (firstIndex < i) {
			const foundBlock = { ...blockArr[firstIndex] }
			const foundSpace = foundBlock.size;
			const sizeDelta = foundSpace - currentBlock.size;
			if (sizeDelta == 0) {
				// using all the space
				blockArr[firstIndex] = currentBlock;
				blockArr[i] = { size: currentBlock.size, fileID: -1 }
			}
			else {
				// free space is bigger
				blockArr[firstIndex].size = sizeDelta;
				blockArr[i] = { size: currentBlock.size, fileID: -1 };
				blockArr.splice(firstIndex, 0, currentBlock);
				i = i + 1;
			}
			// blockArr[firstIndex] = currentBlock;
			// blockArr[i] = -1
			// printBlockArrAsString(blockArr)
			// log(blockArr)
		}
		else {
			// log('break')
			// log(blockArr)
			// break;
		}
		// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
	}

	let score = 0;
	let index = 0;
	const finishedArrLen = blockArr.length;

	for (let i = 0; i < finishedArrLen; i++) {
		const currentBlock = blockArr[i];
		if (currentBlock.fileID < 0) {
			index = index + currentBlock.size;
			continue;
		}

		for (let k = 0; k < currentBlock.size; k++) {
			const mult = index * currentBlock.fileID;
			// log(index, '*', currentBlock.fileID, '=', mult)

			score = score + mult;
			index = index + 1;
		}
	}

	return score;
}

async function p2024day9_part2(input: string, ...params: any[]) {
	const score = defragPartTwo(input);

	return score;
}

async function run() {
	const part1tests: TestCase[] = [{ input: `2333133121414131402`, expected: "1928" }];
	const part2tests: TestCase[] = [{ input: `2333133121414131402`, expected: "2858" }];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day9_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day9_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day9_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day9_part2(input));
	const part2After = performance.now();

	logSolution(9, 2024, part1Solution, part2Solution);

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
