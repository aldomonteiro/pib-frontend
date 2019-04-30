import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles, Paper } from '@material-ui/core';
import OrderItemList from './OrderItemList';
import OrderShow from '../show/OrderShow';
import { translate, refreshView as refreshAction } from 'react-admin';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    update_orders_list as updateOrdersListAction,
    view_order as viewOrderAction,
} from '../../actions/orderActions';
import {
    update_notifications as updateNotificationsAction,
    remove_notification as removeNotificationAction,
} from '../../actions/notificationsActions';
import { ORDERSTATUS_VIEWED } from '../../util';

const styles = theme => ({
    root: {
        width: '100%',
        height: '80vh',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    sideBar: {
        width: '25vw',
        overflow: 'auto',
        minWidth: '250px',
        height: '100%',
        margin: 10,
    },
    details: {
        height: '100%',
        overflow: 'auto',
        width: '55vw',
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'center',
    }

});

class OrderGrid extends React.Component {
    state = {
        selectedIndex: null,
        areNewOrders: false,
        newOrder: null,
        isLoading: true,
    };

    handleNewItemClick = (event, index) => {
        if (this.state.newOrder) {
            const { remove_notification } = this.props;
            remove_notification(this.state.newOrder);

            this.setState({ areNewOrders: false, newOrder: null });
        }
    }

    handleListItemClick = (event, index) => {
        const { data, remove_notification, view_order } = this.props;
        const order = data[index];
        this.setState({ selectedIndex: index });

        if (order.status < ORDERSTATUS_VIEWED) {

            // remove the seen order from the list
            remove_notification(order);
            view_order(index, data[index], false);
        }
    };

    render () {
        const { classes, data, translate, ...rest } = this.props;
        const { selectedIndex } = this.state;
        return (<div className={classes.root}>
            <div className={classes.sideBar}>
                <List component="nav">
                    {Object.values(data).sort((a, b) => a.changed_at < b.changed_at ? 1 : -1).map(order =>
                        (
                            <React.Fragment key={order.id}>
                                <OrderItemList
                                    id={order.id}
                                    order={order}
                                    handleListItemClick={this.handleListItemClick}
                                    selected={selectedIndex} {...rest} />
                                <Divider />
                            </React.Fragment>
                        )
                    )}
                </List>
            </div>
            {selectedIndex &&
                (<div className={classes.details}>
                    <OrderShow id={selectedIndex} {...rest} />
                </div>)
            }
        </div>)
    }
}

OrderGrid.defaultProps = {
    data: {},
    ids: [],
};

const mapStateToProps = state => ({
    notifications: state.notificationsReducer.notifications,
    lastOrders: state.ordersReducer.lastOrders,
});

const mapDispatchToProps = dispatch => {
    return {
        refreshView: bindActionCreators(refreshAction, dispatch),
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        view_order: bindActionCreators(viewOrderAction, dispatch),
        update_notifications: bindActionCreators(updateNotificationsAction, dispatch),
        remove_notification: bindActionCreators(removeNotificationAction, dispatch),
    }
};

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhanced(OrderGrid);
