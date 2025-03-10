import UI from "./ui.js";

export default class Log {

    static notify(message) {
        const inputInfo = UI.generateInputInfo(message);

        setTimeout(() => {
            inputInfo.remove();
        }, 1500); // clears notification after 1.5 seconds;
    }

}