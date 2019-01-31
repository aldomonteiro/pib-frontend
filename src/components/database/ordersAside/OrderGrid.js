import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import OrderItemList from './OrderItemList';
import OrderShow from './OrderShow';
import { translate } from 'react-admin';
import { compose } from 'recompose';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex'
    },
    sideBar: {
        width: '30%',
    },
    details: {
        width: '70%',
    }

});


class OrderGrid extends React.Component {
    state = {
        selectedIndex: null,
        isLoading: true
    };

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index }, () => {

        });
    };

    componentDidUpdate() {
        if (this.state.selectedIndex) {
            const { ids } = this.props;
            const presentId = ids.filter(id => id === this.state.selectedIndex);
            if (!presentId || presentId.length === 0) {
                this.setState({ selectedIndex: null });
            }
        }
    }

    render() {
        const { classes, ids, ...rest } = this.props;
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
                        Selecione um pedido na lista de pedidos.
                        </div>)}
            </div>
        </div >);
    }

}

OrderGrid.defaultProps = {
    data: {},
    ids: [],
};

const enhanced = compose(
    withStyles(styles),
    translate
)

export default enhanced(OrderGrid);
