
import React from 'react';
import { translate, Title } from 'react-admin';
import {
    Card, CardContent
} from '@material-ui/core';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import CardSocket from './CardSocket';

const styles = theme => ({
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
});

const SocketConfig = ({ translate, classes, logs }) => (
    <Card>
        <Title title={translate('pos.configuration.title')} />
        <CardContent className={classes.paper}>
            <CardSocket logs={logs} />
        </CardContent>
    </Card>
);

const mapStateToProps = state => ({
    logs: state.logsReducer.logs,
});

const enhance = compose(
    connect(mapStateToProps, null),
    translate,
    withStyles(styles),
);

export default enhance(SocketConfig);
