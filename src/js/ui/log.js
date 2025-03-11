import UI from "./ui.js";

export default class Log {

    static notify(message, status = 'success') {
        const inputInfo = UI.generateInputInfo(message, status);

        setTimeout(() => {
            inputInfo.remove();
        }, 1500); // clears notification after 1.5 seconds;
    }

    static truncate(str, maxLength) {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
}