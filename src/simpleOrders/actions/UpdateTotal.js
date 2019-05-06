import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Cancel, Edit, Send, Save } from '@material-ui/icons';
import {
    Tooltip, IconButton, Input, InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Paper, Typography,
} from '@material-ui/core';
import {
    Button as RaButton, translate,
} from 'react-admin';
import { update_order_data } from '../../actions/orderActions';
import styles from './styles';

class UpdateTotal extends Component {
    state = {
        showDialog: false,
        value: null,
        errorValue: false,
    };

    componentDidMount () {
        const { record } = this.props;
        if (record)
            this.setState({ value: record.total });
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
        const { value } = this.state;
        let newTotal;
        if (!isNaN(Number(value)))
            newTotal = value;
        else {
            const strippedValue = value.toString().replace(',', '.');
            try {
                const result = eval(strippedValue);
                if (!isNaN(Number(result)))
                    newTotal = result;
            } catch (error) {
                // do nothing..                
            }
        }
        if (newTotal) {
            const newData = { newTotal: newTotal, totalNotification: true, ...record }
            update_order_data('UPDATE_ORDER_DATA', id, newData)
            this.setState({ showDialog: false, value: newTotal, errorValue: false });
        } else this.setState({ errorValue: true });
    };

    handleSave = event => {
        event.preventDefault();
        const { record, update_order_data } = this.props;
        const { id } = record;
        const { value } = this.state;
        let newTotal;
        if (!isNaN(Number(value)))
            newTotal = value;
        else {
            const strippedValue = value.toString().replace(',', '.');
            try {
                const result = eval(strippedValue);
                if (!isNaN(Number(result)))
                    newTotal = result;
            } catch (error) {
                // do nothing..                
            }
        }
        if (newTotal) {
            const newData = { newTotal: newTotal, ...record }
            update_order_data('UPDATE_ORDER_DATA', id, newData)
            this.setState({ showDialog: false, value: newTotal, errorValue: false });
        } else this.setState({ errorValue: true });
    };

    createMarkup = html => { return { __html: html } };

    render () {
        const { showDialog, value } = this.state;
        const { classes = {}, translate, record } = this.props;
        const separatedLines = record && record.details.indexOf('\n') > -1
            ? record.details.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
            : record.details;
        return (
            <Fragment>
                <Tooltip title={translate('pos.orders.updateOrder')}>
                    <IconButton
                        aria-label={translate('pos.orders.updateOrder')}
                        onClick={this.handleClick}
                        color='primary'
                    >
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label={translate('pos.areYouSure')}>
                    <DialogTitle classes={{ root: 'dialog-title' }} >
                        {translate('pos.orders.updateOrder')}
                    </DialogTitle>
                    <DialogContent>
                        <Paper className={classes.root} elevation={1}>
                            <Typography variant='title' component="h3">
                                {translate('resources.orders.fields.details')}
                            </Typography>
                            <Typography component="p">
                                <span dangerouslySetInnerHTML={this.createMarkup(separatedLines)} />
                            </Typography>
                        </Paper>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="adornment-amount">{translate('pos.orders.confirmTotal')}</InputLabel>
                            <Input
                                error={this.state.errorValue}
                                label={this.state.errorValue && translate('pos.orders.messages.invalidTotal')}
                                id="adornment-amount"
                                value={this.state.value}
                                onChange={this.handleChange}
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleSave}
                            label={translate('pos.orders.save')}
                            className={classes.greenButton}
                            key="button">
                            <Save />
                        </RaButton>
                        <RaButton
                            onClick={this.handleSend}
                            label={translate('pos.orders.send')}
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
    label: PropTypes.string,
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
)(UpdateTotal);