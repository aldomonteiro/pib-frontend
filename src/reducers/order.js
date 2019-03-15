import { UPDATE_ORDERSLIST, UPDATE_LAST_ORDER } from '../actions/orderActions';

const ordersReducerDefaultState = [];

export default (previousState = ordersReducerDefaultState, { type, payload }) => {
    if (type === UPDATE_ORDERSLIST)
        return { ...previousState, lastOrders: payload.lastOrders };
    else if (type === UPDATE_LAST_ORDER)
        return { ...previousState, lastOrderId: payload.lastOrderId };
    else
        return previousState;
}