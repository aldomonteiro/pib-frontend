import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  NumberField,
  SelectField,
  ReferenceField,
  EditButton,
  DisabledInput,
  SimpleForm,
  NumberInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  number,
  minValue,
} from "react-admin";
import { choices_kinds } from '../../util';

const PricingTitle = ({ record }) => {
  return <span>Pricing {record ? `"${record.kind} - ${record.size}"` : ""}</span>;
};

export const PricingList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <SelectField source="kind" choices={choices_kinds()} />
      <ReferenceField source="sizeId" reference="sizes">
        <TextField source="size" />
      </ReferenceField>
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
      <ReferenceInput source="sizeId" reference="sizes">
        <SelectInput optionText="size" />
      </ReferenceInput>
      <NumberInput source="price" validate={[number(), minValue(0)]} />
    </SimpleForm>
  </Edit>
);

export const PricingCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="id" />
      <SelectInput source="kind" choices={choices_kinds()} />
      <ReferenceInput source="sizeId" reference="sizes">
        <SelectInput optionText="size" />
      </ReferenceInput>
      <NumberInput source="price" validate={[number(), minValue(0)]} />
    </SimpleForm>
  </Create>
);
