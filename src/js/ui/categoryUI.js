/* eslint-disable import/no-cycle */
import Element from './element.js';
import Category from '../core/category.js';
import Log from './log.js';
import Tasks from '../core/tasks.js';
import UI from './ui.js';
import LocalStorage from '../core/localStorage.js';
import Form from './form.js';

export default class CategoryUI {
  static renderCategory(category) {
    const parent = Element.get('categories');

    const li = Element.create('li', `category-${category.name}`);
    const button = Element.create('button', `category-btn-${category.name}`);
    const count = Element.create('div', `category-count-${category.name}`);
    count.textContent = '0';
    button.textContent = category.name;

    button.addEventListener('click', () => CategoryUI.filter(category.name));

    li.appendChild(button);
    li.appendChild(count);
    parent.appendChild(li);
  }

  static updateCurrentCategorytitle(query = null) {
    if (Element.get('task-list').getAttribute('data-search') === 'true') {
      Element.get('current-category').textContent = `Searched for "${query}"`;
      return;
    }
    const currentCategory =
      Element.get('task-list').getAttribute('data-category');
    Element.get('current-category').textContent =
      `${currentCategory.slice(0, 1).toUpperCase() + currentCategory.slice(1)} Tasks`;
  }

  static renderCategories() {
    Category.list().forEach((category) => CategoryUI.renderCategory(category));
  }

  static addNewCategory() {
    const btnContainer = Element.get('button-container');
    const newCategoryContainer = Element.create(
      'div',
      'new-category-container',
    );
    const closeBtn = Element.create('button', 'close-category-container');
    closeBtn.textContent = 'X';
    const input = Element.create('input', 'new-category-input', 'text');

    const colorSelector = Element.create('div', 'color-selector');
    colorSelector.textContent = 'Choose Color';
    const color = Element.create('input', 'category-color-input', 'color');
    const colorValue = Element.create('div', 'category-color-value');
    colorValue.style.backgroundColor = UI.getRandomHexColor();

    input.maxLength = 12; // Limit category's name length
    input.placeholder = 'Enter new category';

    let categoryColor = UI.rgbToHex(colorValue.style.backgroundColor);

    colorSelector.appendChild(color);
    colorSelector.appendChild(colorValue);
    newCategoryContainer.appendChild(closeBtn);
    newCategoryContainer.appendChild(colorSelector);
    newCategoryContainer.appendChild(input);
    btnContainer.appendChild(newCategoryContainer);

    color.addEventListener('input', () => {
      colorValue.style.backgroundColor = color.value;
      categoryColor = color.value;
    });
    input.focus();

    function removeInput() {
      if (input && input.parentElement) {
        // eslint-disable-next-line no-use-before-define
        input.removeEventListener('keypress', handleEnterKey);
        closeBtn.removeEventListener('click', removeInput);
        newCategoryContainer.remove(); // Remove parent & children elements
      }
    }

    function handleEnterKey(event) {
      if (event.key === 'Enter') {
        const value = input.value.trim();

        if (!value) {
          Log.notify('Invalid category');
          return;
        }

        try {
          const obj = { name: value, color: categoryColor };
          Category.add(obj);
          CategoryUI.renderCategory(obj);
          LocalStorage.saveCategories();
          Form.listCategories();
          Log.notify('New category added');
        } catch (error) {
          Log.notify(error.message);
        }

        removeInput(); // Ensure safe removal
      }
    }

    input.addEventListener('keypress', handleEnterKey);
    closeBtn.addEventListener('click', removeInput);
  }

  static filter(category) {
    const taskList = Element.get('task-list');
    taskList.replaceChildren();
    taskList.setAttribute('data-search', 'false');
    taskList.setAttribute('data-category', category);
    const filtered = Tasks.list.filter((task) => task.category === category);
    filtered.forEach((task) => UI.addTaskToList(task));
    CategoryUI.updateCurrentCategorytitle();
    UI.attachEventListeners();
    UI.toggleTaskListVisibility(filtered.length === 0);
  }

  static countCategoryTasks() {
    Category.list().forEach((category) => {
      Element.get(`category-count-${category.name}`).textContent =
        Tasks.list.filter((task) => task.category === category.name).length;
    });
  }
}
