import { format } from 'date-fns';
import Tasks from "../core/tasks.js";
import LocalStorage from '../core/localStorage.js';
import App from "../app.js";
import Element from './element.js';
import Form from './form.js';
import CategoryUI from './categoryUI.js';
import Search from './search.js';
import Log from './log.js';

export default class UI {
    static addTaskToList(task) {

        const list = Element.get('task-list');

        const item = Element.create('li', `item-${task.id}`);
        
        // Category Container
        const categoryContainer = Element.create('div', `category-container-${task.id}`);

        const category = Element.create('p', `item-${task.id}-category`);
        category.textContent = task.category;

        // View Wrapper
        const viewWrapper = Element.create('div', `view-wrapper-${task.id}`);

        // Main View Container
        const mainView = Element.create('div', `main-view-${task.id}`);

        // Details Container
        const details = Element.create('div', `item-details-${task.id}`);
        const checkbox = Element.create('input', `item-${task.id}-checkbox`, 'checkbox');
        checkbox.checked = task.status === 'completed';

        const title = Element.create('h3', `item-${task.id}-title`);
        title.textContent = task.title;

        // Date Container
        const dateContainer = Element.create('div', `date-container-${task.id}`);
        const dateIcon = Element.create('div', `date-icon-${task.id}`);
        dateIcon.className = 'material-icons';
        dateIcon.textContent = 'schedule';

        const dueDate = Element.create('p', `item-${task.id}-dueDate`);
        dueDate.textContent = UI.formatDueDate(task.dueDate);

        // Secondary View Container
        const secondaryView = Element.create('div', `sec-view-${task.id}`);
        // secondaryView.style.display = 'none'; 

        // Notification Container
        const notificationContainer = Element.create('div', `not-container-${task.id}`);

        // Priority Container
        const priorityContainer = Element.create('div', `priority-container-${task.id}`);
        const priorityIcon = Element.create('div', `priority-icon-${task.id}`);
        priorityIcon.className = 'material-icons';
        priorityIcon.textContent = 'notification_important';

        const priority = Element.create('p', `item-${task.id}-priority`);
        priority.textContent = task.priority;

        // Status Container
        const statusContainer = Element.create('div', `status-container-${task.id}`);
        const statusIcon = Element.create('div', `status-icon-${task.id}`);
        statusIcon.className = 'material-icons';
        statusIcon.textContent = 'stars';
        
        const status = Element.create('p', `item-${task.id}-status`);
        status.textContent = task.status;
        
        const description = Element.create('p', `item-${task.id}-description`);
        description.textContent = task.description;   

        categoryContainer.appendChild(category)
        item.appendChild(categoryContainer);

        details.appendChild(checkbox);
        details.appendChild(title);
        mainView.appendChild(details);

        dateContainer.appendChild(dateIcon);
        dateContainer.appendChild(dueDate);
        mainView.appendChild(dateContainer);
        
        priorityContainer.appendChild(priorityIcon);
        priorityContainer.appendChild(priority);
        notificationContainer.appendChild(priorityContainer);

        statusContainer.appendChild(statusIcon);
        statusContainer.appendChild(status);
        notificationContainer.appendChild(statusContainer);

        secondaryView.appendChild(notificationContainer);
        secondaryView.appendChild(description);
        
        viewWrapper.appendChild(mainView);
        viewWrapper.appendChild(secondaryView);

        item.appendChild(viewWrapper);

        // Button Container
        const btnContainer = Element.create('div', `btn-container-${task.id}`);

        const deleteBtn = Element.create('button', 'item-delete');
        deleteBtn.className = 'material-icons';
        deleteBtn.textContent = "delete";

        const editBtn = Element.create('button', 'item-edit');
        editBtn.className = 'material-icons'
        editBtn.textContent = "more_vert";

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        viewWrapper.appendChild(btnContainer);

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
        taskElement.parentElement.parentElement.remove();
    }

    static formatDueDate(dueDate) {
        if (!dueDate) return '';

        const date = new Date(dueDate);
        return format(date, "MMMM do"); // Example: "February 23rd"
    }

    static toggleCheckbox(event) {
        const taskId = event.target.id.split('-')[1];
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
            CategoryUI.updateCurrentCategorytitle();
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
        const undoBtn = Element.create('button', `undoBtn-${UI.generateId('undo-container')}`);
        undoBtn.textContent += `Undo "${Log.truncate(taskName, 10)}"?`;

        Element.get('undo-container').appendChild(undoBtn);
        return undoBtn;
    }

    static generateInputInfo(message, status) {
        const inputInfo = Element.create('div', `info-${UI.generateId('input-info-container')}`);

        if (status !== 'success') inputInfo.style.background = '#ad2831';
        else inputInfo.style.background = '#2d6a4f';

        inputInfo.textContent = Log.truncate(message, 16);

        Element.get('input-info-container').appendChild(inputInfo);
        return inputInfo;
    }

    static generateId(element) {
        return Element.get(element).childElementCount + 1;
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