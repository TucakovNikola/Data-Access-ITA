var quiz;

fetch("quiz.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){        
        quiz = data;
        
        var form = document.createElement('form');
        
        // Question 1
        form.innerHTML += "<h2>" + quiz.quiz.q1.question + "</h2>";
        // Answer question 1
        quiz.quiz.q1.options.forEach(option => {
            form.innerHTML += `<label><input type="radio" name="q1" value="${option}">${option}</label><br>`;
        });

        // Question 2
        form.innerHTML += "<h2>" + quiz.quiz.q2.question + "</h2>";
        // Answer question 2
        quiz.quiz.q2.options.forEach(option => {
            form.innerHTML += `<label><input type="radio" name="q2" value="${option}">${option}</label><br>`;
        });
        // Question 3
        form.innerHTML += "<h2>" + quiz.quiz.q3.question + "</h2>";
        // Answer question 3
        quiz.quiz.q3.options.forEach(option => {
            form.innerHTML += `<label><input type="radio" name="q3" value="${option}">${option}</label><br>`;
        });
        // Question 4
        form.innerHTML += "<h2>" + quiz.quiz.q4.question + "</h2>";
        // Answer question 4
        quiz.quiz.q4.options.forEach(option => {
            form.innerHTML += `<label><input type="radio" name="q4" value="${option}">${option}</label><br>`;
        });
        // Add submit button
        form.innerHTML += `<button type="button" onclick="submitQuiz()">Submit</button>`;
        document.body.appendChild(form);
    })
    .catch(function (err) {
        console.log("Fetch Problem: " + err.message);
    });

// Function to handle quiz submission
function submitQuiz() {
    var selectedAnswers = {};
    selectedAnswers.q1 = document.querySelector('input[name="q1"]:checked').value;
    selectedAnswers.q2 = document.querySelector('input[name="q2"]:checked').value;
    selectedAnswers.q3 = document.querySelector('input[name="q3"]:checked').value;
    selectedAnswers.q4 = document.querySelector('input[name="q4"]:checked').value;

    // Save selected answers to localStorage
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));

}

window.onload = function() {
    var selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
    if (selectedAnswers) {
        // Set the selected answers in the form
        document.querySelector('input[name="q1"][value="' + selectedAnswers.q1 + '"]').checked = true;
        document.querySelector('input[name="q2"][value="' + selectedAnswers.q2 + '"]').checked = true;
        document.querySelector('input[name="q3"][value="' + selectedAnswers.q3 + '"]').checked = true;
        document.querySelector('input[name="q4"][value="' + selectedAnswers.q4 + '"]').checked = true;
        
        var correctCount = 0;
        for (var questionNumber in selectedAnswers) {
            if (selectedAnswers[questionNumber] === quiz.quiz[questionNumber].answer) {
                correctCount++;
            }
        }

        if (correctCount === 4) {
            alert("Answers are correct!");
        } else {
            alert("Answers are incorrect. try again!");
        }
    } else {
        alert("No selected answers found. Please answer the qustions and submit your answer using the SUBMIT button");
    }
};
