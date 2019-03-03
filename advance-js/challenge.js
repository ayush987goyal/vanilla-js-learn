(function() {
  const Question = function(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  };

  Question.prototype.ask = function() {
    console.log(this.question);
    this.answers.forEach((ans, i) => {
      console.log(i + 1, ans);
    });
  };

  Question.prototype.checkAnswer = function(ans) {
    return this.correctAnswer === ans - 1;
  };

  const questionOne = new Question('What is my name?', ['Ayush', 'Kushal', 'Palash'], 0);
  const questionTwo = new Question('What is my age?', [20, 22, 23], 2);

  const questions = [questionOne, questionTwo];

  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }

  const keepScore = score();

  function askQuestion() {
    const question = questions[Math.floor(Math.random() * questions.length)];
    question.ask();
    const response = prompt('Please choose a option');

    if (response === 'exit') return;

    if (question.checkAnswer(+response)) {
      console.log('You are correct!');
      keepScore(true);
    } else {
      console.log('That is not correct');
    }

    displayScore();
    askQuestion();
  }

  function displayScore() {
    console.log('Your score is', keepScore(false));
    console.log('--------------------------------------');
  }

  askQuestion();
})();
