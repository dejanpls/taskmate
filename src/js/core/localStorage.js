import Tasks from "./tasks.js";
import Task from "./task.js";

export default class LocalStorage {
    static saveTasks() {
        
        const taskData = Tasks.list.map(task => ({
            id: task.id,  // Save ID
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            status: task.status
        }));
        console.log("Saved tasks: ", taskData);
        localStorage.setItem('tasks', JSON.stringify(taskData));
    }

    static loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    
        return parsedTasks.map(taskData => Task.fromData(taskData));
    }        
}