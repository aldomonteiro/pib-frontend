import { UPDATE_PRINTER } from '../actions/orderActions';

export default (previousState = { printer: undefined }, { type, payload }) => {
    if (type === UPDATE_PRINTER) {
        return { printer: payload.printer };
    }
    return previousState;
}