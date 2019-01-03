import React from 'react';
// import Button from '@material-ui/core/Button';
import { CardActions, Button, RefreshButton } from 'react-admin';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { translate } from 'react-admin';
import Map from '@material-ui/icons/Map'

class OrderActions extends React.Component {

    handleClick = () => {
        this.props.dispatch(this.props.push("/ordersmap"));
    }

    render() {
        const {
            bulkActions,
            basePath,
            currentSort,
            displayedFilters,
            exporter,
            filters,
            filterValues,
            onUnselectItems,
            resource,
            selectedIds,
            showFilter,
            translate } = this.props;
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
                    onClick={this.handleClick}
                    label={translate('pos.orders.map')}>
                    <Map />
                </Button>
            </CardActions>
        );
    }
}

OrderActions.propTypes = {
    push: PropTypes.func,
};

const enhance = compose(
    translate,
    connect((state, props) => ({
        isLoading: state.admin.loading > 0,
        push: pushAction,
    }))
);

export default enhance(OrderActions);
