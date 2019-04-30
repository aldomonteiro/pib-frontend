import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
    Avatar, Card, CardHeader, IconButton, withStyles,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { Add, Remove, Edit, Send, Cancel } from '@material-ui/icons';
import { Button as RaButton, translate } from 'react-admin';
import { update_order_data } from '../../actions/orderActions';

const styles = () => ({
    card: {
        maxWidth: 700,
        backgroundColor: red[100],
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


    handleAdd = () => {
        const { record, update_order_data, text } = this.props;
        const { id } = record;

        const newData = { updatePostComments: 'MERGE', updatedPostComment: text, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
    }

    handleEdit = () => {
        const { record, update_order_data, text } = this.props;
        const { id } = record;
        const { value } = this.state;

        const newData = { updatePostComments: 'MERGE', updatedPostComment: value, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
    }

    handleRemove = () => {
        const { record, update_order_data, text } = this.props;
        const { id } = record;

        const newData = { updatePostComments: 'DELETE', updatedPostComment: text, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
    }

    render () {
        const { classes, text, translate } = this.props;
        const { showDialog, value } = this.state;
        const separatedLines = text && text.indexOf('\n') > -1
            ? text.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
            : text;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        action={
                            <React.Fragment>
                                <IconButton onClick={this.handleAdd} >
                                    <Add />
                                </IconButton>
                                <IconButton onClick={this.handleOpen}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={this.handleRemove}>
                                    <Remove />
                                </IconButton>
                            </React.Fragment>}
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
                            label={translate('pos.orders.updateOrder')}
                            className={classes.greenButton}
                            key="button">
                            <Send />
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
