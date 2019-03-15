import { UPDATE } from 'react-admin';

export const UPDATE_DELIVERY_TIME = 'UPDATE_DELIVERY_TIME';
export const UPDATE_PICKUP_TIME = 'UPDATE_PICKUP_TIME';


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
