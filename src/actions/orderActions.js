import { UPDATE } from 'react-admin';

export const ACCEPT_ORDER = 'ACCEPT_ORDER';
export const REJECT_ORDER = 'REJECT_ORDER';
export const PRINT_ORDER = 'PRINT_ORDER';
export const DELIVER_ORDER = 'DELIVER_ORDER';
export const UPDATE_PRINTER = 'UPDATE_PRINTER';
export const UPDATE_ORDERSLIST = 'UPDATE_ORDERSLIST';


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
                body: 'resources.orders.messages.successfulDeliveredOrder',
                level: 'info',
            },
            basePath,
        },
        onFailure: {
            notification: {
                body: 'Error while delivering order. Try again please.',
                level: 'warning',
            },
        },
    }
});



export const update_printer = (printer) => ({
    type: UPDATE_PRINTER,
    payload: { printer },
});

export const update_orders_list = (ids) => ({
    type: UPDATE_ORDERSLIST,
    payload: { ids },
});
