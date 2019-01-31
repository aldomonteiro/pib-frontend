import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField, NumberField,
  EditButton,
  DisabledInput, BooleanInput, NumberInput, TextInput, SelectInput,
  number, minValue,
  TabbedForm, FormTab,
  Toolbar
} from "react-admin";
import { TimeInput } from 'react-admin-date-inputs';
import withStyles from '@material-ui/core/styles/withStyles';
import LocationButton from './locationButton';
import { CreateWithLocation } from './createWithLocation';
import { UpdateWithLocation } from './updateWithLocation';
import { Grid } from "@material-ui/core";
import shajs from 'sha.js';
import qz from 'qz-tray';

import StoreEdit from './StoreEdit';

export { StoreEdit };

const storeStyles = {
  address: { maxWidth: 400 },
  col1: { display: 'inline-block' },
  col2: { display: 'inline-block', marginLeft: 32 },
  tableLine: { display: 'table' },
  col1of3: { display: 'inline-block', width: '10em', maxWidth: '10em', marginLeft: 1 },
  col2of3: { display: 'inline-block', width: '10em', maxWidth: '10em', marginLeft: 100 },
  col3of3: { display: 'inline-block', width: '10em', maxWidth: '10em', marginLeft: 200 },
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

export const StoreCreate = withStyles(storeStyles)(({ classes, ...props }) => {
  const _res = 'resources.stores.fields.';
  const days = [{ source1: 'sun_is_open', source2: 'sun_open', source3: 'sun_close', label: _res + 'sunday' },
  { source1: 'mon_is_open', source2: 'mon_open', source3: 'mon_close', label: _res + 'monday' },
  { source1: 'tue_is_open', source2: 'tue_open', source3: 'tue_close', label: _res + 'tuesday' },
  { source1: 'wed_is_open', source2: 'wed_open', source3: 'wed_close', label: _res + 'wednesday' },
  { source1: 'thu_is_open', source2: 'thu_open', source3: 'thu_close', label: _res + 'thursday' },
  { source1: 'fri_is_open', source2: 'fri_open', source3: 'fri_close', label: _res + 'friday' },
  { source1: 'sat_is_open', source2: 'sat_open', source3: 'sat_close', label: _res + 'saturday' },
  { source1: 'hol_is_open', source2: 'hol_open', source3: 'hol_close', label: _res + 'holyday' }];

  return (
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
          {days.map(day =>
            (<Grid key={day.source1} container alignItems='center'>
              <Grid item xs={4}>
                <BooleanInput source={day.source1} label={day.label} />
              </Grid>
              <Grid item xs={4}>
                <TimeInput source={day.source2} label="resources.stores.fields.open" options={{ format: 'HH:mm', ampm: false }} />
              </Grid>
              <Grid item xs={4}>
                <TimeInput source={day.source3} label="resources.stores.fields.close" options={{ format: 'HH:mm', ampm: false }} />
              </Grid>
            </Grid>
            )
          )}
        </FormTab>
      </TabbedForm>
    </Create>
  )
});
