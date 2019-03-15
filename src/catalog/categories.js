import React from "react";
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    DisabledInput,
    SimpleForm,
    BooleanInput,
    TextInput,
} from "react-admin";
import CategoryIcon from "@material-ui/icons/RoomService";

const CategoryTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ""}</span>;
};

const CategoryList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <BooleanField source="price_by_size" />
            <BooleanField source="is_pizza" />
            <EditButton />
        </Datagrid>
    </List>
);

const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm redirect="list">
            <DisabledInput source="id" />
            <TextInput source="name" />
            <BooleanInput source="price_by_size" />
            <BooleanInput source="is_pizza" />
        </SimpleForm>
    </Edit>
);

const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" />
            <TextInput source="name" />
            <BooleanInput source="price_by_size" />
            <BooleanInput source="is_pizza" />
        </SimpleForm>
    </Create>
);

export default {
    icon: CategoryIcon,
    list: CategoryList,
    edit: CategoryEdit,
    create: CategoryCreate,
}

