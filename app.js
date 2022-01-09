// constants
const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const questionContainerElement = document.querySelector('#question-container');
let shuffledQuestions, currentQuestionIndex;
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-buttons');
// eventlisteners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})


// functions
function startGame() {
   startButton.classList.add('hide');
   shuffledQuestions = questions.sort(() => Math.random() - .5);
   currentQuestionIndex = 0;
   questionContainerElement.classList.remove('hide');
   setNextQuestion();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
 if (shuffledQuestions.length > currentQuestionIndex + 1 ){
        nextButton.classList.remove('hide');
 } else {
     startButton.innerText = 'Restart';
     startButton.classList.remove('hide');
 }
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
} else {
    element.classList.add('wrong')
}
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
// questions

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4', correct: true},
            {text: '6', correct: false},
            {text: '2', correct: false},
            {text: '5', correct: false}
        ]
    },
    {
        question: 'Where is Big Ben?' ,
        answers: [
            {text: 'Paris', correct: false},
            {text: 'New York', correct: false},
            {text: 'London', correct: true},
            {text: 'Pittsburg', correct: false}
        ]

    },
    {
        question: 'What colour is the sky?',
        answers: [
            {text: 'purple', correct: false},
            {text: 'green', correct: false},
            {text: 'red', correct: false},
            {text: 'blue', correct: true}
        ]
    },
    {
        question: 'How old is Kent?',
        answers: [
            {text: '53', correct: true},
            {text: 'It does not matter', correct: true},
            {text: 'He feels young!!!', correct: true},
            {text: 'Just old enough', correct: true}
        ]
    }
]