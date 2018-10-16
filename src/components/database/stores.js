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
import withStyles from '@material-ui/core/styles/withStyles';

const editStyles = {
  address: { maxWidth: 400 },
  city: { display: 'inline-block' },
  state: { display: 'inline-block', marginLeft: 32 },
};


const StoreTitle = ({ record }) => {
  return <span>Store {record ? `"${record.name}"` : ""}</span>;
};

export const StoreList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="city" />
      <TextField source="phone" />
      <EditButton />
    </Datagrid>
  </List>
);

export const StoreEdit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit title={<StoreTitle />} {...props}>
    <SimpleForm redirect="show">
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="address" formClassName={classes.address} />
      <TextInput source="city" formClassName={classes.city} />
      <TextInput source="state" formClassName={classes.state} />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
));

export const StoreCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="state" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);
