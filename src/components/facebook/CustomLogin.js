
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { IconContext } from "react-icons";
import { FaFacebookF } from 'react-icons/fa'

import { setfbAsyncInit, fbEnsureInit } from '../../util';

import { Notification, translate, userLogin } from 'react-admin';

const styles = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // background: 'url(https://source.unsplash.com/random/1600x900)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        maxWidth: 435,
        marginTop: '6em',
        textAlign: 'center',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
    btnlogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4267b2',
        color: 'white',
        fontFamily: 'arial,sans-serif'
    },
    title: {
        fontSize: 14,
    },
    version: {
        fontSize: 8,
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseStatus: '', // status when the component mounts
            checkAccept: false
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    async componentDidMount() {
        await setfbAsyncInit();
        await fbEnsureInit(async () => {
            // Automatic login
            await window.FB.getLoginStatus(async response => {
                // This status is important because it is the first status when the user opens the page.
                await this.setState({ responseStatus: response.status });
                if (response.status === 'connected') {
                    await window.FB.api('/me?fields=id,name,email,picture,location', async userData => {
                        let result = {
                            status: this.state.responseStatus,
                            facebookLoginStatus: response.status,
                            authResponse: response.authResponse,
                            ...userData
                        };
                        await this.props.userLogin(result, this.props.location.state ? this.props.location.state.nextPathname : '/');
                    });
                }
            });
        });
    }

    componentWillUnmount() {
    }

    facebookLoginHandler = async response => {
        // here, the user clicked login and I do not if he is a new user or not anymore,
        // because the status is connected. So, I saved on state responseStatus the 
        // first status when the page was loaded.
        // await this.setState({ responseStatus: response.status });

        console.log(response);
        if (response.status === 'connected') {
            window.FB.api('/me?fields=id,name,email,picture,location', userData => {
                let result = {
                    status: this.state.responseStatus,
                    facebookLoginStatus: response.status,
                    authResponse: response.authResponse,
                    ...userData
                };
                this.props.userLogin(
                    result,
                    this.props.location.state
                        ? this.props.location.state.nextPathname
                        : '/'
                );
            });
        }
        else {

            // TODO: here the login was not successfull.
        }
    }

    login = auth => {
        if (this.state.checkAccept) {
            if (!window.FB) return;
            window.FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    this.props.userLogin(response, this.props.location.state ? this.props.location.state.nextPathname : '/');
                }
                else if (response.status === 'authorization_expired') {
                    console.log("WARNING: need to do something about " + response.status);
                }
                else {
                    window.FB.login(this.facebookLoginHandler,
                        { scope: 'public_profile, email, manage_pages, pages_messaging, pages_messaging_subscriptions' });
                }
            }, true);
        }
    }

    render() {
        const { classes, handleSubmit, isLoading, translate } = this.props;

        let environmentTag = process.env.NODE_ENV !== 'production' ?
            (<Typography component="p" color="error">
                {process.env.NODE_ENV}<br />
                Server:{process.env.REACT_APP_API_URL}<br />
                FB App:{process.env.REACT_APP_FACEBOOK_APP_ID}
            </Typography>) : '';

        let tos = (
            <p>{translate('pos.login.agree_terms_of_service_ini')}
                < a href="https://www.pizzaibot.com/politica-de-privacidade/" >
                    {translate('pos.login.agree_terms_of_service_end')}
                </a >
            </p>);

        return (
            <div className={classes.main}>
                <Card className={classes.card}>
                    <CardHeader title={translate('pos.login.connect')} />
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {translate('pos.login.sign_in')}
                        </Typography>
                    </CardContent>
                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <form onSubmit={handleSubmit(this.login)}>
                        <CardActions className={classes.actions}>
                            <Button
                                variant="raised"
                                type="submit"
                                // color="primary"
                                // style={{
                                //     backgroundColor: '#4267b2', color: 'white',
                                //     fontFamily: 'arial,sans-serif'
                                // }}
                                disabled={isLoading}
                                fullWidth
                                className={classes.btnlogin}
                            >
                                {isLoading && (
                                    <CircularProgress style={{ color: 'white' }} size={25} thickness={2} />
                                )}
                                <IconContext.Provider value={{ size: '1.5em' }}>
                                    <div>
                                        <FaFacebookF />
                                    </div>
                                </IconContext.Provider>
                                {translate('pos.login.continue_with_facebook')}
                                {/* <div className="fb-login-button" data-max-rows="1"
                                    data-size="large" data-button-type="continue_with"
                                    data-show-faces="false" data-auto-logout-link="false"
                                    data-use-continue-as="false"></div> */}
                            </Button>
                        </CardActions>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkAccept}
                                    onChange={this.handleChange('checkAccept')}
                                    value="checkAccept"
                                    color="primary"
                                />
                            }
                            label={tos}
                        />
                    </form>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {translate('pos.login.agree_next')}
                        </Typography>
                        <Typography component="p">
                            {translate('pos.login.agree_description')}
                        </Typography>
                        <Typography className={classes.version}>
                            {'V0.9'}
                        </Typography>
                        {environmentTag}
                    </CardContent>
                </Card>
                <Notification />
            </div>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            const { translate } = props;
            if (!values.username) {
                errors.username = translate('ra.validation.required');
            }
            if (!values.password) {
                errors.password = translate('ra.validation.required');
            }
            return errors;
        },
    }),
    connect(
        mapStateToProps,
        { userLogin }
    ),
    withStyles(styles)
);

export default enhance(Login);