import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Cancel, MonetizationOn, Send } from '@material-ui/icons';
import {
    Button as RaButton, translate, number,
    minValue, NumberInput
} from 'react-admin';
import {
    Tooltip, IconButton, Input, InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from '@material-ui/core';
import { update_order_data } from '../../actions/orderActions';
import styles from './styles';
import NumberFormatCustom from '../../components/NumberFormat';

class UpdateTotal extends Component {
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
        this.setState({ showDialog: true });
    }

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleChange = e => {
        this.setState({ value: e.target.value });
    }
    handleSend = event => {
        event.preventDefault();
        const { record, update_order_data } = this.props;
        const { id } = record;
        const newData = { newTotal: this.state.value, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
        this.setState({ showDialog: false });
    };

    render () {
        const { showDialog, value } = this.state;
        const { label = 'pos.orders.updateOrder', classes = {}, record, translate } = this.props;
        return (
            <Fragment>
                <Tooltip title={translate('pos.orders.updateOrder')}>
                    <IconButton
                        aria-label={translate('pos.orders.updateOrder')}
                        onClick={this.handleClick}
                        color='primary'
                    >
                        <MonetizationOn />
                    </IconButton>
                </Tooltip>
                <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.orders.updateOrder')}
                    </DialogTitle>
                    <DialogContent>
                        <div>{translate('pos.orders.confirmTotal')}</div>
                        <Input
                            id="adornment-amount"
                            value={this.state.value}
                            onChange={this.handleChange}
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        />
                        {/* <TextField
                            className={classes.formControl}
                            label={translate('pos.orders.total')}
                            value={value}
                            onChange={this.handleChange}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        /> */}
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

UpdateTotal.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    deletePage: PropTypes.func,
    label: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string.isRequired,
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
)(UpdateTotal);