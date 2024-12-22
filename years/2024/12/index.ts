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

function coordString(x: number, y: number) {
	return `${x}-${y}`
}

async function p2024day12_part1(input: string, ...params: any[]) {
	// square
	const n = input.indexOf('\n')
	log('garden plot size:', n, 'x', n)

	// const gridString = input.replaceAll('\n', '');
	// log(gridString.length)

	const gridMap = new Map<string, string>();
	const rows = input.split('\n');

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < row.length; j++) {
			gridMap.set(coordString(i, j), row[j])
		}
	}
	// log(gridMap)

	let regionCount = 0;
	function getNewRegion(): Region {
		regionCount = regionCount + 1;

		return { id: regionCount, coords: [] }
	}

	function areCoordsValid(x: number, y: number) {
		// if (x < 0 || x >= n || y < 0 || y >= n) {
		// 	return false;
		// }
		// else {
		// 	return true;
		// }
		return gridMap.has(coordString(x, y,))
	}

	function getCoord(x: number, y: number) {
		return gridMap.get(coordString(x, y))
	}

	function setCoord(x: number, y: number, value: string) {
		return gridMap.set(coordString(x, y), value)
	}

	const dxdy: number[][] = [[-1, 0], [1, 0], [0, 1], [0, -1]]

	function floodFill(i: number, j: number) {
		if (!areCoordsValid(i, j)) {
			// log('Floodfill', '(', i, ',', j, ')', 'type:', 'INVALID COORDS')
		}
		const plantType = getCoord(i, j)!; // must exist because valid coords
		// log('Floodfill', '(', i, ',', j, ')', 'type:', plantType)

		// log(plantType)

		let area = 0;
		let borders = 0;

		const Q: [x: number, y: number][] = [];
		Q.push([i, j])

		while (Q.length > 0) {
			const [x, y] = Q.pop()!; // must exist because Q.length > 0
			// log('~~~~~~~~~~~~~~~~~~~~~')
			// log('Queue:', x, y)

			if (!areCoordsValid(x, y) || getCoord(x, y) != plantType) {
				continue;
			}

			area = area + 1;
			setCoord(x, y, plantType.toLowerCase())

			let currentBorders = 0;

			dxdy.forEach(([dx, dy]) => {
				const newX = x + dx;
				const newY = y + dy;
				// log('dxdy', newX, newY)

				if (!areCoordsValid(newX, newY)) {
					// log('->', 'INVALID COORDS')
					currentBorders = currentBorders + 1;
				}
				else {
					const otherPlantType = getCoord(newX, newY);

					if (otherPlantType == plantType) {
						// log('->', 'SAME PLANT = PUSH')
						Q.push([newX, newY])
					}
					else if (otherPlantType == plantType.toLowerCase()) {
						// log('->', 'SAME PLANT, BUT ALREADY VISITED')
					}
					else {
						// log('->', 'OTHER PLANT')
						currentBorders = currentBorders + 1;
					}
				}
			})
			// log('-->> Borders:', currentBorders)
			borders = borders + currentBorders;
		}

		// log(area, borders, area * borders)
		return area * borders;
	}

	// floodFill(0, 0);

	let score = 0;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const plantType = getCoord(i, j)!;
			if (plantType == '*' || plantType == plantType.toLowerCase()) {
				// already visited
				continue;
			}
			score = score + floodFill(i, j);
		}
	}

	return score;
}

async function p2024day12_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `AAAA
BBCD
BBCC
EEEC`, expected: "140"
	}, {
		input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`, expected: "1930"
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
	const part1Solution = String(await p2024day12_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day12_part2(input));
	const part2After = performance.now();

	logSolution(12, 2024, part1Solution, part2Solution);

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
