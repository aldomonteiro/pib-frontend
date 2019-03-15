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
import ToppingIcon from "@material-ui/icons/Layers";

const ToppingList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="topping" />
            <EditButton />
        </Datagrid>
    </List>
);

const ToppingTitle = ({ record }) => {
    return <span>{record ? `${record.topping}` : ""}</span>;
};

const ToppingEdit = props => (
    <Edit title={<ToppingTitle />} {...props}>
        <SimpleForm redirect="list">
            <DisabledInput source="id" />
            {/* <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput> */}
            <TextInput source="topping" />
        </SimpleForm>
    </Edit>
);

const ToppingCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            {/* <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput> */}
            <TextInput source="id" />
            <TextInput source="topping" />
        </SimpleForm>
    </Create>
);

export default {
    icon: ToppingIcon,
    list: ToppingList,
    edit: ToppingEdit,
    create: ToppingCreate,
}