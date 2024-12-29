import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2024;
const DAY = 23;

// solution path: E:\Projects\advent-of-code\years\2024\23\index.ts
// data path    : E:\Projects\advent-of-code\years\2024\23\data.txt
// problem url  : https://adventofcode.com/2024/day/23

interface AdjacencyGraph {
	[keyof: string]: Set<string>;
}

async function p2024day23_part1(input: string, ...params: any[]) {
	const split = input.split('\n')

	let graph: AdjacencyGraph = {};

	split.forEach(s => {
		const [pc1, pc2] = s.split('-');

		if (graph[pc1]) {
			graph[pc1].add(pc2);
		}
		else {
			graph[pc1] = new Set([pc2]);
		}

		if (graph[pc2]) {
			graph[pc2].add(pc1);
		}
		else {
			graph[pc2] = new Set([pc1]);
		}
	})

	// log(graph)
	// log(Object.keys(graph))

	const computerList = Object.keys(graph)
	log('Computers: ', computerList.length);

	let foundTriples = new Set<string>();

	computerList.forEach(c => {
		const neighbors = graph[c];

		neighbors.forEach(n => {
			const otherNeighbors = graph[n];

			otherNeighbors.forEach(o => {
				if (neighbors.has(o) && graph[o].has(c)) {
					// log('found:', c, n, o)
					const arr = [c, n, o].sort()
					const tripleStr = arr.join(',')
					// log('found:', foundStr)
					if (c.startsWith('t') || n.startsWith('t') || o.startsWith('t')) {
						foundTriples.add(tripleStr)
					}
				}
			})
		})
	})

	// log([...foundTriples].sort())

	return foundTriples.size;
}

async function p2024day23_part2(input: string, ...params: any[]) {
	return "Not implemented";
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`, expected: "7"
	}];
	const part2tests: TestCase[] = [];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2024day23_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2024day23_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2024day23_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2024day23_part2(input));
	const part2After = performance.now();

	logSolution(23, 2024, part1Solution, part2Solution);

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
