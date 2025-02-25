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

    static getValueOf(elementId) {
        return Element.get(elementId).value.trim();
    }

    static setValueOf(elementId, val) {
        return Element.get(elementId).value = val;
    }

    static getIdFrom(event) {
        return event.target.parentElement.id.split("-")[1];
    }
}
