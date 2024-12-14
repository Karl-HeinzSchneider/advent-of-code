import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 11;

// solution path: E:\Projects\advent-of-code\years\2024\11\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\11\data.txt
// problem url  : https://adventofcode.com/2024/day/11

interface Vector2D { x: number, y: number };

async function p2024day11_part1(input: string, ...params: any[]) {
	const split = input.split(' ').map(x => Number(x))
	// log(split)

	// x = current, y= nextDay
	let stoneMap = new Map<number, number>();

	function increaseStoneCount(mapRef: Map<number, number>, stone: number, howMany: number) {
		const current = mapRef.get(stone)
		if (current) {
			const newCount = current + howMany;
			mapRef.set(stone, newCount);
		}
		else {
			mapRef.set(stone, howMany);
		}
	}

	function countStones(mapRef: Map<number, number>): number {
		let score = 0;
		for (let [stone, amount] of mapRef) {
			score = score + amount
		}

		return score;
	}

	split.forEach(s => {
		increaseStoneCount(stoneMap, s, 1);
	})
	// log(stoneMap)
	// log('~~~~~~~~')

	const blinks = 25;
	let count = 0;

	for (let i = 0; i < blinks; i++) {
		let nextDay = new Map<number, number>();

		for (let [stone, amount] of stoneMap) {
			// log(stone, amount)
			const current = stoneMap.get(stone)! // must exist as its from the map
			if (stone == 0) {
				increaseStoneCount(nextDay, 1, current);
			}
			else {
				const numberStr = String(stone);
				if (numberStr.length % 2 == 0) {
					const first = numberStr.substring(0, numberStr.length / 2)
					const second = numberStr.substring(numberStr.length / 2, numberStr.length)
					// log(first, second)
					increaseStoneCount(nextDay, Number(first), current);
					increaseStoneCount(nextDay, Number(second), current);
				}
				else {
					increaseStoneCount(nextDay, stone * 2024, current);

				}
			}
		}

		stoneMap = nextDay;
		// log(stoneMap)
		// count = countStones(stoneMap);
		// log(count)
		// log('~~~~~~~~')
	}
	count = countStones(stoneMap);



	return count;
}

async function p2024day11_part2(input: string, ...params: any[]) {
	const split = input.split(' ').map(x => Number(x))
	// log(split)

	// x = current, y= nextDay
	let stoneMap = new Map<number, number>();

	function increaseStoneCount(mapRef: Map<number, number>, stone: number, howMany: number) {
		const current = mapRef.get(stone)
		if (current) {
			const newCount = current + howMany;
			mapRef.set(stone, newCount);
		}
		else {
			mapRef.set(stone, howMany);
		}
	}

	function countStones(mapRef: Map<number, number>): number {
		let score = 0;
		for (let [stone, amount] of mapRef) {
			score = score + amount
		}

		return score;
	}

	split.forEach(s => {
		increaseStoneCount(stoneMap, s, 1);
	})
	// log(stoneMap)
	// log('~~~~~~~~')

	const blinks = 75;
	let count = 0;

	for (let i = 0; i < blinks; i++) {
		let nextDay = new Map<number, number>();

		for (let [stone, amount] of stoneMap) {
			// log(stone, amount)
			const current = stoneMap.get(stone)! // must exist as its from the map
			if (stone == 0) {
				increaseStoneCount(nextDay, 1, current);
			}
			else {
				const numberStr = String(stone);
				if (numberStr.length % 2 == 0) {
					const first = numberStr.substring(0, numberStr.length / 2)
					const second = numberStr.substring(numberStr.length / 2, numberStr.length)
					// log(first, second)
					increaseStoneCount(nextDay, Number(first), current);
					increaseStoneCount(nextDay, Number(second), current);
				}
				else {
					increaseStoneCount(nextDay, stone * 2024, current);

				}
			}
		}

		stoneMap = nextDay;
		// log(stoneMap)
		// count = countStones(stoneMap);
		// log(count)
		// log('~~~~~~~~')
	}
	count = countStones(stoneMap);



	return count;
}

async function run() {
	const part1tests: TestCase[] = [{ input: `125 17`, expected: "55312" }];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day11_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day11_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day11_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day11_part2(input));
	const part2After = performance.now();

	logSolution(11, 2024, part1Solution, part2Solution);

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
