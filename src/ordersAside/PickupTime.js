import React from 'react';
import { translate } from 'react-admin';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import { updatePickupTime as updPTAction } from '../actions/storeActions';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});

class PickupTime extends React.Component {
    constructor(props) {
        super(props);
        const pickupTime = this.props.record ? this.props.record.pickup_time : 0;
        this.state = { time: pickupTime };
        this.myTimer = null;
    }

    handleChange = event => {
        const pickupTime = event.target.value;
        this.setState({ time: pickupTime });

        if (!this.myTimer)
            this.myTimer = setInterval(() => this.updateBackEnd(), 2000);
        else {
            clearInterval(this.myTimer);
            this.myTimer = setInterval(() => this.updateBackEnd(), 2000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.myTimer);
    }

    updateBackEnd() {
        const { record } = this.props;
        this.props.updatePickupTime(record.id, this.state.time);
        clearInterval(this.myTimer);
    }

    render() {
        const { classes, translate } = this.props;
        return (
            <FormControl
                className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                aria-describedby="time-helper-text"
            >
                <TextField
                    id="adornment-time"
                    onChange={this.handleChange}
                    type='number'
                    value={this.state.time}
                    style={{ width: 75 }}
                    InputProps={{
                        'aria-label': translate('pos.orders.pickupTime'),
                        endAdornment: (<InputAdornment position="end" >
                            <Typography variant="caption" gutterBottom align="center">min.
                            </Typography>
                        </InputAdornment>)
                    }}
                />
                <FormHelperText style={{ fontSize: '10px' }} id="time-helper-text">{translate('pos.orders.pickupTime')}</FormHelperText>
            </FormControl>
        );
    }
};

PickupTime.propTypes = {
    updatePickupTime: PropTypes.func.isRequired,
    record: PropTypes.object,
    translate: PropTypes.func,
    classes: PropTypes.object,
};

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(
        null,
        {
            updatePickupTime: updPTAction,
        }
    )
);

export default enhanced(PickupTime);