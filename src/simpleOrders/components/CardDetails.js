import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
    Card, CardHeader, IconButton, withStyles,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from '@material-ui/core';
import { Edit, Cancel, Save } from '@material-ui/icons';
import { Button as RaButton, translate } from 'react-admin';
import { update_order_data } from '../../actions/orderActions';
import UpdateAddress from '../actions/UpdateAddress';

const styles = () => ({
    card: {
        maxWidth: 700,
    },
    actions: {
        display: 'flex',
    },
    textField: { width: '100%' },
});

class CardComments extends React.Component {
    state = {
        showDialog: false,
        value: null,
    };

    createMarkup = html => { return { __html: html } };

    // Dialog --
    handleOpen = () => {
        this.setState({ showDialog: true, value: this.props.text });
    }

    handleClose = () => {
        this.setState({ showDialog: false });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    }
    // Dialog --

    handleEdit = () => {
        const { record, update_order_data } = this.props;
        const { id } = record;
        const { value } = this.state;

        const newData = { newDetails: value, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData);
        this.setState({ showDialog: false });
    }

    render () {
        const { classes, text, translate, title, record } = this.props;
        const { showDialog, value } = this.state;
        const separatedLines = text && text.indexOf('\n') > -1
            ? text.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
            : text;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        action={
                            <IconButton onClick={this.handleOpen} color="primary">
                                <Edit />
                            </IconButton>}
                        title={title}
                        subheader={
                            <span style={{ lineHeight: 0.9 }} dangerouslySetInnerHTML={this.createMarkup(separatedLines)} />
                        }
                    />
                </Card>
                <Dialog fullWidth
                    open={showDialog}
                    onClose={this.handleClose} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.orders.updateOrder')}
                    </DialogTitle>
                    <DialogContent>
                        <div>{translate('pos.orders.updateOrder')}</div>
                        <TextField
                            value={value}
                            onChange={this.handleChange}
                            multiline={true}
                            className={classes.textField} />
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleEdit}
                            label={translate('pos.orders.save')}
                            className={classes.greenButton}
                            key="button">
                            <Save />
                        </RaButton>
                        <RaButton label="ra.action.cancel" onClick={this.handleClose}>
                            <Cancel />
                        </RaButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

CardComments.propTypes = {
    classes: PropTypes.object.isRequired,
};

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(
        undefined,
        {
            update_order_data,
        }
    )
)

export default enhanced(CardComments);
