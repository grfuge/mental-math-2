export default class Storage {
  constructor(storage, score, operations, difficulty) {
    if (storage.length === 0) {
      this.default();
    } else {
      this.load();
    }
  }

  default() {
    this.score = {
      correct: 0,
      incorrect: 0
    }
    this.operations = ['addition'];
    this.difficulty = 'easy';
    this.update('score', this.score);
    this.update('operations', this.operations);
    this.update('difficulty', this.difficulty);
  }

  load() {
    this.score = JSON.parse(localStorage.getItem('score'));
    this.operations = JSON.parse(localStorage.getItem('operations'));
    this.difficulty = JSON.parse(localStorage.getItem('difficulty'));
  }

  update(item, storage) {
    localStorage.setItem(item, JSON.stringify(storage));
    this.load();
  }
}