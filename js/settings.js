import { Quiz } from "./quiz.js";

export class Settings {
    constructor() {
        this.chooseCategory = document.getElementById("category");
        this.chooseDifficulty = document.getElementsByName("difficulty");
        this.numberOfQuestions = document.getElementById("numberOfQuestions");
        this.startBtn = document.getElementById("startBtn")

        this.startBtn.addEventListener("click", () => {
            this.startQuiz();
        });
        
    }
    


    async startQuiz() {
        let category = this.chooseCategory.value;
        let difficulty = Array.from(this.chooseDifficulty).find(ele => ele.checked).value
        let numberOfQuestions = this.numberOfQuestions.value;
        if(numberOfQuestions != "") {
            let  quizApi  = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
            let questions = await this.getQuizApi(quizApi);
            // Remove Alert Message
            $("#questionsAlert").fadeOut(100);
            // Hide settings And go to Quiz
            $("#settings").fadeOut(500 , function(){
                $("#quiz").fadeIn(500)
            })
            // Call and Send Question to Quiz
            let quiz = new Quiz(questions);
        }else {
            // Add alert Message
            $("#questionsAlert").fadeIn(500);
        }
    }

    async getQuizApi(quizApi) {
        let apiResponse = await fetch(quizApi);
        let apiFinalResponse = await apiResponse.json();
        return apiFinalResponse.results
    }
}
