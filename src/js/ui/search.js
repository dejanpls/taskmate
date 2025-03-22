import Tasks from "../core/tasks.js";
import CategoryUI from "./categoryUI.js";
import Element from "./element.js";
import Log from "./log.js";
import UI from "./ui.js";

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
                searchResults.forEach(task => UI.addTaskToList(task));
                CategoryUI.updateCurrentCategorytitle(value);

                if (searchResults.length === 0) {
                    UI.toggleTaskListVisibility(taskList.childElementCount === 0);
                    placeholder.textContent = "No matches found";
                } else {
                    UI.attachEventListeners();
                }

                removeInput(); // Ensure safe removal
            }
        }

        input.addEventListener('keypress', handleEnterKey);
        input.addEventListener('blur', removeInput);
    }
}