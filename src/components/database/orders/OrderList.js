import React, { Fragment } from 'react';
import {
    AutocompleteInput,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    NumberField,
    ReferenceInput,
    Responsive,
    SearchInput,
    TextField,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/AttachMoney';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../customers/CustomerReferenceField';
import MobileGrid from './MobileGrid';
import OrderActions from './OrderActions';

import {
    ORDERSTATUS_PENDING,
    ORDERSTATUS_CONFIRMED,
    ORDERSTATUS_ACCEPTED,
    ORDERSTATUS_PRINTED,
    ORDERSTATUS_DELIVERED,
    ORDERSTATUS_REJECTED,
    ORDERSTATUS_CANCELLED
} from '../../../util'

export const OrderIcon = Icon;

const filterStyles = {
    status: { width: 150 },
};

const OrderFilter = withStyles(filterStyles)(({ classes, ...props }) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput source="customerId" reference="customers">
            <AutocompleteInput
                optionText={choice =>
                    `${choice.first_name} ${choice.last_name}`
                }
            />
        </ReferenceInput>
        <DateInput source="confirmed_at" />
    </Filter>
));

const datagridStyles = {
    total: { fontWeight: 'bold' },
};

class TabbedDatagrid extends React.Component {
    tabs = [
        { id: 'pending', name: 'Pendente' },
        { id: 'delivered', name: 'Entregue' },
        { id: 'cancelled', name: 'Cancelado' },
    ];

    state = { ordered: [], delivered: [], cancelled: [] };

    static getDerivedStateFromProps(props, state) {
        if (props.ids !== state[props.filterValues.status3]) {
            return { ...state, [props.filterValues.status3]: props.ids };
        }
        return null;
    }

    handleChange = (event, value) => {
        const { filterValues, setFilters } = this.props;
        setFilters({ ...filterValues, status3: value });
    };

    render() {
        const { classes, filterValues, ...props } = this.props;
        return (
            <Fragment>
                <Tabs
                    fullWidth
                    centered
                    value={filterValues.status3}
                    indicatorColor="primary"
                    onChange={this.handleChange}
                >
                    {this.tabs.map(choice => (
                        <Tab
                            key={choice.id}
                            label={choice.name}
                            value={choice.id}
                        />
                    ))}
                </Tabs>
                <Divider />
                <Responsive
                    xsmall={
                        <MobileGrid
                            {...props}
                            ids={this.state[filterValues.status3]}
                        />
                    }
                    medium={
                        <div>
                            {filterValues.status3 === 'pending' && (
                                <Datagrid
                                    {...props}
                                    ids={this.state['pending']}
                                >
                                    <DateField source="confirmed_at" showTime locales="pt-BR" />
                                    <TextField source="id" />
                                    <CustomerReferenceField />
                                    <TextField source="phone" />
                                    <TextField source="address" />
                                    <NbItemsField />
                                    <NumberField
                                        source="total"
                                        options={{
                                            style: 'currency',
                                            currency: 'BRL',
                                        }}
                                        className={classes.total}
                                    />
                                    <TextField source="distanceFromStore" />
                                    <EditButton />
                                </Datagrid>
                            )}
                            {filterValues.status3 === 'delivered' && (
                                <Datagrid
                                    {...props}
                                    ids={this.state['delivered']}
                                >
                                    <DateField source="confirmed_at" showTime locales="pt-BR" />
                                    <TextField source="id" />
                                    <CustomerReferenceField />
                                    <NbItemsField />
                                    <NumberField
                                        source="total"
                                        options={{
                                            style: 'currency',
                                            currency: 'BRL',
                                        }}
                                        className={classes.total}
                                    />
                                    <TextField source="distanceFromStore" />
                                    <EditButton />
                                </Datagrid>
                            )}
                            {filterValues.status3 === 'cancelled' && (
                                <Datagrid
                                    {...props}
                                    ids={this.state['cancelled']}
                                >
                                    <DateField source="confirmed_at" showTime locales="pt-BR" />
                                    <TextField source="id" />
                                    <CustomerReferenceField />
                                    <NbItemsField />
                                    <NumberField
                                        source="total"
                                        options={{
                                            style: 'currency',
                                            currency: 'BRL',
                                        }}
                                        className={classes.total}
                                    />
                                    <TextField source="distanceFromStore" />
                                    <EditButton />
                                </Datagrid>
                            )}
                        </div>
                    }
                />
            </Fragment>
        );
    }
}

const StyledTabbedDatagrid = withStyles(datagridStyles)(TabbedDatagrid);

const OrderList = ({ classes, ...props }) => {
    const newProps = {
        basePath: "/orders",
        hasCreate: false,
        hasEdit: true,
        hasList: true,
        hasShow: true,
        permissions: "admin",
        resource: "orders",
        ...props
    };
    return (
        <List
            {...newProps}
            actions={<OrderActions />}
            sort={{ field: 'confirmed_at', order: 'DESC' }}
            perPage={25}
            filters={<OrderFilter />}
        >
            <StyledTabbedDatagrid />
        </List>
    )
};

export default OrderList;
