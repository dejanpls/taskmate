export default class Category {
    static #categories = ["default"];

    static list() {
        return [...this.#categories]; // prevent direct modification
    }

    static exists(category) {
        return this.#categories.includes(category);
    }

    static add(category) {
        if (this.exists(category)) {
            throw new Error ('Category already exists');
        }
        this.#categories.push(category);
    }
}