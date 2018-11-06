import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = theme => ({
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    titleLink: { textDecoration: 'none', color: 'inherit' },
    card: {
        padding: '16px 0',
        overflow: 'inherit',
        textAlign: 'right',
    },
    title: {
        padding: '0 16px',
    },
    value: {
        padding: '0 16px',
        minHeight: 48,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    listItemText: {
        overflowY: 'hidden',
        height: '4em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
});

const location = {
    pathname: 'flavors',
    query: { filter: JSON.stringify({ status: 'pending' }) },
};

const Cardapio = ({
    fl = [],
    top = [],
    filter,
    translate,
    classes,
}) => (
        <div className={classes.main}>
            <CardIcon Icon={CommentIcon} bgColor="#f44336" />
            <Card className={classes.card}>
                <Typography className={classes.title} color="textSecondary">
                    {translate('pos.dashboard.cardapio')}
                </Typography>
                <Typography
                    variant="headline"
                    component="h2"
                    className={classes.value}
                >
                    <Link to={location} className={classes.titleLink}>
                        {translate('pos.dashboard.cardapio_tradicional')}
                    </Link>
                </Typography>
                <Divider />
                <List>
                    {fl.filter(record => record.kind === "tradicional").map(record => (
                        <ListItem
                            key={record.id}
                            button
                            component={Link}
                            to={`/flavors/${record.id}`}
                        >
                            <ListItemText
                                primary={record.flavor}
                                secondary={record.tn}
                                className={classes.listItemText}
                                style={{ paddingRight: 0 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Card>
        </div>
    );

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Cardapio);
