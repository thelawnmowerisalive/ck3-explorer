import { DeadCharacter, LivingCharacter } from "./character/character";

class MetaData {
    version = -1;
    meta_date = '';
    meta_player_name = '';
    meta_title_name = '';
    meta_house_name = '';
}

class Save {
    meta_data = new MetaData();
    playthrough_id = '';
    traits_lookup = [];
    currently_played_characters = [];

    /**
     * @type {Map<string, LivingCharacter>}
     */
    living;

    /**
     * @type {Map<string, DeadCharacter}
     */
    dead_unprunable;

    /**
     * @param {Save} save 
     * @param {string} id 
     * @returns {LivingCharacter}
     */
    static findLivingCharacter = (save, id) => {
        return save.living[id];
    }

    /**
     * @param {Save} save 
     * @param {string} id 
     * @returns {DeadCharacter}
     */
    static findDeadCharacter = (save, id) => {
        return save.dead_unprunable[id] || save.characters.dead_prunable[id];
    }

    /**
     * 
     * @param {Save} save 
     * @param {string} id 
     * @returns {LivingCharacter | DeadCharacter}
     */
    static findCharacter = (save, id) => {
        return Save.findLivingCharacter(save, id) || Save.findDeadCharacter(save, id);
    }

    static findMainCharacter = (save) => {
        if (!save.currently_played_characters) {
            return null;
        }
        return Save.findCharacter(save, save.currently_played_characters[0]);
    }
}

export { Save };
