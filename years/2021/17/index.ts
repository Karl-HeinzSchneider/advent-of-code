import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 17;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\17\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\17\data.txt
// problem url  : https://adventofcode.com/2021/day/17

const example = 'target area: x=20..30, y=-10..-5';

function convert(input: string): targetZone {
	const split = input.split(': ');
	const splitTwo = split[1].split(', ');

	const splitX = splitTwo[0].slice(2, splitTwo[0].length);
	const splitY = splitTwo[1].slice(2, splitTwo[1].length);

	const xXx = splitX.split('..');
	const xMin = Number(xXx[0]);
	const xMax = Number(xXx[1]);


	const yYy = splitY.split('..');
	const yMin = Number(yYy[0]);
	const yMax = Number(yYy[1]);

	return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
}

interface targetZone {
	xMin: number,
	xMax: number,
	yMin: number,
	yMax: number
}

interface probe {
	x: number,
	dx: number,
	y: number,
	dy: number
}

function nextStep(probe: probe): probe {
	const newX = probe.x + probe.dx;
	const newDx = Math.max(probe.dx - 1, 0);

	const newY = probe.y + probe.dy;
	const newDy = probe.dy - 1;

	return {
		x: newX,
		y: newY,
		dx: newDx,
		dy: newDy
	}
}

function inTarget(probe: probe, target: targetZone): boolean {
	//console.log('target',probe,target)
	if (probe.x < target.xMin || probe.x > target.xMax) {
		return false;
	}
	if (probe.y < target.yMin || probe.y > target.yMax) {
		return false;
	}

	return true;
}

function missedTarget(probe: probe, target: targetZone): boolean {
	if (probe.x > target.xMax || probe.y < target.yMin) {
		return true;
	}
	return false;
}

function gauss(n: number): number {
	// Gauss: f(n) = (n^2 + n)/2
	return (n * n + n) / 2;
}

interface probeReport {
	inTarget: boolean,
	probe: probe,
	missed: boolean,
	step: number,
	maxY: number
}

function fireProbe(probe: probe, target: targetZone): probeReport {
	const maxSteps = 1000;
	let step = 0;
	let probeFired = probe;
	let maxY = 0;

	while (step < maxSteps) {
		probeFired = nextStep(probeFired);

		if (probeFired.y > maxY) {
			maxY = probeFired.y;
		}

		if (inTarget(probeFired, target)) {
			console.log('TARGET', probe);
			return {
				inTarget: true,
				probe: probe,
				missed: false,
				step: step,
				maxY: maxY
			}
		}
		if (missedTarget(probeFired, target)) {
			//console.log('MISSED', probe);
			return {
				inTarget: false,
				probe: probe,
				missed: true,
				step: step,
				maxY: maxY
			}
		}

		step++;
	}

	return {
		inTarget: false,
		probe: probe,
		missed: true,
		step: step,
		maxY: 0
	}
}

function findBounds(n: number, bUpper: boolean): number {
	let tmp = 0;

	if (bUpper) {
		while (gauss(tmp) < n) {
			tmp++;
		}
		return tmp + 1;
	}
	else {

		while (gauss(tmp) < n) {
			tmp++;
		}
		return tmp - 1;
	}
}

async function p2021day17_part1(input: string, ...params: any[]) {
	const target = convert(input);
	console.log(target);

	const lower = findBounds(target.xMin, false);
	const upper = findBounds(target.xMax, true);

	console.log('lowerBound: ', lower, gauss(lower));
	console.log('upperBound: ', upper, gauss(upper));

	const maxJ = 250;

	let probeMax: probeReport;
	let maxY = 0;

	for (let i = lower; i <= upper; i++) {
		for (let j = 1; j < maxJ; j++) {
			const newProbe = fireProbe({ x: 0, y: 0, dx: i, dy: j }, target);

			if (newProbe.inTarget) {
				if (newProbe.maxY > maxY) {
					maxY = newProbe.maxY;
					probeMax = newProbe;
					console.log('newMax: ', maxY)
				}
			}
		}
	}

	//const test = fireProbe(probe, target);
	//console.log(test);
	console.log(probeMax!);


	return probeMax!.maxY;
}

async function p2021day17_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '45' }];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day17_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day17_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day17_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day17_part2(input));
	const part2After = performance.now();

	logSolution(17, 2021, part1Solution, part2Solution);

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
