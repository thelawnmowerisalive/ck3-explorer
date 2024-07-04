import { Save } from "../save/save";

class SaveInfo {
    id = '';
    character = '';
    date = '';
}

class SaveStorage {

    /**
     * @returns {Map<String, SaveInfo>}
     */
    static getAll() {
        const infos = localStorage.getItem("playthroughs");
        if (!infos) {
            return {};
        }
        return JSON.parse(infos);
    }

    /**
     * @param {string} id 
     * @returns {Promise<Save>}
     */
    static getSave(id) {
        // return JSON.parse(localStorage.getItem(id));
        return new Promise(async (resolve, reject) => {
            const root = await navigator.storage.getDirectory();
            const savefileHandle = await root.getFileHandle(id);
            const savefile = await savefileHandle.getFile();
            const reader = new FileReader();
            reader.readAsText(savefile);
            reader.onload = (evt) => {
                resolve(JSON.parse(evt.target.result));
            }
        });
    }

    /**
     * @param {Save} save 
     */
    static setSave(save) {
        // localStorage.setItem(save.playthrough_id, JSON.stringify(save));

        const all = SaveStorage.getAll();
        const character = Save.findMainCharacter(save);
        all[save.playthrough_id] = {
            id: save.playthrough_id,
            character: character && character.first_name,
            date: save.meta_data.meta_date
        }
        localStorage.setItem("playthroughs", JSON.stringify(all));
    }

    static clear() {
        const ids = SaveStorage.getAll();
        for (let id in ids) {
            localStorage.removeItem(id);
        }
        localStorage.removeItem("playthroughs");
    }
}

window.SaveStorage = SaveStorage;

export default SaveStorage;