import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  NumberField,
  SelectField,
  EditButton,
  DisabledInput,
  SimpleForm,
  NumberInput,
  TextInput,
  SelectInput,
  number,
  minValue,
} from "react-admin";
import { choices_kinds, choices_sizes } from '../../util';

const PricingTitle = ({ record }) => {
  return <span>Pricing {record ? `"${record.kind} - ${record.size}"` : ""}</span>;
};

export const PricingList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <SelectField source="kind" choices={choices_kinds()} />
      <SelectField source="size" choices={choices_sizes()} />
      <NumberField source="price" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
      <EditButton />
    </Datagrid>
  </List>
);

export const PricingEdit = props => (
  <Edit title={<PricingTitle />} {...props}>
    <SimpleForm redirect="show">
      <DisabledInput source="id" />
      <SelectInput source="kind" choices={choices_kinds()} />
      <SelectInput source="size" choices={choices_sizes()} />
      <NumberInput source="price" validate={[number(), minValue(0)]} />
    </SimpleForm>
  </Edit>
);

export const PricingCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="id" />
      <SelectInput source="kind" choices={choices_kinds()} />
      <SelectInput source="size" choices={choices_sizes()} />
      <NumberInput source="price" validate={[number(), minValue(0)]} />
    </SimpleForm>
  </Create>
);
