document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is the primary cause of floods?", answers: ["Heavy Rainfall", "Drought", "Earthquake", "Volcanic Eruption"], correct: 0 },
        { question: "Which of the following is a flood protection method?", answers: ["Building Dams", "Planting Trees", "Using Umbrellas", "Wearing Boots"], correct: 0 },
        { question: "What is a floodplain?", answers: ["An area prone to flooding", "A type of fish", "A flood prevention method", "A weather pattern"], correct: 0 },
        { question: "Which of these can help reduce flood risk?", answers: ["Urban Planning", "Ignoring Weather Warnings", "Building on Floodplains", "None of the Above"], correct: 0 },
        { question: "What should you do during a flood?", answers: ["Stay Indoors", "Drive Through Water", "Ignore Warnings", "Go to the River"], correct: 0 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60;

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showScore();
            }
        }, 1000);
    }

    function showQuestion() {
        const questionElement = document.getElementById('question');
        const answersElement = document.getElementById('answers');
        questionElement.innerText = questions[currentQuestionIndex].question;
        answersElement.innerHTML = '';

        questions[currentQuestionIndex].answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.className = 'answer button';
            button.onclick = () => checkAnswer(index);
            answersElement.appendChild(button);
        });

        document.getElementById('nextBtn').disabled = true;
        document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
        document.getElementById('submitBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].correct;
        if (selectedIndex === correctIndex) {
            score++;
        }
        const answerButtons = document.querySelectorAll('.answer');
        answerButtons.forEach((button, index) => {
            button.disabled = true;
            if (index === correctIndex) {
                button.classList.add('correct');
            } else if (index === selectedIndex) {
                button.classList.add('incorrect');
            }
        });

        document.getElementById('nextBtn').disabled = false;
    }

    document.getElementById('nextBtn').onclick = function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showScore();
        }
    };

    document.getElementById('prevBtn').onclick = function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    };

    document.getElementById('submitBtn').onclick = showScore;

    function showScore() {
        clearInterval(timer);
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
        document.getElementById('score').style.display = 'block';
    }

    startTimer();
    showQuestion();
});
