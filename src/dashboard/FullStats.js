import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { AttachMoney, PlusOne, LocalPizza } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        width: 180,
    },
    title: {
        fontSize: '10px',
        color: '#d1c4e9',
    },
    content: {
        fontSize: '30px',
        color: '#673ab7',
        fontWeight: 'bold',
    },
};

const enhanced = compose(
    withStyles(styles),
    translate
);

const StatCard = enhanced(({ classes, translate, stat_title, stat_content, icon }) => (
    <Grid item>
        <Paper className={classes.paper}>
            <Card>
                <Typography className={classes.title}>
                    {icon}&nbsp;{translate(stat_title)}
                </Typography>
                <CardContent>
                    <Typography className={classes.content}>
                        {stat_content}
                    </Typography>
                </CardContent>
            </Card >
        </Paper>
    </Grid>
));


export const FullStats = withStyles(styles)(({ revenueMonth, revenueWeek, quantityMonth, quantityWeek, classes }) => {
    const sts = [
        { title: 'pos.dashboard.stats.monthly_revenue', content: revenueMonth, icon: (<AttachMoney />) },
        { title: 'pos.dashboard.stats.weekly_revenue', content: revenueWeek, icon: (<AttachMoney />) },
        { title: 'pos.dashboard.stats.monthly_orders', content: quantityMonth, icon: (<PlusOne />) },
        { title: 'pos.dashboard.stats.weekly_orders', content: quantityWeek, icon: (<PlusOne />) }]
    return (
        <Grid container className={classes.root} spacing={8}>
            {sts.map(st => <StatCard key={st.title} stat_title={st.title} stat_content={st.content} icon={st.icon} />)}
        </Grid>
    );
});

export const MinimalStats = withStyles(styles)(({ revenueMonth, revenueWeek, classes }) => {
    const sts = [
        { title: 'pos.dashboard.stats.monthly_revenue', content: revenueMonth, icon: (<AttachMoney />) },
        { title: 'pos.dashboard.stats.weekly_revenue', content: revenueWeek, icon: (<AttachMoney />) }]

    return (
        <Grid container className={classes.root} spacing={8}>
            {sts.map(st => <StatCard key={st.title} stat_title={st.title} stat_content={st.content} icon={st.icon} />)}
        </Grid>
    );
});
