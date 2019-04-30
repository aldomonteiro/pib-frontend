import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardHeader, withStyles,
} from '@material-ui/core';
import UpdateAddress from '../actions/UpdateAddress';

const styles = () => ({
    card: {
        maxWidth: 700,
    }
});

const createMarkup = html => { return { __html: html } };

const CardAddress = ({ classes, text, title, record }) => {
    const separatedLines = text && text.indexOf('\n') > -1
        ? text.split('\n').map((item, i) => `<p key=${i}>${item}</p>`).join('')
        : text;
    return (
        <Card className={classes.card}>
            <CardHeader
                action={<UpdateAddress record={record} />}
                title={title}
                subheader={
                    <span style={{ lineHeight: 0.9 }} dangerouslySetInnerHTML={createMarkup(separatedLines)} />
                }
            />
        </Card>
    );
}

CardAddress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardAddress);
