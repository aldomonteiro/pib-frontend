import React from "react";
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    EditButton,
    DisabledInput,
    SimpleForm,
    TextInput,
} from "react-admin";

export const SizeList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="size" />
            <TextField source="split" />
            <TextField source="slices" />
            <EditButton />
        </Datagrid>
    </List>
);

const SizeTitle = ({ record }) => {
    return <span>{record ? `${record.size}` : ""}</span>;
};

export const SizeEdit = props => (
    <Edit title={<SizeTitle />} {...props}>
        <SimpleForm redirect="show">
            <DisabledInput source="id" />
            <TextInput source="size" />
            <TextInput source="split" />
            <TextInput source="slices" />
        </SimpleForm>
    </Edit>
);

export const SizeCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="show">
            <TextInput source="id" />
            <TextInput source="size" />
            <TextInput source="split" />
            <TextInput source="slices" />
        </SimpleForm>
    </Create>
);
