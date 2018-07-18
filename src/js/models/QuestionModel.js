export default class Question {
  constructor(storage, question, answer, result) {
    this.storage = storage;
    this.question = question;
    this.answer = answer;
    this.result = '';
    
    this.createQuestion();
  }

  createQuestion() {
    let limit, operation;

    if (this.storage.operations.length > 0) {
      operation = this.storage.operations[
        Math.floor(Math.random()*this.storage.operations.length)];
    } else {
      operation = this.storage.operations[0];
    }

    if (this.storage.difficulty === 'easy') {
      if (operation === 'multiplication') limit = 12
      else if (operation === 'division') limit = 6;
      else limit = 12;
    }
    else if (this.storage.difficulty === 'medium') {
      if (operation === 'multiplication') limit = 24
      else if (operation === 'division') limit = 12;
      else limit = 44;
    }
    else if (this.storage.difficulty === 'hard') {
      if (operation === 'multiplication') limit = 64
      else if (operation === 'division') limit = 24;
      else limit = 128;
    }

    function randomNumber(num) {
      num = Math.ceil(Math.random() * limit);
      return num;
    }

    let a;
    let b = randomNumber(b);
    if (operation == 3)
      a = randomNumber(a) * b;
    else a = randomNumber(a);

    if (operation === 'addition') {
      this.question = a + ' + ' + b + ' =';
      this.answer = a + b;
    }
    else if (operation === 'subtraction') {
      this.question = a + ' - ' + b + ' =';
      this.answer = a - b;
    }
    else if (operation === 'multiplication') {
      this.question = a + ` &#215; ` + b + ' =';
      this.answer = a * b;
    }
    else if (operation === 'division') {
      this.question = a + ` &#247; ` + b + ' =';
      this.answer = a / b;
    }
  }

  isCorrect(input) {
    this.result = this.question + ' ' + this.answer;
    if (input === this.answer) {
      return true;
    } else {
      return false;
    }
  }
}