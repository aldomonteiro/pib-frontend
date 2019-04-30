import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { translate } from 'react-admin';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function DatePicker (props) {
    const { classes, translate, handleChange, value } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label={translate('pos.orders.ordersDate')}
                type="date"
                defaultValue={new Date()}
                value={value}
                className={classes.textField}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default translate(withStyles(styles)(DatePicker));