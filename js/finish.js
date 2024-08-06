export class Finish {
    constructor(quizScore) {
        document.querySelector("#score").innerHTML = quizScore;
        this.tryBtn = document.querySelector("#tryBtn")
        this.tryBtn.addEventListener("click" , () => {
            this.tryAgain();
        })
    }
    
    tryAgain() {
        $("#finish").fadeOut(500 , function () {
            $("#settings").fadeIn(500);
        })
        $("#category option:eq(0)").prop("selected",true);
        document.querySelector("#numberOfQuestions").value = "";
        $("#easy").prop("checked",true);
    }
}
