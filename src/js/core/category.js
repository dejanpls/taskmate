export default class Category {
  static #categories = [{ name: 'default', color: '#014871' }];

  static list() {
    return [...this.#categories]; // prevent direct modification
  }

  static exists(category) {
    const currentCategories = this.#categories.map((cat) => cat.name);
    return currentCategories.includes(category);
  }

  static add(category) {
    if (this.exists(category)) {
      throw new Error('Category already exists');
    }
    this.#categories.push(category);
  }
}
