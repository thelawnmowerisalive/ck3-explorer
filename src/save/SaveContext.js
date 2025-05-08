import { createContext } from "react";
import { Save } from "./save";

/**
 * Exposes commonly used maps for easy access from various views.
 */
export class SaveWrapper {
    /**
     * @param {Save} save 
     */
    constructor(save) {
        this.save = save;
    }

    get date() {
        return this.save?.date;
    }

    get traits() {
        return this.save?.traits_lookup;
    }

    get faiths() {
        return this.save?.religion.faiths;
    }

    get cultures() {
        return this.save?.culture_manager.cultures;
    }

    get secrets() {
        return this.save?.secrets.secrets;
    }

    get memories() {
        return this.save?.character_memory_manager.database;
    }
}

const SaveContext = createContext(new SaveWrapper());

export default SaveContext;