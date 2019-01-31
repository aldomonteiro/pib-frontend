import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { red } from '@material-ui/core/colors';
import { ThumbDown, Cancel } from '@material-ui/icons';
import { Button as RaButton, translate } from 'react-admin';
import {
    Tooltip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField
} from '@material-ui/core';
import { reject_order } from '../../../../actions/orderActions';


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

class RejectOrderDialog extends Component {
    state = {
        showDialog: false,
        rejectionReason: ''
    };

    componentDidMount() {
        const { translate } = this.props;
        this.setState({ rejectionReason: translate('pos.orders.defaultRejectionReason') });
    }

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleChange = event => {
        this.setState({ rejectionReason: event.target.value });
    }
    handleReject = event => {
        event.preventDefault();
        this.setState({ showDialog: false });
        const { record, reject_order } = this.props;
        const { id } = record;
        reject_order('REJECT', this.state.rejectionReason, id, record)
    };

    render() {
        const { showDialog } = this.state;
        const { label = 'pos.orders.reject', classes = {}, record, translate } = this.props;
        return (
            <Fragment>
                <Tooltip title={translate('pos.orders.reject')}>
                    <IconButton
                        aria-label={translate('pos.orders.reject')}
                        className={classes.button}
                        onClick={this.handleClick}
                    >
                        <ThumbDown />
                    </IconButton>
                </Tooltip>
                <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.orders.rejecting')} “
						{record.id}”
					</DialogTitle>
                    <DialogContent>
                        <div>{translate('resources.orders.messages.warningBeforeReject')}</div>
                        <TextField
                            defaultValue={this.state.rejectionReason}
                            onChange={this.handleChange}
                            className={classes.textField} />
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleReject}
                            label={label}
                            className={classes.rejectButton}
                            key="button">
                            <ThumbDown />
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

RejectOrderDialog.propTypes = {
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
            reject_order,
        }
    ),
    translate,
    withStyles(styles)
)(RejectOrderDialog);