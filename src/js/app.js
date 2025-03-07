import LocalStorage from "./core/localStorage.js"
import Task from "./core/task.js";
import Tasks from "./core/tasks.js";
import UI from "./ui/ui.js";
import Element from "./ui/element.js";
import Form from "./ui/form.js";
import Log from "./ui/log.js";
import CategoryUI from "./ui/categoryUI.js";
import Category from "./core/category.js";

export default class App {
    static init() {
        const savedCategories = LocalStorage.loadCategories();
        savedCategories.forEach(category => {
            if (category !== 'default') Category.add(category);
        });

        Form.listCategories();
        CategoryUI.renderCategories();

        const tasks = Tasks.list;
        const savedTasks = LocalStorage.loadTasks();

        savedTasks.forEach(task => Tasks.addTask(task));
        tasks.forEach(task => UI.addTaskToList(task));

        UI.attachEventListeners();
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
            Log.notify(error.message);

            return;
        }

        if (task) {
            Tasks.addTask(task);
            LocalStorage.saveTasks();

            UI.addTaskToList(task);
            Log.notify("Task added");
            Element.get('task-form').reset();

            const currentElement = Element.get(`item-${task.id}`);

            Element.get('item-delete', currentElement).addEventListener('click', this.deleteTask);
            Element.get('item-edit', currentElement).addEventListener('click', (e) => Form.open(e, task));
            currentElement.querySelector('[id*="checkbox"]').addEventListener('change', (e) => UI.toggleCheckbox(e));
        }
    }

    static deleteTask(event) {
        const taskElement = event.target.parentElement;
        const taskName = Array.from(taskElement.childNodes)[1].textContent;

        UI.removeTaskFromList(taskElement);
        Log.notify("Task Deleted");

        const taskId = Element.getIdFrom(event);
        const undoBtn = Element.create('button', 'undoBtn');
        undoBtn.textContent = `Undo "${taskName}"?`;
        document.body.appendChild(undoBtn);

        let isUndone = false;

        undoBtn.addEventListener('click', () => {
            if (isUndone) return; // Prevent multiple restores
    
            Element.get('task-list').appendChild(taskElement);
            Log.notify("Task Undone");
    
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
        const previousCategory = task.category;

        try {
            task.title = Element.getValueOf("title");
            task.description = Element.getValueOf("description");
            task.dueDate = Element.getValueOf("dueDate");
            task.priority = Element.getValueOf("priority");
            task.status = Element.getValueOf("status");
            task.category = Element.getValueOf("category");

            // Update UI
            UI.updateTaskInList(task);

            // Remove from current category list if category updated
            if (previousCategory !== task.category) CategoryUI.filter(previousCategory);

            // Update in local storage
            Tasks.updateTask(task);
            LocalStorage.saveTasks();

            Log.notify("Task Updated");

            // Close dialog
            Element.get('task-dialog').close();
        } catch (error) {
            Log.notify(error.message);
        }
    }
}