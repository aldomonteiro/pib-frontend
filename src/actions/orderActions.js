import { UPDATE, GET_ONE, FETCH_END } from 'react-admin';

export const ACCEPT_ORDER = 'ACCEPT_ORDER';
export const REJECT_ORDER = 'REJECT_ORDER';
export const PRINT_ORDER = 'PRINT_ORDER';
export const DELIVER_ORDER = 'DELIVER_ORDER';
export const UPDATE_PRINTER = 'UPDATE_PRINTER';
export const UPDATE_ORDERS_LIST = 'UPDATE_ORDERS_LIST';
export const VIEW_ORDER = 'VIEW_ORDER';
export const UPDATE_LAST_ORDER = 'UPDATE_LAST_ORDER';
export const UPDATE_SEEN_IDS = 'UPDATE_SEEN_IDS';
export const NOTIFY_CUSTOMER = 'NOTIFY_CUSTOMER';
export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const UPDATE_ORDER_DATA = 'UPDATE_ORDER_DATA';
export const UPDATE_ORDER_ADMIN = 'UPDATE_ORDER_ADMIN';

export const accept_order = (operation, id, data, basePath) => ({
    type: ACCEPT_ORDER,
    payload: { id, data: { ...data, operation: operation } },
    meta: {
        fetch: UPDATE,
        resource: 'orders',
        onSuccess: {
            notification: {
                body: 'resources.orders.messages.successfulAcceptedOrder',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'Error while accepting order. Try again please.',
                level: 'warning',
            },
        },
    }
});

export const reject_order = (operation, rejectionExplanation, id, data, basePath) => ({
    type: REJECT_ORDER,
    payload: { id, data: { ...data, operation: operation, rejectionExplanation: rejectionExplanation } },
    meta: {
        fetch: UPDATE,
        resource: 'orders',
        onSuccess: {
            notification: {
                body: 'resources.orders.messages.successfullRejectedOrder',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'Error while rejecting order. Try again please.',
                level: 'warning',
            },
        },
    }
});

export const print_order = (operation, id, data, basePath) => ({
    type: PRINT_ORDER,
    payload: { id, data: { ...data, operation: operation } },
    meta: {
        fetch: UPDATE,
        resource: 'orders',
        onSuccess: {
            notification: {
                body: 'resources.orders.messages.successfulPrintedOrder',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'Error while printing order. Try again please.',
                level: 'warning',
            },
        },
    }
});

export const deliver_order = (operation, id, data, basePath) => ({
    type: DELIVER_ORDER,
    payload: { id, data: { ...data, operation: operation } },
    meta: {
        fetch: UPDATE,
        resource: 'orders',
        onSuccess: {
            notification: {
                body: 'resources.orders.messages.success.deliveredOrder',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'resources.orders.messages.failure.deliveredOrder',
                level: 'warning',
            },
        },
    }
});

export const update_order_data = (operation, id, data, basePath) => ({
    type: UPDATE_ORDER_DATA,
    payload: { id, data: { ...data, operation: operation } },
    meta: {
        fetch: UPDATE,
        resource: 'orders',
        onSuccess: {
            notification: {
                body: 'resources.orders.messages.success.updatedOrder',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'resources.orders.messages.failure.updatedOrder',
                level: 'warning',
            },
        },
    }
});

export const update_printer = (printer) => ({
    type: UPDATE_PRINTER,
    payload: { printer },
});

export const update_orders_list = (update) => ({
    type: UPDATE_ORDERS_LIST,
    payload: { update },
});

export const update_last_order = (lastOrder) => ({
    type: UPDATE_LAST_ORDER,
    payload: { lastOrder },
});

export const update_seen_ids = (seenIds) => ({
    type: UPDATE_SEEN_IDS,
    payload: { seenIds },
});

export const notify_customer = (operation, id, data, basePath) => ({
    type: NOTIFY_CUSTOMER,
    payload: { id, data: { ...data, operation: operation } },
    meta: {
        fetch: UPDATE,
        resource: 'orders',
        onSuccess: {
            notification: {
                body: 'resources.orders.messages.success.notifyCustomer',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'resources.orders.messages.failure.notifyCustomer',
                level: 'warning',
            },
        },
    }
});

export const add_new_order = (newOrder) => ({
    type: ADD_NEW_ORDER,
    payload: { newOrder },
});

// Updating the store from react-admin, as described here:
// https://stackoverflow.com/a/51229173/7948731
export const update_orders_admin = (data) => ({
    type: UPDATE_ORDER_ADMIN,
    payload: { data },
    meta: {
        resource: 'orders',
        fetchResponse: GET_ONE,
        fetchStatus: FETCH_END,
    },
});

export const view_order = (id, data, unSeen = true) => ({
    type: VIEW_ORDER,
    payload: { id, data: { ...data, unSeen: unSeen } },
    meta: { resource: 'orders', fetchResponse: UPDATE, fetchStatus: FETCH_END },
});