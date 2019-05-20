import React from 'react';
import { showNotification as showNotificationAction } from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// import io from "socket.io-client";

import {
    update_last_order as updateLastOrderAction,
    update_orders_list as updateOrdersListAction,
    update_orders_admin as updateOrdersAdminAction,
    view_order as viewOrderAction,
} from '../actions/orderActions';

import {
    add_notification as addNotificationsAction,
    update_notifications as updateNotificationsAction,
    set_connected as setConnectedAction,
} from '../actions/notificationsActions';

import {
    add_log as addLogAction,
} from '../actions/logsActions';


import MySnackBar from './SnackBar';

import SocketContext from '../socketContext';

const WithContext = (Component) => {
    return (props) => (
        <SocketContext.Consumer>
            {socket => <Component {...props} socket={socket} />}
        </SocketContext.Consumer>
    )
}

class Notifications extends React.Component {
    queue = [];

    state = {
        showNotification: false,
        messageInfo: {},
        connected: false,
    }

    componentDidMount () {
        const { socket, isConnected, set_connected, add_log } = this.props;
        console.log('componentDidMount:', socket ? socket.connected : 'socket is null');
        if (socket) {
            // if (!isConnected) { // reducer

            if (socket.connected && !this.state.connected) {
                console.log('componentDidMount: reconnecting socket');

                socket.close();
                socket.open();
            }

            socket.once('connect', () => {
                const pageID = localStorage.getItem('activePage');
                const timeStamp = sessionStorage.getItem('timeStamp');

                const id = { origin: 'web', pageID: pageID, timeStamp: timeStamp }

                // sending first message to server, so the server
                // can store who is connected
                socket.emit('acknowledgment', id);
                add_log('socket.id:' + socket.id + ' emitted ack, timeStamp:' + timeStamp);

                socket.on('new-order', data => {
                    const { view_order, update_last_order, update_orders_admin } = this.props;
                    update_orders_admin(data);
                    update_last_order(data);
                    view_order(data.id, data, true);
                    this.handleOpen('new-order', data);
                });
                socket.on('new-comment', data => {
                    const { add_notification, view_order } = this.props;
                    add_notification({ new_comment: true, ...data });
                    // update_last_order(data);
                    view_order(data.id, data, true);
                    // this.handleOpen('new-comment', data);
                });
                socket.on('talk-to-human', data => {
                    const { add_notification } = this.props;
                    add_notification(data)
                    this.handleOpen('notification', data);
                });
                socket.on('reconnect_attempt', (attempt) => {
                    const { add_log } = this.props;
                    add_log('socket.id:' + socket.id + ' reconnect_attempt n.' + attempt);
                    console.log('reconnecting attempt ' + attempt);
                    const pageID = localStorage.getItem('activePage');
                    const timeStamp = sessionStorage.getItem('timeStamp');
                    const id = { origin: 'web', pageID: pageID, timeStamp: timeStamp }

                    socket.emit('acknowledgment', id);
                });
                socket.on('ack_ok', (data) => {
                    const { add_log } = this.props;
                    add_log('socket.id:' + socket.id + ' ack_ok from server');
                    this.setState({ connected: true });
                    // const timeOut = this.state.timeOut;
                    // if (timeOut) {
                    //     clearTimeout(timeOut);
                    //     console.log('clearing timeout function');
                    //     // this.setState({ timeOut: null });
                    // }
                });
                socket.on('disconnect', (reason) => {
                    const { add_log } = this.props;
                    add_log('socket.id:' + socket.id + ' disconnection reason:' + reason);
                    console.log('disconnected for reason:', reason);
                    set_connected(false);
                });
                socket.on('error', (err) => {
                    const { add_log } = this.props;
                    add_log('socket.id:' + socket.id + ' error:' + err.message);
                    console.log(err);
                    set_connected(false);
                });
            });
            set_connected(true); // reducer
        }
        // }
    }

    handleOpen = (type, data) => {
        this.queue.push({
            notifType: type,
            notifData: data,
            key: new Date().getTime(),
        });

        if (this.state.showNotification) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({ showNotification: false });
        } else {
            this.processQueue();
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showNotification: false });
    };

    handleExited = () => {
        this.processQueue();
    };

    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(),
                showNotification: true
            });
        }
    };

    render () {
        const { key, notifType, notifData } = this.state.messageInfo
        return (
            <MySnackBar
                key={key}
                showNotification={this.state.showNotification}
                type={notifType}
                data={notifData}
                handleClose={this.handleClose}
                handleOpen={this.handleOpen}
                handleExited={this.handleExited} />
        );
    }
}

Notifications.propTypes = {
    update_last_order: PropTypes.func,
};

const mapStateToProps = state => ({
    lastOrder: state.ordersReducer.lastOrder,
    lastOrders: state.ordersReducer.lastOrders,
    notifications: state.notificationsReducer.notifications,
    isConnected: state.notificationsReducer.isConnected,
});

const mapDispatchToProps = dispatch => {
    return {
        view_order: bindActionCreators(viewOrderAction, dispatch),
        update_orders_admin: bindActionCreators(updateOrdersAdminAction, dispatch),
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        update_last_order: bindActionCreators(updateLastOrderAction, dispatch),
        showNotification: bindActionCreators(showNotificationAction, dispatch),
        add_notification: bindActionCreators(addNotificationsAction, dispatch),
        update_notifications: bindActionCreators(updateNotificationsAction, dispatch),
        set_connected: bindActionCreators(setConnectedAction, dispatch),
        add_log: bindActionCreators(addLogAction, dispatch),
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithContext,
);


export default enhance(Notifications);
