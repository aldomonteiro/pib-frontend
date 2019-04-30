import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ListItemSecondaryAction, Badge } from '@material-ui/core';
import StatusField from './StatusField';

const OrderItemList = ({ id, order, handleListItemClick, selected }) => (
    <MenuItem button
        selected={selected === id}
        onClick={event => handleListItemClick(event, id)}>
        <Avatar
            alt={order.customerName}
            src={order.profile_pic}
            aria-label={order.customerName} />
        <ListItemText primary={order.customerName} secondary={order.phone} />
        <ListItemSecondaryAction >
            <div>
                {order.unSeen ?
                    (<Badge color="error" badgeContent={'!'}>
                        <StatusField status2={order.status2} />
                    </Badge>) :
                    (<StatusField status2={order.status2} />)
                }
            </div>
        </ListItemSecondaryAction>
    </MenuItem>
);

export default OrderItemList;