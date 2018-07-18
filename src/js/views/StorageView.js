import { element } from '../models/ElementsModel';

export const storageView = {
  updateOperations: function(storage) {
    element.operations.forEach(operation => {
      operation.checked = false;
    });
    if (storage.operations.includes('addition'))
      element.operations[0].checked = true;
    if (storage.operations.includes('subtraction'))
      element.operations[1].checked = true;
    if (storage.operations.includes('multiplication'))
      element.operations[2].checked = true;
    if (storage.operations.includes('division'))
      element.operations[3].checked = true;
  }
}