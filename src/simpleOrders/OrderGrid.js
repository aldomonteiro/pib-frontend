import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import OrderItemList from './OrderItemList';
import OrderShow from './OrderShow';
import { translate, refreshView as refreshAction } from 'react-admin';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    update_orders_list as updateOrdersListAction,
    view_order as viewOrderAction,
} from '../actions/orderActions';
import {
    update_notifications as updateNotificationsAction,
    remove_notification as removeNotificationAction,
} from '../actions/notificationsActions';
import { ORDERSTATUS_VIEWED } from '../util';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: '20vh'
    },
    sideBar: {
        width: '30%',
        overflow: 'auto',
        height: '70vh',
        minWidth: '250px',
    },
    details: {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

});

class OrderGrid extends React.Component {
    state = {
        selectedIndex: null,
        areNewOrders: false,
        isLoading: true,
    };

    componentDidUpdate () {
        const { ids, lastOrders, filterValues } = this.props;

        if (this.state.selectedIndex) {
            const presentId = ids.filter(id => id === this.state.selectedIndex);
            if (!presentId || presentId.length === 0) {
                this.setState({ selectedIndex: null });
            }
        }

        // only runs if the areNewOrders state is false. Look for ids in lastOrders
        // that are not in ids. When user clicks in the button showed by this state,
        // the areNewORders state is gonna be false again.
        if (!this.state.areNewOrders) {
            if (lastOrders && ids) {
                if (filterValues && filterValues.createdAt) {
                    const filterDate = moment(filterValues.createdAt);
                    const today = moment();
                    if (filterDate.date() === today.date()) {
                        let theNotFoundID = 0;
                        for (const newId of lastOrders) {
                            let foundId = false;
                            for (const listId of ids) {
                                console.log('newId:', newId, 'listId:', listId);
                                if (listId === newId) {
                                    foundId = true;
                                    break;
                                }
                            }
                            if (!foundId) {
                                theNotFoundID = newId;
                                break;
                            }
                        }
                        if (theNotFoundID > 0) {
                            console.log('>> The Not Found ID:', theNotFoundID);
                            this.setState({ areNewOrders: true });
                        }
                    }
                }
            }
        }
    }

    handleNewItemClick = (event, index) => {
        event.preventDefault();

        const { refreshView } = this.props;
        this.setState({ areNewOrders: false });
        refreshView();
    }

    handleListItemClick = (event, index) => {
        const { data, remove_notification, view_order } = this.props;
        const order = data[index];
        this.setState({ selectedIndex: index });

        console.log('order:', order);

        if (order.status < ORDERSTATUS_VIEWED) {

            // remove the seen order from the list
            remove_notification(order);

            view_order(index, data[index]);
        }
    };


    render () {
        const { classes, ids, translate, lastOrders, ...rest } = this.props;
        return (<div className={classes.root}>
            <div className={classes.sideBar}>
                <List component="nav">
                    {this.state.areNewOrders && (
                        <React.Fragment>
                            <ListItem button>
                                <ListItemText secondary="Novo pedido.." onClick={this.handleNewItemClick} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )}
                    {ids.map(id =>
                        (
                            <React.Fragment key={id}>
                                <OrderItemList id={id} handleListItemClick={this.handleListItemClick} selected={this.state.selectedIndex} {...rest} />
                                <Divider />
                            </React.Fragment>
                        )
                    )}
                </List>
            </div>
            <div className={classes.details}>
                {this.state.selectedIndex &&
                    (<OrderShow id={this.state.selectedIndex.toString()} {...rest} />)}
                {!this.state.selectedIndex &&
                    (<div style={{ textAlign: "center" }}>
                        <Typography variant="caption" gutterBottom align="center">
                            {translate('pos.orders.selectAnOrder')}
                        </Typography>
                    </div>)}
            </div>
        </div >);
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
