import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const MySnackbarContent = props => {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
        width: 300,
    },
});

class MySnackBar extends React.Component {
    render () {
        const { classes, showNotification, handleClose, handleExited, type, data } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={showNotification}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    onExited={handleExited}>
                    {type === 'new-order' ? (
                        <MySnackbarContentWrapper
                            variant="info"
                            className={classes.margin}
                            onClose={handleClose}
                            message={`Novo pedido: ${data.id}`} />
                    ) : type === 'new-comment' ? (
                        <MySnackbarContentWrapper
                            variant="info"
                            className={classes.margin}
                            onClose={handleClose}
                            message={`Mensagem no pedido: ${data.id}`} />
                    ) : data ? (<MySnackbarContentWrapper
                        variant="warning"
                        className={classes.margin}
                        onClose={handleClose}
                        message={`${data.id} - ${data.first_name} chamou...`} />)
                                : null
                    }
                </Snackbar>
            </div>
        );
    }
}

MySnackBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(MySnackBar);