import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { translate } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import { Print } from '@material-ui/icons'
import shajs from 'sha.js';
import qz from 'qz-tray';

import { print_order } from '../../actions/orderActions';
import { ZPLPrintOrder } from '../../util/print';

class PrintOrder extends React.Component {

    handleClick = () => {
        const { record, print_order } = this.props;

        let dataToPrint = [ZPLPrintOrder(record)];   // Raw ZPL

        try {
            // console.log(qz.websocket.getConnectionInfo());
            qz.printers.find(this.state.printer)
                .then((printer) => {
                    let config = qz.configs.create(printer);
                    qz.print(config, dataToPrint);
                });
        } catch (connectionErr) {
            qz.api.setSha256Type((data) => {
                return shajs('sha256').update(data).digest('hex')
            });
            qz.api.setPromiseType((resolver) => {
                return new Promise(resolver);
            });
            qz.websocket.connect().then(() => {
                return qz.printers.find(this.state.store.printer);
            }).then((printer) => {
                let config = qz.configs.create(printer);
                qz.print(config, dataToPrint);
            }).catch((err) => {
                console.error(err);
            });
        }

        const { id } = record;
        print_order('PRINT', id, record)
    }

    render = () =>
        (<Tooltip title={this.props.translate('pos.orders.print')}>
            <IconButton
                aria-label={this.props.translate('pos.orders.print')}
                onClick={this.handleClick}
                disabled={this.props.disabled}
                color='primary'
            >
                <Print />
            </IconButton>
        </Tooltip>
        );
}

const mapStateToProps = state => ({
    printer: state.printerReducer,
});

const enhanced = compose(
    translate,
    connect(
        mapStateToProps,
        {
            print_order
        }
    )
)

export default enhanced(PrintOrder);