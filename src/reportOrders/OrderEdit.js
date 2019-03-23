import React from 'react';
import {
    translate,
    AutocompleteInput,
    DateInput,
    EditController,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TitleForRecord,
    TextInput,
    FormDataConsumer
} from 'react-admin';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';

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
                                <SelectInput
                                    source="payment_type"
                                    choices={[
                                        { id: 'payment_card', name: 'Cartão' },
                                        { id: 'payment_money', name: 'Dinheiro' },
                                    ]}
                                />
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
