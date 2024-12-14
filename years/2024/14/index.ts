import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 14;

// solution path: E:\Projects\advent-of-code\years\2024\14\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\14\data.txt
// problem url  : https://adventofcode.com/2024/day/14
interface Vector2D { x: number, y: number };
interface Robot { pos: Vector2D, vel: Vector2D }

function readRobots(input: string): Robot[] {
	const split = input.split('\n');
	const robots = split.map(s => {
		// p=41,52 v=-2,37
		const s1 = s.split(' ')

		// p=41,52
		const p1 = s1[0].split('=')
		const p2 = p1[1].split(',')

		// v=-2,37

		const v1 = s1[1].split('=')
		const v2 = v1[1].split(',')

		return { pos: { x: Number(p2[0]), y: Number(p2[1]) }, vel: { x: Number(v2[0]), y: Number(v2[1]) } }
	})

	return robots;
}

async function p2024day14_part1(input: string, ...params: any[]) {
	const robots = readRobots(input);
	// log(robots)

	// const width = 101;
	// const heigth = 103;
	// const width = 11;
	// const heigth = 7;
	let width = 0
	let heigth = 0;

	if (robots.length > 12) {
		width = 101;
		heigth = 103
	}
	else {
		width = 11;
		heigth = 7
	}

	function moveRobot(robot: Robot, seconds: number): Robot {
		const oldPos = robot.pos;
		const vel = robot.vel;

		const nextPos = { x: oldPos.x + seconds * vel.x, y: oldPos.y + seconds * vel.y }
		const nextPosMod = { x: (nextPos.x % width + width) % width, y: (nextPos.y % heigth + heigth) % heigth }

		return { pos: nextPosMod, vel: robot.vel }
	}

	const steps = 5

	let testRobot = robots[0]
	log(testRobot)
	// log(moveRobot(testRobot, 5))

	for (let i = 0; i < steps; i++) {
		testRobot = moveRobot(testRobot, 1)
		log(testRobot)
	}



	return "Not implemented";
}

async function p2024day14_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`, expected: "12"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day14_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day14_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	// const part1Solution = String(await p2024day14_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day14_part2(input));
	const part2After = performance.now();

	// logSolution(14, 2024, part1Solution, part2Solution);

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
