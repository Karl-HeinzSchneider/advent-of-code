import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 12;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\12\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\12\data.txt
// problem url  : https://adventofcode.com/2021/day/12

const example = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

function convert(input: string) {
	const arr = input.split('\n');

	const adjMap: Map<string, string[]> = new Map();

	arr.forEach(line => {
		const split = line.split('-');
		const first = split[0]!;
		const second = split[1]!;

		if (!adjMap.has(first)) {
			adjMap.set(first, [second]);
		}
		else {
			const firstArr = adjMap.get(first)!;
			adjMap.set(first, [...firstArr, second]);
		}

		if (!adjMap.has(second)) {
			adjMap.set(second, [first]);
		}
		else {
			const secondArr = adjMap.get(second)!;
			adjMap.set(second, [...secondArr, first]);
		}
	})

	return adjMap;
}

function isSmall(input: string) {
	return input.toLowerCase() === input;
}

function findAllPaths(start: string, end: string, adjMap: Map<string, string[]>, canVisitTwice: boolean = false) {

	const BFS = function (current: string, target: string, visited: string[], visitedTwice: boolean) {
		const newVisited = [...visited, current];

		if (current === target) {
			paths.push(newVisited);
			//console.log(newVisited);
			return;
		}

		const adjArr = adjMap.get(current)!;

		adjArr.forEach(adj => {
			if (isSmall(adj)) {

				if (newVisited.includes(adj)) {
					//BFS(adj, target, newVisited, visitedTwice);
					if (!visitedTwice && adj != start && adj != end) {
						BFS(adj, target, newVisited, true);
					}
				}
				else {
					BFS(adj, target, newVisited, visitedTwice);
				}
			}
			else {
				BFS(adj, target, newVisited, visitedTwice);
			}
		})
	}
	let paths: string[][] = [];

	BFS(start, end, [], !canVisitTwice);

	return paths;
}

async function p2021day12_part1(input: string, ...params: any[]) {
	const adjMap = convert(input);
	//console.log(adjMap);

	const start = 'start';
	const end = 'end';

	const paths = findAllPaths(start, end, adjMap);

	return paths.length;
}

async function p2021day12_part2(input: string, ...params: any[]) {
	const adjMap = convert(input);
	//console.log(adjMap);

	const start = 'start';
	const end = 'end';

	const paths = findAllPaths(start, end, adjMap, true);
	//console.log(paths)

	return paths.length;
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '10' }];
	const part2tests: TestCase[] = [{ input: example, expected: '36' }];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day12_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day12_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day12_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day12_part2(input));
	const part2After = performance.now();

	logSolution(12, 2021, part1Solution, part2Solution);

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
