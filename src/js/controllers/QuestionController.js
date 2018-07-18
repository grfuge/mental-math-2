import { element } from '../models/ElementsModel';
import { questionView } from '../views/QuestionView';
import { storageController } from './StorageController';

export const questionController = {
  watchInput: (storage, question) => {
    element.answer.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
          storageController.updateScore(
            storage, question.isCorrect(parseInt(element.answer.value)));
        element.answer.value = null;
        question.createQuestion();
        questionView.display(question);
      }
    });
  }
}