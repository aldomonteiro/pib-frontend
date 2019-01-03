import * as types from '../actions/locationTypes';

export default (previousState = { lat: 1, long: 1 }, { type, payload }) => {
    if (type === types.UPDATE_LOCATION) {
        return { lat: payload.lat, long: payload.long };
    }
    return previousState;
}