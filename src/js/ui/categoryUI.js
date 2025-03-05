import Element from "./element.js";
import Category from "../core/category.js";
import Log from "./log.js";

export default class CategoryUI {
    static renderCategory (category) {
        const parent = Element.get('categories');
        
        const li = Element.create('li', `category-${category}`);
        const button = Element.create('button', `category-btn-${category}`);
        button.textContent = category;

        li.appendChild(button);
        parent.appendChild(li);
    }

    static renderCategories() {
        Category.list().forEach(category => CategoryUI.renderCategory(category));
    }

    static addNewCategory() {
        const btnContainer = Element.get('button-container');
        const input = Element.create('input', 'new-category-input', 'text');
    
        input.placeholder = 'Enter new category';
    
        btnContainer.appendChild(input);
        input.focus();
    
        function removeInput() {
            if (input && input.parentElement) {
                input.removeEventListener('keypress', handleEnterKey);
                input.removeEventListener('blur', removeInput);
                input.remove();
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
                    Category.add(value);
                    CategoryUI.renderCategory(value)
                } catch (error) {
                    Log.notify(error.message);
                }
    
                removeInput(); // Ensure safe removal
            }
        }
    
        input.addEventListener('keypress', handleEnterKey);
        input.addEventListener('blur', removeInput);
    }
    
}