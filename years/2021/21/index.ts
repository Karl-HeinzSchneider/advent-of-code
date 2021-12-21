import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2021;
const DAY = 21;

// solution path: C:\Users\Johannes\advent-of-code\years\2021\21\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2021\21\data.txt
// problem url  : https://adventofcode.com/2021/day/21

const example = `Player 1 starting position: 4
Player 2 starting position: 8`;

function rollDice(count: number): number {
	if (count <= 100) {
		return count;
	}
	else {
		return 1 + count % 100;
	}
}

class Dice {

	private value = 1;
	public rolls = 0;

	public roll() {
		const roll = this.value;
		this.rolls++;

		this.value++;
		if (this.value === 101) {
			this.value = 1;
		}
		return roll;
	}
}

async function p2021day21_part1(input: string, ...params: any[]) {
	const arr = input.split('\n').map(line => {
		const split = line.split('');
		return Number(split[split.length - 1]);
	});

	console.log(arr);

	const dice = new Dice();

	const winningScore = 1000;

	let posPlayerOne = arr[0] - 1;
	let posPlayerTwo = arr[1] - 1;

	let scorePlayerOne = 0;
	let scorePlayerTwo = 0;

	let round = 1;

	while (scorePlayerOne < winningScore && scorePlayerTwo < winningScore) {

		const rollOne = dice.roll();
		const rollTwo = dice.roll();
		const rollThree = dice.roll();

		const rollSum = rollOne + rollTwo + rollThree;

		// playerOne		
		if (round % 2 === 1) {

			posPlayerOne = (posPlayerOne + rollSum) % 10;
			scorePlayerOne = scorePlayerOne + posPlayerOne + 1;

			//console.log(`Player 1 rolls ${rollOne},${rollTwo},${rollThree} = ${rollSum} => moves to space ${posPlayerOne + 1} for a total Score of ${scorePlayerOne}`);
		}
		// playerTwo
		else {
			posPlayerTwo = (posPlayerTwo + rollSum) % 10;
			scorePlayerTwo = scorePlayerTwo + posPlayerTwo + 1;

			//console.log(`Player 1 rolls ${rollOne},${rollTwo},${rollThree} = ${rollSum} => moves to space ${posPlayerTwo + 1} for a total Score of ${scorePlayerTwo}`);
		}

		round++;
	}

	if (scorePlayerOne >= winningScore) {
		return scorePlayerTwo * dice.rolls;
	}
	else if (scorePlayerTwo >= winningScore) {
		return scorePlayerOne * dice.rolls;
	}


	return "Not implemented";
}

async function p2021day21_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{ input: example, expected: '739785' }];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2021day21_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2021day21_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	//return;
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2021day21_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2021day21_part2(input));
	const part2After = performance.now();

	logSolution(21, 2021, part1Solution, part2Solution);

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
