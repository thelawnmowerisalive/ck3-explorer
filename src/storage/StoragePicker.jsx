import React from "react";
import { Icon, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import SaveStorage from "./storage";
import { Link } from "react-router-dom";

const StoragePicker = () => {
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
                    <Link to={'save/' + id}>
                        <Icon name="search" />
                    </Link>
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