import { createContext } from "react";
import { Save } from "./save";

const SaveContext = createContext({
    save: new Save(),
    date: '1.1.1',
    traits: [],
    faiths: {},
    cultures: {}
});

export default SaveContext;