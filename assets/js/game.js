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

var time=600;
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
        question: "다음 중 변형3타가 아닌 것은? ",
        choice1: "participate",
        choice2: "refuse",
        choice3: "forget",
        choice4: "ask",
        answer: 1,    
    },
    {
        question: "Please pick a correct sentence",
        choice1: "Lisa has arrived 10 minutes ago",
        choice2: "I was calling to Tom when James and Miranda were arrival using the train near the station",
        choice3: "Did you playing the soccer?",
        choice4: "James prefers to drink a cup of coffee every morning ",
        answer: 4,    
    },
    {
        question: "변형1자가 아닌것은?",
        choice1: "Explode",
        choice2: "belong",
        choice3: "comply",
        choice4: "look",
        answer: 1,    
    },
    {
        question: "순수1자가 아닌것은?",
        choice1: "leave",
        choice2: "Become",
        choice3: "wait",
        choice4: "Agree",
        answer: 3,    
    },
    {
        question: "4타 + '시.수.태', 두 가지 조건을 만족시키는 것을 고르시오",
        choice1: "I was listening Jazz every single day",
        choice2: "Tom gave a gift to me yesterday",
        choice3: "My parents watching TV when Jack calling us last night",
        choice4: "Brian gave me a cup of coffee at the ST store last night",
        answer: 4,    
    },
    {
        question: "Please find a correct irregular verb format?",
        choice1: "run - run - run",
        choice2: "break - broke - broken",
        choice3: "fall - fell - falling",
        choice4: "eat - ate- eaten",
        answer: 4,    
    },
    {
        question: "Please find a correct sentence",
        choice1: "David just arrived",
        choice2: "David has just arrived",
        choice3: "David has just been arriving",
        choice4: "David has just arriving",
        answer: 2,    
    },
    {
        question: "변형1자가 아닌것은?",
        choice1: "turn",
        choice2: "belong",
        choice3: "need",
        choice4: "deal",
        answer: 3,    
    },
    {
        question: "Past-Present의 3번째 용법을 고르시오",
        choice1: "The computer has been repaired for an hour",
        choice2: "Jack has built his first computing protocol for data science since last year ",
        choice3: "We have just moved here",
        choice4: "look! Charlie has arrived now!",
        answer: 2,    
    },
    {
        question: "일반3타를 고르시오",
        choice1: "I study English",
        choice2: "Jane is 18 years old",
        choice3: "Do I need to find a job?",
        choice4: "What is wrong?",
        answer: 1,    
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10




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