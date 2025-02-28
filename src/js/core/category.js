export default class Category {
    static #categories = ["work", "personal", "study", "fitness", "default"];

    static list() {
        return [...this.#categories]; // prevent direct modification
    }

    static isValid(category) {
        return this.#categories.includes(category);
    }

    static add(category) {
        if (!this.isValid(category)) {
            this.#categories.push(category);
        }
    }
}