import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { translate, GET_LIST } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import { Print } from '@material-ui/icons'
import shajs from 'sha.js';
import qz from 'qz-tray';

import dataProviderFactory from '../../../../dataProvider';
import { print_order } from '../../../../actions/orderActions';

class PrintOrder extends React.Component {
    state = {
        store: null
    }

    componentDidMount() {
        dataProviderFactory(GET_LIST, 'stores', {
            sort: { field: 'id', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        }).then(response => response.data)
            .then(stores => this.setState({ store: stores[0] }));

    }

    handleClick = () => {
        let dataToPrint = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw ZPL

        try {
            console.log(qz.websocket.getConnectionInfo());

            qz.printers.find(this.state.store.printer)
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

        const { record, print_order } = this.props;
        const { id } = record;
        print_order('PRINT', id, record)
    }

    render = () =>
        (<Tooltip title={this.props.translate('pos.orders.print')}>
            <IconButton
                aria-label={this.props.translate('pos.orders.print')}
                onClick={this.handleClick}
            >
                <Print />
            </IconButton>
        </Tooltip>
        );
}

const enhanced = compose(
    translate,
    connect(
        undefined,
        {
            print_order
        }
    )
)

export default enhanced(PrintOrder);