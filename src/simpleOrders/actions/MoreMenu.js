import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { ZPLPrintOrder } from '../../util/print';
import shajs from 'sha.js';
import qz from 'qz-tray';
import { update_order_data, print_order } from '../../actions/orderActions';


const options = [
    "Finalizar Ordem",
    "Reimprimir",
    "Voltar status"
];

const ITEM_HEIGHT = 48;

class MoreMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        this.setState({ anchorEl: null });
        const clicked = event.currentTarget.getAttribute('value');
        if (clicked === options[0]) {
            const { record, update_order_data } = this.props;
            const { id } = record;

            const newData = { closeOrder: true, ...record }
            update_order_data('UPDATE_ORDER_DATA', id, newData)

        } else if (clicked === options[1]) {
            const { record, print_order, printer } = this.props;

            let dataToPrint = [ZPLPrintOrder(record)];   // Raw ZPL

            try {
                qz.printers.find(printer)
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
                    return qz.printers.find(printer);
                }).then((qz_printer) => {
                    let config = qz.configs.create(qz_printer);
                    qz.print(config, dataToPrint);
                }).catch((err) => {
                    console.error(err);
                });
            }

            const { id } = record;
            print_order('PRINT', id, record)
        }
    };

    render () {
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} value={option} onClick={this.handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    printer: state.printerReducer.printer,
});

const enhanced = compose(
    connect(
        mapStateToProps,
        {
            print_order,
            update_order_data,
        }
    )
)

export default enhanced(MoreMenu);