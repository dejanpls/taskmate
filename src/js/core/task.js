import {format} from 'date-fns';

export default class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #status;
    #checklist;

    constructor ( title, description, dueDate, priority, status, checklist = [] ) {
        this.#id = `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;  // unique id on each task instance
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.checklist = checklist; // array of element
    }

    // Factory method to restore an existing task with its ID
    static fromData(data) {
        const task = new Task(data.title, data.description, format(data.dueDate, 'yyyy-MM-dd'), data.priority, data.status, data.checklist);
        task.#id = data.id; // Restore the original ID
        return task;
    }

    get id () {
        return this.#id;
    }

    get title () {
        return this.#title;
    }

    set title (value) {

        if (value.length < 2) {
            throw new Error('Title must be longer than 2 characters');
        }

        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Title must be a non-empty string');
        }
        this.#title = value;
    }

    get description () {
        return this.#description;
    }

    set description (value) {
        if (typeof value !== 'string') {
            throw new Error('Description must be a string');
        }
        this.#description = value;
    }

    get dueDate () {
        return this.#dueDate;
    }

    set dueDate(value) {
        if (isNaN(Date.parse(value))) {
            throw new Error('Due date must be a valid date string.');
        }
    
        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare only the date
    
        if (this.#dueDate && inputDate < today) { // Only validate if setting a new due date manually
            throw new Error('Due date cannot be in the past.');
        }
    
        this.#dueDate = inputDate;
    }
    

    get priority () {
        return this.#priority;
    }

    set priority (value) {
        const allowedPriorities = ['low', 'medium', 'high'];
        if (!allowedPriorities.includes(value)) {
            throw new Error(`Priority must be one of: ${allowedPriorities.join(', ')}`);
        }
        this.#priority = value;
    }

    get status () {
        return this.#status;
    }

    set status (value) {
        const allowedStatuses = ['pending', 'in-progress', 'completed'];
        if (!allowedStatuses.includes(value)) {
            throw new Error(`Status must be one of: ${allowedStatuses.join(', ')}`);
        }
        this.#status = value;
    }

    get checklist () {
        return this.#checklist || [];
    }

    set checklist (array) {

        if (!Array.isArray(array)) {
            throw new Error("Checklist must be an array of strings.");
        }

        this.#checklist = array.map(item => String(item));
    }
}
