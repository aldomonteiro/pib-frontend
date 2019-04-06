import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classnames from 'classnames';
import IconCancel from '@material-ui/icons/Cancel';
import IconClear from '@material-ui/icons/Clear';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Button as RaButton, translate } from 'react-admin';
import {
    remove_notification as removeNotificationAction,
} from '../actions/notificationsActions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    },
    deleteButton: {
        margin: theme.spacing.unit,
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    }
});

class NotificationDialog extends Component {

    handleClick = () => {
        const {
            remove_notification, // redux action
            notif, // parameter in the component
            handleClose,
        } = this.props;
        remove_notification(notif);
        handleClose();
    }

    render () {
        const { notif, classes = {}, className,
            translate, handleClose, showDialog } = this.props;

        return (
            <Fragment>
                <Dialog fullWidth open={showDialog} onClose={handleClose}>
                    <DialogTitle>
                        {translate('pos.notifications.talk_to_human')}
                    </DialogTitle>
                    <DialogContent>
                        {notif && (<div>{`${notif.id} - ${notif.first_name}`}</div>)}
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleClick}
                            label='pos.notifications.clear'
                            className={classnames('ra-delete-button', classes.deleteButton, className)}
                            key="button">
                            <IconClear />
                        </RaButton>
                        <RaButton label="ra.action.cancel" onClick={handleClose}>
                            <IconCancel />
                        </RaButton>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

NotificationDialog.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    translate: PropTypes.func,
};

const mapStateToProps = state => ({
    notifications: state.notificationsReducer.notifications,
});

const mapDispatchToProps = dispatch => {
    return {
        remove_notification: bindActionCreators(removeNotificationAction, dispatch),
    }
};

const enhance = compose(
    withStyles(styles),
    translate,
    connect(mapStateToProps, mapDispatchToProps)
);


export default enhance(NotificationDialog);