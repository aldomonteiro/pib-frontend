import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  DisabledInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ChipField,
  SimpleForm,
  TextInput,
  SelectField,
  SelectInput,
} from "react-admin";
import { choices_kinds } from '../../util';

const FlavorTitle = ({ record }) => {
  return <span>Flavor {record ? `"${record.flavor}"` : ""}</span>;
};

export const FlavorList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="flavor" />
      <SelectField source="kind" choices={choices_kinds()} />
      <EditButton />
    </Datagrid>
  </List>
);

export const FlavorEdit = props => (
  <Edit title={<FlavorTitle />} {...props}>
    <SimpleForm redirect="show">
      <DisabledInput source="id" />
      <TextInput source="flavor" />
      <SelectInput source="kind" choices={choices_kinds()} />
      <ReferenceArrayInput label="Toppings" reference="toppings" source="toppings" sort={{ field: 'topping', order: 'ASC' }}>
        <SelectArrayInput optionText="topping">
          <ChipField source="id" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const FlavorCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      {/* <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput> */}
      <TextInput source="id" />
      <TextInput source="flavor" />
      <SelectInput source="kind" choices={choices_kinds()} />
      <ReferenceArrayInput label="Toppings" reference="toppings" source="toppings" sort={{ field: 'topping', order: 'ASC' }}>
        <SelectArrayInput optionText="topping" >
          <ChipField source="id" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
