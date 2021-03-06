import React, { Component, Fragment } from 'react';
import { GET_LIST, GET_MANY, Title, Responsive, resolveBrowserLocale, translate } from 'react-admin';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PendingOrders from './PendingOrders';
import { FullStats, MinimalStats } from './FullStats';

import Cardapio from './Cardapio';
import dataProviderFactory from '../dataProvider';
import moment from 'moment';
import WeeklyOrders from './WeeklyOrders';
import { compose } from 'redux';

import {
    ORDERSTATUS_PENDING,
    ORDERSTATUS_CONFIRMED,
    ORDERSTATUS_DELIVERED,
    ORDERSTATUS_REJECTED
} from '../util';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    flexRow: { display: 'flex', flexDirection: 'row' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};



class DashBoard extends Component {
    state = {};

    componentDidMount () {
        const { push, translate } = this.props;
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

            moment.locale(resolveBrowserLocale())
            const iniMonth = moment().startOf('month').toDate();
            const iniPastWeek = moment().startOf('week').subtract(7, 'd');
            const endPastWeek = moment().endOf('week').endOf('day').subtract(7, 'd');
            const today = moment().endOf('day');

            // When iniPastWeek is sooner than iniMonth, select iniPastWeek
            const filterDate = iniPastWeek.isBefore(iniMonth) ? iniPastWeek : iniMonth;

            // List Orders
            dataProviderFactory(GET_LIST, 'orders', {
                filter: { createdAt: [filterDate, today] },
                sort: { field: 'createdAt', order: 'DESC' },
                pagination: { page: 1, perPage: 9000 },
            })
                .then(response =>
                    response.data
                        .reduce(
                            (stats, order) => {
                                stats.nbNewOrders++;
                                stats.allOrders.push(order);
                                if (order.status < ORDERSTATUS_REJECTED) {
                                    stats.revenue += order.total || 0;
                                }
                                if (order.status < ORDERSTATUS_DELIVERED) {
                                    stats.pendingOrders.push(order);
                                }
                                return stats;
                            },
                            {
                                revenue: 0,
                                nbNewOrders: 0,
                                pendingOrders: [],
                                allOrders: [],
                            }
                        )
                )
                .then(({ revenue, nbNewOrders, pendingOrders, allOrders }) => {
                    const pastWeekOrders = [0, 0, 0, 0, 0, 0, 0];
                    const thisWeekOrders = [0, 0, 0, 0, 0, 0, 0];

                    let revenueMonth = 0;
                    let revenueWeek = 0;

                    let quantityMonth = 0;
                    let quantityWeek = 0;

                    allOrders.map(order => {
                        const mDate = moment(order.createdAt);
                        const orderWeekDay = moment(order.createdAt).weekday();

                        if (mDate.isAfter(iniMonth)) {
                            revenueMonth += order.total || 0;
                            quantityMonth++;
                        }


                        if (mDate.isBetween(iniPastWeek, endPastWeek)) {
                            pastWeekOrders[orderWeekDay]++;
                        }
                        else if (mDate.isAfter(endPastWeek)) {
                            thisWeekOrders[orderWeekDay]++;
                            revenueWeek += order.total || 0;
                            quantityWeek++;
                        }
                        return true;
                    });

                    const pw = translate('pos.dashboard.chart.pw');
                    const tw = translate('pos.dashboard.chart.tw');

                    const data = [
                        { name: 'Dom', [pw]: pastWeekOrders[0], [tw]: thisWeekOrders[0] },
                        { name: 'Seg', [pw]: pastWeekOrders[1], [tw]: thisWeekOrders[1] },
                        { name: 'Ter', [pw]: pastWeekOrders[2], [tw]: thisWeekOrders[2] },
                        { name: 'Qua', [pw]: pastWeekOrders[3], [tw]: thisWeekOrders[3] },
                        { name: 'Qui', [pw]: pastWeekOrders[4], [tw]: thisWeekOrders[4] },
                        { name: 'Sex', [pw]: pastWeekOrders[5], [tw]: thisWeekOrders[5] },
                        { name: 'Sab', [pw]: pastWeekOrders[6], [tw]: thisWeekOrders[6] },
                    ];

                    this.setState({
                        revenue: revenue.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }),
                        nbNewOrders,
                        pendingOrders,
                        chartDataQty: data,
                        revenueMonth: revenueMonth.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }),
                        revenueWeek: revenueWeek.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }),
                        quantityMonth,
                        quantityWeek
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


    render () {
        const { flavors, toppings,
            pendingOrders,
            pendingOrdersCustomers,
            chartDataQty,
            revenueMonth,
            revenueWeek,
            quantityMonth,
            quantityWeek
        } = this.state;

        const stats = { revenueMonth, revenueWeek, quantityMonth, quantityWeek };
        return (
            <Fragment>
                <Title title="pizzAIbot admin" />
                <Responsive
                    xsmall={
                        <div>
                            <div style={styles.flexColumn}>
                                <div style={styles.singleCol}>
                                    <MinimalStats {...stats} />
                                </div>
                                <div style={{ marginBottom: '2em' }}>
                                    <WeeklyOrders chartOrdersData={chartDataQty} />
                                </div>
                                {/* <div style={styles.flex}>
                                    <MonthlyRevenue value={revenue} />
                                    <NbNewOrders value={nbNewOrders} />
                                </div> */}
                                {/* <div style={styles.singleCol}>
                                    <PendingOrders
                                        orders={pendingOrders}
                                        customers={pendingOrdersCustomers}
                                    />
                                </div> */}
                            </div>
                        </div>
                    }
                    small={
                        <div style={styles.flexColumn}>
                            <div style={styles.singleCol}>
                                <FullStats {...stats} />
                            </div>
                            <div style={styles.singleCol}>
                                <WeeklyOrders chartOrdersData={chartDataQty} />
                            </div>
                            {/* <div style={styles.flex}>
                                <MonthlyRevenue value={revenue} />
                                <NbNewOrders value={nbNewOrders} />
                            </div> */}
                            {/* <div style={styles.singleCol}>
                                <PendingOrders
                                    orders={pendingOrders}
                                    customers={pendingOrdersCustomers}
                                />
                            </div> */}
                        </div>
                    }
                    medium={
                        <div style={styles.flexColumn} >
                            <div style={styles.singleCol}>
                                <FullStats {...stats} />
                            </div>
                            <div style={styles.flexRow}>
                                <div style={styles.leftCol}>
                                    {/* <div style={styles.flex}>
                                    <MonthlyRevenue value={revenue} />
                                    <NbNewOrders value={nbNewOrders} />
                                </div> */}
                                    <div style={styles.singleCol}>
                                        {/* <Welcome /> */}
                                        <WeeklyOrders chartOrdersData={chartDataQty} />
                                    </div>
                                    <div style={styles.singleCol}>
                                        <PendingOrders
                                            orders={pendingOrders}
                                            customers={pendingOrdersCustomers}
                                        />
                                    </div>
                                </div>
                                {/* <div style={styles.rightCol}>
                                    <div style={styles.flex}>
                                        <Cardapio
                                            fl={flavors}
                                            top={toppings}
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>} />

            </Fragment>
        );
    }
}

DashBoard.propTypes = {
    push: PropTypes.func,
};

const enhanced = compose(
    connect(null, { push }),
    translate
);

export default enhanced(DashBoard);