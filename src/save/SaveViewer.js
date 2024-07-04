import React, { useState } from "react";
import { Save } from "./save";
import { useLoaderData, useParams } from "react-router-dom";
import SaveStorage from "../storage/storage";

export async function loader({ params }) {
    const save = await SaveStorage.getSave(params.id);
    console.log(save);
    return { save };
}

const SaveViewer = () => {
    const { save } = useLoaderData();

    if (save) {
        const mainCharacter = Save.findCharacter(save, save.currently_played_characters[0]);
        console.log(mainCharacter);
    }

    return (
        <div>
            {save?.meta_data.meta_player_name}
            {save?.currently_played_characters[0]}

            SAVE
        </div>
    )
}

export default SaveViewer;