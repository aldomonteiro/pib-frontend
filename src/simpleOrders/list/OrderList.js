import React from 'react';
import {
    GET_LIST,
    translate,
    withDataProvider
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import "moment/locale/pt-br";
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';

import OrderGrid from './OrderGrid';
import LoadingPage from '../../components/LoadingPage';
import {
    update_orders_list as updateOrdersListAction,
    update_orders_admin as updateOrdersAdminAction,
    refresh_orders_admin as refreshOrdersAdminAction,
} from '../../actions/orderActions';
// import DatePicker from '../../components/DatePicker';

moment.locale('pt-br');

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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class OrderList extends React.Component {
    state = {
        ids: [],
        orders: [],
        isLoading: true,
        filterDate: new Date(),
    }

    filterValues () {
        const { dataProvider, update_orders_admin, refresh_orders_admin, orders } = this.props;
        const { filterDate } = this.state;
        dataProvider(GET_LIST, 'orders', {
            filter: { updatedAt: filterDate }, // Get date from Filter.
            sort: { field: 'updatedAt', order: 'DESC' },
            pagination: { page: 1, perPage: 999 },
        }).then(response => response.data)
            .then(data => {
                const foundOrders = data && data.length > 0 ? data : [];
                const ids = orders ? Object.keys(orders) : [];
                update_orders_admin(foundOrders, ids);
                this.setState({ isLoading: false })
            });
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
        console.log(e);
        this.setState({ filterDate: e._d, isLoading: true }, () => this.filterValues());
    }

    render () {
        const { ids, isLoading, filterDate } = this.state;
        const { orders, classes, translate, loading, ...rest } = this.props;
        return (<MuiPickersUtilsProvider utils={MomentUtils} locale={'pt-br'} moment={moment}>
            <React.Fragment>
                <InlineDatePicker
                    onlyCalendar
                    label={translate('pos.orders.ordersDate')}
                    value={filterDate}
                    openTo="year"
                    format={"DD/MM/YYYY"}
                    onChange={this.handleChange}
                    className={classes.textField}
                />
                <Divider />
                <OrderGrid
                    data={orders}
                    listLoading={isLoading}
                    basePath="/orders"
                    resource="orders"
                    locale="pt"
                    total={ids ? ids.length : 0} />
            </React.Fragment>
        </MuiPickersUtilsProvider>);
    }

}

const mapStateToProps = state => ({
    lastOrder: state.ordersReducer.lastOrder,
    orders: state.admin.resources.orders.data,
    views: state.admin.ui.viewVersion,
    loading: state.admin.loading,
});

const mapDispatchToProps = dispatch => {
    return {
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        update_orders_admin: bindActionCreators(updateOrdersAdminAction, dispatch),
        refresh_orders_admin: bindActionCreators(refreshOrdersAdminAction, dispatch),
    }
};


const enhanced = compose(
    translate,
    withDataProvider,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhanced(OrderList);
