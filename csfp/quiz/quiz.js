document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is the primary cause of floods?", answers: ["Heavy Rainfall", "Drought", "Earthquake", "Volcanic Eruption"], correct: 0 },
        { question: "Which of the following is a flood protection method?", answers: ["Building Dams", "Planting Trees", "Using Umbrellas", "Wearing Boots"], correct: 0 },
        { question: "What is a floodplain?", answers: ["An area prone to flooding", "A type of fish", "A flood prevention method", "A weather pattern"], correct: 0 },
        { question: "Which of these can help reduce flood risk?", answers: ["Urban Planning", "Ignoring Weather Warnings", "Building on Floodplains", "None of the Above"], correct: 0 },
        { question: "What should you do during a flood?", answers: ["Stay Indoors", "Drive Through Water", "Ignore Warnings", "Go to the River"], correct: 0 }
    ];

    let currentQ = 0;
    let score = 0;
    let timer;
    let timeLeft = 60;

    function startTime() {
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showScore();
            }
        }, 1000);
    }

    function showQ() {
        const quesElem = document.getElementById('question');
        const ansElem = document.getElementById('answers');
        quesElem.innerText = questions[currentQ].question;
        ansElem.innerHTML = '';

        questions[currentQ].answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.className = 'answer button';
            button.onclick = () => checkAns(index);
            ansElem.appendChild(button);
        });

        document.getElementById('nextBtn').disabled = true;
        document.getElementById('prevBtn').disabled = currentQ === 0;
        document.getElementById('submitBtn').style.display = currentQ === questions.length - 1 ? 'inline-block' : 'none';
    }

    function checkAns(selectInd) {
        const correctInd = questions[currentQ].correct;
        if (selectInd === correctInd) {
            score++;
        }
        const answerButtons = document.querySelectorAll('.answer');
        answerButtons.forEach((button, index) => {
            button.disabled = true;
            if (index === correctInd) {
                button.classList.add('correct');
            } else if (index === selectInd) {
                button.classList.add('incorrect');
            }
        });

        document.getElementById('nextBtn').disabled = false;
    }

    document.getElementById('nextBtn').onclick = function () {
        if (currentQ < questions.length - 1) {
            currentQ++;
            showQ();
        } else {
            showScore();
        }
    };

    document.getElementById('prevBtn').onclick = function () {
        if (currentQ > 0) {
            currentQ--;
            showQ();
        }
    };

    document.getElementById('submitBtn').onclick = showScore;

    function showScore() {
        clearInterval(timer);
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
        document.getElementById('score').style.display = 'block';
    }

    startTime();
    showQ();
});

