import { UPDATE, GET_ONE, FETCH_END } from 'react-admin';

export const UPDATE_DELIVERY_TIME = 'UPDATE_DELIVERY_TIME';
export const UPDATE_PICKUP_TIME = 'UPDATE_PICKUP_TIME';
export const UPDATE_STORES_ADMIN = 'UPDATE_STORES_ADMIN';


export const updateDeliveryTime = (id, data, basePath) => ({
    type: UPDATE_DELIVERY_TIME,
    payload: { id, data: { id: id, deliveryTime: data, operation: UPDATE_DELIVERY_TIME } },
    meta: {
        fetch: UPDATE,
        resource: 'stores',
        onSuccess: {
            notification: {
                body: 'pos.stores.updateDeliveryTimeSuccess',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'pos.stores.updateDeliveryTimeError',
                level: 'warning',
            },
        },
    }
});

export const updatePickupTime = (id, data, basePath) => ({
    type: UPDATE_PICKUP_TIME,
    payload: { id, data: { id: id, pickupTime: data, operation: UPDATE_PICKUP_TIME } },
    meta: {
        fetch: UPDATE,
        resource: 'stores',
        onSuccess: {
            notification: {
                body: 'pos.stores.updatePickupTimeSuccess',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'pos.stores.updatePickupTimeError',
                level: 'warning',
            },
        },
    }
});

// Updating the store from react-admin, as described here:
// https://stackoverflow.com/a/51229173/7948731
export const update_stores_admin = (data) => ({
    type: UPDATE_STORES_ADMIN,
    payload: { data },
    meta: {
        resource: 'stores',
        fetchResponse: GET_ONE,
        fetchStatus: FETCH_END,
    },
});
