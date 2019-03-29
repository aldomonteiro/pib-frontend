import React from 'react';
import {
    AutocompleteInput,
    DateInput,
    EditController,
    FormDataConsumer,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TitleForRecord,
    TextInput,
    number, minValue, translate,
} from 'react-admin';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';

import Basket from './Basket';

const OrderTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.reportOrders.name', { smart_count: 1 })} #{
            record.reference
        }
    </span>
));

const editStyles = {
    root: { display: 'flex', alignItems: 'flex-start' },
    form: { flexGrow: 2, marginRight: '2em' },
};

const OrderEdit = ({ classes, ...props }) => (
    <EditController title={<OrderTitle />} {...props}>
        {
            controllerProps => {
                const { record, defaultTitle } = controllerProps;
                return record ? (
                    <div className={classes.root}>
                        <Card className={classes.form}>
                            <TitleForRecord
                                defaultTitle={defaultTitle}
                                record={record}
                            />
                            <SimpleForm {...controllerProps}>
                                <DateInput source="createdAt" />
                                <ReferenceInput
                                    source="customerId"
                                    reference="customers"
                                >
                                    <AutocompleteInput
                                        optionText={choice =>
                                            `${choice.first_name} ${
                                            choice.last_name
                                            }`
                                        }
                                    />
                                </ReferenceInput>
                                <SelectInput
                                    source="status2"
                                    choices={[
                                        { id: 'pending', name: 'Pendente' },
                                        { id: 'confirmed', name: 'Aguard. Análise' },
                                        { id: 'accepted', name: 'Aceito - Pend.' },
                                        { id: 'printed', name: 'Impresso' },
                                        { id: 'delivered', name: 'Entregue' },
                                        { id: 'rejected', name: 'Rejeitado' },
                                        { id: 'cancelled', name: 'Cancelado' },
                                    ]}
                                />
                                <TextInput source="phone" />
                                <TextInput source="address" />
                                <TextInput source="payment_type" />
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
                                <FormDataConsumer>
                                    {
                                        ({ formData, ...rest }) => formData.payment_type === 'payment_money'
                                            &&
                                            <SelectInput
                                                source="payment_change"
                                                choices={[
                                                    { id: 'payment_change_yes', name: 'Sim' },
                                                    { id: 'payment_change_no', name: 'Não' },
                                                ]}
                                                {...rest}
                                            />
                                    }
                                </FormDataConsumer>
                                {/* <BooleanInput source="returned" /> */}
                            </SimpleForm>
                        </Card>
                        <Basket record={record} />
                    </div>
                ) : (
                        ''
                    )
            }
        }
    </EditController >
);

export default withStyles(editStyles)(OrderEdit);
