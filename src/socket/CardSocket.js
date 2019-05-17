import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SocketContext from '../socketContext';

const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    table: {
        minWidth: 400,
    }
};

const WithContext = (Component) => {
    return (props) => (
        <SocketContext.Consumer>
            {socket => <Component {...props} socket={socket} />}
        </SocketContext.Consumer>
    )
}
function SimpleCard (props) {
    const { classes, socket, logs } = props;
    console.log(socket);
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {socket.connected ? 'Conectado ao servidor' : 'Desconectado do Servidor'}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Clique em reconectar caso o serviço não esteja conectado.
                    </Typography>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Horário</TableCell>
                                <TableCell>Log</TableCell>
                            </TableRow>
                        </TableHead>
                        {logs && (
                            <TableBody>
                                {logs.map((log, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {log.time}
                                        </TableCell>
                                        <TableCell>{log.log}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            const pageID = localStorage.getItem('activePage');
                            const timeStamp = sessionStorage.getItem('timeStamp');
                            const id = { origin: 'web', pageID: pageID, timeStamp: timeStamp }
                            socket.close();
                            socket.open();
                            socket.emit('acknowledgment', id);
                        }} >Reconectar</Button>
                </CardActions>
            </Card>
        </div>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WithContext(SimpleCard));