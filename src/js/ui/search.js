import Tasks from '../core/tasks.js';
// eslint-disable-next-line import/no-cycle
import CategoryUI from './categoryUI.js';
import Element from './element.js';
import UI from './ui.js';

export default class Search {
  static task() {
    const searchContainer = Element.get('search-container');
    const input = Element.create('input', 'search-input', 'text');
    const taskList = Element.get('task-list');
    const placeholder = Element.get('list-placeholder'); // in case of 0 results

    input.placeholder = 'Enter task title';

    searchContainer.appendChild(input);
    input.focus();

    function removeInput() {
      if (input && input.parentElement) {
        // eslint-disable-next-line no-use-before-define
        input.removeEventListener('keypress', handleEnterKey);
        input.removeEventListener('blur', removeInput);
        input.remove();
      }
    }

    function handleEnterKey(event) {
      if (event.key === 'Enter') {
        taskList.setAttribute('data-search', 'true');
        const value = input.value.trim();

        if (!value) return;

        const searchResults = Tasks.filterByTitle(value);
        taskList.replaceChildren();

        if (searchResults.length === 0)
          placeholder.textContent = 'No matches found';
        UI.toggleTaskListVisibility(searchResults.length === 0);

        searchResults.forEach((task) => UI.addTaskToList(task));
        CategoryUI.updateCurrentCategorytitle(value);
        UI.attachEventListeners();
        removeInput(); // Ensure safe removal
      }
    }

    input.addEventListener('keypress', handleEnterKey);
    input.addEventListener('blur', removeInput);
  }
}
