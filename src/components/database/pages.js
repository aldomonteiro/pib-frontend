import React from "react";
import {
  List,
  Edit,
  Datagrid,
  TextField,
  EditButton,
  DisabledInput,
  SimpleForm,
  LongTextInput,
} from "react-admin";

const PageTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ""}</span>;
};

export const PageResourceList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PageResourceEdit = props => (
  <Edit title={<PageTitle />} {...props}>
    <SimpleForm redirect="show">
      <DisabledInput source="id" />
      <DisabledInput source="name" />
      <LongTextInput source="greetingText" />
      <LongTextInput source="firstResponseText" />
    </SimpleForm>
  </Edit>
);