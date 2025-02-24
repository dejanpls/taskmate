import LocalStorage from './localStorage.js';
import Task from './task.js';
import Tasks from './tasks.js';
import UI from "./ui.js";

export default class App {
    static init() {
        const tasks = Tasks.list;
        const savedTasks = LocalStorage.loadTasks();
        
        savedTasks.forEach(task => Tasks.addTask(task));
        tasks.forEach(task => UI.addTaskToList(task));

        UI.getElement('open-dialog').addEventListener('click', App.openFormDialog);
        UI.getElement('confirm-dialog').addEventListener('click', App.addTask);

        UI.attachEventListeners();
    }

    static openFormDialog(event, editTask = null) {
        const dialog = UI.getElement('task-dialog');
        dialog.showModal();

        const confirmButton = UI.getElement('confirm-dialog');

        if (editTask) {
            UI.setValueOf("title", editTask.title);
            UI.setValueOf("description", editTask.description);
            UI.setValueOf('dueDate', new Date().toISOString().split('T')[0]);
            UI.setValueOf("priority", editTask.priority);
            UI.setValueOf("status", editTask.status);

            // Change confirm button behavior to update instead of add
            confirmButton.removeEventListener('click', App.addTask);
            confirmButton.textContent = "Update Task";
            
            const newConfirmButton = confirmButton.cloneNode(true);
            confirmButton.replaceWith(newConfirmButton);

            // Now add a fresh event listener
            newConfirmButton.addEventListener('click', (e) => App.updateTask(e, editTask));
        } else {
            confirmButton.removeEventListener('click', (e) => App.updateTask(e, editTask));
            confirmButton.textContent = "Add Task";

            const newConfirmButton = confirmButton.cloneNode(true);
            confirmButton.replaceWith(newConfirmButton);

            newConfirmButton.addEventListener('click', App.addTask);
            
            UI.getElement('task-form').reset();
        }

        UI.getElement('close-dialog').addEventListener('click', () => dialog.close());

        UI.getElement('dueDate-today').addEventListener('click', (event) => {
            event.preventDefault();
            UI.setValueOf('dueDate', new Date().toISOString().split('T')[0]);
        });
    }

    static addTask(event) {
        event.preventDefault();

        const titleInput = UI.getValueOf("title");
        const descriptionInput = UI.getValueOf("description");
        const dueDateInput = UI.getValueOf("dueDate");
        const priorityInput = UI.getValueOf("priority");
        const statusInput = UI.getValueOf("status");

        let task;

        try {
            task = new Task(titleInput, descriptionInput, dueDateInput, priorityInput, statusInput);
        } catch (error) {
            UI.getElement('inputInfo').textContent = error.message;
            return;
        }

        if (task) {
            Tasks.addTask(task);
            LocalStorage.saveTasks();

            UI.addTaskToList(task);
            UI.getElement('inputInfo').textContent = "Task added";
            UI.getElement('task-form').reset();

            const currentElement = UI.getElement(`item-${task.id}`);

            currentElement.querySelector('#item-delete').addEventListener('click', App.deleteTask);
            currentElement.querySelector('#item-edit').addEventListener('click', (e) => App.openFormDialog(e, task));
            currentElement.querySelector('#item-checkbox').addEventListener('change', (e) => UI.toggleCheckbox(e));
        }
    }

    static deleteTask(event) {
        UI.removeTaskFromList(event.target.parentElement);
        Tasks.removeTask(UI.getIdFrom(event));
        LocalStorage.saveTasks(); // Save updated list
    }

    static updateTask(event, task) {
        event.preventDefault();

        try {
            task.title = UI.getValueOf("title");
            task.description = UI.getValueOf("description");
            task.dueDate = UI.getValueOf("dueDate");
            task.priority = UI.getValueOf("priority");
            task.status = UI.getValueOf("status");

            // Update UI
            UI.updateTaskInList(task);

            // Update in local storage
            Tasks.updateTask(task);
            LocalStorage.saveTasks();
            // Close dialog
            UI.getElement('task-dialog').close();
        } catch (error) {
            UI.getElement('inputInfo').textContent = error.message;
        }
    }
}