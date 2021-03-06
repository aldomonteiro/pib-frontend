import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        color: "#ffffff",
        fontSize: theme.typography.pxToRem(12),
        width: 90,
        height: '20px',
        lineHeight: '20px',
        textAlign: "center",
        borderRadius: '2px',
    },
    buttonRed: {
        backgroundColor: "#ff8566",
    },
    buttonYellow: {
        backgroundColor: "#FFC300",
    },
    buttonDarkGreen: {
        backgroundColor: "#19B64B",
    },
    buttonLightGreen: {
        backgroundColor: "#1FFC65",
    },
    buttonOrange: {
        backgroundColor: "#FF9700",
    }
});

const StatusField = (props) => {
    const { classes } = props;
    return (
        <div className={classNames(classes.button, {
            [classes.buttonRed]: props.status2 === 'cancelled' || props.status2 === 'rejected',
            [classes.buttonYellow]: props.status2 === 'confirmed' || props.status2 === 'accepted' || props.status2 === 'viewed',
            [classes.buttonDarkGreen]: props.status2 === 'printed',
            [classes.buttonLightGreen]: props.status2 === 'delivered',
            [classes.buttonOrange]: props.status2 === 'pending',
        })}>
            {props.translate('pos.orders.status.' + props.status2)}
        </div>);
}

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(StatusField);