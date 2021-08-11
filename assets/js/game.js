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
        choice1: "Shelly has a problems.",
        choice2: "Paul speaking English very well.",
        choice3: "Have you be Canada, before?",
        choice4: "What color is your car",
        answer: 4,    
    },
    {
        question: "Which one is correct?",
        choice1: "James did not meet Brian yesterday.",
        choice2: "How old you are?",
        choice3: "I have not finish my homework, yet",
        choice4: "Are you student?",
        answer: 1,    
    },
    {
        question: "Choose a right sentence!",
        choice1: "I staying at home tonight.",
        choice2: "Jerry will probably be on the beach tomorrow.",
        choice3: "I does not think Kelly will pass the exam",
        choice4: "James used to swimming every day.",
        answer: 2,    
    },
    {
        question: "Which sentence is correct?",
        choice1: "Where are you come from?",
        choice2: "Tom's father are in hospital.",
        choice3: "My teacher is very kind.",
        choice4: "my key losing yesterday.",
        answer: 3,    
    },

    {
    //new insert, just in case, remove it
        question: "I have to waering glasses",
        choice1: "The office cleaned yesterday",
        choice2: "Are these rooms painting every day?",
        choice3: "Do you always get up early?",
        choice4: "Maria speaking four languages.",
        answer: 3,    
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