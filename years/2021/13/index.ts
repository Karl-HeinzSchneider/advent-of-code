import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 13;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\13\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\13\data.txt
// problem url  : https://adventofcode.com/2021/day/13
const example = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

interface point2D { x: number, y: number };
interface fold { direction: string, value: number };

function convert(input: string) {
	const arr = input.split('\n');

	let pointArr: point2D[] = [];
	let foldArr: fold[] = [];

	for (let i = 0; i < arr.length; i++) {
		const line = arr[i];

		if (line === '') {
			continue;
		}
		else if (line[0] === 'f') {
			const split = line.split(' ');
			const splitTwo = split[2].split('=');
			foldArr.push({ direction: splitTwo[0], value: Number(splitTwo[1]) });
		} else {
			const split = line.split(',').map(Number);
			pointArr.push({ x: split[0], y: split[1] });
		}
	}

	return { points: pointArr, folds: foldArr };
}

function fold(input: point2D[], fold: fold): point2D[] {
	console.log(fold);
	let newSet: Set<point2D> = new Set();

	// x
	if (fold.direction === 'x') {
		input.forEach(p => {
			if (p.x < fold.value) {
				newSet.add(p);
			}
			else {
				newSet.add({ x: 2 * fold.value - p.x, y: p.y });
			}
		})
		console.log(newSet)
		return Array.from(newSet);
	}
	// Y
	else {
		input.forEach(p => {
			if (p.y < fold.value) {
				newSet.add(p);
			}
			else {
				newSet.add({ x: p.x, y: 2 * fold.value - p.y });
			}
		})
		console.log(newSet)

		return Array.from(newSet);
	}
}

function foldSet(input: Set<string>, fold: fold): Set<string> {
	console.log(fold, input.size);
	let newSet: Set<string> = new Set();
	if (fold.direction === 'x') {
		input.forEach(p => {
			const point = IDtoPoint(p);

			if (point.x < fold.value) {
				newSet.add(p);
			}
			else {
				const newID = calcID({ x: 2 * fold.value - point.x, y: point.y })
				newSet.add(newID);
			}
		})
		return newSet;
	}
	else if (fold.direction === 'y') {
		input.forEach(p => {
			const point = IDtoPoint(p);

			if (point.y < fold.value) {
				newSet.add(p);
			}
			else {
				const newID = calcID({ x: point.x, y: 2 * fold.value - point.y })
				newSet.add(newID);
			}
		})
		return newSet
	}
	else {
		return new Set();
	}
}

function calcID(point: point2D): string {
	return `${point.x}-${point.y}`;
}

function IDtoPoint(ID: string): point2D {
	const split = ID.split('-').map(Number);
	return { x: split[0], y: split[1] };
}

function printStuffSet(points: Set<string>, sizeX: number, sizeY: number) {
	let tmpStr = '';
	for (let i = 0; i < sizeY; i++) {
		for (let j = 0; j < sizeX; j++) {
			const p: point2D = { x: j, y: i };
			const pStr = calcID(p);
			//console.log(p)

			if (points.has(pStr)) {
				tmpStr = tmpStr + '#';
			}
			else {
				tmpStr = tmpStr + '.';
			}
		}
		tmpStr = tmpStr + '\n';
	}
	console.log(tmpStr)
}

function printStuff(points: point2D[], sizeX: number, sizeY: number) {
	let tmpStr = '';
	for (let i = 0; i < sizeY; i++) {
		for (let j = 0; j < sizeX; j++) {

			const contains = points.some(p => p.x === j && p.y === i);

			if (contains) {
				tmpStr = tmpStr + '#';
			}
			else {
				tmpStr = tmpStr + '.';
			}
		}
		tmpStr = tmpStr + '\n';
	}
	console.log(tmpStr)
}

async function p2021day13_part1(input: string, ...params: any[]) {
	const conv = convert(input);

	const points = conv.points;
	const folds = conv.folds;

	//console.log(points)
	//console.log(folds)

	let newPoints = points;
	printStuff(newPoints, 11, 15);

	folds.slice(0, 1).forEach(f => {
		newPoints = fold(points, f);
		newPoints.sort();
		console.log(newPoints)
		printStuff(newPoints, 11, 7);

	})
	//printStuff(points, 11, 15);
	//const firstFold = folds[0];
	//const newPoints = foldSet(points, firstFold);

	//const secondFold = folds[1];
	//const newPointsTwo = fold(newPoints, secondFold);
	//printStuff(newPointsTwo, 5, 7);


	return newPoints.length;
}

async function p2021day13_part2(input: string, ...params: any[]) {
	const conv = convert(input);

	const points = new Set(conv.points.map(p => calcID(p)));
	const folds = conv.folds;

	let newPoints = points;

	folds.forEach(fold => {
		newPoints = foldSet(points, fold);
	})

	//printStuff(newPoints, 100, 100);


	//const secondFold = folds[1];
	//const newPointsTwo = fold(newPoints, secondFold);
	//printStuff(newPointsTwo, 5, 7);


	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '17' }];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day13_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day13_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day13_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day13_part2(input));
	const part2After = performance.now();

	logSolution(13, 2021, part1Solution, part2Solution);

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
