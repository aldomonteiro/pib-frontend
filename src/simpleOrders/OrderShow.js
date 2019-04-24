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
import MoreMenu from './actions/MoreMenu';
import {
    // ORDERSTATUS_PENDING,
    // ORDERSTATUS_CONFIRMED,
    ORDERSTATUS_ACCEPTED,
    ORDERSTATUS_PRINTED,
    ORDERSTATUS_DELIVERED,
    // ORDERSTATUS_REJECTED,
    // ORDERSTATUS_CANCELLED
} from '../util'
import TypoFieldLarge from './TypoFieldLarge';
import MissingAddress from './actions/MissingAddress';
import OpenQuestion from './actions/OpenQuestion';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    actions: {
        display: 'flex',
    },
    divloader: {
        height: '400px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const enhance = compose(
    withStyles(styles)
)

const OrderShowActions = enhance(({ classes, record, ...rest }) => (
    <CardActions className={classes.actions} disableActionSpacing>
        <MissingAddress record={record} disabled={record.status > ORDERSTATUS_ACCEPTED} {...rest} />
        <OpenQuestion record={record} {...rest} />
        <AcceptOrder record={record} disabled={record.status > ORDERSTATUS_ACCEPTED} {...rest} />
        <RejectOrderDialog record={record} disabled={record.status > ORDERSTATUS_ACCEPTED} {...rest} />
        <PrintOrder record={record} disabled={record.status > ORDERSTATUS_PRINTED} {...rest} />
        <DeliverOrder record={record} disabled={record.status > ORDERSTATUS_DELIVERED} {...rest} />
        <MoreMenu record={record} {...rest} />
    </CardActions>)
);

const OrderShow = props => {
    const { classes, translate, ...rest } = props;
    return (<ShowController {...rest}>
        {controllerProps => {
            const { record } = controllerProps;
            const prefixI18n = 'resources.orders.fields.';
            const refDate = record && record.confirmed_at ? record.confirmed_at : record.updatedAt;
            return (< Card >
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
                    subheader={new Date(refDate).toLocaleString('pt-BR')}
                />
                <CardContent>
                    <Grid container spacing={8} className={classes.root}>
                        <Grid item xs>
                            <TypoFieldLarge fieldName={prefixI18n + 'comments'} field={record.comments} />
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
