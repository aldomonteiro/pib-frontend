import React, { Fragment } from 'react';
// import Button from '@material-ui/core/Button';
import { CardActions, Button, RefreshButton, GET_LIST } from 'react-admin';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as pushAction } from 'react-router-redux';
import { translate } from 'react-admin';
import { List } from '@material-ui/icons'
import socketIOClient from "socket.io-client";
import {
    update_orders_list as updateOrdersListAction,
    update_printer as updatePrinterAction,
    update_last_order as updateLastOrderAction,

} from '../actions/orderActions';
import dataProviderFactory from '../dataProvider';
// import OrderDialog from './create';
import DeliveryTime from './DeliveryTime';
import PickupTime from './PickupTime';
import { Badge } from '@material-ui/core';

const cardActionStyle = {
    zIndex: 2,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    padding: 0,
};

class OrderActions extends React.Component {
    state = {
        ordersIds: [],
        store: null,
        isLoading: true,
        newOrders: false,
    }

    componentDidMount () {
        dataProviderFactory(GET_LIST, 'stores', {
            sort: { field: 'id', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        }).then(response => response.data)
            .then(stores => {
                this.props.update_printer(stores[0].printer)
                this.setState({
                    store: stores[0],
                    isLoading: false,
                });
            });

        const pageID = localStorage.getItem("activePage");
        const socket = socketIOClient(process.env.REACT_APP_API_URL + '?pageID=' + pageID);
        socket.on("FromAPI", data => {
            if (data !== this.props.lastOrderID) {
                const index = this.props.ids.indexOf(data);
                if (index === -1)
                    this.setState({ newOrders: true });
                else {
                    if (this.state.newOrders) {
                        this.setState({ newOrders: false });
                    }
                }
                this.props.update_last_order(data);
            }
        });
    }

    async componentDidUpdate () {
        if (this.state.ordersIds.length !== this.props.ids.length) {
            this.setState({
                ordersIds: this.props.ids,
            });
        }
    }


    handleClickMaps = () => {
        if (this.state.ordersIds && this.state.ordersIds.length > 0) {
            // Updating storage (redux state) with the list of orderIds to be used
            // in the OrdersMap component.
            this.props.update_orders_list(this.state.ordersIds);
            this.props.push("/ordersmap");
        }
    }

    handleClickReport = () => {
        this.props.push("/reportOrders");
    }

    render () {
        const {
            bulkActions,
            basePath,
            displayedFilters,
            filters,
            filterValues,
            onUnselectItems,
            resource,
            selectedIds,
            showFilter,
            translate,
            ids } = this.props;
        return (
            !this.state.isLoading &&
            <Fragment>
                <div>
                    <PickupTime record={this.state.store} />
                    <DeliveryTime record={this.state.store} />
                </div>
                <CardActions style={cardActionStyle}>
                    {bulkActions && React.cloneElement(bulkActions, {
                        basePath,
                        filterValues,
                        resource,
                        selectedIds,
                        onUnselectItems,
                    })}
                    {filters && React.cloneElement(filters, {
                        resource,
                        showFilter,
                        displayedFilters,
                        filterValues,
                        context: 'button',
                    })}
                    {this.state.newOrders &&
                        (<Badge badgeContent={"!"} color="error">
                            <RefreshButton />
                        </Badge>)}
                    {!this.state.newOrders && (<RefreshButton />)}

                    {/* Add your custom actions */}
                    {/* <OrderDialog /> */}
                    {/* <Button
                        onClick={this.handleClickMaps}
                        label={translate('pos.orders.map')}>
                        <Map />
                    </Button> */}
                    <Button
                        onClick={this.handleClickReport}
                        label={translate('pos.orders.report')}>
                        <List />
                    </Button>
                </CardActions>
            </Fragment>
        );
    }
}

OrderActions.propTypes = {
    push: PropTypes.func,
    update_orders_list: PropTypes.func,
};

const mapStateToProps = state => ({
    printer: state.printerReducer,
    lastOrderId: state.ordersReducer.lastOrderId,
});

const mapDispatchToProps = dispatch => {
    return {
        push: bindActionCreators(pushAction, dispatch),
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
        update_printer: bindActionCreators(updatePrinterAction, dispatch),
        update_last_order: bindActionCreators(updateLastOrderAction, dispatch),
    }
};


const enhance = compose(
    translate,
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(OrderActions);
