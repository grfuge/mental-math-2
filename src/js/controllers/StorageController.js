import { element } from '../models/ElementsModel';
import { questionView } from '../views/QuestionView';
import { storageView } from '../views/StorageView';

export const storageController = {
  init(storage, question) {
    element.score.correct.innerHTML = storage.score.correct;
    element.score.incorrect.innerHTML = storage.score.incorrect;
    storageView.updateOperations(storage);
    element.clearBtn.addEventListener('click', () => {
      storage.default();
      this.updateScore(storage, null);
    });
    element.difficulty.addEventListener('click', (e) => {
      if (e.target.value != storage.difficulty) {
        storage.update('difficulty', e.target.value);
        question.createQuestion();
        questionView.display(question);
      }
    });
    element.operations.forEach(operation => {
      operation.addEventListener('click', () => {
        storage.operations = [];
        element.operations.forEach((operation, i) => {
          if (operation.checked) {
            storage.operations.push(operation.value);
          }
        });
        if (storage.operations.length > 0) {
          storage.update('operations', storage.operations);
          question.createQuestion();
          questionView.display(question);
          storageView.updateOperations(storage);
        }
      });
    });
  },
  updateScore(storage, correct) {
    if (correct) {
      storage.score.correct++;
      element.score.correct.innerHTML = storage.score.correct;
    } else if (correct === false) {
      storage.score.incorrect++;
      element.score.incorrect.innerHTML = storage.score.incorrect;
    } else if (correct === null) {
      element.score.correct.innerHTML = storage.score.correct;
      element.score.incorrect.innerHTML = storage.score.incorrect;
    }
    storage.update('score', storage.score);
  }
}