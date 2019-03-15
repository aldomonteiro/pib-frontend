
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate, Title, showNotification as showNotificationAction } from 'react-admin';
import {
    Button, Card,
    CardActions, CardContent, Grid, TextField, Paper,
    CircularProgress
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import CreditCard from 'react-credit-cards';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils';
import 'react-credit-cards/es/styles-compiled.css';

import { update_account as updateAccountAction } from '../actions/accountsActions';


const styles = theme => ({
    label: { display: 'inline-block' },
    button: { margin: '1em' },
    root: { flexGrow: 1 },
    bigTextField: { width: '12em' },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    long: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 360,
    },
    medium: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    short: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 80,
    }
});

class Configuration extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    };

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        if (!issuer) {
            this.props.showNotification(this.props.translate('pos.configuration.messages.invalidCreditCard'), 'warning');
        } else {
            const formData = [...e.target.elements]
                .filter(d => d.name)
                .reduce((acc, d) => {
                    acc[d.name] = d.value;
                    return acc;
                }, {});

            this.setState({ formData });
            this.props.update_account(1, { ...formData, issuer });
        }
    };

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
        const { translate, classes, isLoading } = this.props;
        return (
            <Card>
                <Title title={translate('pos.configuration.title')} />
                <CardContent>
                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} >
                                <CreditCard
                                    number={number}
                                    name={name}
                                    expiry={expiry}
                                    cvc={cvc}
                                    focused={focused}
                                    callback={this.handleCallback}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} elevation={0}>
                                    <TextField
                                        type="tel"
                                        name="number"
                                        label={translate('pos.configuration.creditCard')}
                                        pattern="[\d| ]{16,22}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        className={classes.long} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} elevation={0}>
                                    <TextField
                                        type="text"
                                        name="name"
                                        label={translate('pos.configuration.creditCardName')}
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        className={classes.medium} />

                                    <TextField
                                        name="expiry"
                                        label={translate('pos.configuration.dueDate')}
                                        placeholder='MM/AA'
                                        pattern="\d\d/\d\d"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        className={classes.short} />
                                    <TextField
                                        type="tel"
                                        name="cvc"
                                        label={translate('pos.configuration.cvc')}
                                        placeholder="CVC"
                                        pattern="\d{3,4}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        className={classes.short} />
                                    <input type="hidden" name="issuer" value={issuer} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <CardActions>
                            <Button
                                type='submit'
                                variant="raised"
                                className={classes.button}
                                color='primary'>
                                {isLoading && (
                                    <CircularProgress style={{ color: 'white' }} size={25} thickness={2} />
                                )}
                                {translate('ra.action.save')}
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
const mapDispatchToProps = dispatch => {
    return {
        update_account: bindActionCreators(updateAccountAction, dispatch),
        showNotification: bindActionCreators(showNotificationAction, dispatch),
    }
}

const enhance = compose(
    translate,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Configuration);
