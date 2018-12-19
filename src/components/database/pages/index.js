import React from "react";
import {
  List,
  Edit,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
  DisabledInput,
  SimpleForm,
  LongTextInput,
  Toolbar,
  SaveButton
} from "react-admin";
import DeactivateDelete from "./DeactivateDeleteButton";
import DeactivateButton from "./DeactivateButton";
import ActivateButton from "./ActivateButton";

const PageTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ""}</span>;
};

export const PageResourceList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="activeBot" />
      <EditButton />
    </Datagrid>
  </List>
);

const PageEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
    {props.record.activeBot === false && (<ActivateButton {...props} />)}
    {props.record.activeBot && (<DeactivateButton {...props} />)}
    <DeactivateDelete {...props} />
  </Toolbar>
);

export const PageResourceEdit = props => (
  <Edit title={<PageTitle />}  {...props} >
    <SimpleForm redirect="show" toolbar={<PageEditToolbar />}>
      <DisabledInput source="id" />
      <DisabledInput source="name" />
      <LongTextInput source="greetingText" />
      <LongTextInput source="firstResponseText" />
    </SimpleForm>
  </Edit>
);