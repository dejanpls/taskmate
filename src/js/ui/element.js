export default class Element {
    
    static create(element, id, type = null) {
        const el = document.createElement(element);
        if (type) el.type = type;
        el.id = id;
        return el;
    }

    static get(elementId, selector = document) {
        return selector.querySelector(`#${elementId}`);
    }

    static getAll(elementId, selector = document) {
        return selector.querySelectorAll(`#${elementId}`);
    }
}
