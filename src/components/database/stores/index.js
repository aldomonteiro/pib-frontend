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
  BooleanInput,
  NumberInput,
  TextInput,
  number,
  minValue,
  TabbedForm,
  FormTab,
  Toolbar
} from "react-admin";
import { TimeInput } from 'react-admin-date-inputs';
import withStyles from '@material-ui/core/styles/withStyles';
import LocationButton from './locationButton';
import { CreateWithLocation } from './createWithLocation';
import { UpdateWithLocation } from './updateWithLocation';

const storeStyles = {
  address: { maxWidth: 400 },
  col1: { display: 'inline-block' },
  col2: { display: 'inline-block', marginLeft: 32 },
  tableLine: { display: 'table' },
  col1of3: { display: 'inline-block', width: '10em', maxWidth: '10em', marginLeft: 1 },
  col2of3: { display: 'inline-block', width: '10em', maxWidth: '10em', marginLeft: 100 },
  col3of3: { display: 'inline-block', width: '10em', maxWidth: '10em', marginLeft: 200 },
};


const StoreTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ""}</span>;
};

export const StoreList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="city" />
      <TextField source="phone" />
      <NumberField source="delivery_fee" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
      <TextField source="location_lat" />
      <TextField source="location_long" />
      <EditButton />
    </Datagrid>
  </List>
);

const StoreUpdateToolbar = props => (
  <Toolbar {...props}>
    <UpdateWithLocation
      label="ra.action.save"
      redirect="list"
      submitOnEnter={false}
    />
  </Toolbar>
);

export const StoreEdit = withStyles(storeStyles)(({ classes, ...props }) => {
  return (
    <Edit title={<StoreTitle />} {...props}>
      <TabbedForm toolbar={<StoreUpdateToolbar />} >
        <FormTab label="resources.stores.tabs.main">
          <DisabledInput source="id" />
          <TextInput source="name" />
          <TextInput source="address" formClassName={classes.address} />
          <TextInput source="city" formClassName={classes.col1} />
          <TextInput source="state" formClassName={classes.col2} />
          <TextInput source="phone" />
          <NumberInput source="delivery_fee" validate={[number(), minValue(0)]} />
          <DisabledInput source="location_lat" formClassName={classes.col1} />
          <DisabledInput source="location_long" formClassName={classes.col2} />
          <LocationButton />
        </FormTab>
        <FormTab label="resources.stores.tabs.openingtimes">
          <BooleanInput source="sun_is_open" label="resources.stores.fields.sunday" />
          <TimeInput source="sun_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="sun_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="mon_is_open" label="resources.stores.fields.monday" />
          <TimeInput source="mon_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="mon_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="tue_is_open" label="resources.stores.fields.tuesday" />
          <TimeInput source="tue_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="tue_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="wed_is_open" label="resources.stores.fields.wednesday" />
          <TimeInput source="wed_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="wed_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="thu_is_open" label="resources.stores.fields.thursday" />
          <TimeInput source="thu_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="thu_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="fri_is_open" label="resources.stores.fields.friday" />
          <TimeInput source="fri_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="fri_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="sat_is_open" label="resources.stores.fields.saturday" />
          <TimeInput source="sat_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="sat_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
          <BooleanInput source="hol_is_open" label="resources.stores.fields.holyday" />
          <TimeInput source="hol_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
          <TimeInput source="hol_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
});

const StoreCreateToolbar = props => (
  <Toolbar {...props}>
    <CreateWithLocation
      label="post.action.save"
      redirect="show"
      submitOnEnter={false}
      variant="flat"
    />
  </Toolbar>
);

export const StoreCreate = withStyles(storeStyles)(({ classes, ...props }) => (
  <Create {...props}>
    <TabbedForm toolbar={<StoreCreateToolbar />} >
      <FormTab label="resources.stores.tabs.main">
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="address" formClassName={classes.address} />
        <TextInput source="city" formClassName={classes.col1} />
        <TextInput source="state" formClassName={classes.col2} />
        <TextInput source="phone" />
        <NumberInput source="delivery_fee" validate={[number(), minValue(0)]} />
        <LocationButton />
      </FormTab>
      <FormTab label="resources.stores.tabs.openingtimes">
        <BooleanInput source="sun_is_open" label="resources.stores.fields.sunday" />
        <TimeInput source="sun_open" isRequired={true} label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="sun_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="mon_is_open" label="resources.stores.fields.monday" />
        <TimeInput source="mon_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="mon_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="tue_is_open" label="resources.stores.fields.tuesday" />
        <TimeInput source="tue_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="tue_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="wed_is_open" label="resources.stores.fields.wednesday" />
        <TimeInput source="wed_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="wed_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="thu_is_open" label="resources.stores.fields.thursday" />
        <TimeInput source="thu_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="thu_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="fri_is_open" label="resources.stores.fields.friday" />
        <TimeInput source="fri_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="fri_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="sat_is_open" label="resources.stores.fields.saturday" />
        <TimeInput source="sat_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="sat_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
        <BooleanInput source="hol_is_open" label="resources.stores.fields.holyday" />
        <TimeInput source="hol_open" label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
        <TimeInput source="hol_close" label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
      </FormTab>
    </TabbedForm>
  </Create>
));