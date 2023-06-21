function operate(num1, operator, num2) {
	switch (operator) {
		case '+':
			return Math.round((num1 + num2) * 1000) / 1000;
		case '-':
			return Math.round((num1 - num2) * 1000) / 1000;
		case '*':
			return Math.round(num1 * num2 * 1000) / 1000;
		case '/':
			if (num2 === 0) {
				return 'Cannot divide by 0';
			}
			return Math.round((num1 / num2) * 1000) / 1000;
	}
}

function useNumbers(e) {
	if (display.textContent === '0' || display.textContent === 'Cannot divide by 0') {
		display.textContent = '';
	}
	if (typeof buffer[0] !== 'number') {
		if (e.target.textContent === '.') {
			if (display.textContent.includes('.')) return;
		}
	}
	if (typeof buffer[0] === 'number' && typeof buffer[1] === 'string') {
		if (typeof buffer[2] !== 'string') buffer[2] = '';
		if (e.target.textContent === '.') {
			if (buffer[2].includes('.')) return;
		}
		buffer[2] += e.target.textContent;
	}
	display.textContent += e.target.textContent;
}

function useOperators(e) {
	if (typeof buffer[2] === 'string') buffer[2] = +buffer[2];
	if (operators.includes(buffer[1])) {
		if (typeof buffer[2] !== 'number') {
			buffer[1] = e.target.textContent;
			display.textContent = `${buffer[0]} ${e.target.textContent} `;
		} else {
			buffer[0] = operate(...buffer);
			if (buffer[0] === 'Cannot divide by 0') {
				display.textContent = `${buffer[0]}`;
				buffer = [];
				return;
			}
			buffer[1] = e.target.textContent;
			display.textContent = `${buffer[0]} ${e.target.textContent} `;
			buffer = [buffer[0], buffer[1]];
		}
	} else {
		if (display.textContent === 'Cannot divide by 0') {
			display.textContent = '0';
		}
		buffer[0] = +display.textContent;
		buffer[1] = e.target.textContent;
		display.textContent = `${buffer[0]} ${e.target.textContent} `;
	}
}

function useEquals(e) {
	if (display.textContent === 'Cannot divide by 0') {
		display.textContent = '0';
		buffer = [0];
		return;
	}
	if (typeof buffer[2] === 'undefined') return;
	else if (typeof buffer[2] === 'string') buffer[2] = +buffer[2];
	buffer[0] = operate(...buffer);
	display.textContent = buffer[0];
	buffer = [buffer[0]];
}

function useBackspace(e) {
	let arr = display.textContent.trim().split(' ');
	switch (arr.length) {
		case 3:
			buffer[2] = buffer[2].slice(0, -1);
			display.textContent = `${buffer[0]} ${buffer[1]} ${buffer[2]}`;
			if (buffer[2] === '') {
				buffer.splice(2, 1);
				display.textContent = `${buffer[0]} ${buffer[1]} `;
			}
			break;
		case 2:
			display.textContent = buffer[0];
			buffer[1] = null;
			buffer.splice(1, 1);
			break;
		case 1:
			if (buffer[0] === undefined) buffer[0] = +display.textContent;
			buffer[0] = +buffer[0].toString().slice(0, -1);
			if (Number.isNaN(buffer[0])) buffer[0] = 0;
			display.textContent = buffer[0];
			break;
	}
}

function useClear(e) {
	display.textContent = '0';
	buffer = [0];
}

let buffer = [];
const operands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operators = ['+', '-', '*', '/'];
const display = document.querySelector('#display');

const numberBtns = document.querySelectorAll('button.number');
numberBtns.forEach((number) => {
	number.addEventListener('click', useNumbers);
});

const operatorBtns = document.querySelectorAll('button.operator');
operatorBtns.forEach((operator) => {
	operator.addEventListener('click', useOperators);
});

const equalsBtn = document.querySelector('button.equals');
equalsBtn.addEventListener('click', useEquals);

const deleteBtn = document.querySelector('.Backspace');
deleteBtn.addEventListener('click', useBackspace);

const clearBtn = document.querySelector('.Delete');
clearBtn.addEventListener('click', useClear);

window.addEventListener('keydown', (e) => {
	document.querySelector(`[data-key='${e.key}']`)?.click();
});
