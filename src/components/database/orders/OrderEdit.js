import React from 'react';
import {
    translate,
    AutocompleteInput,
    BooleanInput,
    DateInput,
    EditController,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TitleForRecord,
} from 'react-admin';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';

import Basket from './Basket';

const OrderTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.commands.name', { smart_count: 1 })} #{
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
        {controllerProps =>
            controllerProps.record ? (
                <div className={classes.root}>
                    <Card className={classes.form}>
                        <TitleForRecord
                            defaultTitle={controllerProps.defaultTitle}
                            record={controllerProps.record}
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
                                source="status"
                                choices={[
                                    { id: 'delivered', name: 'delivered' },
                                    { id: 'ordered', name: 'ordered' },
                                    { id: 'cancelled', name: 'cancelled' },
                                ]}
                            />
                            <BooleanInput source="returned" />
                        </SimpleForm>
                    </Card>
                    <Basket record={controllerProps.record} />
                </div>
            ) : (
                    ''
                )
        }
    </EditController>
);

export default withStyles(editStyles)(OrderEdit);
