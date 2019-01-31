import { resolveBrowserLocale } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import StatusField from './StatusField';

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

    render() {
        const { id, data, handleListItemClick, selected, classes } = this.props;
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
                            {new Date(data[id].createdAt).toLocaleTimeString(resolveBrowserLocale(), { hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                    }
                />
                <ListItemText
                    primary={""
                    }
                    secondary={
                        <Typography component="span" className={classes.inlineBold}>
                            Previsto: {new Date(data[id].createdAt).toLocaleTimeString(resolveBrowserLocale(), { hour: 'numeric', minute: 'numeric' })}
                        </Typography>
                    }
                />
                <StatusField status2={data[id].status2} />
            </MenuItem>
        );
    }
}

export default withStyles(styles)(OrderItemList);