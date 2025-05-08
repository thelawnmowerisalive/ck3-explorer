import { useContext } from "react";
import { Link } from "react-router-dom";
import { Save } from "../save";
import SaveContext from "../SaveContext";

export default function CharacterLink({ id }) {
    const { save } = useContext(SaveContext);
    const character = Save.findCharacter(save, id);

    if (!character) {
        return <>NOT FOUND</>
    }

    return (
        <Link to={id} key={id}>
            {character.first_name}
        </Link>
    )
}