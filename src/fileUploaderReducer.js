const ActionType = {
    SET_FILE: 'SET_FILE',
    SET_TEXT: 'SET_TEXT',
    PARSE: 'PARSE',
}

class SetFileAction {
    constructor(file) {
        this.type = ActionType.SET_FILE;
        this.file = file;
    }
}

class SetTextAction {
    /**
     * 
     * @param {string} text 
     */
    constructor(text) {
        this.type = ActionType.SET_TEXT;
        this.text = text;
    }
}

class ParseAction {
    constructor(percentage, result) {
        this.type = ActionType.PARSE;
        this.percentage = percentage;
        this.result = result;
    }
}

function fileUploaderReducer(state, action) {
    switch (action.type) {
        case ActionType.SET_FILE:
            return {
                ...state,
                file: action.file,
                parsing: false,
                percentage: undefined,
                json: undefined
            }
        case ActionType.SET_TEXT:
            return {
                ...state,
                text: action.text,
                parsing: true,
                percentage: undefined
            }
        case ActionType.PARSE:
            return {
                ...state,
                parsing: action.percentage < 1,
                percentage: action.percentage,
                json: action.result
            }
    }
}

export { ParseAction, SetFileAction, SetTextAction, fileUploaderReducer };

