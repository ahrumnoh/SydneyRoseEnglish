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
        choice1: "Where are you come from?",
        choice2: "Where you are come?",
        choice3: "Where did you coming?",
        choice4: "Where do you come from",
        answer: 4,    
    },
    {
        question: "Which one is correct?",
        choice1: "I was listening to Jazz when my mother are arriving.",
        choice2: "I listened to Jazz When my mother come home.",
        choice3: "I was listening to Jazz when my mother arrived.",
        choice4: "I was listened to Jaxx when my mother coming home.",
        answer: 3,    
    },
    {
        question: "What do you do?",
        choice1: "I am a dentist",
        choice2: "Linda is talking to James",
        choice3: "What is wrong?",
        choice4: "Yes, that is right. I am doing homework now",
        answer: 1,    
    },
    {
        question: "Which sentence is correct?",
        choice1: "coffee is drinking everyday.",
        choice2: "The door has been painted yesterday.",
        choice3: "The door broken, three days ago.",
        choice4: "Is the computer being repaired, now?",
        answer: 4,    
    },

    {
    //new insert, just in case, remove it
    question: "Which one is correct?",
    choice1: "i living in Sydney since 2 years ago",
    choice2: "Miranda have living in Sydney for 2 years ago",
    choice3: "Peter has lived in Sydney since he was 8 years old",
    choice4: "Amy has lived in Sydney since he was 3 years ago.",
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