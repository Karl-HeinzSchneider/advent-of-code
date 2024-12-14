import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 13;

// solution path: E:\Projects\advent-of-code\years\2024\13\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\13\data.txt
// problem url  : https://adventofcode.com/2024/day/13
interface Vector2D { x: number, y: number };

function findMinimumPresses([A, B, P]: Vector2D[]): { a: number, b: number, score: number } {
	let score = 0;
	let min = { a: 0, b: 0, score: Number.MAX_SAFE_INTEGER }

	// const maxA = Math.min(100, Math.floor(P.x / A.x), Math.floor(P.y / A.y)) 
	// const maxB = Math.min(100, Math.floor(P.x / B.x), Math.floor(P.y / B.y))
	const maxA = 100;
	const maxB = 100;

	for (let i = 0; i < maxA; i++) {
		for (let j = 0; j < maxB; j++) {
			const pressedX = i * A.x + j * B.x;
			const pressedY = i * A.y + j * B.y;

			if ((P.x - pressedX) == 0 && (P.y - pressedY) == 0) {
				const pressedScore = 3 * i + 1 * j

				if (pressedScore < min.score) {
					min.a = i;
					min.b = j;
					min.score = pressedScore;
					// log('-> new solution:', min)
				}
				else {
					// log('worse solution')
				}
			}
		}
	}

	return min;
}

async function p2024day13_part1(input: string, ...params: any[]) {
	const split = input.split('\n').filter(x => x != '')
	const len = split.length
	// log(split)

	const clawMachines: Vector2D[][] = []

	for (let i = 0; i < len / 3; i++) {
		// Button A: X+94, Y+34
		let btnA = split[i * 3].split(',')
		// log(Number((btnA[0].split('X+'))[1]))
		const A: Vector2D = { x: Number((btnA[0].split('X+'))[1]), y: Number((btnA[1].split('Y+'))[1]) }
		// log(A)

		let btnB = split[i * 3 + 1].split(',')
		const B: Vector2D = { x: Number((btnB[0].split('X+'))[1]), y: Number((btnB[1].split('Y+'))[1]) }

		let prize = split[i * 3 + 2].split(',')
		const P: Vector2D = { x: Number((prize[0].split('X='))[1]), y: Number((prize[1].split('Y='))[1]) }

		// log(btnA, btnB, prize)
		// log(A, B, P)
		clawMachines.push([A, B, P])
	}
	// log(clawMachines)

	let prize = 0;

	clawMachines.forEach(m => {
		const minPresses = findMinimumPresses(m);
		if (minPresses.score < Number.MAX_SAFE_INTEGER) {
			// valid solution
			// log(m, minPresses.score)
			prize = prize + minPresses.score
			// log('~~~~~~~~~~~~~~~~~~')
		}
	})



	return prize;
}

async function p2024day13_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`, expected: "480"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day13_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day13_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day13_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day13_part2(input));
	const part2After = performance.now();

	logSolution(13, 2024, part1Solution, part2Solution);

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
