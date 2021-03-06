import React from 'react';

import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { UserMenu, MenuItemLink, translate } from 'react-admin';
import { push } from 'react-router-redux';
import { Badge, MenuItem, Button, withStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Info, SpeakerNotes } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications'
import NotificationDialog from './NotificationDialog';
import { remove_notification } from '../actions/notificationsActions';

const styles = theme => ({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    padding: {
        padding: '0px',
    },
    margin: {
        margin: -theme.spacing.unit * 2,
    },
    // menuItem: {
    //     '&:focus': {
    //         backgroundColor: theme.palette.primary.main,
    //         '& $primary, & $icon': {
    //             color: theme.palette.common.white,
    //         },
    //     },
    // },
});

class CustomUserMenu extends React.Component {
    state = {
        showDialog: false,
        selectedNotif: null,
    }

    handleClick = (notification) => {
        this.setState({ showDialog: true, selectedNotif: notification })
    }

    handleNotif = (notification) => {
        const { push, remove_notification } = this.props;
        remove_notification(notification);
        push('/orders');
    }


    handleClose = () => {
        this.setState({ showDialog: false })
    }

    render () {
        const { classes, translate, logout, notifications, push, ...rest } = this.props;
        return (
            <React.Fragment>
                {notifications && notifications.length > 0 &&
                    (<Badge badgeContent={notifications.length} color="error">
                        <UserMenu label="pos.notifications.newNotifications" {...rest} icon={<NotificationsIcon />}>
                            {notifications.map(notif => notif.first_name
                                ? <MenuItem key={notif.id}>
                                    <Button onClick={() => this.handleClick(notif)}>
                                        <SpeakerNotes />
                                        {notif.id + ' - ' + notif.first_name}
                                    </Button>
                                </MenuItem>
                                : notif.new_comment ?
                                    <MenuItem key={notif.id}>
                                        <Button onClick={() => this.handleNotif(notif)}>
                                            <SpeakerNotes />
                                            {translate('pos.orders.newComment') + ' - ' + notif.id}
                                        </Button>
                                    </MenuItem>
                                    : <MenuItem key={notif.id}>
                                        <Button onClick={() => push('/orders')}>
                                            <Info />
                                            {translate('pos.orders.newOrder') + ' - ' + notif.id}
                                        </Button>
                                    </MenuItem>)}
                        </UserMenu>
                    </Badge>)}
                <UserMenu {...this.props} >
                    <MenuItemLink
                        to="/configuration"
                        primaryText={translate('pos.configuration.title')}
                        leftIcon={<SettingsIcon />}
                    />
                    <MenuItemLink
                        to="/socket"
                        primaryText={translate('pos.configuration.server.title')}
                        leftIcon={<SettingsIcon />}
                    />
                </UserMenu>
                <NotificationDialog
                    showDialog={this.state.showDialog}
                    notif={this.state.selectedNotif}
                    handleClose={this.handleClose} />
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({
    notifications: state.notificationsReducer.notifications,
});


const enhance = compose(
    withStyles(styles),
    translate,
    connect(
        mapStateToProps,
        {
            push,
            remove_notification,
        })
);


export default enhance(CustomUserMenu);