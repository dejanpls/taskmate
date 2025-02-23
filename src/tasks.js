import Task from "./task.js";

export default class Tasks {
    static #list = [];

    constructor() {
        throw new Error("Tasks is a static class and cannot be instantiated.");
    }

    // Add a task to the list
    static addTask(task) {

        if (!(task instanceof Task)) {
            throw new Error("Only instances of Task can be added.");
        }

        this.#list.push(task);
    }

    static get list() {
        return this.#list;
    }

    static removeTask(id) {

        const initialLength = this.#list.length;

        this.#list = this.#list.filter(task => task.id !== id);

        return initialLength !== this.#list.length; // Returns true if a task was removed
    }

    static findTaskById(id) {
        return this.#list.find(task => task.id === id) || null;
    }

    static updateTask(updatedTask) {
        const index = this.#list.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            this.#list[index] = updatedTask;
        }
    }    

    // === Filtering Methods ===

    static filterByPriority(priority) {

        const allowedPriorities = ['low', 'medium', 'high'];

        if (!allowedPriorities.includes(priority)) {
            throw new Error(`Priority must be one of: ${allowedPriorities.join(', ')}.`);
        }

        return this.#list.filter(task => task.priority === priority);
    }
    
    static filterByStatus(status) {

        const allowedStatuses = ['pending', 'in-progress', 'completed'];

        if (!allowedStatuses.includes(status)) {
            throw new Error(`Status must be one of: ${allowedStatuses.join(', ')}.`);
        }
        
        return this.#list.filter(task => task.status === status);
    }

    static filterByDueDate(dueDate) {

        if (isNaN(Date.parse(dueDate))) {
            throw new Error('Due date must be a valid date string.');
        }

        const targetDate = new Date(dueDate).toISOString().split('T')[0]; // Normalize to YYYY-MM-DD
        
        return this.#list.filter(task => {
            const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
            return taskDate === targetDate;
        });
    }
}