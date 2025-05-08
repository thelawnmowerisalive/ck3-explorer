import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import SaveContext, { SaveWrapper } from "./SaveContext";

import './save.css';
import { Search } from "semantic-ui-react";

/**
 * Main view; offers search functionality using a trie.
 */
const SaveView = () => {
    const { save, trie } = useLoaderData();
    const [search, setSearch] = useState({
        isLoading: false,
        results: undefined
    });
    const [selection, setSelection] = useState();

    const handleSearchResultSelect = (_, { result }) => {
        setSelection(result);
    }

    // group results in categories
    const handleSearchChange = (_, { value }) => {
        const results = {};
        trie.search(value).forEach(result => {
            const category = results[result.category] ||= {
                name: result.category,
                results: []
            };
            category.results.push(result);
        });
        setSearch(prev => ({ ...prev, results }));
    }

    // update selection info on change
    const navigate = useNavigate();
    useEffect(() => {
        selection && navigate(selection.link);
    }, [selection]);

    return (
        <SaveContext.Provider value={new SaveWrapper(save)}>
            <div className="save-view fill">
                <header>
                    <div>
                        {save?.meta_data.meta_player_name}
                        {save?.currently_played_characters[0]}
                    </div>
                    <Search
                        category
                        fluid
                        minCharacters={3}
                        loading={search.isLoading}
                        results={search.results}
                        onResultSelect={handleSearchResultSelect}
                        onSearchChange={handleSearchChange}
                    />
                </header>

                <main className="fill">
                    <Outlet />
                </main>
            </div>
        </SaveContext.Provider>
    )
}

export default SaveView;