import { element } from '../models/ElementsModel';

export const questionView = {
  display: (question) => {
    element.question.innerHTML = question.question;
    element.result.innerHTML = question.result;
  }
}