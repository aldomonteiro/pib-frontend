import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import OrderItemList from './OrderItemList';
import OrderShow from './OrderShow';
import { translate } from 'react-admin';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { view_order as viewOrderAction } from '../actions/orderActions';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: '20vh'
    },
    sideBar: {
        width: '30%',
        overflow: 'auto',
        height: '70vh',
    },
    details: {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

});

class OrderGrid extends React.Component {
    state = {
        selectedIndex: null,
        isLoading: true,
    };

    componentDidUpdate() {
        const { ids } = this.props;

        if (this.state.selectedIndex) {
            const presentId = ids.filter(id => id === this.state.selectedIndex);
            if (!presentId || presentId.length === 0) {
                this.setState({ selectedIndex: null });
            }
        }
    }

    handleListItemClick = (event, index) => {
        const { data, view_order } = this.props;

        this.setState({ selectedIndex: index }, () => {

        });
        
        view_order(index, data[index]);
    };


    render() {
        const { classes, ids, translate, ...rest } = this.props;
        return (<div className={classes.root}>
            <div className={classes.sideBar}>
                <List component="nav">
                    {ids.map(id =>
                        (
                            <React.Fragment key={id}>
                                <OrderItemList id={id} handleListItemClick={this.handleListItemClick} selected={this.state.selectedIndex} {...rest} />
                                <Divider />
                            </React.Fragment>
                        )
                    )}
                </List>
            </div>
            <div className={classes.details}>
                {this.state.selectedIndex &&
                    (<OrderShow id={this.state.selectedIndex.toString()} {...rest} />)}
                {!this.state.selectedIndex &&
                    (<div style={{ textAlign: "center" }}>
                        <Typography variant="caption" gutterBottom align="center">
                            {translate('pos.orders.selectAnOrder')}
                        </Typography>
                    </div>)}
            </div>
        </div >);
    }

}

OrderGrid.defaultProps = {
    data: {},
    ids: [],
};

const mapStateToProps = state => ({
    lastSeenId: state.ordersReducer.lastSeenId,
});

const mapDispatchToProps = dispatch => {
    return {
        view_order: bindActionCreators(viewOrderAction, dispatch),
    }
};

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhanced(OrderGrid);