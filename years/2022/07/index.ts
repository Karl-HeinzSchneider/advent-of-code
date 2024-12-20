import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 7;

// solution path: C:\Users\Johannes\advent-of-code\years\2022\07\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2022\07\data.txt
// problem url  : https://adventofcode.com/2022/day/7
interface file {
	name: string,
	size: number
}

interface dir {
	name: string,
	files: file[],
	subdirs: dir[],
	parent: dir | undefined,
	size: number
}

async function p2022day7_part1(input: string, ...params: any[]) {
	const lines = input.split('\n');

	const outerDir: dir = {
		name: '/',
		files: [],
		subdirs: [],
		parent: undefined,
		size: 0
	};
	let currentDir: dir = outerDir;

	const len = lines.length;
	//const len = 12
	const maxSize = 100000;

	for (let index = 1; index < len; index++) {
		const line = lines[index].split(' ');
		//console.log(line)

		if (line[0] === '$') {
			// command

			if (line[1] === 'ls') {
				// list files/dirs

			} else if (line[1] === 'cd') {
				// change dir
				if (line[2] === '/') {
					// move to outer dir
					currentDir = outerDir;
				}
				else if (line[2] === '..') {
					// move up
					if (currentDir.parent) {

						let size = 0;
						currentDir.files.forEach(f => {
							size = size + f.size;
						})
						currentDir.subdirs.forEach(s => {
							size = size + s.size;
						})
						currentDir.size = size;
						currentDir = currentDir.parent;
					}
					else {
						console.log('ERORR - parent undefined');
					}
				} else {
					// move to dir X
					currentDir = currentDir.subdirs.find(x => x.name === line[2])!;
				}
			}
		} else if (line[0] === 'dir') {
			// dir
			const newDir: dir = {
				name: line[1],
				files: [],
				subdirs: [],
				parent: currentDir,
				size: 0
			}
			currentDir.subdirs.push(newDir)
		} else {
			// file
			const newFile: file = {
				name: line[1],
				size: Number(line[0])
			}
			currentDir.files.push(newFile);
		}
	}

	console.log(outerDir);

	return "Not implemented";
}

async function p2022day7_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day7_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day7_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day7_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2022day7_part2(input));
	const part2After = performance.now();

	logSolution(7, 2022, part1Solution, part2Solution);

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
