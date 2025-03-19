import '../style/style.css';
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

        UI.toggleTaskListVisibility(tasks.length === 0);

        UI.attachEventListeners();
        CategoryUI.countCategoryTasks();
    }

    static addTask(event) {
        event.preventDefault();
        Element.get('title').focus();

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
            Log.notify(error.message, 'error');

            return;
        }

        if (task) {
            Tasks.addTask(task);
            LocalStorage.saveTasks();
            UI.toggleTaskListVisibility(Tasks.list.length === 0);

            const dataCategory = Element.get('task-list').getAttribute('data-category');
            if (dataCategory === 'all' || dataCategory === task.category) {
                UI.addTaskToList(task);      
                
                const currentElement = Element.get(`item-${task.id}`);
    
                Element.get(`item-delete-${task.id}`, currentElement).addEventListener('click', App.deleteTask);
                Element.get(`item-edit-${task.id}`, currentElement).addEventListener('click', (e) => Form.open(e, task));
                Element.get(`item-checkbox-${task.id}`).addEventListener('change', (e) => UI.toggleCheckbox(e));
                Element.get(`displaySecView-btn-${task.id}`).addEventListener('click', () => UI.toggleSecView(task));
            }

            Log.notify("Task added");

            // Reset title and description input fields
            Element.get('title').value = '';
            Element.get('description').value = '';

            // Update category items' count
            CategoryUI.countCategoryTasks();
        }
    }

    static deleteTask(event) {
        const taskId = Element.getIdFrom(event);
        const taskElement = Element.get(`item-${taskId}`);
        const taskName = Element.get(`item-title-${taskId}`).textContent;

        UI.removeTaskFromList(taskElement);
        Log.notify("Task Deleted");

        const undoBtn = UI.generateUndoBtn(taskName);

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
                UI.toggleTaskListVisibility(Tasks.list.length === 0);
                
                // Update category items' count
                CategoryUI.countCategoryTasks();
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

            // Update category items' count
            CategoryUI.countCategoryTasks();
        } catch (error) {
            Log.notify(error.message, 'error');
        }
    }
}