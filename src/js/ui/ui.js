import { format } from 'date-fns';
import Tasks from "../core/tasks.js";
import LocalStorage from '../core/localStorage.js';
import App from "../app.js";
import Element from './element.js';
import Form from './form.js';
import CategoryUI from './categoryUI.js';
import Search from './search.js';

export default class UI {
    static addTaskToList(task) {

        const list = Element.get('task-list');

        const item = Element.create('li', `item-${task.id}`);

        const checkbox = Element.create('input', `item-${task.id}-checkbox`, 'checkbox');
        checkbox.checked = task.status === 'completed';

        const title = Element.create('h3', `item-${task.id}-title`);
        title.textContent = task.title;

        const description = Element.create('p', `item-${task.id}-description`);
        description.textContent = task.description;

        const category = Element.create('p', `item-${task.id}-category`);
        category.textContent = task.category;

        const dueDate = Element.create('p', `item-${task.id}-dueDate`);
        dueDate.textContent = UI.formatDueDate(task.dueDate);

        const priority = Element.create('p', `item-${task.id}-priority`);
        priority.textContent = task.priority;

        const status = Element.create('p', `item-${task.id}-status`);
        status.textContent = task.status;

        item.appendChild(checkbox);
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(category);
        item.appendChild(dueDate);
        item.appendChild(priority);
        item.appendChild(status);

        const deleteBtn = Element.create('button', 'item-delete');
        deleteBtn.textContent = "X";

        const editBtn = Element.create('button', 'item-edit');
        editBtn.textContent = "Edit";

        item.appendChild(deleteBtn);
        item.appendChild(editBtn);

        list.appendChild(item); // Append li to the ui
    }

    static updateTaskInList(task) {
        const taskElement = Element.get(`item-${task.id}`);

        if (!taskElement) return;

        Element.get(`item-${task.id}-checkbox`, taskElement).checked = task.status === 'completed';

        Element.get(`item-${task.id}-title`, taskElement).textContent = task.title;
        Element.get(`item-${task.id}-description`, taskElement).textContent = task.description;
        Element.get(`item-${task.id}-dueDate`, taskElement).textContent = UI.formatDueDate(task.dueDate);
        Element.get(`item-${task.id}-priority`, taskElement).textContent = task.priority;
        Element.get(`item-${task.id}-status`, taskElement).textContent = task.status;
        Element.get(`item-${task.id}-category`, taskElement).textContent = task.category;

    }

    static removeTaskFromList(taskElement) {
        taskElement.remove();
    }

    static formatDueDate(dueDate) {
        if (!dueDate) return '';

        const date = new Date(dueDate);
        return format(date, "MMMM do"); // Example: "February 23rd"
    }

    static toggleCheckbox(event) {
        const taskId = Element.getIdFrom(event);
        const task = Tasks.findTaskById(taskId);

        task.status = event.target.checked ? 'completed' : 'pending';

        UI.updateTaskInList(task);
        LocalStorage.saveTasks();
    }

    static renderTasks() {
        const taskList = Element.get('task-list');
        // If all elements rendered, do not render tasks again
        if (taskList.getAttribute('data-category') != 'all' || taskList.childElementCount !== Tasks.list.length) {
            taskList.setAttribute('data-search', 'false');
            taskList.setAttribute('data-category', 'all');
            taskList.replaceChildren();
            Tasks.list.forEach(task => UI.addTaskToList(task));
        }
        UI.attachEventListeners();
    }

    static toggleSidebar() {
        const sidebar = Element.get('sidebar-container')
        const sidebarOpen = sidebar.getAttribute('data-open');

        if (sidebarOpen === 'true') {
            sidebar.setAttribute('data-open', 'false');
            sidebar.classList.add('closed');
            Element.get('sidebar-toggle').textContent = 'menu';
        } else {
            sidebar.setAttribute('data-open', 'true');
            sidebar.classList.remove('closed');
            Element.get('sidebar-toggle').textContent = 'menu_open';
        }
    }

    static generateUndoBtn(taskName) {
        const undoBtn = Element.create('button', `undoBtn-${taskName}`);
        undoBtn.textContent = `Undo "${taskName}"?`;
        Element.get('undo-container').appendChild(undoBtn);
        return undoBtn;
    }

    static attachEventListeners() {

        Element.get('sidebar-toggle').addEventListener('click', UI.toggleSidebar);
        Element.get('search-task').addEventListener('click', Search.task);

        Element.get('open-dialog').addEventListener('click', Form.open);
        Element.get('confirm-dialog').addEventListener('click', App.addTask);
        Element.get('add-category').addEventListener('click', CategoryUI.addNewCategory);

        Element.get('show-tasks').removeEventListener('click', UI.renderTasks);
        Element.get('show-tasks').addEventListener('click', UI.renderTasks);

        // Task Edit Button
        Element.getAll('item-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = Element.getIdFrom(e);
                const task = Tasks.findTaskById(taskId);
                Form.open(e, task); // Open dialog with task details
            });
        });

        // Task Delete Button
        Element.getAll('item-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                App.deleteTask(e);
            });
        });

        // Task Checkbox Button
        document.querySelectorAll('[id*="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                UI.toggleCheckbox(e);
            });
        });
    }
}