import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 8;

// solution path: E:\Projects\advent-of-code\years\2024\08\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\08\data.txt
// problem url  : https://adventofcode.com/2024/day/8
interface Vector2D { x: number, y: number };

async function p2024day8_part1(input: string, ...params: any[]) {
	let grid = new Map<Vector2D, string>();
	let towerMap = new Map<string, Vector2D[]>();
	const lines = input.split('\n');

	const heigth = lines.length;
	const width = lines[0].length;

	for (let i = 0; i < heigth; i++) {
		for (let j = 0; j < width; j++) {
			const current = lines[i][j];
			const coords: Vector2D = { x: i, y: j };
			grid.set(coords, current);
			if (current == '.') {
				continue;
			}

			const mapEntry = towerMap.get(current);
			if (mapEntry) {
				towerMap.set(current, [...mapEntry, coords]);
			}
			else {
				towerMap.set(current, [coords]);
			}
		}
	}

	// log(towerMap)
	// log(width, heigth)

	function isInsideGrid(pos: Vector2D): boolean {
		if (pos.x < 0 || pos.x >= heigth || pos.y < 0 || pos.y >= width) {
			return false;
		}
		return true;
	}

	const antiNodesMap = new Map<string, boolean>();

	const towerMapKey = towerMap.keys();
	for (const towerType of towerMapKey) {
		// log('TowerType:', towerType);
		const coords = towerMap.get(towerType)!;
		const coordsLen = coords.length;
		for (let i = 0; i < coordsLen; i++) {
			const currentCoord = coords[i];
			// log('current:', currentCoord)
			for (let k = i + 1; k < coordsLen; k++) {
				const other = coords[k];
				// log(other)

				const delta: Vector2D = { x: other.x - currentCoord.x, y: other.y - currentCoord.y };
				// log('-> delta:', delta)
				const antiOne: Vector2D = { x: currentCoord.x + 2 * delta.x, y: currentCoord.y + 2 * delta.y }
				const antiTwo: Vector2D = { x: currentCoord.x + -1 * delta.x, y: currentCoord.y + -1 * delta.y }

				// log('-> antiOne:', antiOne, '--->', isInsideGrid(antiOne))
				if (isInsideGrid(antiOne)) {
					antiNodesMap.set(`${antiOne.x}-${antiOne.y}`, true);
					// log('-> antiOne:', antiOne)
					// log('---> inside')
				}

				// log('-> antiTwo:', antiTwo, '--->', isInsideGrid(antiTwo))

				if (isInsideGrid(antiTwo)) {
					antiNodesMap.set(`${antiTwo.x}-${antiTwo.y}`, true);
					// log('-> antiTwo:', antiTwo)
					// log('---> inside')
				}
				// log('.................')
			}
			// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		}
	}
	// log(antiNodesMap)

	const numAntinodes = antiNodesMap.size;

	return numAntinodes;
}

async function p2024day8_part2(input: string, ...params: any[]) {
	let grid = new Map<Vector2D, string>();
	let towerMap = new Map<string, Vector2D[]>();
	const lines = input.split('\n');

	const heigth = lines.length;
	const width = lines[0].length;

	for (let i = 0; i < heigth; i++) {
		for (let j = 0; j < width; j++) {
			const current = lines[i][j];
			const coords: Vector2D = { x: i, y: j };
			grid.set(coords, current);
			if (current == '.') {
				continue;
			}

			const mapEntry = towerMap.get(current);
			if (mapEntry) {
				towerMap.set(current, [...mapEntry, coords]);
			}
			else {
				towerMap.set(current, [coords]);
			}
		}
	}

	function isInsideGrid(pos: Vector2D): boolean {
		if (pos.x < 0 || pos.x >= heigth || pos.y < 0 || pos.y >= width) {
			return false;
		}
		return true;
	}


	// log(towerMap)
	// log(width, heigth)

	const antiNodesMap = new Map<string, boolean>();

	const towerMapKey = towerMap.keys();
	for (const towerType of towerMapKey) {
		// log('TowerType:', towerType);
		const coords = towerMap.get(towerType)!;
		const coordsLen = coords.length;
		for (let i = 0; i < coordsLen; i++) {
			const currentCoord = coords[i];
			if (coordsLen > 0) {
				// tower itself is antinode
				antiNodesMap.set(`${currentCoord.x}-${currentCoord.y}`, true);
			}
			// log('current:', currentCoord)
			for (let k = i + 1; k < coordsLen; k++) {
				const other = coords[k];
				// log(other)

				const delta: Vector2D = { x: other.x - currentCoord.x, y: other.y - currentCoord.y };
				// log('-> delta:', delta)
				let antiOne: Vector2D = { x: currentCoord.x + 2 * delta.x, y: currentCoord.y + 2 * delta.y }

				while (isInsideGrid(antiOne)) {
					// log('-> antiOne:', antiOne, '--->', isInsideGrid(antiOne))
					antiNodesMap.set(`${antiOne.x}-${antiOne.y}`, true);
					antiOne = { x: antiOne.x + delta.x, y: antiOne.y + delta.y }
				}
				// log('-> antiOne:', antiOne, '--->', isInsideGrid(antiOne))


				let antiTwo: Vector2D = { x: currentCoord.x + -1 * delta.x, y: currentCoord.y + -1 * delta.y }
				while (isInsideGrid(antiTwo)) {
					// log('-> antiTwo:', antiTwo, '--->', isInsideGrid(antiTwo))
					antiNodesMap.set(`${antiTwo.x}-${antiTwo.y}`, true);
					antiTwo = { x: antiTwo.x + -1 * delta.x, y: antiTwo.y + -1 * delta.y }
				}
				// log('-> antiTwo:', antiTwo, '--->', isInsideGrid(antiTwo))

				// log('.................')
			}
			// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		}
	}
	// log(antiNodesMap)

	const numAntinodes = antiNodesMap.size;

	return numAntinodes;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`, expected: "14"
	}];
	const part2tests: TestCase[] = [{
		input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`, expected: "34"
	}];;

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day8_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day8_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day8_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day8_part2(input));
	const part2After = performance.now();

	logSolution(8, 2024, part1Solution, part2Solution);

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
