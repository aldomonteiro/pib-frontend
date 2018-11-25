import React, { Component, Fragment } from 'react';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import NewCustomers from './NewCustomers';


import Cardapio from './Cardapio';
import dataProviderFactory from '../dataProvider';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class DashBoard extends Component {
    state = {};

    componentDidMount() {
        const { push } = this.props;
        if (!localStorage.getItem("activePage")) {
            push("/pagelist");
        } else {
            dataProviderFactory(GET_LIST, 'flavors', {
                sort: { field: 'flavor', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }).then(response => response.data)
                .then(flavors => this.setState({ flavors: flavors }));

            dataProviderFactory(GET_LIST, 'toppings', {
                sort: { field: 'topping', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            })
                .then(response => response.data)
                .then(toppings => this.setState({ toppings: toppings }));

            dataProviderFactory(GET_LIST, 'orders', {
                // filter: { date_gte: aMonthAgo.toISOString() },
                sort: { field: 'createdAt', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            })
                .then(response =>
                    response.data
                        .filter(order => order.status !== 0)
                        .reduce(
                            (stats, order) => {
                                if (order.status !== 0) {
                                    // stats.revenue += order.total;
                                    stats.nbNewOrders++;
                                }
                                if (order.status !== 0) {
                                    stats.pendingOrders.push(order);
                                }
                                return stats;
                            },
                            {
                                revenue: 0,
                                nbNewOrders: 0,
                                pendingOrders: [],
                            }
                        )
                )
                .then(({ revenue, nbNewOrders, pendingOrders }) => {
                    this.setState({
                        revenue: revenue.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }),
                        nbNewOrders,
                        pendingOrders,
                    });
                    return pendingOrders;
                })
                .then(pendingOrders =>
                    pendingOrders.map(order => order.customerId)
                )
                .then(customerIds =>
                    dataProviderFactory(GET_MANY, 'customers', {
                        ids: customerIds,
                    })
                )
                .then(response => response.data)
                .then(customers =>
                    customers.reduce((prev, customer) => {
                        prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                        return prev;
                    }, {})
                )
                .then(customers =>
                    this.setState({ pendingOrdersCustomers: customers })
                );
        }

    }


    render() {
        const { flavors, toppings,
            nbNewCustomers,
            nbNewOrders,
            pendingOrders,
            pendingOrdersCustomers,
            revenue,
        } = this.state;

        return (
            <Fragment>
                <Title title="pizzAIbot admin" />
                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.flex}>
                            <MonthlyRevenue value={revenue} />
                            <NbNewOrders value={nbNewOrders} />
                        </div>
                        <div style={styles.singleCol}>
                            <Welcome />
                        </div>
                        <div style={styles.singleCol}>
                            <PendingOrders
                                orders={pendingOrders}
                                customers={pendingOrdersCustomers}
                            />
                        </div>
                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.flex}>
                            <Cardapio
                                fl={flavors}
                                top={toppings}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

DashBoard.propTypes = {
    push: PropTypes.func,
};

export default connect(null, {
    push,
})(DashBoard);