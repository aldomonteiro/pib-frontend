import React from 'react';
import { List, Filter, DateInput, translate } from 'react-admin';
import OrderGrid from './OrderGrid';
import OrderActions from './OrderActions';

// in src/posts.js
const OrderFilter = (props) => {
    // This filter is set in the old orderList, and it does not exist
    // in the component orderListAside, so, I am explicitly removing it.
    if (props.filterValues) {
        const { filterValues, ...rest } = props;
        let { status3, confirmed_at_rangestart, confirmed_at_rangeend, ...newFilters } = filterValues;
        if (!newFilters || Object.keys(newFilters).length === 0)
            newFilters = { createdAt: new Date() };

        return (
            <Filter filterValues={newFilters} {...rest}>
                <DateInput source="createdAt" alwaysOn />
            </Filter>
        );
    } else {
        return (
            <Filter {...props}>
                <DateInput source="createdAt" alwaysOn />
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
            filterDefaultValues={{ createdAt: new Date() }}
            sort={{ field: 'status', order: 'ASC' }}
            perPage={999}
            {...props} >
            <OrderGrid />
        </List >
    );
}

export default translate(OrderList);
