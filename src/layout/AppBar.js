import React from 'react';
import { AppBar } from 'react-admin';

import { Typography, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CustomUserMenu from './CustomUserMenu';

const styles = theme => ({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    padding: {
        padding: '0px',
    },
    margin: {
        margin: -theme.spacing.unit * 2,
    },
});

const CustomAppBar = ({ classes, ...props }) => (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
        <Typography
            variant="title"
            color="inherit"
            className={classes.title}
            id="react-admin-title"
        />
        <span className={classes.spacer} />
    </AppBar>
);

export default withStyles(styles)(CustomAppBar);


// import React from 'react';
// import { AppBar, UserMenu, MenuItemLink, translate, showNotification as showNotificationAction } from 'react-admin';

// import compose from 'recompose/compose';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';

// import socketIOClient from "socket.io-client";

// import Typography from '@material-ui/core/Typography';
// import SettingsIcon from '@material-ui/icons/Settings';
// import InfoIcon from '@material-ui/icons/Info';
// import { withStyles } from '@material-ui/core/styles';
// import Notifications from '@material-ui/icons/Notifications'
// import {
//     update_last_order as updateLastOrderAction,
//     update_orders_list as updateOrdersListAction,
// } from '../actions/orderActions';

// import { Badge } from '@material-ui/core';

// import SnackBar from '../components/SnackBar';

// // import Logo from './Logo';


// const styles = theme => ({
//     title: {
//         flex: 1,
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//     },
//     spacer: {
//         flex: 1,
//     },
//     padding: {
//         padding: '0px',
//     },
//     margin: {
//         margin: -theme.spacing.unit * 2,
//     },
// });

// const CustomUserMenu = withStyles(styles)(translate(({ classes, translate, lastOrders, ...props }) => {
//     const { logout, ...rest } = props;
//     return (
//         <React.Fragment>
//             {lastOrders &&
//                 (<Badge badgeContent={lastOrders.length} color="error">
//                     <UserMenu label="pos.orders.newOrders" {...rest} icon={<Notifications />}>
//                         {lastOrders && lastOrders.map(order => (
//                             <MenuItemLink
//                                 key={order.id}
//                                 to="/orders"
//                                 primaryText={order.id + ' || ' + new Date(order.confirmed_at).toLocaleString('pt-BR')}
//                                 leftIcon={<InfoIcon />}
//                             />
//                         ))
//                         }
//                     </UserMenu>
//                 </Badge>)}
//             <UserMenu {...props} >
//                 <MenuItemLink
//                     to="/configuration"
//                     primaryText={translate('pos.configuration')}
//                     leftIcon={<SettingsIcon />}
//                 />
//             </UserMenu>
//         </React.Fragment >
//     )
// }));

// class CustomAppBar extends React.Component {
//     state = {
//         showNotification: false
//     }

//     componentDidMount() {
//         const pageID = localStorage.getItem("activePage");
//         const socket = socketIOClient(process.env.REACT_APP_API_URL + '?pageID=' + pageID, { forceNew: true });
//         socket.on('LastOrders', data => {
//             if (data && data.length) {
//                 this.props.update_orders_list(data);
//                 if (this.props.lastOrderId !== data[0].id) {
//                     this.props.update_last_order(data[0].id);
//                     // this.props.showNotification(`Novo pedido: ${data[0].id}`)
//                     this.handleOpen();
//                 }
//             }
//         });
//     }

//     handleOpen = () => {
//         this.setState({ showNotification: true });
//     };

//     handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         this.setState({ showNotification: false });
//     };


//     render() {
//         const { classes, lastOrders } = this.props;
//         return (
//             <AppBar {...this.props} userMenu={<CustomUserMenu lastOrders={lastOrders} />}>
//                 <Typography
//                     variant="title"
//                     color="inherit"
//                     className={classes.title}
//                     id="react-admin-title"
//                 />
//                 <span className={classes.spacer} />
//                 <SnackBar showNotification={this.state.showNotification} handleClose={this.handleClose} handleOpen={this.handleOpen} />
//             </AppBar>
//         );
//     }
// }

// CustomAppBar.propTypes = {
//     update_last_order: PropTypes.func,
// };

// const mapStateToProps = state => ({
//     lastOrderId: state.ordersReducer.lastOrderId,
//     lastOrders: state.ordersReducer.lastOrders,
// });

// const mapDispatchToProps = dispatch => {
//     return {
//         update_last_order: bindActionCreators(updateLastOrderAction, dispatch),
//         update_orders_list: bindActionCreators(updateOrdersListAction, dispatch),
//         showNotification: bindActionCreators(showNotificationAction, dispatch),
//     }
// };

// const enhance = compose(
//     withStyles(styles),
//     connect(mapStateToProps, mapDispatchToProps)
// );


// export default enhance(CustomAppBar);
