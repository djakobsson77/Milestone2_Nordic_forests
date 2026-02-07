let facts = [
    {
        title: "Strawberries",
        content: "Strawberries wear their seeds on the outside — the only fruit that does!",
    },
    {
        title: "Berries",
        content: "Nearly all berries are self-pollinating. Scientifically, this means that a single berry flower has both the male and female parts. Hooray, you will only need one plant in order to produce fruit, which is great news for those of us who have smaller spaces to work with."
    },
    {
        title: "Fungus",
        content: "Without fungus, forests would be buried under dead organic matter; they act as the planet's primary recyclers."
    },
    {
        title: "Trees",
        content: "There are currently about 400 trees for every person on Earth."
    },
    {
        title: "Forests",
        content: "Forests act as natural water filters and 'air conditioners', releasing water into the atmosphere that triggers rain."
    }
];

let factsIndex = 0;
const factsContainer = document.getElementById("facts-container");
const btnsContainer = document.getElementById("buttons-container");
const newFactBtn = document.getElementsByClassName("btn-green");

function addFact() {
    const fact =facts[factsIndex];
const newFactElement = document.createElement("div");
newFactElement.classList.add("fact-card");
newFactElement.innerHTML = `<h5>${fact.title}</h5>
                            <p>${fact.content}</p>`;
factsContainer.appendChild(newFactElement);
factsIndex++;
if (factsIndex === facts.length) {
    btnsContainer.removeChild(newFactBtn[0]);
}
}

function clearAllFacts() {
    factsContainer.innerHTML = "";
    factsIndex = 0;
}

// Quiz Functionality
const questions = [
    {
        question: "1. Which of these is considered a true berry?",
        options: ["Strawberry", "Raspberry", "Blueberry"],
        correctAnswer: 2
    },
    {
        question: "2. True or false, fungi are plants?",
        options: ["False", "True"],
        correctAnswer: 0
    },
    {
        question: "3. What is the hardest wood in the world?",
        options: ["Lignum vitae", "While Balsa", "Ash"],
        correctAnswer: 0
    },
   {
        question: "4. How many countries share the Amazon Rainforest?",
        options: ["8", "5", "10"],
        correctAnswer: 0
    },
    {
        question: "5. What is the correct term for a scientist who studies fungi?",
        options: ["Fungialist", "Mycologist", "Geologist"],
        correctAnswer: 1
    },
    {
        question: "6. What is the most popular, widely consumed fungi in the world?",
        options: ["White button", "Chanterelle", "Mushroom"],
        correctAnswer: 0
    },
      {
        question: "7. What is the rarest berry in the world?",
        options: ["Gooseberry", "Cloudberry", "Lingonberry"],
        correctAnswer: 1
    },
    {
        question: "8. Which tree leaves are the symbol of the National Trust?",
        options: ["Pine", "Maple", "Oak"],
        correctAnswer: 2
    },
    {
        question: "9. Which is the largest rainforest in the world?",
        options: ["Sundaland rainforest", "Congo Basin rainforest", "Amazon rainforest"],
        correctAnswer: 2
    },
    {
        question: "10. Which berries are highest in antioxidants?",
        options: ["Wild strawberries", "Blueberries", "Lingonberries"],
        correctAnswer: 1
    },
    
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function initQuiz() {
    userAnswers = new Array(questions.length).fill(null);
    displayQuestion();
    updateButtonStates();
}

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    document.getElementById('questionCount').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        
        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    updateProgressBar();
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    displayQuestion();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateButtonStates();
    } else {
        completeQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateButtonStates();
    }
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'Submit';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function completeQuiz() {
    // Calculate score
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
            score++;
        }
    });
    
    // Show results
    document.getElementById('questionContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('percentage').textContent = Math.round((score / questions.length) * 100);
    
    // Hide footer
    document.querySelector('.quiz-footer').classList.add('hidden');
}

// Initialize quiz on page load
window.addEventListener('DOMContentLoaded', initQuiz);
