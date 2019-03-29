import React from "react";
import {
    Edit, DisabledInput, BooleanInput, NumberInput, TextInput, SelectInput,
    number, minValue, translate,
    TabbedForm, FormTab, Toolbar,
    ArrayInput, SimpleFormIterator
} from "react-admin";
import { TimeInput } from 'react-admin-date-inputs';
import LocationButton from './locationButton';
import { Grid, Tooltip } from "@material-ui/core";
import shajs from 'sha.js';
import qz from 'qz-tray';
import { withStyles } from '@material-ui/core/styles';
import LoadingPage from '../components/LoadingPage';
import { UpdateWithLocation } from './updateWithLocation';
import Whatsapp from "../components/Whatsapp1";
import InputAdornment from '@material-ui/core/InputAdornment';
import MaskedInput from 'react-text-mask';

const styles = theme => ({
    divloader: {
        height: '400px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});


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

function WhatsappIcon (props) {
    // We spread the properties to the underlying DOM element.
    return <div {...props}><Whatsapp /></div>
}

function TextMaskCustom (props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

class StoreEdit extends React.Component {
    state = {
        isLoading: true,
        textmask: '(55)   -        ',
        printer_choices: []
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    componentDidMount () {
        try {
            qz.api.setSha256Type((data) => {
                return shajs('sha256').update(data).digest('hex')
            });
            qz.api.setPromiseType((resolver) => {
                return new Promise(resolver);
            });

            qz.websocket.getConnectionInfo();
            qz.printers.find()
                .then((printers) => {
                    const _printer_choices = [];
                    printers.map(printer => {
                        return _printer_choices.push({ id: printer, name: printer })

                    });
                    this.setState({ printer_choices: _printer_choices });
                    this.setState({ isLoading: false });
                }).catch((err) => {
                    console.error(err);
                });
        } catch (connectionErr) {
            try {
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
                    this.setState({ isLoading: false });
                });
            } catch (err) {
                console.error(err);
                this.setState({ isLoading: false });
            }
        }
    }

    render () {
        const { classes, translate } = this.props;
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
            this.state.isLoading ? <LoadingPage className={classes.divloader} /> :
                <Edit title={<StoreTitle />} {...this.props}>
                    <TabbedForm toolbar={<StoreUpdateToolbar />} >
                        <FormTab label="resources.stores.tabs.main">
                            <Grid container>
                                <Grid item xs={6}>
                                    <DisabledInput source="id" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextInput source="name" label={_res + 'name'} />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextInput label={_res + 'address'} source="address" style={{ width: '100%' }} />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3}>
                                    <TextInput source="city" label={_res + 'city'} />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextInput source="state" label={_res + 'state'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Tooltip title={translate('pos.stores.messages.whatsapp')}>
                                        <TextInput source="phone" label={_res + 'phone_whatsapp'}
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <WhatsappIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            parse={v => v.replace(/[\D]/gi, '')} />
                                    </Tooltip>

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
                                    <DisabledInput source="location_lat" label={_res + 'location_lat'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <DisabledInput source="location_long" label={_res + 'location_long'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocationButton />
                                </Grid>
                            </Grid>

                        </FormTab>
                        <FormTab label="resources.stores.tabs.customizing">
                            <SelectInput source="printer" allowEmpty choices={this.state.printer_choices} />
                            <TextInput source='catalog_url1' />
                            <TextInput source='catalog_url2' />
                            <ArrayInput source='payment_types'>
                                <SimpleFormIterator>
                                    <TextInput source="payment_type" label="resources.stores.fields.payment_types_type" />
                                    <NumberInput source="surcharge_percent" validate={[number(), minValue(0)]}
                                        label="resources.stores.fields.payment_types_surcharge_percent"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">%</InputAdornment>)
                                        }} />
                                    <NumberInput source="surcharge_amount" validate={[number(), minValue(0)]}
                                        label="resources.stores.fields.payment_types_surcharge_amount"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">R$</InputAdornment>)
                                        }} />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </FormTab>
                        <FormTab label="resources.stores.tabs.deliveryFees">
                            <ArrayInput source="delivery_fees">
                                <SimpleFormIterator>
                                    <NumberInput source="from" validate={[number(), minValue(0)]} label="resources.stores.fields.delivery_fees_from" />
                                    <NumberInput source="to" validate={[number(), minValue(0)]} label="resources.stores.fields.delivery_fees_to" />
                                    <NumberInput source="fee" validate={[number(), minValue(0)]}
                                        label="resources.stores.fields.delivery_fees_fee"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">R$</InputAdornment>)
                                        }} />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </FormTab>
                    </TabbedForm>
                </Edit >
        );
    }
}

export default translate(withStyles(styles)(StoreEdit));
