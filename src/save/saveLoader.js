import SaveStorage from "../storage/storage";
import { Save } from "./save";
import TrieSearch from 'trie-search';

export default async function saveLoader({ params }) {
    const save = await SaveStorage.getSave(params.saveid);

    const trie = new TrieSearch();

    // map living characters
    for (let id in save.living) {
        const character = save.living[id];
        const title = character.first_name;
        const entry = new TrieEntry('character', id, title, id, `character/${id}`);
        trie.map(id, entry);
        trie.map(character.first_name, entry);
    }

    const mainCharacter = Save.findMainCharacter(save);
    console.log(save);
    console.log(mainCharacter);
    return { save, trie };
}

class TrieEntry {
    constructor(category, id, title, description, link) {
        this.category = category;
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
    }
}