import React from 'react';
import compose from 'recompose/compose';

import { translate } from 'react-admin';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import { Map } from '@material-ui/icons'

import { notify_customer } from '../../actions/orderActions';

const styles = () => ({
    button: {
        '& svg': { color: 'red' }
    }
});

class NotifyCustomer extends React.Component {

    handleClick = () => {
        const { record, notify_customer } = this.props;
        const { id } = record;
        notify_customer('MISSING_ADDRESS', id, record)
    }

    render = () =>
        (<Tooltip title={this.props.translate('pos.orders.missingAddress')}>
            <IconButton
                aria-label={this.props.translate('pos.orders.missingAddress')}
                className={this.props.classes.button}
                onClick={this.handleClick}
            >
                <Map />
            </IconButton>
        </Tooltip>
        );
}

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(
        undefined,
        {
            notify_customer
        }
    )
)

export default enhanced(NotifyCustomer);