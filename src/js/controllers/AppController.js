import Storage from '../models/StorageModel';
import Question from '../models/QuestionModel';
import { questionView } from '../views/QuestionView';
import { questionController } from '../controllers/QuestionController';
import { storageController } from '../controllers/storageController';

(function appController() {
  const storage = new Storage(localStorage);
  const question = new Question(storage);
  
  questionView.display(question);
  questionController.watchInput(storage, question);
  storageController.init(storage, question);
})();