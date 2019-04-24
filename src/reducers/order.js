import { UPDATE_ORDERS_LIST, UPDATE_LAST_ORDER, ADD_NEW_ORDER } from '../actions/orderActions';

const ordersReducerDefaultState = [];

export default (previousState = ordersReducerDefaultState, { type, payload }) => {
    if (type === UPDATE_ORDERS_LIST)
        return { ...previousState, updateOrdersList: payload.update };
    else if (type === UPDATE_LAST_ORDER)
        return { ...previousState, lastOrderId: payload.lastOrderId };
    else if (type === ADD_NEW_ORDER) {
        if (previousState.lastOrders && previousState.lastOrders.length > 0) {
            return { ...previousState, lastOrders: [payload.newId, ...previousState.lastOrders] };
        } else
            return { ...previousState, lastOrders: [payload.newId] };
    }
    else
        return previousState;
}