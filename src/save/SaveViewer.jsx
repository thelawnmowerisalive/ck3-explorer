import React from "react";
import { useLoaderData } from "react-router-dom";
import SaveContext from "./SaveContext";

import './save.css';

const SaveViewer = () => {
    const { save, mainCharacter } = useLoaderData();

    return (
        <SaveContext.Provider value={{
            save,
            date: save.date,
            traits: save.traits_lookup,
            faiths: save.religion.faiths,
            cultures: save.culture_manager.cultures
        }}>
            {save?.meta_data.meta_player_name}
            {save?.currently_played_characters[0]}

            <div className="save-viewer">
                {/* <PinchZoomPan>
                    <FamilyTreeView rootId={save?.currently_played_characters[0]} />
                </PinchZoomPan> */}
            </div>
            {/* <CharacterView character={mainCharacter}></CharacterView> */}
            SAVE
        </SaveContext.Provider>
    )
}

export default SaveViewer;