import React from 'react';
import compose from 'recompose/compose';
import {
    Typography
} from '@material-ui/core';
import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: 'bold',
    },
    detail: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: 'normal',
    },
});


const TypoField = (props) => {
    return (<React.Fragment>
        <Typography className={props.classes.heading}>
            {props.translate(props.fieldName)}
        </Typography>
        <Typography className={props.classes.detail}>
            {props.field}
        </Typography>
    </React.Fragment>);
};

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(TypoField);