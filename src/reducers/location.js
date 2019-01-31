import * as types from '../actions/locationTypes';

export default (previousState = { lat: undefined, long: undefined }, { type, payload }) => {
    if (type === types.UPDATE_LOCATION) {
        return { lat: payload.lat, long: payload.long };
    }
    return previousState;
}