import React from "react";
import {
    Edit,
    DisabledInput, BooleanInput, NumberInput, TextInput, SelectInput,
    number, minValue,
    TabbedForm, FormTab, Toolbar
} from "react-admin";
import { TimeInput } from 'react-admin-date-inputs';
import LocationButton from './locationButton';
import { Grid } from "@material-ui/core";
import shajs from 'sha.js';
import qz from 'qz-tray';

import { UpdateWithLocation } from './updateWithLocation';

const StoreTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ""}</span>;
};

const StoreUpdateToolbar = props => (
    <Toolbar {...props}>
        <UpdateWithLocation
            label="ra.action.save"
            redirect="list"
            submitOnEnter={false}
        />
    </Toolbar>
);

class StoreEdit extends React.Component {
    state = {
        isLoading: true,
        printer_choices: []
    }

    componentDidMount() {
        qz.api.setSha256Type((data) => {
            return shajs('sha256').update(data).digest('hex')
        });
        qz.api.setPromiseType((resolver) => {
            return new Promise(resolver);
        });

        try {
            qz.websocket.getConnectionInfo();
            qz.printers.find()
                .then((printers) => {
                    const _printer_choices = [];
                    printers.map(printer => {
                        _printer_choices.push({ id: printer, name: printer })
                    });
                    this.setState({ printer_choices: _printer_choices });
                    this.setState({ isLoading: false });
                }).catch((err) => {
                    console.error(err);
                });
        } catch (connectionErr) {
            qz.websocket.connect().then(() => {
                return qz.printers.find();
            }).then((printers) => {
                const _printer_choices = [];
                printers.map(printer => {
                    _printer_choices.push({ id: printer, name: printer })
                });
                this.setState({ printer_choices: _printer_choices })
                this.setState({ isLoading: false });
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    render() {
        const { classes } = this.props;
        const _res = 'resources.stores.fields.';
        const days = [{ source1: 'sun_is_open', source2: 'sun_open', source3: 'sun_close', label: _res + 'sunday' },
        { source1: 'mon_is_open', source2: 'mon_open', source3: 'mon_close', label: _res + 'monday' },
        { source1: 'tue_is_open', source2: 'tue_open', source3: 'tue_close', label: _res + 'tuesday' },
        { source1: 'wed_is_open', source2: 'wed_open', source3: 'wed_close', label: _res + 'wednesday' },
        { source1: 'thu_is_open', source2: 'thu_open', source3: 'thu_close', label: _res + 'thursday' },
        { source1: 'fri_is_open', source2: 'fri_open', source3: 'fri_close', label: _res + 'friday' },
        { source1: 'sat_is_open', source2: 'sat_open', source3: 'sat_close', label: _res + 'saturday' },
        { source1: 'hol_is_open', source2: 'hol_open', source3: 'hol_close', label: _res + 'holyday' }];

        return !this.state.isLoading && (
            <Edit title={<StoreTitle />} {...this.props}>
                <TabbedForm toolbar={<StoreUpdateToolbar />} >
                    <FormTab label="resources.stores.tabs.main">
                        <Grid container>
                            <Grid item xs={6}>
                                <DisabledInput source="id" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextInput source="name" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextInput source="address" style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextInput source="city" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextInput source="state" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextInput source="phone" />
                            </Grid>
                        </Grid>
                    </FormTab>
                    <FormTab label="resources.stores.tabs.openingtimes">
                        {days.map(day =>
                            (<Grid key={day.source1} container alignItems='center'>
                                <Grid item xs={4}>
                                    <BooleanInput source={day.source1} label={day.label} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TimeInput source={day.source2} label={_res + "open"} options={{ format: 'HH:mm', ampm: false }} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TimeInput source={day.source3} label={_res + "close"} options={{ format: 'HH:mm', ampm: false }} />
                                </Grid>
                            </Grid>
                            )
                        )}
                    </FormTab>
                    <FormTab label="resources.stores.tabs.location">
                        <Grid container>
                            <Grid item xs={6}>
                                <DisabledInput source="location_lat" />
                            </Grid>
                            <Grid item xs={6}>
                                <DisabledInput source="location_long" />
                            </Grid>
                            <Grid item xs={12}>
                                <LocationButton />
                            </Grid>
                        </Grid>

                    </FormTab>
                    <FormTab label="resources.stores.tabs.customizing">
                        <NumberInput source="delivery_fee" validate={[number(), minValue(0)]} />

                        <SelectInput source="printer" allowEmpty choices={this.state.printer_choices} />
                    </FormTab>
                </TabbedForm>
            </Edit >);
    }
}

export default StoreEdit;
