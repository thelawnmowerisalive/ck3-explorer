import SaveStorage from "../storage/storage";
import { Save } from "./save";

export default async function saveLoader({ params }) {
    const save = await SaveStorage.getSave(params.id);
    const mainCharacter = Save.findCharacter(save, save.currently_played_characters[0]);
    console.log(save);
    console.log(mainCharacter);
    return { save, mainCharacter };
}