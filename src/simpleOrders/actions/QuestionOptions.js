import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
});

class RadioButtonsGroup extends React.Component {
    state = {
        value: null,
        openText: null,
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        if (event.target.value !== 'opentext') {
            this.props.onChange(event);
        }
    };

    handleChangeText = event => {
        this.setState({ openText: event.target.value });
        if (this.state.value === 'opentext') {
            this.props.onChange(event);
        }
    }

    render () {
        const { classes, options, label } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" required>
                    <FormLabel component="legend">{label}</FormLabel>
                    <RadioGroup
                        aria-label={label}
                        name="mensagens"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {options && options.map(option => (
                            <FormControlLabel key={option._id} value={option.default_message} control={<Radio />} label={option.default_message} />
                        ))}
                        <FormControlLabel value="opentext" control={<Radio />}
                            label={<TextField
                                id="openTextField"
                                disabled={this.state.value !== 'opentext'}
                                multiline={true}
                                className={classes.textField}
                                value={this.state.openText}
                                onChange={this.handleChangeText} />
                            } />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
