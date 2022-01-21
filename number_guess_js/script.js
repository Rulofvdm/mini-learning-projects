var random_number = Math.floor(Math.random() * 100);

var text_input = document.getElementById("guess_text");
var submit_guess_button = document.getElementById("submit_guess_button");
var result_output = document.getElementById("result");
var previous_guesses_output = document.getElementById("previous_guesses");
var previous_guesses = [];

function checkGuess () {
    result_output.hidden = false;
    previous_guesses_output.hidden = false;
    var guess = text_input.value;
    if(guess == random_number) {
        result_output.innerText = "Coagulazions";
        previous_guesses = [];
        random_number = Math.random(0, 100);
        previous_guesses_output.hidden = true;
        return;
    }
    else {
        previous_guesses.push(guess);
        previous_guesses_output.innerText = "Previous Guesses: " + previous_guesses;
    }
    if (guess < random_number) {
        result_output.innerText = "Guess is smaller than";
    }
    else if (guess > random_number) {
        result_output.innerText = "Guess is bigger than";
    }
    text_input.value  = "";
}

text_input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }
});
submit_guess_button.addEventListener("click", checkGuess);