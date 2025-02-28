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
        UI.listCategories();
    }

    static openFormDialog(event, editTask = null) {
        const dialog = Element.get('task-dialog');
        dialog.showModal();

        const confirmButton = Element.get('confirm-dialog');

        // Remove all previous event listeners before adding new ones
        confirmButton.replaceWith(confirmButton.cloneNode(true));
        const newConfirmButton = Element.get('confirm-dialog'); // Get the new cloned button
        
        // Define the event listener function
        function handleUpdateTask(e) {
            App.updateTask(e, editTask);
        }

        if (editTask) {
            Element.setValueOf("title", editTask.title);
            Element.setValueOf("description", editTask.description);
            Element.setValueOf('dueDate', editTask.dueDate.toISOString().split('T')[0]);
            Element.setValueOf("priority", editTask.priority);
            Element.setValueOf("status", editTask.status);
            Element.setValueOf("category", editTask.category);

            // Update button text
            newConfirmButton.textContent = "Update Task";
            
            // Add the event listener
            newConfirmButton.addEventListener('click', handleUpdateTask);
        } else {
            newConfirmButton.removeEventListener('click', handleUpdateTask); // Remove after execution
            newConfirmButton.textContent = "Add Task";
            newConfirmButton.addEventListener('click', App.addTask);

            // Reset the form for a new task
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
        const categoryInput = Element.getValueOf("category");

        let task;

        try {
            task = new Task(titleInput, descriptionInput, dueDateInput, priorityInput, statusInput, categoryInput);
        } catch (error) {
            UI.notify(error.message);

            return;
        }

        if (task) {
            Tasks.addTask(task);
            LocalStorage.saveTasks();

            UI.addTaskToList(task);
            UI.notify("Task added");
            Element.get('task-form').reset();

            const currentElement = Element.get(`item-${task.id}`);

            Element.get('item-delete', currentElement).addEventListener('click', App.deleteTask);
            Element.get('item-edit', currentElement).addEventListener('click', (e) => App.openFormDialog(e, task));
            Element.get('item-checkbox', currentElement).addEventListener('change', (e) => UI.toggleCheckbox(e));
        }
    }

    static deleteTask(event) {
        const taskElement = event.target.parentElement;
        const taskName = Array.from(taskElement.childNodes)[1].textContent;

        UI.removeTaskFromList(taskElement);
        UI.notify("Task Deleted");

        const taskId = Element.getIdFrom(event);
        const undoBtn = Element.create('button', 'undoBtn');
        undoBtn.textContent = `Undo "${taskName}"?`;
        document.body.appendChild(undoBtn);

        let isUndone = false;

        undoBtn.addEventListener('click', () => {
            if (isUndone) return; // Prevent multiple restores
    
            Element.get('task-list').appendChild(taskElement);
            UI.notify("Task Undone");
    
            isUndone = true;
            undoBtn.remove(); // Remove undo button after use
        });

        setTimeout(() => {
            if (!isUndone) {
                Tasks.removeTask(taskId); // Only remove if not undone
                LocalStorage.saveTasks();
            }
            undoBtn.remove(); // Remove undo button after timeout
        }, 5000);
    }

    static updateTask(event, task) {
        event.preventDefault();

        try {
            task.title = Element.getValueOf("title");
            task.description = Element.getValueOf("description");
            task.dueDate = Element.getValueOf("dueDate");
            task.priority = Element.getValueOf("priority");
            task.status = Element.getValueOf("status");
            task.category = Element.getValueOf("category");

            // Update UI
            UI.updateTaskInList(task);

            // Update in local storage
            Tasks.updateTask(task);
            LocalStorage.saveTasks();

            UI.notify("Task Updated");

            // Close dialog
            Element.get('task-dialog').close();
        } catch (error) {
            UI.notify(error.message);
        }
    }
}