import React from "react";
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    DisabledInput,
    SimpleForm,
    NumberInput,
    TextInput,
    number,
    minValue,
} from "react-admin";
import BeverageIcon from "@material-ui/icons/LocalDrink";

const BeverageTitle = ({ record }) => {
    return <span>Beverage {record ? `"${record.kind} - ${record.name}"` : ""}</span>;
};

const BeverageList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="kind" />
            <TextField source="name" />
            <NumberField source="price" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
            <EditButton />
        </Datagrid>
    </List>
);

const BeverageEdit = props => (
    <Edit title={<BeverageTitle />} {...props}>
        <SimpleForm redirect="show">
            <DisabledInput source="id" />
            <TextInput source="kind" />
            <TextInput source="name" />
            <NumberInput source="price" validate={[number(), minValue(0)]} />
        </SimpleForm>
    </Edit>
);

const BeverageCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="show">
            <TextInput source="id" />
            <TextInput source="kind" />
            <TextInput source="name" />
            <NumberInput source="price" validate={[number(), minValue(0)]} />
        </SimpleForm>
    </Create>
);

export default {
    icon: BeverageIcon,
    list: BeverageList,
    edit: BeverageEdit,
    create: BeverageCreate,
}

