import { Finish } from "./finish.js";

export class Quiz {
    constructor(apiQuestion) {
        this.questions = apiQuestion;
        this.currentQuestion = 0;
        this.score = 0;
        this.questionsLength = this.questions.length;
        this.showQuestion();
        this.nextBtn = document.getElementById("next");
    
        this.nextBtn.addEventListener("click", () => {
            this.nextQuestion();
        });
    }
    

    shuffle(array) {
        let currentIndex = array.length;
             // While there remain elements to shuffle...
            while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }

    showQuestion() {
        // Display Questions
        document.querySelector("#currentQuestion").innerHTML = this.currentQuestion + 1;
        document.querySelector("#totalNumberOfQuestions").innerHTML = this.questionsLength;
        document.querySelector("#question").innerHTML = this.questions[this.currentQuestion].question;
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let inCorrectAnswer = this.questions[this.currentQuestion].incorrect_answers;
        // Array of Answers
        let answers = [correctAnswer , ...inCorrectAnswer];
        // shuffle Answers
        this.shuffle(answers)
        let box = ``;
        for(let i = 0; i < answers.length; i++) {
            box += `
                <div class="form-check ms-2">
                    <label class="form-check-label mb-1">
                        <input type="radio" class="form-check-input" name="answers" value="${answers[i]}">
                        ${answers[i]}
                    </label>
                </div>
            `;
        }
        document.querySelector("#rowAnswer").innerHTML = box;
    }

    nextQuestion() {
        // Ensure the current question is not undefined
        if (this.currentQuestion < this.questionsLength) {
            let correctAnswer = this.questions[this.currentQuestion]?.correct_answer;
            let userAnswerElement = Array.from(document.getElementsByName("answers")).find(element => element.checked);
            
            // Check if the user has selected answer
            if (userAnswerElement != undefined) {
                let userAnswer = userAnswerElement.value;
                
                // Check if the answer is correct
                this.checkUserAnswer(userAnswer, correctAnswer);
                this.currentQuestion++;
                $("#alert").fadeOut(0);
                
                // Check the length of questions and move to the result 
                if (this.currentQuestion < this.questionsLength) {
                    this.showQuestion();
                } else {
                    $("#quiz").fadeOut(1000, function() {
                        $("#finish").fadeIn(500);
                    });
                    let results = new Finish(this.score);
                }
            } else {
                $("#alert").fadeIn(500);
            }
        } else {
            // Handle the case when no question is available
            console.error("Error: No question found at index");
        }
    }
    

    checkUserAnswer(userAnswer , correctAnswer) {
        if(userAnswer == correctAnswer) {
            $("#Correct").fadeIn(500).fadeOut(300);
            this.score++
        }else {
            $("#inCorrect").fadeIn(500).fadeOut(300);
        }
    }
}

