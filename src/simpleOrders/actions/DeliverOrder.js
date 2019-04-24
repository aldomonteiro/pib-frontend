import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { translate } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import { Motorcycle } from '@material-ui/icons'

import { deliver_order } from '../../actions/orderActions';

class DeliverOrder extends React.Component {
    state = {
        store: null
    }

    handleClick = () => {
        const { record, deliver_order } = this.props;
        const { id } = record;
        deliver_order('DELIVER', id, record)
    }

    render = () =>
        (<Tooltip title={this.props.translate('pos.orders.deliver')}>
            <IconButton
                aria-label={this.props.translate('pos.orders.deliver')}
                onClick={this.handleClick}
                disabled={this.props.disabled}
            >
                <Motorcycle />
            </IconButton>
        </Tooltip>
        );
}

const enhanced = compose(
    translate,
    connect(
        undefined,
        {
            deliver_order
        }
    )
)

export default enhanced(DeliverOrder);