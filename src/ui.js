import { format } from 'date-fns';
import Tasks from './tasks.js';
import LocalStorage from './localStorage.js';
import App from "./app.js";

export default class UI {
    static addTaskToList(task) {

        const list = UI.getElement('task-list');

        const item = UI.createElement('li', `item-${task.id}`);

        const checkbox = UI.createElement('input', 'item-checkbox');
        checkbox.type = 'checkbox';

        checkbox.checked = task.status === 'completed';

        const title = UI.createElement('h3', 'item-title');
        title.textContent = task.title;

        const description = UI.createElement('p', 'item-description');
        description.textContent = task.description;

        const dueDate = UI.createElement('p', 'item-dueDate');
        dueDate.textContent = UI.formatDueDate(task.dueDate);

        const priority = UI.createElement('p', 'item-priority');
        priority.textContent = task.priority;

        const status = UI.createElement('p', 'item-status');
        status.textContent = task.status;

        item.appendChild(checkbox);
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(dueDate);
        item.appendChild(priority);
        item.appendChild(status);

        const deleteBtn = UI.createElement('button', 'item-delete');
        deleteBtn.textContent = "X";

        const editBtn = UI.createElement('button', 'item-edit');
        editBtn.textContent = "Edit";

        item.appendChild(deleteBtn);
        item.appendChild(editBtn);

        list.appendChild(item); // Append li to the ui
    }

    static updateTaskInList(task) {
        const taskElement = UI.getElement(`item-${task.id}`);

        if (!taskElement) return;

        taskElement.querySelector('#item-title').textContent = task.title;
        taskElement.querySelector('#item-description').textContent = task.description;
        taskElement.querySelector('#item-dueDate').textContent = UI.formatDueDate(task.dueDate);
        taskElement.querySelector('#item-priority').textContent = task.priority;
        taskElement.querySelector('#item-status').textContent = task.status;
    }

    static removeTaskFromList(taskElement) {
        taskElement.remove();
    }

    static getElement(elementId) {
        return document.getElementById(elementId);

    }

    static createElement(element, id) {
        const el = document.createElement(element);
        el.id = id;
        return el;
    }

    static getValueOf(elementId) {
        return UI.getElement(elementId).value.trim();
    }

    static setValueOf(elementId, val) {
        return UI.getElement(elementId).value = val;
    }

    static getIdFrom(event) {
        return event.target.parentElement.id.split("-")[1];
    }

    static formatDueDate(dueDate) {
        if (!dueDate) return '';

        const date = new Date(dueDate);
        return format(date, "MMMM do"); // Example: "February 23rd"
    }

    static toggleCheckbox(event) {
        const taskId = UI.getIdFrom(event);
        const task = Tasks.findTaskById(taskId);

        task.status = event.target.checked ? 'completed' : 'pending';

        UI.updateTaskInList(task);
        LocalStorage.saveTasks();
    }

    static attachEventListeners() {
        document.querySelectorAll('#item-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = UI.getIdFrom(e); // Assuming tasks have unique IDs
                const task = Tasks.findTaskById(taskId);
                App.openFormDialog(e, task); // Open dialog with task details
            });
        });

        document.querySelectorAll('#item-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                App.deleteTask(e);
            });
        });
        
        document.querySelectorAll('#item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                UI.toggleCheckbox(e);
            });
        });
    }
}