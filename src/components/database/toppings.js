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

export const ToppingList = props => (
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

export const ToppingEdit = props => (
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

export const ToppingCreate = props => (
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
