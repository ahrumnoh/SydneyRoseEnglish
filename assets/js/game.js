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
        choice1: "Shelly is eat a banana.",
        choice2: "Miranda does eating a banana.",
        choice3: "Where did you going?",
        choice4: "What color do you like?",
        answer: 4,    
    },
    {
        question: "Which one is correct?",
        choice1: "James is late yesterday.",
        choice2: "Did Miranda call me when James was watch TV?",
        choice3: "I was happy when Jack phoned me",
        choice4: "Did you sure?",
        answer: 3,    
    },
    {
        question: "Where is the station?",
        choice1: "I was listening to K-pop, now",
        choice2: "It is next to the hospital.",
        choice3: "hahahaha, yes, I am hungry?",
        choice4: "Are you sure?? I don't think so.",
        answer: 2,    
    },
    {
        question: "Which sentence is correct?",
        choice1: "my key was found yesterday.",
        choice2: "my key has been found yesterday.",
        choice3: "my key was being find yesterday.",
        choice4: "my key found yesterday.",
        answer: 1,    
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