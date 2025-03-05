import Element from "./element.js";

export default class Log {

    static notify(message) {
        Element.get('input-info').textContent = message;

        setTimeout(() => {
            Element.get('input-info').textContent = '';
        }, 1500); // clears notification after 1.5 seconds;
    }

}