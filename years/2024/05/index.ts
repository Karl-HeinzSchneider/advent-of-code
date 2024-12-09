import _, { split, update } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 5;

// solution path: E:\Projects\advent-of-code\years\2024\05\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\05\data.txt
// problem url  : https://adventofcode.com/2024/day/5

function isUpdateInRightOrder(update: number[], rules: Map<number, number[]>): boolean {
	const numUpdates = update.length;
	// log('~~~~~~~~~~~~~~~~')

	for (let i = 0; i < numUpdates; i++) {
		const current = update[i];
		const currentRules = rules.get(current);
		// log('current: ', current)
		// log('current:', current)

		if (!currentRules) {
			// log('no rules?')
			continue
		}

		// log('currentRules: ', currentRules)

		// log('front:')
		for (let j = 0; j < i; j++) {
			const other = update[j];
			const otherRules = rules.get(other);

			const doesRuleExist = currentRules.includes(other)
			// log('->', other, ', doesRuleExist: ', doesRuleExist)
			if (doesRuleExist) { return false }
		}

		// log('after:')
		for (let j = i + 1; j < numUpdates; j++) {
			// after
			const other = update[j];
			const doesRuleExist = currentRules.includes(other)
			// log('->', other, ', doesRuleExist: ', doesRuleExist)
		}
		// log('~~~~~~~~~~~~~~~~')

	}

	return true;
}

async function p2024day5_part1(input: string, ...params: any[]) {
	const lines = input.split('\n');

	let stillRules = true;
	const rules: { x: number, y: number }[] = [];
	const rulemap = new Map<number, number[]>();
	const updates: number[][] = [];

	lines.forEach(l => {
		if (l == '') {
			// empty line seperator
			stillRules = false;
		}
		else if (stillRules) {
			// first part
			const tmp = l.split('|')
			const rule = { x: Number(tmp[0]), y: Number(tmp[1]) }
			rules.push(rule)

			const current = rulemap.get(rule.x);
			if (current) {
				rulemap.set(rule.x, [...current, rule.y])
			}
			else {
				rulemap.set(rule.x, [rule.y])
			}
		}
		else {
			// second part
			const tmp = l.split(',').map(x => Number(x))
			updates.push(tmp)
		}
	})

	// log(rules)
	// log(rulemap)
	// log(updates)
	let score = 0;
	for (let i = 0; i < updates.length; i++) {
		const up = updates[i]
			;
		// log('------------------------')
		// log(up)
		if (isUpdateInRightOrder(up, rulemap)) {
			// log('RIGHT ORDER', up)
			const middle = up[Math.floor(up.length / 2)]
			score = score + middle
		}
		else {
			// wrong order
			// log('WRONG ORDER', up)
		}
	}

	return score;
}

function orderUpdate(update: number[], rulesMap: Map<number, number[]>, rules: { x: number, y: number }[]): number[] {
	let ordered: number[] = [];

	const relevantRules = rules.filter(rule => {
		return update.includes(rule.x) && update.includes(rule.y)
	})
	// log(update)
	// log(relevantRules);

	const length = update.length;
	for (let i = 0; i < length; i++) {
		const current = update[i]

		const amount = relevantRules.filter(rule => rule.x == current).length;
		ordered[length - amount - 1] = current;
	}

	return ordered;
}

async function p2024day5_part2(input: string, ...params: any[]) {
	const lines = input.split('\n');

	let stillRules = true;
	const rules: { x: number, y: number }[] = [];
	const rulemap = new Map<number, number[]>();
	const updates: number[][] = [];

	lines.forEach(l => {
		if (l == '') {
			// empty line seperator
			stillRules = false;
		}
		else if (stillRules) {
			// first part
			const tmp = l.split('|')
			const rule = { x: Number(tmp[0]), y: Number(tmp[1]) }
			rules.push(rule)

			const current = rulemap.get(rule.x);
			if (current) {
				rulemap.set(rule.x, [...current, rule.y])
			}
			else {
				rulemap.set(rule.x, [rule.y])
			}
		}
		else {
			// second part
			const tmp = l.split(',').map(x => Number(x))
			updates.push(tmp)
		}
	})

	let score = 0;
	for (let i = 0; i < updates.length; i++) {
		const up = updates[i]
			;
		// log('------------------------')
		// log(up)
		if (isUpdateInRightOrder(up, rulemap)) {
			// log('RIGHT ORDER', up)
			// do nothing this time
		}
		else {
			// wrong order
			// log('WRONG ORDER', up)
			const ordered = orderUpdate(up, rulemap, rules);
			// log('ordered:', ordered)
			const middle = ordered[Math.floor(ordered.length / 2)]
			score = score + middle
		}
	}


	return score;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`, expected: "143"
	}];
	const part2tests: TestCase[] = [{
		input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`, expected: "123"
	}];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day5_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day5_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// if (true) { return; }

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day5_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day5_part2(input));
	const part2After = performance.now();

	logSolution(5, 2024, part1Solution, part2Solution);

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
