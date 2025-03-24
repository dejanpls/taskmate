import Category from "../core/category.js";
import Element from "./element.js";
import App from "../app.js";

export default class Form {

    static open(event, editTask = null) {
        const dialog = Element.get('task-dialog');
        dialog.showModal();

        // Update description characters count
        Form.updateDescriptionCharCount();

        const confirmButton = Element.get('confirm-dialog');

        // Remove all previous event listeners before adding new ones
        confirmButton.replaceWith(confirmButton.cloneNode(true));
        const newConfirmButton = Element.get('confirm-dialog'); // Get the new cloned button

        // Define the event listener function
        function handleUpdateTask(e) {
            App.updateTask(e, editTask);
        }

        if (editTask) {
            Element.setValueOf("title", editTask.title);
            Element.setValueOf("description", editTask.description);
            Element.setValueOf('dueDate', editTask.dueDate.toISOString().split('T')[0]);
            Element.setValueOf("priority", editTask.priority);
            Element.setValueOf("status", editTask.status);
            Element.setValueOf("category", editTask.category);

            // Update description characters count
            Form.updateDescriptionCharCount(editTask);

            // Update button text
            // newConfirmButton.textContent = "Update Task";
            Element.get('form-title').textContent = "Update Task";

            // Add the event listener
            newConfirmButton.addEventListener('click', handleUpdateTask);
        } else {
            newConfirmButton.removeEventListener('click', handleUpdateTask); // Remove after execution
            // newConfirmButton.textContent = "Add Task";
            Element.get('form-title').textContent = "New Task";
            newConfirmButton.addEventListener('click', App.addTask);

            // Reset the form for a new task
            Element.get('task-form').reset();
        }

        Element.get('close-dialog').addEventListener('click', () => dialog.close());

        // set dueDate to today
        Element.setValueOf('dueDate', new Date().toISOString().split('T')[0]);
    }

    static listCategories() {
        const categoryList = Category.list();
        const categoryMenu = Element.get('category');
        categoryMenu.replaceChildren();

        categoryList.forEach(category => {
            const categoryOption = document.createElement('option');
            categoryOption.value = category.name;
            categoryOption.textContent = category.name[0].toUpperCase() + category.name.slice(1);
            categoryMenu.appendChild(categoryOption);
        });
    }

    static updateDescriptionCharCount(editTask = null) {
        const textarea = document.getElementById("description");
        const charCount = document.getElementById("charsCount");
        const maxLength = 120; // Set the character limit

        if (editTask) charCount.textContent = `${maxLength - textarea.value.length} characters remaining`;
        else charCount.textContent = `${maxLength} characters remaining`;

        textarea.addEventListener("input", function () {
            if (this.value.length > maxLength) {
                this.value = this.value.substring(0, maxLength); // Trim extra characters
            }

            const remaining = maxLength - this.value.length;
            charCount.textContent = `${remaining} characters remaining`;
        });
    }
}