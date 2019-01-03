// in src/comments.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import { DateField, EditButton, translate, TextField } from 'react-admin';

import AvatarField from './AvatarField';
// import { ColoredNumberField } from './index';

const listStyles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'rows',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: {
        ...theme.typography.body1,
        display: 'flex',
        flexDirection: 'column',
    },
});

const MobileGrid = withStyles(listStyles)(
    translate(({ classes, ids, data, basePath, translate }) => (
        <div style={{ margin: '1em' }}>
            {ids.map(id => (
                <Card key={id} className={classes.card}>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <h2>{`${data[id].first_name} ${
                                    data[id].last_name
                                    }`}</h2>
                                <EditButton
                                    resource="visitors"
                                    basePath={basePath}
                                    record={data[id]}
                                />
                            </div>
                        }
                        avatar={<AvatarField record={data[id]} size="45" />}
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            {translate(
                                'resources.customers.fields.createdAt'
                            )}&nbsp;
                            <DateField
                                record={data[id]}
                                source="createdAt"
                                type="date"
                            />
                        </div>
                        <div>
                            {translate(
                                'resources.customers.fields.updatedAt'
                            )}&nbsp;
                            <DateField
                                record={data[id]}
                                source="updatedAt"
                                type="date"
                            />
                        </div>
                        <div>
                            {translate(
                                'resources.customers.fields.phone'
                            )}&nbsp; :{' '}
                            <TextField
                                record={data[id]}
                                source="phone"
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    ))
);

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
