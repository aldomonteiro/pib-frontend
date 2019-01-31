import { UPDATE_PRINTER, UPDATE_ORDERSLIST } from '../actions/orderActions';

const ordersReducerDefaultState = [];

export default (previousState = ordersReducerDefaultState, { type, payload }) => {
    if (type === UPDATE_PRINTER)
        return payload.printer;
    else if (type === UPDATE_ORDERSLIST)
        return payload.ids;
    else
        return previousState;
}