import React from 'react';
import compose from 'recompose/compose';

import { translate } from 'react-admin';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons'

import { accept_order } from '../../actions/orderActions';
import styles from './styles';

class AcceptOrder extends React.Component {

    handleClick = () => {
        const { record, accept_order } = this.props;
        const { id } = record;
        accept_order('ACCEPT', id, record)
    }

    render = () => {
        const { translate, classes, disabled } = this.props;
        return (<Tooltip title={translate('pos.orders.accept')}>
            <IconButton
                aria-label={translate('pos.orders.accept')}
                onClick={this.handleClick}
                className={classes.buttonGreen}
                disabled={disabled}
            >
                <ThumbUp />
            </IconButton>
        </Tooltip>
        );
    }
}

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(
        undefined,
        {
            accept_order
        }
    )
)

export default enhanced(AcceptOrder);