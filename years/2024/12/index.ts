import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 12;

// solution path: E:\Projects\advent-of-code\years\2024\12\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\12\data.txt
// problem url  : https://adventofcode.com/2024/day/12

interface Region { id: number, coords: string[] }

async function p2024day12_part1(input: string, ...params: any[]) {
	// square
	const n = input.indexOf('\n')
	log('garden plot size:', n, 'x', n)

	const gridString = input.replaceAll('\n', '');
	// log(gridString.length)

	const regionMap = new Map<number, Region>();
	const gridMap = new Map<string, number>();

	let regionCount = 0;
	function getNewRegion(): Region {
		regionCount = regionCount + 1;

		return { id: regionCount, coords: [] }
	}

	function floodFill(i: number, j: number) {
		log('Floodfill', i, j)

		const plantType = gridString.charAt(i * n + j);
		log(plantType)

		const Q: [x: number, y: number][] = [];
		Q.push([i, j])

		while (Q.length > 0) {
			const entry = Q.pop()!;
			const x = entry[0];
			const y = entry[1];

			if (x < 0 || x >= n || y < 0 || y >= n) {
				continue;
			}

		}
	}

	floodFill(0, 0);



	return "Not implemented";
}

async function p2024day12_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `AAAA
BBCD
BBCC
EEEC`, expected: "772"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day12_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day12_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	// const part1Solution = String(await p2024day12_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day12_part2(input));
	const part2After = performance.now();

	// logSolution(12, 2024, part1Solution, part2Solution);

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
