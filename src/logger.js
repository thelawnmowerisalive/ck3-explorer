class Logger {

    static debugEnabled = false;

    static debug(message, color) {
        if (Logger.debugEnabled) {
            if (color) {
                console.log('%c' + message, 'color:' + color);
            } else {
                console.log(message);
            }
        }
    }

}

export default Logger;