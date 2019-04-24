import React from 'react';
import { List, Filter, DateInput, translate } from 'react-admin';
import OrderGrid from './OrderGrid';
import OrderActions from './OrderActions';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import {
    update_orders_list as updateOrdersListAction,
} from '../actions/orderActions';

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

class OrderList extends React.Component {
    componentDidMount () {
        this.props.update_orders_list(false)
    }

    render () {
        const { updateOrdersList, translate, ...rest } = this.props;
        console.log('>> OrdersList updateOrdersList:', updateOrdersList);
        return (
            <List
                title={translate('pos.orders.todayOrders')}
                actions={<OrderActions />}
                filters={<OrderFilter />}
                filterDefaultValues={{ createdAt: new Date() }}
                sort={{ field: 'status', order: 'ASC' }}
                perPage={999}
                style={{ minWidth: '300px' }}
                {...rest} >
                <OrderGrid />
            </List >);
    }
}

const mapStateToProps = state => ({
    updateOrdersList: state.ordersReducer.updateOrdersList,
});

const mapDispatchToProps = dispatch => {
    return {
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
    }
};


const enhanced = compose(
    translate,
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhanced(OrderList);
