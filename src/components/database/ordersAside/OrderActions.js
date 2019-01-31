import React from 'react';
// import Button from '@material-ui/core/Button';
import { CardActions, Button, RefreshButton } from 'react-admin';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as pushAction } from 'react-router-redux';
import { translate } from 'react-admin';
import { Map, List } from '@material-ui/icons'
import { update_orders_list as updateOrdersListAction } from '../../../actions/orderActions';

class OrderActions extends React.Component {
    state = {
        ordersIds: []
    }

    componentDidUpdate() {
        if (this.state.ordersIds.length === 0 && this.props.ids.length > 0) {
            this.setState({
                ordersIds: this.props.ids
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
        this.props.push("/orderslist");
    }

    render() {
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
            <CardActions>
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
                {/* <CreateButton basePath={basePath} /> */}
                {/* <ExportButton
                    resource={resource}
                    sort={currentSort}
                    filter={filterValues}
                    exporter={exporter}
                /> */}
                <RefreshButton />
                {/* Add your custom actions */}
                <Button
                    onClick={this.handleClickMaps}
                    label={translate('pos.orders.map')}>
                    <Map />
                </Button>
                <Button
                    onClick={this.handleClickReport}
                    label={translate('pos.orders.report')}>
                    <List />
                </Button>
            </CardActions>
        );
    }
}

OrderActions.propTypes = {
    push: PropTypes.func,
    update_orders_list: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return {
        push: bindActionCreators(pushAction, dispatch),
        update_orders_list: bindActionCreators(updateOrdersListAction, dispatch)
    }
};


const enhance = compose(
    translate,
    connect(null, mapDispatchToProps)
);

export default enhance(OrderActions);
