var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var counter = 90;
var intervalId;

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

var myQuestions = [
    {
        question: "What is currently the longest running musical on Broadway?",
        answers: {
            a: 'Wicked',
            b: 'Into the Woods',
            c: 'Book of Mormon',
            d: 'Phantom of the Opera'
        },
        correctAnswer: 'd'
    },
    {
        question: "The correct term for moving towards the audience on a stage is to move:",
        answers: {
            a: 'house-down',
            b: 'downstage',
            c: 'house-up',
            d: 'upstage'
        },
        correctAnswer: 'b'
    },
    {
        question: "Which popular musical is about a young man who takes a journey to Uganda to spread his mission and faith?",
        answers: {
            a: 'The Music Man',
            b: 'Book of Mormon',
            c: 'The Lion King',
            d: 'Nunsense'
        },
        correctAnswer: 'b'
    },
    {
        question: "What failed musical is considered one of the deadliest to produce, with leading characters injured almost every other week?",
        answers: {
            a: 'Spongebob: The Musical',
            b: 'Cats',
            c: 'Come From Away',
            d: 'Spiderman: Turn Off the Dark'
        },
        correctAnswer: 'd'
    },
    {
        question: "How much money does Gypsy Rose Lee need from the song with her famous line 'I had a dream'?",
        answers: {
            a: '49 bucks',
            b: '93 bucks',
            c: '88 bucks',
            d: '72 bucks'
        },
        correctAnswer: 'c'
    },
    {
        question: "Which musical features the hilarious hit song, 'The Internet is for Porn' sung by an off brand cookie-monster puppet?",
        answers: {
            a: 'Avenue Q',
            b: 'Something Rotten',
            c: 'The Book of Mormon',
            d: 'Ruthless'
        },
        correctAnswer: 'a'
    },
    {
        question: "What wildly pop-U-lar musical features a green witch trying to find her in the land of Oz?",
        answers: {
            a: 'The Wiz',
            b: 'Wicked',
            c: 'The Wizard of Oz',
            d: 'Zombie Prom'
        },
        correctAnswer: 'b'
    }
];

// hide elements we don't need to see before quiz starts
$("#submit").hide();
$(".quiz-end").hide();
$(".timer-div").hide();

// The function to turn the array of questions into inputs and display them, submit them, and score them
function createQuiz(questions, quizContainer, resultsContainer, submitButton) {

    run();

    function showQuestions(questions, quizContainer) {
        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {

            answers = [];
            
            // Adds the input html to each answer for each question
            for (letter in questions[i].answers) {

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // Pushes the questions and answers as HTML to the array
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // output the filled quizContainer to the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer) {

        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';

        // determine scoring
        for (var i = 0; i < questions.length; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                correctAnswers++;
            // if answer is incorrect
            } else if (userAnswer != questions[i].correctAnswer) {
                // add to number of incorrect answers
                incorrectAnswers++;
            //if question is unanswered
            } else if (userAnswer == {}) {
                // add to number of unanswered (NOT WORKING)
                unanswered++;
            }
        }

        // show number of correct, incorrect, unanswered
        resultsContainer.innerHTML = "<p>" + "Correct Answers: " + correctAnswers + "</p>" + "<p>" + "Incorrect Answers: " + incorrectAnswers + "</p>" + "<p>" + "Unaswered Questions: " + unanswered + "</p>";
    }

    showQuestions(questions, quizContainer);

    $("#submit").show();
    $(".timer-div").show();

    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
        $("#submit").hide();
        $(".quiz-end").show();
        $(".timer-div").hide();
    }

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function stop() {
        clearInterval(intervalId);
    }

    
    function decrement() {
        counter--;
        $("#timer").html(counter);

        //  Once counter runs out, display the score and stop the counter
        if (counter === 0) {
            stop();
            $("#submit").hide();
            $(".quiz-end").show();
            $(".timer-div").hide();
            showResults(questions, quizContainer, resultsContainer);
        }
    }
};

// start button resets the variables, shows and hides appropriate classes, generates the questions
$(".start-button").click(function () {
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    counter = 90;
    $("#timer").text(counter);
    $(".game-start").hide();
    $(".quiz-end").hide();
    $(".timer-div").show();
    createQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
});