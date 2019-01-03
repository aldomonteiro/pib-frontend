import * as types from './locationTypes';

export const updateLocation = (lat, long) => ({
    type: types.UPDATE_LOCATION,
    payload: { lat, long },
});
