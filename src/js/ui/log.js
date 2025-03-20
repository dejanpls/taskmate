import UI from "./ui.js";

export default class Log {

    static notify(message, status = 'success') {
        const inputInfo = UI.generateInputInfo(message, status);

        // Ensure it's visible before the timeout starts
        requestAnimationFrame(() => {
            inputInfo.classList.add('show');
        });

        setTimeout(() => {
            inputInfo.classList.add('hide'); // Start fade-out & slide-up animation

            setTimeout(() => {
                inputInfo.remove(); // Remove element from DOM
            }, 300); // Wait for fade-out to complete
        }, 1500);
    }

    static truncate(str, maxLength) {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
}