
var usableWords = ['Arizona', 'California', 'Colorado', 'Washington', 'Arkansas', 'Mississippi', 'Pennsylvania', 'Maine', 'Kentucky', 'Georgia'];
var wins = 0;
var losses = 0;
var errors = 8;
var replaceChoice;
var userInputs = [];
var compChoice;

function chooseWord (r) {
	return r[Math.floor(Math.random()*r.length)];
}

function checkInput (a) {
	for (var i=0; i < userInputs.length; i++) {
		if (a===userInputs[i]) {
			alert("You've already guessed this letter!");
			return;
		}
	}
	userInputs.push(a);
	document.getElementById("userGuesses").innerHTML = " " + userInputs;

	console.log(userInputs);
}

function checkLetters(l) {
	var check = compChoice.indexOf(l);
	console.log(check);
	if (check === -1) {
		errors--;
		document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining: " + errors;
	} else {
		for (var i=0; i < compChoice.length; i++) {
			if (compChoice.charAt(i) === l) {
				replaceChoice = replaceChoice.replaceAt(i, l);
				console.log(replaceChoice);
			}
		}
		document.getElementById("blanks").innerHTML = replaceChoice;
	}
}

function resetGame () {
	userInputs = [];
	document.getElementById("userGuesses").innerHTML = " " + userInputs;
	errors = 8;
	compChoice = chooseWord(usableWords).toLowerCase();
	console.log(compChoice);
	replaceChoice = compChoice.replace(/./g, "_");
	document.getElementById("blanks").innerHTML = replaceChoice;
}

String.prototype.replaceAt=function(index, replacement) {
	return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

resetGame();

compChoice = chooseWord(usableWords).toLowerCase();

document.onkeyup = function(event) {
	var userInput = event.key;
	if (errors > 0 && event.which >= 65 && event.which <= 90) {
		checkInput(userInput);
		checkLetters(userInput);
		if (errors === 0 && event.which >= 65 && event.which <= 90) {
			alert("Try again! The word was " + compChoice);
			losses++;
			document.getElementById("losses").innerHTML = "Losses: " + losses;
			resetGame();
		}
	} if (replaceChoice.indexOf("_") === -1) {
		alert("A winner is YOU! Now go visit " + compChoice);
		wins++;
		document.getElementById("wins").innerHTML = "Wins: " + wins;
		resetGame();
	}
}
