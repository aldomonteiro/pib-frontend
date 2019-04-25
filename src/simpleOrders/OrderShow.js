import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { ShowController, ReferenceField, translate } from 'react-admin';
import Basket from './Basket';
import TypoField from './TypoField';
import {
    Card, CardHeader, CardContent, CardActions, Grid, Paper
} from '@material-ui/core';
import OnlyNameField from '../customers/OnlyNameField';
import AvatarField from '../customers/AvatarField';
import AcceptOrder from './actions/AcceptOrder';
import RejectOrderDialog from './actions/RejectOrderDialog';
import PrintOrder from './actions/PrintOrder';
import DeliverOrder from './actions/DeliverOrder';
import MoreMenu from './actions/MoreMenu';
import UpdateAddress from './actions/UpdateAddress';
import UpdateTotal from './actions/UpdateTotal';
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
import PostCommentsChip from './actions/PostCommentsChip';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    rootDiv: {
        flexGrow: 1,
    },
    card: {
        height: '50%',
        overflow: 'auto',
    },
    paper: {
        padding: 5,
        margin: 5,
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
        <MissingAddress record={record} disabled={record.status >= ORDERSTATUS_ACCEPTED} {...rest} />
        <OpenQuestion record={record} {...rest} />
        <AcceptOrder record={record} disabled={record.status >= ORDERSTATUS_ACCEPTED} {...rest} />
        <RejectOrderDialog record={record} disabled={record.status >= ORDERSTATUS_ACCEPTED} {...rest} />
        <PrintOrder record={record} disabled={record.status >= ORDERSTATUS_PRINTED} {...rest} />
        <DeliverOrder record={record} disabled={record.status >= ORDERSTATUS_DELIVERED} {...rest} />
        <MoreMenu record={record} {...rest} />
    </CardActions>)
);

const OrderShow = props => {
    const { classes, translate, ...rest } = props;
    return (<ShowController {...rest}>
        {controllerProps => {
            const { record } = controllerProps;
            const prefixI18n = 'resources.orders.fields.';
            var selection = window.getSelection();
            const refDate = record ? record.confirmed_at ? record.confirmed_at : record.updatedAt : null;
            return record && (< Card>
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
                <CardContent className={classes.card}>
                    <div className={classes.rootDiv}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <TypoFieldLarge fieldName={prefixI18n + 'comments'} field={record.comments} />
                                </Paper>
                            </Grid>
                            {record && record.postComments && (
                                <Grid item xs={12}>
                                    <PostCommentsChip record={record} label={record.postComments} />
                                </Grid>
                            )}
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <TypoField fieldName={prefixI18n + 'address'} field={record.address} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <TypoField fieldName={prefixI18n + 'total'} field={record.total && record.total.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
                <CardActions>
                    <UpdateAddress record={record} />
                    <UpdateTotal record={record} />
                </CardActions>
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
