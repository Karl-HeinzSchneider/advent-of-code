import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 22;

// solution path: E:\Projects\advent-of-code\years\2024\22\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\22\data.txt
// problem url  : https://adventofcode.com/2024/day/22

function nextSecretNumber(init: bigint): bigint {
	let nextNumber: bigint = BigInt(0);

	// 	
	nextNumber = mix(init, init * BigInt(64))
	nextNumber = prune(nextNumber)

	// 
	const tmp = nextNumber / BigInt(32);
	nextNumber = mix(nextNumber, tmp)
	nextNumber = prune(nextNumber)

	// 
	nextNumber = mix(nextNumber, nextNumber * BigInt(2048))
	nextNumber = prune(nextNumber)

	return nextNumber;
}

function prune(nr: bigint): bigint {
	// log('prune', nr, nr % 16777216)
	return nr % BigInt(16777216);
}

function mix(nr: bigint, other: bigint): bigint {
	return nr ^ other;
}

function getPrice(nr: bigint): number {
	const str = nr.toString()
	return Number(str.charAt(str.length - 1))
}

async function p2024day22_part1(input: string, ...params: any[]) {
	let split = input.split('\n').map(BigInt)
	// split = [1, 10, 100, 2024].map(BigInt)

	let score: bigint = BigInt(0);

	split.forEach(n => {
		let tmp = n;

		for (let i = 2; i < 2000 + 2; i++) {
			tmp = nextSecretNumber(tmp);
			// log(i, secretTest)
			// if (i == 1 || i == 10 || i == 100 || i == 2024) {
			// log(i, secretTest)
			// }
		}

		score = score + tmp;
	})

	return score;
}

async function p2024day22_part2(input: string, ...params: any[]) {
	// const arr = [BigInt(1), BigInt(2), BigInt(3), BigInt(2024)]
	const arr = input.split('\n').map(BigInt)

	const changesArr = arr.map(n => {
		let tmp = n;
		let price = getPrice(tmp);

		let changes: [number, number][] = []
		changes.push([price, 0])

		for (let i = 2; i < 2000 + 2; i++) {
			tmp = nextSecretNumber(tmp);
			const newPrice = getPrice(tmp);
			const change = newPrice - price;
			price = newPrice;

			changes.push([price, change])
		}

		return changes;
	})

	// log(changesArr[0])

	let strSet = new Set<string>([]);

	const profitsArr = changesArr.map(c => {
		let profitMap = new Map<string, number>();

		for (let i = 3; i < c.length; i++) {
			const [price, change] = c[i];
			const vals = c.slice(i - 3, i + 1)
			const str = vals.map(v => v[1]).join(' | ')
			// log(i, c[i], vals, str)
			// log(i, ' ', price, ' ', str)

			const oldProfit = profitMap.get(str);
			strSet.add(str);

			if (oldProfit) {
				// Apes sell at the first option, and dont wait for the best :(
				// if (price > oldProfit) {
				// 	profitMap.set(str, price);
				// }
			}
			else {
				profitMap.set(str, price);
				// strSet.add(str);
			}
		}

		// log(profitMap)
		return profitMap;
	})

	// log('strSet', strSet)
	log('Different strings to test: ', strSet.size)

	let maxProfit = -1;
	let maxProfitStr = ''

	strSet.forEach(s => {
		let profit = 0;

		profitsArr.forEach(p => {
			const profitAtThatStr = p.get(s);
			if (profitAtThatStr) {
				profit = profit + profitAtThatStr
			}
		})

		if (profit > maxProfit) {
			log('~> NewMaxProfit!', s, ' = ', profit)

			maxProfit = profit;
			maxProfitStr = s;
		}
	})

	log('--->>> ', maxProfitStr, ' = ', maxProfit)

	return maxProfit;
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day22_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day22_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day22_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day22_part2(input));
	const part2After = performance.now();

	logSolution(22, 2024, part1Solution, part2Solution);

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
