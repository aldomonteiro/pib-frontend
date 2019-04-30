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


const TypoField = ({ field, fieldName, translate, classes }) => {
    const separatedLines =
        field && field.indexOf('\n') > -1
            ? field.split('\n').map((item, i) => `<p style="font-weight:normal;font-size:12px;line-height:0.90" key=${i}>${item}</p>`).join('')
            : field;
    return (<React.Fragment>
        <Typography className={classes.heading} >
            {translate(fieldName)}
        </Typography>
        <div dangerouslySetInnerHTML={createMarkup(separatedLines)} />
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