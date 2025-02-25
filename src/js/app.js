import LocalStorage from "./core/localStorage.js"
import Task from "./core/task.js";
import Tasks from "./core/tasks.js";
import UI from "./ui/ui.js";
import Element from "./ui/element.js";


export default class App {
    static init() {
        const tasks = Tasks.list;
        const savedTasks = LocalStorage.loadTasks();
        
        savedTasks.forEach(task => Tasks.addTask(task));
        tasks.forEach(task => UI.addTaskToList(task));

        Element.get('open-dialog').addEventListener('click', App.openFormDialog);
        Element.get('confirm-dialog').addEventListener('click', App.addTask);

        UI.attachEventListeners();
    }

    static openFormDialog(event, editTask = null) {
        const dialog = Element.get('task-dialog');
        dialog.showModal();

        const confirmButton = Element.get('confirm-dialog');

        if (editTask) {
            Element.setValueOf("title", editTask.title);
            Element.setValueOf("description", editTask.description);
            Element.setValueOf('dueDate', editTask.dueDate.toISOString().split('T')[0]);
            Element.setValueOf("priority", editTask.priority);
            Element.setValueOf("status", editTask.status);

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
            
            Element.get('task-form').reset();
        }

        Element.get('close-dialog').addEventListener('click', () => dialog.close());

        Element.get('dueDate-today').addEventListener('click', (event) => {
            event.preventDefault();
            Element.setValueOf('dueDate', new Date().toISOString().split('T')[0]);
        });
    }

    static addTask(event) {
        event.preventDefault();

        const titleInput = Element.getValueOf("title");
        const descriptionInput = Element.getValueOf("description");
        const dueDateInput = Element.getValueOf("dueDate");
        const priorityInput = Element.getValueOf("priority");
        const statusInput = Element.getValueOf("status");

        let task;

        try {
            task = new Task(titleInput, descriptionInput, dueDateInput, priorityInput, statusInput);
        } catch (error) {
            Element.get('inputInfo').textContent = error.message;
            return;
        }

        if (task) {
            Tasks.addTask(task);
            LocalStorage.saveTasks();

            UI.addTaskToList(task);
            Element.get('inputInfo').textContent = "Task added";
            Element.get('task-form').reset();

            const currentElement = Element.get(`item-${task.id}`);

            Element.get('item-delete', currentElement).addEventListener('click', App.deleteTask);
            Element.get('item-edit', currentElement).addEventListener('click', (e) => App.openFormDialog(e, task));
            Element.get('item-checkbox', currentElement).addEventListener('change', (e) => UI.toggleCheckbox(e));
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
            task.title = Element.getValueOf("title");
            task.description = Element.getValueOf("description");
            task.dueDate = Element.getValueOf("dueDate");
            task.priority = Element.getValueOf("priority");
            task.status = Element.getValueOf("status");

            // Update UI
            UI.updateTaskInList(task);

            // Update in local storage
            Tasks.updateTask(task);
            LocalStorage.saveTasks();
            // Close dialog
            Element.get('task-dialog').close();
        } catch (error) {
            Element.get('inputInfo').textContent = error.message;
        }
    }
}