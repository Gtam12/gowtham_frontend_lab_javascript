


function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}


Question.prototype.isCorrect = function(choice)  {
     return choice === this.answer;
}



function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

// create questions here
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];


Quiz.prototype.getCurrentQuestion = function(){
    return this.questions[this.questionIndex];
}


Quiz.prototype.checkOptionWithAnswer  = function( answer) {
    if(this.getCurrentQuestion().isCorrect(answer)){
        this.score++;
    }
    this.questionIndex++
}


Quiz.prototype.isEnded = function(){
  return  this.questions.length === this.questionIndex+1;
}
var quiz = new Quiz(questions)



function showScore(){

    const ele = document.querySelector('.grid');

    const html = `
    <h1 > Results </h1>
    <div> 
        <p style="text-align: center">Current Score ${quiz.score}</p>
    </div> 
    `
    ele.innerHTML = html //("afterbegin", html)

}


function loadQuestion(){

    if(quiz.isEnded()){
        showScore();
        return;
    }


    const questionElement = document.querySelector('#question');
    questionElement.textContent  = quiz.getCurrentQuestion().text;
    for(let i=0;i<=3;i++){
        document.getElementById('choice'+i).textContent = quiz.getCurrentQuestion().choices[i]
        hanldeButtonClick('btn'+i,quiz.getCurrentQuestion().choices[i])
        showProgress();
    }

}



function hanldeButtonClick (btnId, choice){
    document.getElementById(btnId).onclick = function(){
        quiz.checkOptionWithAnswer(choice)
        loadQuestion();
    }
}



function showProgress(){
    document.querySelector('#progress').textContent = `Question  ${quiz.questionIndex+1} of ${quiz.questions.length}`
}

loadQuestion();
  