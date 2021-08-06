const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []





//Setup Timer

var time=60;
var x=setInterval(function() {
    document.getElementById("timer-count").innerHTML="" + time ;
    time = time-1;

    if(time <0){
        clearInterval(x);
        return window.location.assign('./end.html');
    }
},1000);





let questions = [
    {
        question: "Which one is a right sentence grammatically?",
        choice1: "Shelly eating a apple.",
        choice2: "Paul speak english very well.",
        choice3: "Where are you going now?",
        choice4: "What is you do?",
        answer: 3,    
    },
    {
        question: "Which one is correct?",
        choice1: "James do met Linda yesterday.",
        choice2: "How many shoe do you have?",
        choice3: "I crying a lot last night",
        choice4: "I saw Jack in this morning.",
        answer: 4,    
    },
    {
        question: "Choose a right sentence",
        choice1: "I have not see Angela",
        choice2: "Have James gone?",
        choice3: "I have been here for a year.",
        choice4: "Miranda have talking to me.",
        answer: 3,    
    },
    {
        question: "Which sentence is correct?",
        choice1: "my key was founding yesterday.",
        choice2: "my key has been founded yesterday.",
        choice3: "my key was lost yesterday.",
        choice4: "my key losing yesterday.",
        answer: 3,    
    },

    {
    //new insert, just in case, remove it
    question: "Which one is correct?",
    choice1: "What is your job?",
    choice2: "Paul have living in Sydney for 2 years ago",
    choice3: "My teacher has lived in Sydney since he 8 years old",
    choice4: "Amy has lived in Sydney since 3 years ago.",
    answer: 1,    
}  

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5




startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}



choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
    
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame()