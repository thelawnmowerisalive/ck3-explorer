import { Character, LivingCharacter } from "./character";

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
     * @type {Map<Number, LivingCharacter>}
     */
    living;

    /**
     * 
     * @param {Save} save 
     * @param {string} id 
     * @returns {Character}
     */
    static findCharacter = (save, id) => {
        return save.living[id];
    }

    static findMainCharacter = (save) => {
        if (!save.currently_played_characters) {
            return null;
        }
        return Save.findCharacter(save, save.currently_played_characters[0]);
    }
}

export { Save };