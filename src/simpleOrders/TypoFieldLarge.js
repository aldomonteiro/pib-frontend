import React from 'react';
import compose from 'recompose/compose';
import {
    Typography
} from '@material-ui/core';
import { translate } from 'react-admin';

const TypoField = (props) => {
    const separatedLines =
        props.field && props.field.indexOf('\n') > -1
            ? props.field.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
            : props.field;
    return (<React.Fragment>
        <Typography variant='headline'>
            {props.translate(props.fieldName)}
        </Typography>
        <Typography variant='body2'>
            <div style={{ lineHeight: '0.75' }} dangerouslySetInnerHTML={createMarkup(separatedLines)} />
        </Typography>
    </React.Fragment>);
};

function createMarkup (html) {
    return { __html: html };
}

const enhance = compose(
    translate
);

export default enhance(TypoField);