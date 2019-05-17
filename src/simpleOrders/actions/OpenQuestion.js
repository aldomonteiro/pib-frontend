import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { red } from '@material-ui/core/colors';
import { Cancel, Send } from '@material-ui/icons';
import { Button as RaButton, translate, GET_ONE } from 'react-admin';
import {
    Tooltip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from '@material-ui/core';
import { notify_customer } from '../../actions/orderActions';
import { update_stores_admin } from '../../actions/storeActions';
import QuestionOptions from './QuestionOptions';
import dataProviderFactory from '../../dataProvider';

const styles = theme => ({
    button: {
        '& svg': { color: red[500] }
    },
    textField: { width: '100%' },
    rejectButton: {
        margin: theme.spacing.unit,
        color: theme.palette.error.main,
        '& svg': theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    }
});

class NotifyCustomer extends Component {
    state = {
        showDialog: false,
        question: ''
    };

    async componentDidMount () {
        const { translate, store, update_stores_admin } = this.props;
        this.setState({ question: translate('pos.orders.defaultQuestion') });
        if (!store[1]) {
            const res = await dataProviderFactory(GET_ONE, 'stores', { id: 1 });
            update_stores_admin(res.data);
        }
    }

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleChange = event => {
        this.setState({ question: event.target.value });
    }
    handleSend = event => {
        event.preventDefault();
        this.setState({ showDialog: false });
        const { record, notify_customer } = this.props;
        const { id } = record;
        const newData = { question: this.state.question, ...record }
        notify_customer('OPEN_QUESTION', id, newData)
    };

    render () {
        const { showDialog } = this.state;
        const { label = 'pos.orders.send', classes = {}, record, translate } = this.props;
        const { store } = this.props;
        return (
            <Fragment>
                <Tooltip title={translate('pos.orders.send')}>
                    <IconButton
                        aria-label={translate('pos.orders.send')}
                        onClick={this.handleClick}
                        color='primary'
                    >
                        <Send />
                    </IconButton>
                </Tooltip>
                <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.orders.openQuestion')} “
                        {record.id}”
                    </DialogTitle>
                    <DialogContent>
                        <QuestionOptions
                            label={translate('pos.orders.typeQuestion')}
                            onChange={this.handleChange}
                            options={store[1] && store[1].default_messages} />
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleSend}
                            label={label}
                            className={classes.rejectButton}
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

NotifyCustomer.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    deletePage: PropTypes.func,
    label: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string.isRequired,
    translate: PropTypes.func,
};

const mapStateToProps = state => ({
    store: state.admin.resources.stores.data,
});

export default compose(
    connect(
        mapStateToProps,
        {
            notify_customer,
            update_stores_admin
        }
    ),
    translate,
    withStyles(styles)
)(NotifyCustomer);