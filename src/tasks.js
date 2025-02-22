import Task from "./task.js";

export default class Tasks {
    #list = [];

    // Add a task to the list
    addTask(task) {

        if (!(task instanceof Task)) {
            throw new Error("Only instances of Task can be added.");
        }

        this.#list.push(task);
    }

    get list() {
        return this.#list;
    }

    removeTask(id) {

        const initialLength = this.#list.length;

        this.#list = this.#list.filter(task => task.id !== id);

        return initialLength !== this.#list.length; // Returns true if a task was removed
    }

    findTaskById(id) {
        return this.#list.find(task => task.id === id) || null;
    }

    updateTask(id, updatedProperties) {

        const task = this.findTaskById(id);

        if (!task) {
            throw new Error(`Task with ID ${id} not found.`);
        }

        for (const [key, value] of Object.entries(updatedProperties)) {

            if (key in task) {
                task[key] = value; // Uses the setter for validation
            } else {
                throw new Error(`Invalid property: ${key}`);
            }
        }
    }

    // === Filtering Methods ===

    filterByPriority(priority) {

        const allowedPriorities = ['low', 'medium', 'high'];

        if (!allowedPriorities.includes(priority)) {
            throw new Error(`Priority must be one of: ${allowedPriorities.join(', ')}.`);
        }

        return this.#list.filter(task => task.priority === priority);
    }
    
    filterByStatus(status) {

        const allowedStatuses = ['pending', 'in-progress', 'completed'];

        if (!allowedStatuses.includes(status)) {
            throw new Error(`Status must be one of: ${allowedStatuses.join(', ')}.`);
        }
        
        return this.#list.filter(task => task.status === status);
    }

    filterByDueDate(dueDate) {

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