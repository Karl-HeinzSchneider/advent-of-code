import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 19;

// solution path: E:\Projects\advent-of-code\years\2024\19\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\19\data.txt
// problem url  : https://adventofcode.com/2024/day/19

async function p2024day19_part1(input: string, ...params: any[]) {
	const lines = input.split('\n');

	const towelMap = new Map<string, boolean>();
	let minTowelW = Number.MAX_SAFE_INTEGER;
	let maxTowelW = 0;
	lines[0].split(', ').forEach(t => {
		// log(t)
		towelMap.set(t, true);
		const tLen = t.length
		if (tLen > maxTowelW) {
			maxTowelW = tLen
		}
		if (tLen < minTowelW) {
			minTowelW = tLen
		}
	})
	// log(towelMap)
	log('minTowelW', minTowelW) // example: 1
	log('maxTowelW', maxTowelW) // example: 3

	const towelsToMake = lines.slice(2)
	// log(towelsToMake)

	const notPossibleMap = new Map<string, boolean>();

	function isTowelPossible(t: string): boolean {
		log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		log('isTowelPossible', t)

		let stack: string[] = [t];

		const maxSteps = 25;
		let counter = 0;

		while (stack.length > 0) {
			// log('---------')
			// log('stack:', stack)
			const current = stack.pop()!; // '!' because while condition
			// log('->current', current, counter)
			counter = counter + 1;

			if (current == '') {
				// end found => return
				log('->>> end found')
				return true;
			} else if (towelMap.has(t)) {
				// rest is in towelMap => return
				log('->>> end found in towelMap')
				return true;
			}

			if (notPossibleMap.has(current)) {
				// log('-----> notPossibleMap', current)
				continue;
			}

			let hasMoreSlices = false;

			for (let i = 1; i <= Math.min(3, current.length); i++) {
				const slice = current.slice(0, i);
				// log('--> slice', slice, i)
				if (towelMap.has(slice)) {
					// log('---> push', i, slice, current.slice(i))
					stack.push(current.slice(i));
					hasMoreSlices = true;
				}
			}

			if (!hasMoreSlices) {
				notPossibleMap.set(current, true);
				log('----> add notPossibleMap', current)
			}


			if (counter > maxSteps) {
				// return false
			}
		}

		return false;
	}

	let score = 0;
	towelsToMake.forEach(t => {
		if (isTowelPossible(t)) {
			score = score + 1;
			log('--->', t)
		}
		else {
			log('NOT:', t)
		}
	})

	// isTowelPossible(towelsToMake[2]);

	// log('123', '123'.slice(0, 1), '123'.slice(1))

	return score;
}

async function p2024day19_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`, expected: "6"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day19_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day19_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day19_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day19_part2(input));
	const part2After = performance.now();

	// logSolution(19, 2024, part1Solution, part2Solution);

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
