import React from 'react';
import { resolveBrowserLocale } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import StatusField from './StatusField';
import { ORDERSTATUS_CONFIRMED } from '../util';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        fontSize: '10px',
        color: grey,
    },
    inlineBold: {
        display: 'inline',
        fontSize: '10px',
        color: '#000000',
        fontWeight: 'bold',
    },
    regular: {
        fontSize: '10px',
        color: grey,
    },
    container: {
        width: 70,
    },
});

class OrderItemList extends React.Component {

    render () {
        const { id, data, handleListItemClick, selected, classes } = this.props;

        const status = data[id] ? data[id].status : 99;
        const status2 = data[id] ? data[id].status2 : 'ERRO';

        const statusField = status === ORDERSTATUS_CONFIRMED ?
            (<Badge color="error" badgeContent={'!'}>
                <StatusField status2={status2} />
            </Badge>) :
            (<StatusField status2={status2} />);

        return (
            <MenuItem button
                selected={selected === id}
                onClick={event => handleListItemClick(event, id)}>
                <ListItemText
                    primary={
                        <Typography component="span" className={classes.regular}>
                            {"#" + id}
                        </Typography>}
                    secondary={
                        <Typography component="span" className={classes.inline}>
                            {new Date(data[id].updatedAt).toLocaleTimeString(resolveBrowserLocale(), { hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                    }
                />
                <ListItemText
                    primary={""
                    }
                    secondary={
                        <Typography component="span" className={classes.inlineBold}>
                            Previsto: {new Date(data[id].deliverAt).toLocaleTimeString(resolveBrowserLocale(), { hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                    }
                />
                {statusField}
            </MenuItem>
        );
    }
}

const mapStateToProps = state => ({
    lastOrderId: state.ordersReducer.lastOrderId,
    seenIds: state.ordersReducer.seenIds,
});

const enhanced = compose(
    withStyles(styles),
    connect(mapStateToProps, null)
);

export default enhanced(OrderItemList);