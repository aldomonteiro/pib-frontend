import React from 'react';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import { BarChart, Bar, XAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { translate } from 'react-admin';

const colors = scaleOrdinal(schemeCategory10).range();

const styles = {
    media: {
        height: '18em',
    },
};


const WeeklyOrders = ({ chartOrdersData, classes, translate }) => {
    const pw = translate('pos.dashboard.chart.pw');
    const tw = translate('pos.dashboard.chart.tw');
    return (
        <Card>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.chart.title')}
            </Typography>
            {/* <CardMedia image={mediaUrl} className={classes.media} /> */}
            <CardContent>
                <ResponsiveContainer width='100%' height={200}>
                    <BarChart data={chartOrdersData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={pw} fill="#9fa8da">
                        </Bar>
                        <Bar dataKey={tw} fill="#2196f3">
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card >
    );
}

export default withStyles(styles)(translate(WeeklyOrders));
