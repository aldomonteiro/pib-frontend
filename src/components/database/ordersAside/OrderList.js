import React from 'react';
import { List, Filter, DateInput, translate } from 'react-admin';
import OrderGrid from './OrderGrid';
import OrderActions from './OrderActions';

// in src/posts.js
const OrderFilter = (props) => {
    // This filter is set in the old orderList, and it does not exist
    // in the component orderListAside, so, I am explicitly removing it.
    if (props.filterValues && props.filterValues.status3 !== '') {
        const { filterValues, ...rest } = props;
        const { status3, ...newFilters } = filterValues;
        return (
            <Filter filterValues={newFilters} {...rest}>
                <DateInput source="confirmed_at" alwaysOn />
            </Filter>
        );
    } else {
        return (
            <Filter {...props}>
                <DateInput source="confirmed_at" alwaysOn />
            </Filter>
        );
    }
}

const OrderList = (props) => {
    return (
        <List
            title={props.translate('pos.orders.todayOrders')}
            actions={<OrderActions />}
            filters={<OrderFilter />}
            filterDefaultValues={{ confirmed_at: new Date() }}
            sort={{ field: 'status', order: 'ASC' }}
            {...props} >
            <OrderGrid />
        </List >
    );
}

export default translate(OrderList);
