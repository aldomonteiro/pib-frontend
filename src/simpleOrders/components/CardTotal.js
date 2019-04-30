import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardHeader, withStyles,
} from '@material-ui/core';
import UpdateTotal from '../actions/UpdateTotal';

const styles = () => ({
    card: {
        maxWidth: 700,
    }
});

const createMarkup = html => { return { __html: html } };

const CardTotal = ({ classes, text, title, record }) => {
    const separatedLines = text && text.indexOf('\n') > -1
        ? text.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
        : text;
    return (
        <Card className={classes.card}>
            <CardHeader
                action={<UpdateTotal record={record} />}
                title={title}
                subheader={
                    <span style={{ lineHeight: 0.9 }} dangerouslySetInnerHTML={createMarkup(separatedLines)} />
                }
            />
        </Card>
    );
}

CardTotal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardTotal);
