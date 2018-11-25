import React from 'react';
import {
    BooleanField,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    Responsive,
    SearchInput,
    TabbedForm,
    TextField,
    TextInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/Person';

import NbItemsField from '../orders/NbItemsField';
import FullNameField from './FullNameField';
import CustomerLinkField from './CustomerLinkField';
import MobileGrid from './MobileGrid';

export const VisitorIcon = Icon;

const VisitorFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <DateInput source="last_seen_gte" />
        <NullableBooleanInput source="has_ordered" />
        <NullableBooleanInput source="has_newsletter" defaultValue />
    </Filter>
);

const colored = WrappedComponent => {
    const Colored = props =>
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <WrappedComponent {...props} />
            </span>
        ) : (
                <WrappedComponent {...props} />
            );

    Colored.displayName = `Colored(${WrappedComponent.displayName})`;

    return Colored;
};

export const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

const listStyles = {
    nb_commands: { color: 'purple' },
};

export const VisitorList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        filters={<VisitorFilter />}
        sort={{ field: 'last_seen', order: 'DESC' }}
        perPage={25}
    >
        <Responsive
            xsmall={<MobileGrid />}
            medium={
                <Datagrid>
                    <CustomerLinkField />
                    <DateField source="updatedAt" type="date" />
                    <NumberField
                        source="nb_commands"
                        label="resources.customers.fields.commands"
                        className={classes.nb_commands}
                    />
                    <ColoredNumberField
                        source="total_spent"
                        options={{ style: 'currency', currency: 'BRL' }}
                    />
                    <DateField source="latest_purchase" showTime />
                    <BooleanField source="has_newsletter" label="News." />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
));

const VisitorTitle = ({ record }) =>
    record ? <FullNameField record={record} size={32} /> : null;

const editStyles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const VisitorEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<VisitorTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.identity">
                <TextInput
                    source="first_name"
                    formClassName={classes.first_name}
                />
                <TextInput
                    source="last_name"
                    formClassName={classes.last_name}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                />
                <DateInput source="birthday" />
            </FormTab>
            <FormTab label="resources.customers.tabs.address" path="address">
                <LongTextInput
                    source="address"
                    formClassName={classes.address}
                />
                <TextInput source="zipcode" formClassName={classes.zipcode} />
                <TextInput source="city" formClassName={classes.city} />
            </FormTab>
            <FormTab label="resources.customers.tabs.orders" path="orders">
                <ReferenceManyField
                    addLabel={false}
                    sort={{ field: 'createdAt', order: 'DESC' }}
                    reference="orders"
                    target="customerId"
                >
                    <Datagrid>
                        <DateField source="createdAt" />
                        <TextField source="id" />
                        <NbItemsField />
                        <NumberField
                            source="total"
                            options={{ style: 'currency', currency: 'BRL' }}
                        />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <FormTab label="resources.customers.tabs.stats" path="stats">
                <NullableBooleanInput source="has_newsletter" />
                <DateField
                    source="first_seen"
                    style={{ width: 128, display: 'inline-block' }}
                />
                <DateField
                    source="latest_purchase"
                    style={{ width: 128, display: 'inline-block' }}
                />
                <DateField
                    source="last_seen"
                    style={{ width: 128, display: 'inline-block' }}
                />
            </FormTab>
        </TabbedForm>
    </Edit>
));

export const VisitorCreate = withStyles(editStyles)(({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.customers.tabs.identity">
                <TextInput
                    source="first_name"
                    formClassName={classes.first_name}
                />
                <TextInput
                    source="last_name"
                    formClassName={classes.last_name}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth={true}
                    formClassName={classes.email}
                />
                <DateInput source="birthday" />
            </FormTab>
            <FormTab label="resources.customers.tabs.address" path="address">
                <LongTextInput
                    source="address"
                    formClassName={classes.address}
                />
                <TextInput source="zipcode" formClassName={classes.zipcode} />
                <TextInput source="city" formClassName={classes.city} />
            </FormTab>
        </TabbedForm>
    </Create>
));
