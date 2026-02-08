const greetingText = `С днём рождения тебя 🎂
Я очень рад, что ты есть в моей жизни, даже несмотря на расстояние между нами.
Ты делаешь мои дни ярче, а настроение — лучше.
Желаю тебе улыбок, спокойствия внутри и чтобы всё, что ты хочешь — постепенно становилось реальностью.
И пусть этот маленький сайт будет напоминанием, что сегодня твой день 🙂

Знаешь… даже через расстояние ты каким-то образом делаешь мои дни теплее и спокойнее.
Иногда достаточно одного сообщения от тебя — и настроение уже другое.

Мне правда нравится, какая ты: твоя улыбка, твой характер, твои мысли…
И я рад, что среди миллионов людей мы однажды начали общаться и стали частью жизни друг друга.

Я хочу, чтобы ты чаще улыбалась, меньше переживала и всегда помнила, что ты очень особенная.
Пусть этот день будет наполнен теплом, вниманием и маленькими чудесами — потому что ты этого заслуживаешь.

И этот маленький сайт — просто напоминание о том, что сегодня твой день…
и где-то далеко есть человек, который искренне рад, что ты есть ❤️`;

document.getElementById('startBtn').addEventListener('click', function () {
    // 1. Launch Fireworks
    launchFireworks();
    launchSideCannons();

    // 2. Wait 3 seconds then transition
    setTimeout(() => {
        transitionToPage2();
    }, 3000);
});

// Initialize hearts on load
createHearts();

function createHearts() {
    const heartsContainer = document.body;
    for (let i = 0; i < 30; i++) { // Reduced count slightly as hearts are bigger
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
    }
}

function transitionToPage2() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

    // Fade out Page 1
    page1.classList.add('hidden');

    // Wait for fade out to complete (optional, or overlap slightly)
    setTimeout(() => {
        // Fade in Page 2
        page2.classList.remove('hidden');
        page2.classList.add('active');

        // Start Typewriter after a slight delay
        setTimeout(() => {
            typeWriter(greetingText, 'greeting-text', 1); // 50ms per char
        }, 1000);
    }, 1500); // 1.5s matches transition time
}

function typeWriter(text, elementId, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = ""; // Clear existing text

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);

            if (char === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += char;
            }

            i++;
            setTimeout(type, speed);
        } else {
            // Typing finished, show Next button
            const nextBtn = document.getElementById('nextBtn');
            nextBtn.classList.add('visible');
            nextBtn.addEventListener('click', transitionToPage3);
        }
    }

    type();
}

// Page 3 Logic
const reasons = [
    "Ты заставляешь меня улыбаться даже в плохие дни",
    "Твоя улыбка",
    "Мне нравится твоя смелость и уверенность",
    "Твоё понимание",
    "С тобой ооочень комфортно",
    "Ты вдохновляешь меня становиться лучше",
    "Твой смех",
    "Мне нравится, как ты заботишься обо мне",
    "Характер",
    "Твои глаза",
    "Ты даришь тепло, даже когда мы далеко друг от друга",
    "Ты умеешь превращать обычное в особенное",
    "С тобой каждый момент становится незабываемым",
    "Ты самая красивая как внутри, так и снаружи",
    "Твоя красота",
    "Твои слова всегда поддерживают и вдохновляют",
    "Ты умеешь быть сильной и нежной одновременно",
    "Твоё нытьё",
    "Твой стиль",
    "Твои привычки",
    "С тобой любое молчание приятно",
    "Ты меня любишь",
    "Твой маленький рост",
    "Ты — самый особенный человек в моей жизни ❤️"
];

function transitionToPage3() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');

    // Fade out Page 2
    page2.classList.remove('active');
    page2.classList.add('hidden');

    // Wait and Fade in Page 3
    setTimeout(() => {
        page3.classList.remove('hidden');
        page3.classList.add('active');
        generateCards();
    }, 1500);
}

