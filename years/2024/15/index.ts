import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 15;

// solution path: E:\Projects\advent-of-code\years\2024\15\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\15\data.txt
// problem url  : https://adventofcode.com/2024/day/15

function coordString(x: number, y: number) {
	return `${x}-${y}`
}

async function p2024day15_part1(input: string, ...params: any[]) {
	const gridMap = new Map<string, string>();
	const split = input.split('\n\n')
	const rows = split[0].split('\n');

	let robot = [-1, -1]

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < row.length; j++) {
			const current = row[j];
			gridMap.set(coordString(i, j), current)
			if (current == '@') {
				robot = [i, j]
			}
		}
	}

	const movementArr: string[] = [];

	split[1].split('\n').forEach(l => {
		l.split('').forEach(c => {
			movementArr.push(c);
		})
	})
	// log(gridMap)
	// log(movementArr);
	// log(robot)

	function areCoordsValid(x: number, y: number) {
		return gridMap.has(coordString(x, y,))
	}

	function getCoord(x: number, y: number) {
		return gridMap.get(coordString(x, y))
	}

	function setCoord(x: number, y: number, value: string) {
		return gridMap.set(coordString(x, y), value)
	}

	type GuardDirections = '^' | '>' | 'v' | '<'
	const guardDict = {
		'^': { x: -1, y: 0 },
		'>': { x: 0, y: 1 },
		'v': { x: 1, y: 0 },
		'<': { x: 0, y: -1 },
	}
	// const guardDeltaPos = guardDict[guardDir]


	for (let i = 0; i < movementArr.length; i++) {
		const move = movementArr[i] as GuardDirections;
		const deltaVector = guardDict[move];
		const oldRobot = robot;
		// log('~~~~~~~~~')
		// log('Move:', oldRobot, move, deltaVector)

		let newX = oldRobot[0] + deltaVector.x
		let newY = oldRobot[1] + deltaVector.y

		// must exist because robot is inside at the start and wont move out of the room
		const newPos = getCoord(newX, newY)!

		if (newPos === '#') {
			// wall -> do nothing
		}
		else if (newPos === '.') {
			// empty spot -> move robot
			setCoord(newX, newY, '@');
			setCoord(oldRobot[0], oldRobot[1], '.');
			robot = [newX, newY]
		}
		else {
			// O -> try to move

			let moveX = newX + deltaVector.x
			let moveY = newY + deltaVector.y

			while (areCoordsValid(moveX, moveY)) {
				const movePos = getCoord(moveX, moveY)!; // must exist because valid

				if (movePos === '#') {
					// wall -> cant move
					break;
				}
				else if (movePos === '.') {
					// empty spot found -> move

					// move chests to empty spot
					setCoord(moveX, moveY, 'O')

					// move robot
					setCoord(newX, newY, '@');
					setCoord(oldRobot[0], oldRobot[1], '.');
					robot = [newX, newY]
					break;
				}
				else {
					// other O -> try more positions
				}
				moveX = moveX + deltaVector.x
				moveY = moveY + deltaVector.y
			}

		}

		// log('After:', robot)
	}

	log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
	log('Robot after:', robot)

	let score = 0;

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < row.length; j++) {
			const current = getCoord(i, j)!
			if (current === 'O') {
				score = score + 100 * i + j
			}
		}
	}

	return score;
}

async function p2024day15_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`, expected: "2028"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day15_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day15_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day15_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day15_part2(input));
	const part2After = performance.now();

	logSolution(15, 2024, part1Solution, part2Solution);

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
