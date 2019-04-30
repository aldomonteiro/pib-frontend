import React from 'react';
import {
    List,
    DateInput,
    Filter,
    GET_LIST,
    resolveBrowserLocale,
    translate,
    withDataProvider
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import OrderGrid from './OrderGrid';
import LoadingPage from '../../components/LoadingPage';
import {
    update_orders_list as updateOrdersListAction,
    update_orders_admin as updateOrdersAdminAction,
} from '../../actions/orderActions';
// import DatePicker from '../../components/DatePicker';

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


class OrderList extends React.Component {
    state = {
        ids: [],
        orders: [],
        isLoading: true,
        dateValue: new Date(),
    }

    filterValues () {
        const { dataProvider } = this.props;
        const { dateValue } = this.state;

        moment.locale(resolveBrowserLocale())

        dataProvider(GET_LIST, 'orders', {
            // filter: { confirmed_at: dateValue }, // Get date from Filter.
            sort: { field: 'updatedAt', order: 'DESC' },
            pagination: { page: 1, perPage: 100 },
        })
            .then(response => this.setState({ isLoading: false }));
        // .then(response => response.data)
        // .then(orders => {
        //     const ids = [];
        //     // const data = {};
        //     for (const order of orders) {
        //         ids.push(order.id);
        //         // data[order.id] = order;
        //     }
        //     // this.setState({ ids: ids, data: data }, () => this.setState({ isLoading: false }));
        //     this.setState({ ids: ids }, () => this.setState({ isLoading: false }));
        // });
    }

    componentDidMount () {
        this.filterValues();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.views !== this.props.views) {
            this.filterValues();
        }
    }

    handleChange = (e) => {
        this.setState({ dateValue: e.target.value });
        this.filterValues();
    }

    // render () {
    //     const { updateOrdersList, translate, classes, ...rest } = this.props;
    //     const { ids, data, isLoading, dateValue } = this.state;
    //     return isLoading ? <LoadingPage className={classes.divloader} />
    //         : (
    //             <React.Fragment>
    //                 {/* <DatePicker value={dateValue} handleChange={this.handleChange} />
    //                 <Divider /> */}
    //                 <OrderGrid
    //                     ids={ids}
    //                     data={data}
    //                     basePath="/orders"
    //                     resource="orders"
    //                     locale="pt"
    //                     total={ids.length} />
    //             </React.Fragment>);
    // }
    render () {
        const { ids, isLoading } = this.state;
        const { orders, classes, ...rest } = this.props;
        return isLoading ? <LoadingPage className={classes.divloader} />
            : (
                <OrderGrid
                    data={orders}
                    basePath="/orders"
                    resource="orders"
                    locale="pt"
                    total={ids.length} />);
    }

}

const mapStateToProps = state => ({
    lastOrder: state.ordersReducer.lastOrder,
    orders: state.admin.resources.orders.data,
    views: state.admin.ui.viewVersion
});

const mapDispatchToProps = dispatch => {
    return {
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        update_orders_admin: bindActionCreators(updateOrdersAdminAction, dispatch),
    }
};


const enhanced = compose(
    translate,
    withDataProvider,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhanced(OrderList);
