import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

const style = theme => ({
    root: {
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
});

const PendingOrders = ({ orders = [], customers = {}, translate, classes }) => (
    <Card className={classes.root}>
        <CardHeader title={translate('pos.dashboard.pending_orders')} />
        <List dense={true}>
            {orders.map(record => (
                <ListItem
                    key={record.id}
                    button
                    component={Link}
                    to={`/orders/${record.id}`}
                >
                    {customers[record.customerId] ? (
                        <Avatar
                            className={classes.avatar}
                            src={`${
                                customers[record.customerId].profile_pic
                                }?size=32x32`}
                        />
                    ) : (
                            <Avatar />
                        )}
                    <ListItemText
                        primary={new Date(record.createdAt).toLocaleString('pt-BR')}
                        secondary={translate('pos.dashboard.order.items', {
                            smart_count: record.items.length,
                            nb_items: record.items.length,
                            customer_name: customers[record.userId]
                                ? `${
                                customers[record.customerId].first_name
                                } ${customers[record.customerId].last_name}`
                                : '',
                        })}
                    />
                    <ListItemSecondaryAction>
                        <span className={classes.cost}>{record.total}$</span>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </Card>
);

const enhance = compose(
    withStyles(style),
    translate
);

export default enhance(PendingOrders);