function generateCards() {
    const grid = document.getElementById('reasonsGrid');
    grid.innerHTML = ''; // Clear existing

    // We want exactly 25 items in the grid
    // 24 Reasons + 1 Button
    for (let i = 0; i < 25; i++) {
        if (i < 24) {
            // Render Reason Card
            const reason = reasons[i];
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        Причина #${i + 1} ❤️
                    </div>
                    <div class="card-back">
                        ${reason}
                    </div>
                </div>
            `;

            card.addEventListener('click', function () {
                if (!this.classList.contains('flipped')) {
                    this.classList.add('flipped');
                    confetti({
                        particleCount: 30,
                        spread: 60,
                        origin: {
                            x: this.getBoundingClientRect().left / window.innerWidth,
                            y: this.getBoundingClientRect().top / window.innerHeight
                        },
                        zIndex: 2000 // Higher than modal
                    });
                }
            });

            grid.appendChild(card);
        } else {
            // Render "Next" Button in the 25th slot
            const nextBtnContainer = document.createElement('div');
            nextBtnContainer.classList.add('card'); // Use card class for layout
            nextBtnContainer.style.background = 'transparent';
            nextBtnContainer.style.boxShadow = 'none';
            nextBtnContainer.style.display = 'flex';
            nextBtnContainer.style.justifyContent = 'center';
            nextBtnContainer.style.alignItems = 'center';
            nextBtnContainer.style.cursor = 'default';

            const nextBtn = document.createElement('button');
            nextBtn.innerText = 'Дальше';
            nextBtn.id = 'finalNextBtn';
            nextBtn.style.padding = '15px 30px';
            nextBtn.style.fontSize = '1.2rem';
            nextBtn.style.borderRadius = '20px';
            nextBtn.style.background = '#ff6b6b';
            nextBtn.style.color = 'white';
            nextBtn.style.border = 'none';
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            nextBtn.style.transition = 'transform 0.2s';
            nextBtn.style.width = '100%';
            nextBtn.style.height = '100%'; // Fill the card slot

            nextBtn.onmouseover = () => nextBtn.style.transform = 'scale(1.05)';
            nextBtn.onmouseout = () => nextBtn.style.transform = 'scale(1)';

            nextBtn.addEventListener('click', function () {
                transitionToPage4();
            });

            nextBtnContainer.appendChild(nextBtn);
            grid.appendChild(nextBtnContainer);
        }
    }
}

// Quiz Data
const quizQuestions = [
    {
        question: "Вычисли: 12 × 8 - 45",
        options: ["51", "49", "55"],
        correct: 0
    },
    {
        question: "Реши уравнение: 3x + 7 = 19",
        options: ["4", "3", "5"],
        correct: 0
    },
    {
        question: "Найди площадь прямоугольника со сторонами 7 см и 5 см",
        options: ["35 см²", "12 см²", "30 см²"],
        correct: 0
    },
    {
        question: "Вычисли: 45 ÷ 9 + 6",
        options: ["11", "10", "9"],
        correct: 0
    },
    {
        question: "Как меня зовут?",
        options: ["Артем", "Амин", "Алексей"],
        correct: 1
    },
    {
        question: "Когда мой день рождения?",
        options: ["7 июля", "7 июня", "17 июня"],
        correct: 1
    },
    {
        question: "Какие у меня волосы?",
        options: ["Чёрные", "Рыжие", "Светлые"],
        correct: 0
    },
    {
        question: "Какие у меня глаза?",
        options: ["Зелёные", "Голубые", "Карие"],
        correct: 2
    },
    {
        question: "Какого я года рождения?",
        options: ["2010", "2009", "2008"],
        correct: 1
    },
    {
        question: "Как я тебя зову?",
        options: ["Дружок", "Солнышко, зайка", "Котик"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function transitionToPage4() {
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');

    // Fade out Page 3
    page3.classList.remove('active');
    page3.classList.add('hidden');

    // Wait and Fade in Page 4
    setTimeout(() => {
        page4.classList.remove('hidden');
        page4.classList.add('active');
        // Quiz starts automatically via HTML structure
    }, 1000);
}

// Quiz Functions
function startQuiz(isNo = false) {
    if (isNo) {
        alert("Ну надо! 😅");
    }
    document.getElementById('quizStart').classList.add('hidden');
    document.getElementById('quizQuestion').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('questionText').innerText = q.question;
    const optionsDiv = document.getElementById('answerOptions');
    optionsDiv.innerHTML = '';
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('feedback').innerText = '';

    // Create shuffled options (visually) but keep track of correct index
    // Simplified: Just render as is, user said "shuffled" but data has Correct at specific index.
    // Let's shuffle indices to map back.
    let indices = [0, 1, 2];
    indices.sort(() => Math.random() - 0.5);

    indices.forEach(index => {
        const btn = document.createElement('button');
        btn.innerText = q.options[index];
        btn.classList.add('quiz-btn');
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btn) {
    const q = quizQuestions[currentQuestion];
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden');

    // Disable all buttons
    const buttons = document.querySelectorAll('#answerOptions .quiz-btn');
    buttons.forEach(b => b.disabled = true);

    if (selectedIndex === q.correct) {
        score++;
        btn.classList.add('correct');
        feedback.innerText = "Правильно! 😄";
        feedback.style.color = "#4cd137";
        confetti({
            particleCount: 20,
            spread: 40,
            origin: { y: 0.6 }
        });
    } else {
        btn.classList.add('wrong');
        feedback.innerText = "Не совсем 😅, но всё равно люблю тебя ❤️";
        feedback.style.color = "#e84118";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

function showResult() {
    document.getElementById('quizQuestion').classList.add('hidden');
    document.getElementById('quizResult').classList.remove('hidden');

    const percentage = (score / quizQuestions.length) * 100;
    const resultText = document.getElementById('resultText');
    resultText.innerText = `Ты ответила правильно на ${score} из ${quizQuestions.length} вопросов (${percentage}%)`;

    if (percentage >= 70) {
        document.getElementById('resultTitle').innerText = "Молодец! 🎉";
        document.getElementById('surpriseContainer').classList.remove('hidden');
        document.getElementById('surpriseVideo').play();
        launchFireworks();
    } else {
        document.getElementById('resultTitle').innerText = "Почти получилось! 😉";
        resultText.innerText += "\nПодарок будет в следующем году... шучу! (или нет?)";
        document.getElementById('restartBtn').classList.remove('hidden');
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizStart').classList.remove('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
    document.getElementById('surpriseContainer').classList.add('hidden');
}

function launchSideCannons() {
    var end = Date.now() + (2 * 1000); // 2 seconds

    // go Buckeyes!
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 }, // Bottom left
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 }, // Bottom right
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function launchFireworks() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall, I want to start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
