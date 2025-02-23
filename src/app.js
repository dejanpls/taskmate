import Task from './task.js';
import Tasks from './tasks.js';
import UI from "./ui.js";

class App {
    static init() {
        const tasks = Tasks.list;
        tasks.forEach(task => UI.addTaskToList(task));

        UI.getElement('open-dialog').addEventListener('click', App.openFormDialog);
        UI.getElement('confirm-dialog').addEventListener('click', App.addTask);
    }

    static openFormDialog() {
        const dialog = UI.getElement('task-dialog');
        dialog.showModal();

        UI.getElement('close-dialog').addEventListener('click', () => dialog.close());
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
            console.error(error.message);
            UI.getElement('inputInfo').textContent = error.message;
        }
        
        if (task) {
            Tasks.addTask(task);
            UI.addTaskToList(task);
            console.log(Tasks.list);  
            UI.getElement('inputInfo').textContent = "Task added";  
            UI.getElement('task-form').reset();
        }
    }

    static deleteTask(event) {
        if (event.target.classList.contains('delete')) {
            const taskElement = event.target.parentElement;
            Tasks.removeTask(taskElement.textContent); // I'll check this later
            UI.removeTaskFromList(taskElement);
        }
    }
}

export default App;
