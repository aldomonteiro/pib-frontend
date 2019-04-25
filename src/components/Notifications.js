import React from 'react';
import { showNotification as showNotificationAction } from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// import io from "socket.io-client";

import {
    update_last_order as updateLastOrderAction,
    add_new_order as addNewOrderAction,
    update_orders_list as updateOrdersListAction,
} from '../actions/orderActions';

import {
    add_notification as addNotificationsAction,
    update_notifications as updateNotificationsAction,
    set_connected as setConnectedAction,
} from '../actions/notificationsActions';
// import SocketContext from '../socketContext'

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
    }

    componentDidMount () {
        const { socket, isConnected, set_connected } = this.props;
        if (socket) {
            if (!isConnected) { // reducer
                // const pageID = localStorage.getItem("activePage");
                // socket = io(process.env.REACT_APP_API_URL + '?pageID=' + pageID, { forceNew: true });
                socket.once('connect', () => {
                    const pageID = localStorage.getItem('activePage');
                    // replying to the server.
                    socket.emit('acknowledgment', pageID);

                    socket.on('new-order', data => {
                        const { update_last_order, add_notification, add_new_order } = this.props;
                        update_last_order(data);
                        add_new_order(data);
                        this.handleOpen('new-order', data);
                    });
                    socket.on('new-comment', data => {
                        const { add_notification } = this.props;
                        add_notification({ new_comment: true, ...data });
                        this.handleOpen('new-comment', data);
                    });
                    socket.on('talk-to-human', data => {
                        const { add_notification } = this.props;
                        add_notification(data)
                        this.handleOpen('notification', data);
                    });
                    socket.on('reconnect_attempt', (attempt) => {
                        console.log('reconnecting attempt ' + attempt);
                        const pageID = localStorage.getItem('activePage');
                        socket.emit('acknowledgment', pageID);
                    });
                    socket.on('disconnect', () => {
                        console.log('disconnected..');
                        set_connected(false);
                    });
                    socket.on('connect_error', (err) => {
                        console.log(err);
                    });
                });
                set_connected(true); // reducer
            }
        }
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
    lastOrderId: state.ordersReducer.lastOrderId,
    lastOrders: state.ordersReducer.lastOrders,
    notifications: state.notificationsReducer.notifications,
});

const mapDispatchToProps = dispatch => {
    return {
        update_last_order: bindActionCreators(updateLastOrderAction, dispatch),
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        add_new_order: bindActionCreators(addNewOrderAction, dispatch),
        showNotification: bindActionCreators(showNotificationAction, dispatch),
        add_notification: bindActionCreators(addNotificationsAction, dispatch),
        update_notifications: bindActionCreators(updateNotificationsAction, dispatch),
        set_connected: bindActionCreators(setConnectedAction, dispatch),
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithContext,
);


export default enhance(Notifications);
