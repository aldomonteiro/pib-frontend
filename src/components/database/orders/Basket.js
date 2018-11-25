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
        const { classes, record, products, translate } = this.props;
        const { items } = record;
        return (
            <Paper className={classes.container}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {translate(
                                    'resources.commands.fields.basket.reference'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.unit_price'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.quantity'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {translate(
                                    'resources.commands.fields.basket.total'
                                )}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(
                            item =>
                                products[item.flavorId] && (
                                    <TableRow key={item.flavorId}>
                                        <TableCell>
                                            <Link
                                                to={`/flavors/${
                                                    item.flavorId
                                                    }`}
                                            >
                                                {
                                                    products[item.flavorId]
                                                        .reference
                                                }
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            className={classes.rightAlignedCell}
                                        >
                                            {products[
                                                item.flavorId
                                            ].price.toLocaleString(undefined, {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </TableCell>
                                        <TableCell
                                            className={classes.rightAlignedCell}
                                        >
                                            {item.qty}
                                        </TableCell>
                                        <TableCell
                                            className={classes.rightAlignedCell}
                                        >
                                            {(
                                                products[item.flavorId]
                                                    .price * item.qty
                                            ).toLocaleString(undefined, {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell>
                                {translate(
                                    'resources.commands.fields.basket.sum'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record.total.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'BRL' }
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell>
                                {translate(
                                    'resources.commands.fields.basket.delivery'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record.delivery_fees.toLocaleString(
                                    undefined,
                                    { style: 'currency', currency: 'BRL' }
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell>
                                {translate(
                                    'resources.commands.fields.basket.tax_rate'
                                )}
                            </TableCell>
                            <TableCell className={classes.rightAlignedCell}>
                                {record.tax_rate.toLocaleString(undefined, {
                                    style: 'percent',
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell className={classes.boldCell}>
                                {translate(
                                    'resources.commands.fields.basket.total'
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
    const productIds = items.map(item => item.flavorId);
    return {
        products: productIds
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
