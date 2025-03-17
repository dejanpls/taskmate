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

        const category = Element.create('p', `item-category-${task.id}`);
        category.textContent = task.category;

        // View Wrapper
        const viewWrapper = Element.create('div', `view-wrapper-${task.id}`);

        // Main View Container
        const mainView = Element.create('div', `main-view-${task.id}`);

        const mainContent = Element.create('div', `main-content-${task.id}`);

        // 1. Details Container
        const details = Element.create('div', `item-details-${task.id}`);
        const checkbox = Element.create('input', `item-checkbox-${task.id}`, 'checkbox');
        checkbox.checked = task.status === 'completed';

        const title = Element.create('h3', `item-title-${task.id}`);
        title.textContent = task.title;

        checkbox.checked ? title.classList.add('checked') : title.classList.remove('checked');

        // 2. Date Container
        const dateContainer = Element.create('div', `date-container-${task.id}`);
        const dateIcon = Element.create('div', `date-icon-${task.id}`);
        dateIcon.className = 'material-icons';
        dateIcon.textContent = 'schedule';
        checkbox.checked ? dateIcon.classList.add('done') : dateIcon.classList.remove('done');

        const dueDate = Element.create('p', `item-dueDate-${task.id}`);
        dueDate.textContent = UI.formatDueDate(task.dueDate);
        checkbox.checked ? dueDate.classList.add('done') : dueDate.classList.remove('done');

        // 3. View SecView Container (button to open 'sec-view-...')

        const displaySecView = Element.create('div', `displaySecView-${task.id}`);
        displaySecView.className = 'closed';
        const displaySecViewIcon = Element.create('span', `displaySecView-icon-${task.id}`);
        displaySecViewIcon.className = 'material-icons';
        displaySecViewIcon.textContent = 'expand_more';

        const displaySecViewBtn = Element.create('button', `displaySecView-btn-${task.id}`);
        const viewMoreText = Element.create('p', `displaySecView-text-${task.id}`);
        viewMoreText.textContent = 'view more';

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

        const priority = Element.create('p', `item-priority-${task.id}`);
        priority.textContent = task.priority;

        // Status Container
        const statusContainer = Element.create('div', `status-container-${task.id}`);
        const statusIcon = Element.create('div', `status-icon-${task.id}`);
        statusIcon.className = 'material-icons';
        statusIcon.textContent = 'stars';

        const status = Element.create('p', `item-status-${task.id}`);
        status.textContent = task.status;

        const description = Element.create('p', `item-description-${task.id}`);
        description.textContent = task.description;

        categoryContainer.appendChild(category)
        item.appendChild(categoryContainer);

        details.appendChild(checkbox);
        details.appendChild(title);
        mainContent.appendChild(details);

        displaySecView.appendChild(displaySecViewBtn);
        displaySecViewBtn.appendChild(displaySecViewIcon);
        displaySecViewBtn.appendChild(viewMoreText);
        mainContent.appendChild(displaySecView);

        dateContainer.appendChild(dateIcon);
        dateContainer.appendChild(dueDate);
        mainContent.appendChild(dateContainer);

        priorityContainer.appendChild(priorityIcon);
        priorityContainer.appendChild(priority);
        notificationContainer.appendChild(priorityContainer);

        statusContainer.appendChild(statusIcon);
        statusContainer.appendChild(status);
        notificationContainer.appendChild(statusContainer);

        secondaryView.appendChild(notificationContainer);

        const descriptionContainer = Element.create('div', `desc-container-${task.id}`);

        descriptionContainer.appendChild(description);
        secondaryView.appendChild(descriptionContainer);


        // Button Container
        const btnContainer = Element.create('div', `btn-container-${task.id}`);

        const deleteBtn = Element.create('button', `item-delete-${task.id}`);
        deleteBtn.className = 'material-icons';
        deleteBtn.textContent = "delete";

        const editBtn = Element.create('button', `item-edit-${task.id}`);
        editBtn.className = 'material-icons'
        editBtn.textContent = "more_vert";

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        mainView.appendChild(mainContent);
        mainView.appendChild(secondaryView);
        mainView.appendChild(btnContainer);

        viewWrapper.appendChild(mainView);

        item.appendChild(viewWrapper);

        list.appendChild(item); // Append li to the ui
    }

    static updateTaskInList(task) {
        const taskElement = Element.get(`item-${task.id}`);
        const title = Element.get(`item-title-${task.id}`);
        const dueDate = Element.get(`item-dueDate-${task.id}`);
        const dateIcon = Element.get(`date-icon-${task.id}`);

        if (!taskElement) return;

        const checkbox = Element.get(`item-checkbox-${task.id}`, taskElement)
        checkbox.checked = task.status === 'completed';
        checkbox.checked ? title.classList.add('checked') : title.classList.remove('checked');
        checkbox.checked ? dueDate.classList.add('done') : dueDate.classList.remove('done');
        checkbox.checked ? dateIcon.classList.add('done') : dateIcon.classList.remove('done');

        Element.get(`item-title-${task.id}`, taskElement).textContent = task.title;
        Element.get(`item-description-${task.id}`, taskElement).textContent = task.description;
        Element.get(`item-dueDate-${task.id}`, taskElement).textContent = UI.formatDueDate(task.dueDate);
        Element.get(`item-priority-${task.id}`, taskElement).textContent = task.priority;
        Element.get(`item-status-${task.id}`, taskElement).textContent = task.status;
        Element.get(`item-category-${task.id}`, taskElement).textContent = task.category;

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
        const title = Element.get(`item-title-${task.id}`);
        const dueDate = Element.get(`item-title-${task.id}`);
        const dateIcon = Element.get(`date-icon-${task.id}`);

        task.status = event.target.checked ? 'completed' : 'pending';

        if (event.target.checked) {
            task.status = 'completed';
            title.classList.add('checked');
            dueDate.classList.add('done');
            dateIcon.classList.add('done');
        } else {
            task.status = 'pending';
            title.classList.remove('checked');
            dueDate.classList.remove('done');
            dateIcon.classList.remove('done');
        }

        UI.updateTaskInList(task);
        LocalStorage.saveTasks();
        Log.notify("Status updated");
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
            Element.get('sidebar-toggle').textContent = 'menu';
        } else {
            sidebar.setAttribute('data-open', 'true');
            Element.get('sidebar-toggle').textContent = 'menu_open';
        }

        sidebar.classList.toggle('open');
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

    static toggleSecView(task) {
        const secView = Element.get(`sec-view-${task.id}`);
        if (secView.style.display === 'flex') {
            secView.style.display = 'none';
            document.querySelector(`#displaySecView-icon-${task.id}`).textContent = 'expand_more';
            document.querySelector(`#displaySecView-text-${task.id}`).textContent = 'view more';
        } else {
            secView.style.display = 'flex';
            document.querySelector(`#displaySecView-icon-${task.id}`).textContent = 'expand_less';
            document.querySelector(`#displaySecView-text-${task.id}`).textContent = 'view less';
        }
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
        document.querySelectorAll('[id*="item-edit-"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = Element.getIdFrom(e);
                const task = Tasks.findTaskById(taskId);
                Form.open(e, task); // Open dialog with task details
            });
        });

        // Task Delete Button
        document.querySelectorAll('[id*="item-delete-"]').forEach(button => {
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

        // Task viewMore Button
        document.querySelectorAll('[id*="displaySecView-btn-"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = Element.getIdFrom(e);
                const secView = Element.get(`sec-view-${taskId}`);
                                
                if (secView.style.display === 'flex') {
                    secView.style.display = 'none';
                    document.querySelector(`#displaySecView-icon-${taskId}`).textContent = 'expand_more';
                    document.querySelector(`#displaySecView-text-${taskId}`).textContent = 'view more';
                } else {
                    secView.style.display = 'flex';
                    document.querySelector(`#displaySecView-icon-${taskId}`).textContent = 'expand_less';
                    document.querySelector(`#displaySecView-text-${taskId}`).textContent = 'view less';
                }
            });
        });

        window.addEventListener('resize', () => {
            const secViews = document.querySelectorAll("div[id^='sec-view-']");
            if (window.innerWidth > 700) {
                secViews.forEach(el => el.style.display = "flex"); // Show again on larger screens
            } else {
                secViews.forEach(el => el.style.display = "none");
                document.querySelectorAll('[id*="displaySecView-text-"]').forEach(el => el.textContent = 'view more');
                document.querySelectorAll('[id*="displaySecView-icon-"]').forEach(el => el.textContent = 'expand_more');
            }
        });
    }
}