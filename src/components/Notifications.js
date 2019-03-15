import React from 'react';
import { translate, showNotification as showNotificationAction } from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import socketIOClient from "socket.io-client";

import {
    update_last_order as updateLastOrderAction,
    update_orders_list as updateOrdersListAction,
} from '../actions/orderActions';

import MySnackBar from '../components/SnackBar';

class Notifications extends React.Component {
    state = {
        showNotification: false,
        lastOrderId: null,
    }

    componentDidMount() {
        const pageID = localStorage.getItem("activePage");
        const socket = socketIOClient(process.env.REACT_APP_API_URL + '?pageID=' + pageID, { forceNew: true });
        socket.on('LastOrders', data => {
            if (data && data.length) {
                this.props.update_orders_list(data);
                if (this.props.lastOrderId !== data[0].id) {
                    this.props.update_last_order(data[0].id);
                    // this.props.showNotification(`Novo pedido: ${data[0].id}`)
                    this.handleOpen(data[0].id);
                }
            }
        });
    }

    handleOpen = (lastOrderId) => {
        this.setState({ lastOrderId: lastOrderId, showNotification: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showNotification: false });
    };


    render() {
        return (
            <MySnackBar
                showNotification={this.state.showNotification}
                lastOrderId={this.state.lastOrderId}
                handleClose={this.handleClose}
                handleOpen={this.handleOpen} />
        );
    }
}

Notifications.propTypes = {
    update_last_order: PropTypes.func,
};

const mapStateToProps = state => ({
    lastOrderId: state.ordersReducer.lastOrderId,
    lastOrders: state.ordersReducer.lastOrders,
});

const mapDispatchToProps = dispatch => {
    return {
        update_last_order: bindActionCreators(updateLastOrderAction, dispatch),
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        showNotification: bindActionCreators(showNotificationAction, dispatch),
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
);


export default enhance(Notifications);
