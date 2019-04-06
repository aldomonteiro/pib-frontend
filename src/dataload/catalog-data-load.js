import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Menu } from "react-data-grid-addons";

// import createRowData, { createFakeRow } from "./createRowData";

import "./styles.css";
const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

const defaultColumnProperties = {
    sortable: true,
    width: 120
};

const columns = [
    {
        key: "id",
        name: "ID",
        sortDescendingFirst: true
    },
    {
        key: "title",
        name: "Title"
    },
    {
        key: "firstName",
        name: "First Name"
    },
    {
        key: "lastName",
        name: "Last Name"
    },
    {
        key: "email",
        name: "Email"
    },
    {
        key: "street",
        name: "Street"
    },
    {
        key: "zipCode",
        name: "ZipCode"
    },
    {
        key: "date",
        name: "Date"
    },
    {
        key: "jobTitle",
        name: "Job Title"
    },
    {
        key: "catchPhrase",
        name: "Catch Phrase"
    },
    {
        key: "jobArea",
        name: "Job Area"
    },
    {
        key: "jobType",
        name: "Job Type"
    }
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

function ExampleContextMenu ({
    idx,
    id,
    rowIdx,
    onRowDelete,
    onRowInsertAbove,
    onRowInsertBelow
}) {
    return (
        <ContextMenu id={id}>
            <MenuItem data={{ rowIdx, idx }} onClick={onRowDelete}>
                Delete Row
      </MenuItem>
            <SubMenu title="Insert Row">
                <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertAbove}>
                    Above
        </MenuItem>
                <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertBelow}>
                    Below
        </MenuItem>
            </SubMenu>
        </ContextMenu>
    );
}

const deleteRow = rowIdx => rows => {
    const nextRows = [...rows];
    nextRows.splice(rowIdx, 1);
    return nextRows;
};

const insertRow = rowIdx => rows => {
    const newRow = ''; // createFakeRow("-");
    const nextRows = [...rows];
    nextRows.splice(rowIdx, 0, newRow);
    return nextRows;
};

function Example ({ initialRows }) {
    const [rows, setRows] = useState(initialRows);
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={ROW_COUNT}
            minHeight={500}
            contextMenu={
                <ExampleContextMenu
                    onRowDelete={(e, { rowIdx }) => setRows(deleteRow(rowIdx))}
                    onRowInsertAbove={(e, { rowIdx }) => setRows(insertRow(rowIdx))}
                    onRowInsertBelow={(e, { rowIdx }) => setRows(insertRow(rowIdx + 1))}
                />
            }
            RowsContainer={ContextMenuTrigger}
        />
    );
}

export default Example;