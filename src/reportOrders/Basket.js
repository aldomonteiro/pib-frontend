import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link, translate, crudGetMany as crudGetManyAction } from 'react-admin';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    container: { width: '35em' },
    rightAlignedCell: { textAlign: 'right' },
    boldCell: { fontWeight: 'bold' },
};

class Basket extends Component {
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const {
            record: { items },
            crudGetMany,
        } = this.props;
        crudGetMany('flavors', items.map(item => item.flavorId));
    }
    render() {
        const { classes, record, translate } = this.props;
        const { items } = record;
        return (
            <Paper className={classes.container}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {translate(
                                    'resources.reportOrders.fields.basket.reference'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.reportOrders.fields.basket.unit_price'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.reportOrders.fields.basket.quantity'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.reportOrders.fields.basket.total'
                                )}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(
                            item =>
                                (item.flavorId || item.beverageId) && (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {item.flavorId && (
                                                <span>
                                                    <Link to={`/flavors/${item.flavorId}`}>
                                                        {item.flavor}
                                                    </Link>
                                                    &nbsp;
                                                    <Link to={`/sizes/${item.sizeId}`}>
                                                        {item.size}
                                                    </Link>
                                                </span>)}
                                            {item.beverageId && (
                                                <Link to={`/beverages/${item.beverageId}`}>
                                                    {item.beverage}
                                                </Link>)}
                                        </TableCell>
                                        <TableCell className={classes.rightAlignedCell}>
                                            {item.price.toLocaleString(undefined, {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </TableCell>
                                        <TableCell className={classes.rightAlignedCell}>
                                            {item.flavorId ?
                                                item.split ? item.qty + '/' + item.split : item.qty
                                                : 1
                                            }
                                        </TableCell>
                                        <TableCell className={classes.rightAlignedCell}>
                                            {item.flavorId ?
                                                (item.price * item.qty).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })
                                                :
                                                item.price.toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell>
                                {translate(
                                    'resources.reportOrders.fields.basket.sum'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record.total.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'BRL' }
                                )}
                            </TableCell>
                        </TableRow>
                        {/* <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell>
                                {translate(
                                    'resources.reportOrders.fields.basket.delivery'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record.delivery_fees.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'BRL' }
                                )}
                            </TableCell>
                        </TableRow> */}
                        {/* <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell>
                                {translate(
                                    'resources.reportOrders.fields.basket.tax_rate'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record.tax_rate.toLocaleString(undefined, {
                                    style: 'percent',
                                })}
                            </TableCell>
                        </TableRow> */}
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell className={classes.boldCell}>
                                {translate(
                                    'resources.reportOrders.fields.basket.total'
                                )}
                            </TableCell>
                            <TableCell
                                className={classnames(
                                    classes.boldCell,
                                    classes.rightAlignedCell
                                )}
                            >
                                {record.total.toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = (state, props) => {
    const {
        record: { items },
    } = props;
    const flavorIds = items.map(item => item.flavorId);
    return {
        products: flavorIds
            .map(productId => state.admin.resources.flavors.data[productId])
            .filter(r => typeof r !== 'undefined')
            .reduce((prev, next) => {
                prev[next.id] = next;
                return prev;
            }, {}),
    };
};

const enhance = compose(
    translate,
    withStyles(styles),
    connect(
        mapStateToProps,
        {
            crudGetMany: crudGetManyAction,
        }
    )
);

export default enhance(Basket);
