export default class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #status;

    constructor ( title, description, dueDate, priority, status ) {
        this.#id = `${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;  // unique id on each task instance
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
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

    set dueDate (value) {
        if (isNaN(Date.parse(value))) {
            throw new Error('Due date must be a valid date string');
        }
        this.#dueDate = new Date(value);
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
}
