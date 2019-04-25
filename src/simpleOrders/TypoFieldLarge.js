import React from 'react';
import compose from 'recompose/compose';
import {
    Typography
} from '@material-ui/core';
import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
    },
    detail: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: 'normal',
        lineHeight: '0.75'
    },
});


const TypoField = (props) => {
    const separatedLines =
        props.field && props.field.indexOf('\n') > -1
            ? props.field.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
            : props.field;
    return (<React.Fragment>
        <Typography className={props.classes.heading} >
            {props.translate(props.fieldName)}
        </Typography>
        <Typography className={props.classes.detail} >
            <div dangerouslySetInnerHTML={createMarkup(separatedLines)} />
        </Typography>
    </React.Fragment>);
};

function createMarkup (html) {
    return { __html: html };
}

const enhance = compose(
    translate,
    withStyles(styles)
);

export default enhance(TypoField);