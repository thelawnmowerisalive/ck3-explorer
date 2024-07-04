import React from "react";
import { Button, Icon, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import SaveStorage from "./storage";

const StoragePicker = () => {

    const getOpenHandler = (save) => {
        return (evt, data) => {
            console.log(evt);
            console.log(data);
            console.log(save);
        }
    }


    const saves = SaveStorage.getAll();
    const rows = [];

    for (let id in saves) {
        const save = saves[id];
        rows.push((
            <TableRow key={id}>
                <TableCell>{save.id}</TableCell>
                <TableCell>{save.character}</TableCell>
                <TableCell>{save.date}</TableCell>
                <TableCell>
                    <a href={'saves/' + id}><Icon name="search" /></a>
                    {/* <Button size="mini" onClick={getOpenHandler(save)}><Icon name="search" /></Button> */}
                </TableCell>
            </TableRow>
        ));
    }

    return (
        <Segment basic>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Character</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </Segment>
    )
}

export default StoragePicker;