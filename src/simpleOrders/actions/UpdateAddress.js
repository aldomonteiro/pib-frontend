import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Cancel, LocationOn, Send } from '@material-ui/icons';
import { Button as RaButton, translate } from 'react-admin';
import {
    Tooltip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from '@material-ui/core';
import { update_order_data } from '../../actions/orderActions';
import styles from './styles';

class UpdateAddress extends Component {
    state = {
        showDialog: false,
        value: null,
    };


    componentDidUpdate () {
        // const selection = window.getSelection();
        // if (selection.rangeCount) {
        //     const selectedText = selection.getRangeAt(0).toString();
        //     if (this.state.value !== selectedText)
        //         this.setState({ value: selectedText });
        // }
    }


    handleClick = () => {
        const selection = window.getSelection();
        let selectedText;
        if (selection.rangeCount) {
            selectedText = selection.getRangeAt(0).toString();
        }
        this.setState({ showDialog: true, value: selectedText });
    }

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    }
    handleSend = event => {
        event.preventDefault();
        const { record, update_order_data } = this.props;
        const { id } = record;
        console.log('this.state.value:', this.state.value);
        const newData = { newAddress: this.state.value, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
        this.setState({ showDialog: false });
    };

    render () {
        const { showDialog } = this.state;
        const { label = 'pos.orders.updateOrder', classes = {}, record, translate } = this.props;
        return (
            <Fragment>
                <Tooltip title={translate('pos.orders.updateOrder')}>
                    <IconButton
                        aria-label={translate('pos.orders.updateOrder')}
                        onClick={this.handleClick}
                        color='primary'
                    >
                        <LocationOn />
                    </IconButton>
                </Tooltip>
                <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.orders.updateOrder')}
                    </DialogTitle>
                    <DialogContent>
                        <div>{translate('pos.orders.confirmAddress')}</div>
                        <TextField
                            value={this.state.value}
                            onChange={this.handleChange}
                            className={classes.textField} />
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleSend}
                            label={label}
                            className={classes.greenButton}
                            key="button">
                            <Send />
                        </RaButton>
                        <RaButton label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <Cancel />
                        </RaButton>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

UpdateAddress.propTypes = {
    classes: PropTypes.object,
    record: PropTypes.object,
    translate: PropTypes.func,
};

// DeactivateWithConfirmation.defaultProps = {
//     redirect: 'list',
// };

export default compose(
    connect(
        null,
        {
            update_order_data,
        }
    ),
    translate,
    withStyles(styles)
)(UpdateAddress);