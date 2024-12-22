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

	// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
	// log('Robot after:', robot)

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
	const gridMap = new Map<string, string>();
	const split = input.split('\n\n')
	const rows = split[0].split('\n');

	let robot = [-1, -1]

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < row.length; j++) {
			const current = row[j];

			if (current === '@') {
				robot = [i, 2 * j]
				gridMap.set(coordString(i, 2 * j), '@')
				gridMap.set(coordString(i, 2 * j + 1), '.')
			}
			else if (current === 'O') {
				gridMap.set(coordString(i, 2 * j), '[')
				gridMap.set(coordString(i, 2 * j + 1), ']')
			}
			else if (current === '.') {
				gridMap.set(coordString(i, 2 * j), '.')
				gridMap.set(coordString(i, 2 * j + 1), '.')
			}
			else if (current === '#') {
				gridMap.set(coordString(i, 2 * j), '#')
				gridMap.set(coordString(i, 2 * j + 1), '#')
			}
		}
	}

	const movementArr: string[] = [];

	split[1].split('\n').forEach(l => {
		l.split('').forEach(c => {
			movementArr.push(c);
		})
	})

	function printGridMap() {
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];

			let rowStr = '';

			for (let j = 0; j < 2 * row.length; j++) {
				rowStr = rowStr + getCoord(i, j);
			}
			log(rowStr)
		}
	}

	// log(gridMap)
	printGridMap()
	// log(movementArr);
	log(robot)

	// log('----------------------------------')

	// 
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

	for (let i = 0; i < movementArr.length; i++) {
		const move = movementArr[i] as GuardDirections;
		const deltaVector = guardDict[move];
		const oldRobot = robot;
		// log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
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

			// <<<<  ,  >>>>  ~> more or less same as Part1
			if (move === '<' || move === '>') {
				let moveX = newX + deltaVector.x
				let moveY = newY + deltaVector.y
				let counter = 0;

				while (areCoordsValid(moveX, moveY)) {
					const movePos = getCoord(moveX, moveY)!; // must exist because valid
					counter = counter + 1;

					if (movePos === '#') {
						// wall -> cant move
						break;
					}
					else if (movePos === '.') {
						// empty spot found -> move

						// move chests to empty spot
						// setCoord(moveX, moveY, 'O')

						for (let i = 0; i < counter; i++) {
							const char = getCoord(moveX - deltaVector.x * (i + 1), moveY - deltaVector.y * (i + 1))!
							setCoord(moveX - deltaVector.x * i, moveY - deltaVector.y * i, char)
						}

						// move robot
						setCoord(newX, newY, '@');
						setCoord(oldRobot[0], oldRobot[1], '.');
						robot = [newX, newY]
						// log(gridMap)
						// log(robot)
						// return;
						break;
					}
					else {
						// other O -> try more positions
					}
					moveX = moveX + deltaVector.x
					moveY = moveY + deltaVector.y
				}

			}
			// ^^^^^  
			else if (move === '^') {
				// deltaVector { x: -1, y: 0 }				
				let changesArr: [x: number, y: number, str: string][] = []
				let moveValid = true;

				function moveUp(x: number, y: number) {
					// log('moveUp', x, y)
					if (!moveValid) {
						// log('!moveValid')
						return
					}

					const current = getCoord(x, y)!
					// log('current:', current, ' @', x, y)
					// if (current == '.') {
					// 	return;
					// }

					let left: number[] = []
					let right: number[] = []

					if (current == '[') {
						left = [x, y]
						right = [x, y + 1]
					}
					else if (current == ']') {
						left = [x, y - 1]
						right = [x, y]
					}

					const topLeft = getCoord(left[0] - 1, left[1])!;
					const topRight = getCoord(right[0] - 1, right[1])!;

					if (topLeft == '#' || topRight == '#') {
						// ~> cant move
						moveValid = false;
						return;
					}

					// if (x == newX && y == newY) {
					// 	// first box ~> make space
					// 	// changesArr.push([left[0], left[1], '.']);
					// 	// changesArr.push([right[0], right[1], '.']);
					// }

					changesArr.push([left[0], left[1], '.']);
					changesArr.push([right[0], right[1], '.']);

					changesArr.push([left[0] - 1, left[1], '[']);
					changesArr.push([right[0] - 1, right[1], ']']);

					if (topLeft == '[' && topRight == ']') {
						// box ontop ~> move
						moveUp(left[0] - 1, left[1])
					}

					if (topLeft == '.') {
						// topLeft empty ~> do nothing
					}
					else if (topLeft == ']') {
						// topLeft box right side ~> move
						moveUp(left[0] - 1, left[1])
					}

					if (topRight == '.') {
						// topRight empty ~> do nothing
					}
					else if (topRight == '[') {
						// topRight box right side ~> move
						moveUp(right[0] - 1, right[1])
					}
				}

				moveUp(newX, newY);

				// log(changesArr)
				// printGridMap()
				// return;

				if (moveValid) {
					// update changes
					changesArr.reverse().forEach(c => {
						if (c[2] != '.') {
							setCoord(c[0], c[1], c[2]);
						}
						else {
							const sameCoords = changesArr.filter(x => x[0] === c[0] && x[1] === c[1])
							const notEmpty = sameCoords.filter(x => x[2] === '[' || x[2] === ']')
							if (notEmpty.length > 0) {
								// skip
							}
							else {
								setCoord(c[0], c[1], c[2]);
							}
						}
					})

					// move robot
					setCoord(newX, newY, '@');
					setCoord(oldRobot[0], oldRobot[1], '.');
					robot = [newX, newY]

					// printGridMap()
					// return;
				}
			}
			// vvvvv 
			else if (move === 'v') {
				// deltaVector { x: 1, y: 0 }				
				let changesArr: [x: number, y: number, str: string][] = []
				let moveValid = true;

				function moveDown(x: number, y: number) {
					// log('moveDown', x, y)
					if (!moveValid) {
						// log('!moveValid')
						return
					}

					const current = getCoord(x, y)!
					// log('current:', current, ' @', x, y)
					// if (current == '.') {
					// 	return;
					// }

					let left: number[] = []
					let right: number[] = []

					if (current == '[') {
						left = [x, y]
						right = [x, y + 1]
					}
					else if (current == ']') {
						left = [x, y - 1]
						right = [x, y]
					}

					const bottomLeft = getCoord(left[0] + 1, left[1])!;
					const bottomRight = getCoord(right[0] + 1, right[1])!;

					if (bottomLeft == '#' || bottomRight == '#') {
						// ~> cant move
						moveValid = false;
						return;
					}

					// if (x == newX && y == newY) {
					// 	// first box ~> make space
					// 	// changesArr.push([left[0], left[1], '.']);
					// 	// changesArr.push([right[0], right[1], '.']);
					// }

					changesArr.push([left[0], left[1], '.']);
					changesArr.push([right[0], right[1], '.']);

					changesArr.push([left[0] + 1, left[1], '[']);
					changesArr.push([right[0] + 1, right[1], ']']);

					if (bottomLeft == '[' && bottomRight == ']') {
						// box below ~> move
						moveDown(left[0] + 1, left[1])
					}

					if (bottomLeft == '.') {
						// bottomLeft empty ~> do nothing
					}
					else if (bottomLeft == ']') {
						// bottomLeft box right side ~> move
						moveDown(left[0] + 1, left[1])
					}

					if (bottomRight == '.') {
						// bottomRight empty ~> do nothing
					}
					else if (bottomRight == '[') {
						// bottomRight box right side ~> move
						moveDown(right[0] + 1, right[1])
					}
				}

				moveDown(newX, newY);

				// log(changesArr)
				// printGridMap()
				// return;

				if (moveValid) {
					// update changes				
					changesArr.reverse().forEach(c => {
						if (c[2] != '.') {
							setCoord(c[0], c[1], c[2]);
						}
						else {
							const sameCoords = changesArr.filter(x => x[0] === c[0] && x[1] === c[1])
							const notEmpty = sameCoords.filter(x => x[2] === '[' || x[2] === ']')
							if (notEmpty.length > 0) {
								// skip
							}
							else {
								setCoord(c[0], c[1], c[2]);
							}
						}
					})

					// move robot
					setCoord(newX, newY, '@');
					setCoord(oldRobot[0], oldRobot[1], '.');
					robot = [newX, newY]

					// printGridMap()
					// return;
				}
			}
		}


		// log(gridMap)
		// printGridMap()
		// log('After:', robot)
	}

	log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
	log('Robot after:', robot)
	printGridMap()

	let score = 0;

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		for (let j = 0; j < 2 * row.length; j++) {
			const current = getCoord(i, j)!
			if (current === '[') {
				score = score + 100 * i + j
			}
		}
	}


	log('~~>> ', score, ' <<~~')
	return score;
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
	const part2tests: TestCase[] = [
		{
			input: `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`, expected: "618"
		},
		{
			input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`, expected: "9021"
		},
		{
			input: `#######
#.....#
#.....#
#.@O..#
#..#O.#
#...O.#
#..O..#
#.....#
#######

>><vvv>v>^^^`, expected: "1430"
		},
		{
			input: `#######
#.....#
#.OO@.#
#.....#
#######

<<`, expected: "406"
		},
		{
			input: `#######
#.....#
#.O#..#
#..O@.#
#.....#
#######

<v<<^`, expected: "509"
		},
		{
			input: `#######
#.....#
#.#O..#
#..O@.#
#.....#
#######

<v<^`, expected: "511"
		},
		{
			input: `######
#....#
#.O..#
#.OO@#
#.O..#
#....#
######

<vv<<^`, expected: "816"
		}];

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
