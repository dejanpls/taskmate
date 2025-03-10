import {format} from 'date-fns';
import Category from './category.js';

export default class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #status;
    #category;

    constructor ( title, description, dueDate, priority, status, category ) {
        this.#id = `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;  // unique id on each task instance
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.category = category;
    }

    // Factory method to restore an existing task with its ID
    static fromData(data) {
        const task = new Task(data.title, data.description, format(data.dueDate, 'yyyy-MM-dd'), data.priority, data.status, data.category);
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
            throw new Error('Title too short');
        }

        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Title is empty');
        }
        this.#title = value;
    }

    get description () {
        return this.#description;
    }

    set description (value) {
        if (typeof value !== 'string') {
            throw new Error('Description invalid');
        }

        if (value.length > 120) {
            throw new Error('Description too long');
        }

        this.#description = value;
    }

    get dueDate () {
        return this.#dueDate;
    }

    set dueDate(value) {
        if (isNaN(Date.parse(value))) {
            throw new Error('Due date invalid.');
        }
    
        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare only the date
    
        if (this.#dueDate && inputDate < today) { // Only validate if setting a new due date manually
            throw new Error('Due date in the past.');
        }
    
        this.#dueDate = inputDate;
    }
    

    get priority () {
        return this.#priority;
    }

    set priority (value) {
        const allowedPriorities = ['low', 'medium', 'high'];
        if (!allowedPriorities.includes(value)) {
            throw new Error(`Invalid Priority}`);
        }
        this.#priority = value;
    }

    get status () {
        return this.#status;
    }

    set status (value) {
        const allowedStatuses = ['pending', 'in-progress', 'completed'];
        if (!allowedStatuses.includes(value)) {
            throw new Error(`Invalid Status}`);
        }
        this.#status = value;
    }

    get category () {
        return this.#category;
    }

    set category (value) {
        if (!Category.exists(value)) {
            throw new Error(`Invalid Category`);
        }
        this.#category = value;
    }
}