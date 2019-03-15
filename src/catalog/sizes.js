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
import SizeIcon from "@material-ui/icons/Tonality";

const SizeList = props => (
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

const SizeEdit = props => (
    <Edit title={<SizeTitle />} {...props}>
        <SimpleForm redirect="list">
            <DisabledInput source="id" />
            <TextInput source="size" />
            <TextInput source="split" />
            <TextInput source="slices" />
        </SimpleForm>
    </Edit>
);

const SizeCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" />
            <TextInput source="size" />
            <TextInput source="split" />
            <TextInput source="slices" />
        </SimpleForm>
    </Create>
);

export default {
    icon: SizeIcon,
    list: SizeList,
    edit: SizeEdit,
    create: SizeCreate,
}