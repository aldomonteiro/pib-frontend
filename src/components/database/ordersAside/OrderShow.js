import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { ShowController, ReferenceField, translate } from 'react-admin';
import Basket from './Basket';
import TypoField from './TypoField';
import {
    Card, CardHeader, CardContent, CardActions, Grid
} from '@material-ui/core';
import OnlyNameField from '../customers/OnlyNameField';
import AvatarField from '../customers/AvatarField';
import AcceptOrder from './actions/AcceptOrder';
import RejectOrderDialog from './actions/RejectOrderDialog';
import PrintOrder from './actions/PrintOrder';
import DeliverOrder from './actions/DeliverOrder';
import {
    ORDERSTATUS_PENDING,
    ORDERSTATUS_CONFIRMED,
    ORDERSTATUS_ACCEPTED,
    ORDERSTATUS_PRINTED,
    ORDERSTATUS_DELIVERED,
    ORDERSTATUS_REJECTED,
    ORDERSTATUS_CANCELLED
} from '../../../util'

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    actions: {
        display: 'flex',
    },
});

const enhance = compose(
    withStyles(styles)
)

const OrderShowActions = enhance(({ classes, record, ...rest }) => (
    <CardActions className={classes.actions} disableActionSpacing>
        {record.status < ORDERSTATUS_ACCEPTED && (<AcceptOrder record={record} {...rest} />)}
        {record.status < ORDERSTATUS_ACCEPTED && (<RejectOrderDialog record={record} {...rest} />)}
        {record.status < ORDERSTATUS_PRINTED && (<PrintOrder record={record} {...rest} />)}
        {record.status < ORDERSTATUS_DELIVERED && (<DeliverOrder record={record} {...rest} />)}
    </CardActions>)
);

const OrderShow = props => {
    const { classes, translate, ...rest } = props;
    return (<ShowController {...rest}>
        {controllerProps => {
            const { record } = controllerProps;
            const prefixI18n = 'resources.orders.fields.';
            return (<Card>
                <CardHeader
                    avatar={
                        <ReferenceField source="customerId" reference="customers" size={50} {...controllerProps}>
                            <AvatarField />
                        </ReferenceField>}
                    action={
                        <OrderShowActions {...controllerProps} />
                    }
                    title={
                        <ReferenceField source="customerId" reference="customers" {...controllerProps}>
                            <OnlyNameField />
                        </ReferenceField>}
                    subheader={new Date(record.createdAt).toLocaleString('pt-BR')}
                />
                <CardContent>
                    <Grid container spacing={8} className={classes.root}>
                        <Grid item xs={3}>
                            <TypoField fieldName={prefixI18n + 'id'} field={record.id} />
                        </Grid>
                        <Grid item xs={3}>
                            <TypoField fieldName={prefixI18n + 'createdAt'}
                                field={new Date(record.createdAt).toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' })} />
                        </Grid>
                        <Grid item xs={3}>
                            <TypoField fieldName={prefixI18n + 'phone'} field={record.phone} />
                        </Grid>
                        <Grid item xs={12}>
                            <TypoField fieldName={prefixI18n + 'address'} field={record.address} />
                        </Grid>
                        <Grid item xs={12}>
                            <Basket record={controllerProps.record} />
                        </Grid>
                        <Grid item xs={6}>
                            <TypoField fieldName={prefixI18n + 'payment_type.field_name'} field={translate(prefixI18n + 'payment_type.' + String(record.payment_type))} />
                        </Grid>
                        <Grid item xs={6}>
                            <TypoField fieldName={prefixI18n + 'comments'} field={record.comments} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>);
        }
        }
    </ShowController>);
}

OrderShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

const enhanceShow = compose(
    translate,
    withStyles(styles)
)

export default enhanceShow(OrderShow);
