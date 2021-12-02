import _, { split } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2020;
const DAY = 4;

// solution path: C:\Users\Johannes\advent-of-code\years\2020\04\index.ts
// data path    : C:\Users\Johannes\advent-of-code\years\2020\04\data.txt
// problem url  : https://adventofcode.com/2020/day/4

const example = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const exampleInvalid = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

const exampleValid = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

function convert(input: string) {
	const arr = input.split('\n');

	let newArr: string[][] = [];
	//console.log(arr)

	let start = 0;

	arr.forEach((value, index, array) => {
		if (value === '') {
			const ppRaw = arr.slice(start, index);

			let pp: string[] = [];

			ppRaw.forEach(entry => {
				const splits = entry.split(' ');
				pp = [...pp, ...splits];
			})
			newArr.push(pp);

			start = index + 1;
		}
		else if (index === arr.length - 1) {
			const ppRaw = arr.slice(start);

			let pp: string[] = [];

			ppRaw.forEach(entry => {
				const splits = entry.split(' ');
				pp = [...pp, ...splits];
			})
			newArr.push(pp);
		}
	})

	return newArr;
}

function checkPassport(pp: string[]): boolean {

	const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
	const optionalFields = ['cid'];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!pp.some(entry => entry.startsWith(field))) {
			//console.log('INVALID -> ' + field);
			return false;
		}
	}

	return true;
}

async function p2020day4_part1(input: string, ...params: any[]) {
	const ppArr = convert(input);
	//console.log(ppArr)

	let counter = 0;

	ppArr.forEach(pp => {
		if (checkPassport(pp)) {
			counter = counter + 1;
		}
	})


	return counter;
}

function validateNumber(numberString: string, min: number, max: number): boolean {

	const nr = Number(numberString);
	//console.log(nr)
	if (nr >= min && nr <= max) {
		return true;
	}

	return false;
}

function checkPassportWithValidation(pp: string[]): boolean {

	const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
	const optionalFields = ['cid'];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];

		const entry = pp.find(entry => entry.startsWith(field));
		if (!entry) {
			return false;
		}

		const splits = entry.split(':');
		const type = splits[0];
		const value = splits[1];


		switch (type) {
			case 'byr':
				if (!validateNumber(value, 1920, 2002)) {
					console.log('byr invalid')
					return false;
				}
				break;

			case 'iyr':
				if (!validateNumber(value, 2010, 2020)) {
					console.log('iyr invalid')
					return false;
				}
				break;

			case 'eyr':
				if (!validateNumber(value, 2020, 2030)) {
					console.log('eyr invalid')
					return false;
				}
				break;

			case 'hgt':
				if (value.endsWith('cm')) {
					const hgt = value.slice(0, - 2);
					if (!validateNumber(hgt, 150, 193)) {
						console.log('hgt invalid')
						return false;
					}
				}
				else if (value.endsWith('in')) {
					const hgt = value.slice(0, - 2);
					if (!validateNumber(hgt, 59, 76)) {
						console.log('hgt invalid')
						return false;
					}
				}
				else {
					console.log('hgt invalid')
					return false;
				}
				break;

			case 'hcl':
				if (!value.startsWith('#') || value.length != 7) {
					console.log('hcl invalid l')
					return false;
				}

				const validValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

				for (let i = 1; i < 7; i++) {
					if (!validValues.includes(value.charAt(i))) {
						console.log('hcl invalid c' + i)
						return false;
					}
				}

				break;

			case 'ecl':
				const validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
				if (validEcl.indexOf(value) < 0) {
					console.log('ecl invalid')
					return false;
				}
				break;

			case 'pid':
				if (value.length > 9) {
					console.log('pid invalid')
					return false;
				}

				const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

				for (let i = 0; i < value.length; i++) {
					if (!validNumbers.includes(value.charAt(i))) {
						console.log('pid invalid')
						return false;
					}
				}

				break;

			default:
				break;
		}

		console.log(field + ' valid')

	}


	return true;
}

async function p2020day4_part2(input: string, ...params: any[]) {
	const ppArr = convert(input);
	//console.log(ppArr)

	let counter = 0;

	ppArr.forEach(pp => {
		if (checkPassportWithValidation(pp)) {
			counter = counter + 1;
		}
	})


	return counter;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: example,
			expected: '2'
		}
	];
	const part2tests: TestCase[] = [
		{
			input: exampleInvalid,
			expected: '0'
		},
		{
			input: exampleValid,
			expected: '4'
		}
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2020day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2020day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();
	
	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day4_part2(input));
	const part2After = performance.now();

	logSolution(4, 2020, part1Solution, part2Solution);

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
