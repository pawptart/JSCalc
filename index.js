(function() {

	// Return element or a nodelist if multiple elements
	var el = function(element) {
		if (element.charAt(0) === "#") {
			return document.querySelector(element);
		} else {
			return document.querySelectorAll(element);
		}
	}

	// Set variables
	var window = el('#window'),
			equals = el('#equals'),
			nums = el('.num'),
			operators = el('.operator'),
			firstNum = "",
			secondNum = "",
			result = null,
			operator = "";
	
	// Click event functions
	var setNum = function() {
			secondNum += this.getAttribute("data-num");

			if (secondNum == ".") {
				secondNum = "0.";
			} else if ( secondNum.match(/\./g) != null && secondNum.match(/\./g).length > 1 ) {
				secondNum = "error";
			} 
			
			display(secondNum);
	}

	// Detect which function key was pressed
	var setOperator = function() {
		operator = this.innerText;
		if (!result) {
			firstNum = secondNum;
		}
		secondNum = '';
		display(secondNum);
	}

	// Evaluate results based on function key pressed
	var evaluateResult = function() {
		if (firstNum.length > 0 && secondNum.length > 0 && operator != '') {
			firstNum = parseFloat(firstNum);
			console.log(firstNum);
			secondNum = parseFloat(secondNum);
			console.log(secondNum);

			switch (operator) {
				case '+': 
					result = firstNum + secondNum;
					break;
				case '-': 
					result = firstNum - secondNum;
					break;
				case '/': 
					result = firstNum / secondNum;
					break;
				case '*': 
					result = firstNum * secondNum;
					break;
				default:
					result = "error";
			} 

			if (result != "error") {
				firstNum = result.toString();
			} 

			secondNum = '';
			operator = '';
			display(result);
		}
	}

	// C button clear function clears last value
	var clr = function() {
		if (firstNum > 0 && secondNum > 0) {
			secondNum = firstNum;
			firstNum = '';
			operator = '';
			result = null;
		} else {
			secondNum = '';
			firstNum = '';
			operator = '';
			result = null;
		}

		display(secondNum);
	}

	// AC button clears all values
	var clrAll = function() {
		firstNum = '';
		secondNum = '';
		operator = '';
		result = null;

		display(secondNum);
	}

	// Set click events for all elements
	for (let i = 0; i < nums.length; i++) {
		nums[i].onclick = setNum;
	}

	for (let i = 0; i < operators.length; i++) {
		operators[i].onclick = setOperator;
	}

	equals.onclick = evaluateResult;

	el('#clear').onclick = clr;

	el('#clear-all').onclick = clrAll;

	// Display values
	function display(number) {

		if (number == "error") {
			window.innerText = number;
			setTimeout(clrAll, 3000);
		} else if (number > 99999999 || number < -9999999 || number.length > 8) {
			window.innerText = "overflow";
			setTimeout(clrAll, 3000);
		} else if ( number % 1 != 0 ) {
			number = number.toString().slice(0, 8);
			window.innerText = number;
		} else {
			window.innerText = number;
		}

	}
	
}());
