import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import OrderItemList from './OrderItemList';
import OrderShow from './OrderShow';
import { translate } from 'react-admin';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { view_order as viewOrderAction } from '../actions/orderActions';
import {
    update_notifications as updateNotificationsAction,
} from '../actions/notificationsActions';

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
        isLoading: true,
    };

    componentDidUpdate () {
        const { ids } = this.props;

        if (this.state.selectedIndex) {
            const presentId = ids.filter(id => id === this.state.selectedIndex);
            if (!presentId || presentId.length === 0) {
                this.setState({ selectedIndex: null });
            }
        }
    }

    handleListItemClick = (event, index) => {
        const { data, view_order, notifications, update_notifications } = this.props;
        const order = data[index];
        this.setState({ selectedIndex: index }, () => {

        });

        // remove the seen order from the list
        const newNotifs = [];
        if (notifications && notifications.length > 0) {
            for (const notif of notifications) {
                if (notif.id !== order.id) {
                    newNotifs.push(notif)
                }
            }
        }

        if (newNotifs.length > 0)
            update_notifications(newNotifs);

        // view_order(index, data[index]);
    };


    render () {
        const { classes, ids, translate, ...rest } = this.props;
        return (<div className={classes.root}>
            <div className={classes.sideBar}>
                <List component="nav">
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
});

const mapDispatchToProps = dispatch => {
    return {
        view_order: bindActionCreators(viewOrderAction, dispatch),
        update_notifications: bindActionCreators(updateNotificationsAction, dispatch),
    }
};

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhanced(OrderGrid);
